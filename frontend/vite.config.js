import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port : 3000,
    host : '0.0.0.0' // Permite que dispositivos na mesma rede local acessem o servidor
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
