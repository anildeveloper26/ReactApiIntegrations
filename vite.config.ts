import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { config } from "dotenv"
config()


export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': process.env
  },
  plugins: [ tailwindcss(),
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true }),
    react(),
  ]
})