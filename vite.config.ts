import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://creewick.github.io/mood/',
  plugins: [
    react(),
    legacy()
  ],
})
