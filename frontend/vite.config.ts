import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    watch: {
      // This option tells Vite to watch for changes in the files
      // and rebuild when changes are detected
      include: 'src/**/*', // Pattern for files to watch
      exclude: 'node_modules/**', // Pattern for files to exclude
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_APP_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
