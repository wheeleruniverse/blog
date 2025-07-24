/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { BlogConfig } from './src/types'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    includedRoutes: async () => {
      // Generate routes from blog config at build time
      const fs = await import('fs/promises')
      const path = await import('path')
      
      try {
        const configPath = path.resolve(__dirname, 'public/blog-config.json')
        const configData = await fs.readFile(configPath, 'utf-8')
        const blogConfig: BlogConfig = JSON.parse(configData)
        
        const routes = [
          '/',
          ...blogConfig.data.map(entry => `/blog/${entry.slug}`)
        ]
        
        // Generate _redirects file for Netlify SPA routing
        const redirectsContent = [
          '# Handle SPA routing for remaining dynamic routes',
          '/*    /index.html   200'
        ].join('\n')
        
        const distPath = path.resolve(__dirname, 'dist')
        await fs.mkdir(distPath, { recursive: true })
        await fs.writeFile(path.resolve(distPath, '_redirects'), redirectsContent)
        
        return routes
      } catch (error) {
        console.warn('Failed to load blog config for route generation:', error)
        return ['/']
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})