import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT: number = parseInt(process.env.FRONTEND_PORT) | 4506;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
  }
})
