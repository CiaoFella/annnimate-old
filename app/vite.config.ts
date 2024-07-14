import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [svgr()],
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, 'src/client/admin/fonts'),
        path.resolve(__dirname, '.wasp/out/web-app'),
      ],
    },
    open: true,
  },
})
