import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { structuredData } from './seo.config.js'

const seo = {
  name: 'structured-data',
  transformIndexHtml: (html) => html.replace('<!-- structured-data -->', structuredData()),
}

// libs em chunks próprios: mudam pouco, então ficam em cache entre deploys do site
export default defineConfig({
  plugins: [react(), tailwindcss(), seo],
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            {
              name: 'motion',
              test: /node_modules[\\/](gsap|@gsap|lenis|motion|framer-motion|motion-dom|motion-utils)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
