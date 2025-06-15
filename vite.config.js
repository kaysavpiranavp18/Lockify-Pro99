import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Lockify-Pro99/',  // ⚠️ Important: add the trailing slash
  plugins: [react()],
})

