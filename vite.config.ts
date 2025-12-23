import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    cors: {
      origin: "https://weatherdata.vanillafox.site:4200",
      credentials: true,
    }
  },
  plugins: [react()],
  base: '/kraken'
})
