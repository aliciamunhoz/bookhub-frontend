import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy: tudo que começar com "/api" é redirecionado para o backend.
    // Isso evita erros de CORS durante o desenvolvimento, pois o navegador
    // "pensa" que está falando com o mesmo endereço do frontend.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
