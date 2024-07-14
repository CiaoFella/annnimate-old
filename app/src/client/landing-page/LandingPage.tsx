import { Link } from 'wasp/client/router'
import { useAuth } from 'wasp/client/auth'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { HiBars3 } from 'react-icons/hi2'
import { BiLogIn } from 'react-icons/bi'
import logo from '../static/logo.png'
import avatarCollection from '../static/avatar-collection.png'
import problemAdressingImg from '../static/problem-adressing.jpg'
import DivderStar from '../static/divider-star.svg?react'
import DottedLine from '../static/dotted-line.svg?react'
import PlaceholderHigh from '../static/placeholder_high.jpg'
import openSaasBanner from '../static/open-saas-banner.png'
import {
  features,
  navigation,
  faqs,
  footerNavigation,
  testimonials,
} from './contentSections'
import DropdownUser from '../components/DropdownUser'
import { DOCS_URL } from '../../shared/constants'
import { UserMenuItems } from '../components/UserMenuItems'
import DarkModeSwitcher from '../admin/components/DarkModeSwitcher'
import Button from '../components/Button'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { data: user, isLoading: isUserLoading } = useAuth()

  const NavLogo = () => (
    <img className="h-8 w-8" src={logo} alt="Your SaaS App" />
  )

  return (
    <div className="w-full bg-secondary text-primary dark:text-secondary dark:bg-primary">
      <header className="z-50 dark:bg-boxdark-2">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center lg:flex-1">
            <a
              href="/"
              className="flex items-center -m-1.5 p-1.5 text-gray-900 duration-300 ease-in-out hover:text-yellow-500"
            >
              <NavLogo />
              <span className="ml-2 text-sm font-semibold leading-6 dark:text-white">
                Your Saas
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <HiBars3 className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 duration-300 ease-in-out hover:text-yellow-500 dark:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:align-end">
            {/* <!-- Dark Mode Toggler --> */}
            <div className="flex items-center gap-3 2xsm:gap-7">
              <ul className="flex justify-center items-center gap-2 2xsm:gap-4">
                <DarkModeSwitcher />
              </ul>
              {isUserLoading ? null : !user ? (
                <Link to="/login">
                  <div className="flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white">
                    Log in <BiLogIn size="1.1rem" className="ml-1" />
                  </div>
                </Link>
              ) : (
                <DropdownUser user={user} />
              )}
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-boxdark dark:text-white">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your SaaS</span>
                <NavLogo />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <AiFillCloseCircle className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-boxdark-2"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {isUserLoading ? null : !user ? (
                    <Link to="/login">
                      <div className="flex justify-start items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white">
                        Log in <BiLogIn size="1.1rem" className="ml-1" />
                      </div>
                    </Link>
                  ) : (
                    <UserMenuItems user={user} />
                  )}
                </div>
                <div className="py-6">
                  <DarkModeSwitcher />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <section className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 max-w-6xl">
          <h1 className="text-title-huge font-clashGrotesk font-light text-center">
            All the award-winning animations in one place
          </h1>
          <p className="text-center text-base max-w-3xl">
            Lorem ipsum dolor sit amet consectetur. Est consectetur lectus
            malesuada id vitae nisi vitae. Nunc leo molestie in fermentum vel
            nisl mauris varius suscipit. Iaculis tellus eu feugiat nibh nunc.
          </p>
          <Button
            type="cta"
            primaryColor="accent"
            secondaryColor="primary"
            url="/signup"
            text="Create Free Account"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm text-center text-gray-500">
              Trusted by over 100 leading Designer & Developer
            </p>
            <img src={avatarCollection} alt="avatars" />
            <p className="text-sm text-center text-gray-500">+100 more </p>
          </div>
        </div>
      </section>
      <section className="container max-w-screen-xl py-25 flex items-center justify-center flex-col gap-10">
        <h2 className="text-title-xxl font-light font-clashGrotesk max-w-3xl text-center">
          Want to create award-winning animations like this one, but you don’t
          know how?
        </h2>
        <img
          className="rounded-2xl"
          src={problemAdressingImg}
          alt="award-winning animation compilation"
        />
      </section>
      <section className="mx-5 py-50 p-10">
        <div className="px-15 py-15 bg-gray-300 grid grid-cols-2 grid-rows-1 gap-10 items-center justify-center rounded-2xl">
          <div className="flex flex-col gap-15 py-20">
            <h2 className="text-title-xxl font-light font-clashGrotesk ">
              It was never easier. Award-winning animations with just one click.
            </h2>
            <div className="flex flex-col items-start gap-7.5">
              <p className="max-w-lg">
                Simply copy the animation you like, copy either webflow or plain
                HTML / JS and paste it into your project. And voilà,
                award-winning animations, as simple as that.
              </p>
              <Button
                type="cta"
                primaryColor="secondary"
                url="/signup"
                text="Try it for free"
              />
            </div>
          </div>
          <img
            src={problemAdressingImg}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </section>
      <section className="container max-w-screen-2xl py-50">
        <div className="relative grid grid-cols-categoryTeaser grid-rows-1 gap-10">
          <div className="relative w-full h-full">
            <div className="gray-card relative z-1 flex-col items-center justify-between min-h-171.5 w-full">
              <h3 className="text-title-xxl font-light font-clashGrotesk">
                Hover Animations
              </h3>
              <div className="flex flex-col jusitfy-center items-center gap-5 max-w-lg">
                <DivderStar />
                <p className="text-gray-500 text-center">
                  Simply copy the animation you like, copy either webflow or
                  plain HTML / JS and paste it into your project. And voilà,
                  award-winning animations, as simple as that.
                </p>
              </div>
              <Button
                type="cta"
                primaryColor="secondary"
                url="/signup"
                text="Explore Hover Animations"
              />
            </div>
            <div className="gray-card absolute z-0 top-0 left-0 right-0 bottom-0 flex-col items-center justify-between min-h-171.5 w-full">
              <h3 className="text-title-xxl font-clashGrotesk">
                Scroll Animations
              </h3>
              <div className="flex flex-col jusitfy-center items-center gap-5 max-w-lg">
                <DivderStar />
                <p className="text-gray-500 text-center">
                  Simply copy the animation you like, copy either webflow or
                  plain HTML / JS and paste it into your project. And voilà,
                  award-winning animations, as simple as that.
                </p>
              </div>
              <Button
                type="cta"
                primaryColor="secondary"
                url="/signup"
                text="Explore Hover Animations"
              />
            </div>
            <div className="gray-card absolute z-0 top-0 left-0 right-0 bottom-0 flex-col items-center justify-between min-h-171.5 w-full">
              <h3 className="text-title-xxl font-clashGrotesk">
                Scroll Animations
              </h3>
              <div className="flex flex-col jusitfy-center items-center gap-5 max-w-lg">
                <DivderStar />
                <p className="text-gray-500 text-center">
                  Simply copy the animation you like, copy either webflow or
                  plain HTML / JS and paste it into your project. And voilà,
                  award-winning animations, as simple as that.
                </p>
              </div>
              <Button
                type="cta"
                primaryColor="secondary"
                url="/signup"
                text="Explore Hover Animations"
              />
            </div>
            <div className="gray-card absolute z-0 top-0 left-0 right-0 bottom-0 flex-col items-center justify-between min-h-171.5 w-full">
              <h3 className="text-title-xxl font-clashGrotesk">
                Scroll Animations
              </h3>
              <div className="flex flex-col jusitfy-center items-center gap-5 max-w-lg">
                <DivderStar />
                <p className="text-gray-500 text-center">
                  Simply copy the animation you like, copy either webflow or
                  plain HTML / JS and paste it into your project. And voilà,
                  award-winning animations, as simple as that.
                </p>
              </div>
              <Button
                type="cta"
                primaryColor="secondary"
                url="/signup"
                text="Explore Hover Animations"
              />
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-between">
            <div className="flex relative z-1 flex-col justify-center items-center gap-2">
              <div className="round-circle bg-gray-300"></div>
              <a href="#animation1" className="text-gray-300">
                Hover
              </a>
            </div>
            <div className="flex relative z-1 flex-col justify-center items-center gap-2">
              <div className="round-circle bg-gray-300"></div>
              <a href="#animation1" className="text-gray-300">
                Hover
              </a>
            </div>
            <div className="flex relative z-1 flex-col justify-center items-center gap-2">
              <div className="round-circle bg-gray-300"></div>
              <a href="#animation1" className="text-gray-300">
                Hover
              </a>
            </div>
            <div className="flex relative z-1 flex-col justify-center items-center gap-2">
              <div className="round-circle bg-gray-300"></div>
              <a href="#animation1" className="text-gray-300">
                Hover
              </a>
            </div>
            <div className="absolute z-0 h-full top-0 ml-auto mr-auto">
              <DottedLine className="h-full" />
            </div>
          </div>
          <div className="w-full h-full relative overflow-hidden rounded-3xl">
            <img
              className="relative z-1 w-full h-full object-cover"
              src={PlaceholderHigh}
            />
            <img
              className="absolute z-0 top-0 left-0 w-full h-full object-cover"
              src={PlaceholderHigh}
            />
            <img
              className="absolute z-0 top-0 left-0 w-full h-full object-cover"
              src={PlaceholderHigh}
            />
            <img
              className="absolute z-0 top-0 left-0 w-full h-full object-cover"
              src={PlaceholderHigh}
            />
          </div>
        </div>
      </section>
      <section className="container max-w-screen-2xl py-25">
        <h2 className="text-title-xxl font-light font-clashGrotesk mb-5">
          What's included
        </h2>
        <div className="grid grid-cols-3 grid-rows-8 gap-5">
          <div className="gray-card min-h-72.5 p-5 row-span-3 flex justify-start items-end">
            <h3 className="text-title-md font-clashGrotesk relative z-1">
              Choose what Platform
            </h3>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full z-0 "
              src={PlaceholderHigh}
              alt="Placeholder alt"
            />
          </div>
          <div className="gray-card p-5 row-span-5 flex justify-start items-end">
            <h3 className="text-title-md font-clashGrotesk relative z-1">
              Copy & paste in seconds
            </h3>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full z-0 "
              src={PlaceholderHigh}
              alt="Placeholder alt"
            />
          </div>
          <div className="gray-card p-5 row-span-2 flex justify-start items-end">
            <h3 className="text-title-md font-clashGrotesk relative z-1">
              Start for Free
            </h3>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full z-0 "
              src={PlaceholderHigh}
              alt="Placeholder alt"
            />
          </div>
          <div className="gray-card p-5 row-span-3 flex justify-start items-end">
            <h3 className="text-title-md font-clashGrotesk relative z-1">
              Pay once use forever
            </h3>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full z-0 "
              src={PlaceholderHigh}
              alt="Placeholder alt"
            />
          </div>
          <div className="gray-card p-5 row-span-2 flex justify-start items-end">
            <h3 className="text-title-md font-clashGrotesk relative z-1">
              Detailed Docs
            </h3>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full z-0 "
              src={PlaceholderHigh}
              alt="Placeholder alt"
            />
          </div>
          <div className="gray-card p-5 col-span-3 row-span-3 flex justify-start items-end">
            <h3 className="text-title-md font-clashGrotesk relative z-1">
              Adapt your animation as needed
            </h3>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full z-0 "
              src={PlaceholderHigh}
              alt="Placeholder alt"
            />
          </div>
        </div>
      </section>
      <section className="container py-25">
        <h2 className="text-title-xxl font-light font-clashGrotesk mb-5">
          What industry leader have to say
        </h2>
      </section>
    </div>
  )
}
