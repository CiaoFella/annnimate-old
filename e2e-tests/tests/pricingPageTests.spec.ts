import { test, expect, type Page } from '@playwright/test';
import {
  signUserUp,
  logUserIn,
  createRandomUser,
  makeStripePayment,
  type User,
} from './utils';

let page: Page;
let testUser: User;

async function logNewUserIn() {
  testUser = createRandomUser();
  await signUserUp({ page: page, user: testUser });
  await logUserIn({ page: page, user: testUser });
}

// We need to run the tests sequentially to check for functionality before and after the user pays.
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('User should see Log In to Buy Plan button', async () => {
  await page.goto('/pricing');
  // There are three tiers on the page, so we want to retrieve the first of the three buttons
  const buyPlanButton = page
    .getByRole('button', { name: 'Log in to buy plan' })
    .first();
  await expect(buyPlanButton).toBeVisible();
  await expect(buyPlanButton).toBeEnabled();
  await buyPlanButton.click();
  await page.waitForURL('**/login');
  expect(page.url()).toContain('/login');
});

test('User should see the Buy Plan button before payment', async () => {
  // We only need to log the user in once since the tests are running sequentially
  // and the same page is being shared between all the tests.
  await logNewUserIn();
  await page.goto('/pricing');
  // There are three tiers on the page, so we want to retrieve the first of the three buttons
  const manageSubscriptionButton = page
    .getByRole('button', { name: 'Buy plan' })
    .first();
  await expect(manageSubscriptionButton).toBeVisible();
  await expect(manageSubscriptionButton).toBeEnabled();
});

test('Make test payment with Stripe', async () => {
  const PLAN_NAME = 'Annual';
  await page.goto('/');
  await makeStripePayment({ test, page, planName: PLAN_NAME });
});

test('User should see the Manage Subscription button after payment', async () => {
  await page.goto('/pricing');
  // There are three tiers on the page, so we want to retrieve the first of the three buttons
  const manageSubscriptionButton = page
    .getByRole('button', { name: 'Manage Subscription' })
    .first();
  await expect(manageSubscriptionButton).toBeVisible();
  await expect(manageSubscriptionButton).toBeEnabled();
  await manageSubscriptionButton.click();
  // clicking the button should take the user to the Stripe customer portal page with substring 'billing.stripe.com' in a new window
  const newTabPromise = page.waitForEvent('popup');
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL(/^https:\/\/billing\.stripe\.com\//);
});
