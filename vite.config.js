import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // build: {       //intalacion de para deploy en netlify
  //   rollupOptions: {
  //     external: ['react-router-dom']
  //   }
  // }  //intalacion de para deploy en netlify
})
