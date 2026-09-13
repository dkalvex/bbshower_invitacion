import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from https://dkalvex.github.io/bbshower_invitacion/
export default defineConfig({
  base: '/bbshower_invitacion/',
  build: { assetsDir: 'bundle' },
  plugins: [react()],
})
