import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { runtimeConfig } from './vite/runtimeConfig.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), runtimeConfig()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
