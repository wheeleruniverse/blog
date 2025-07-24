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
          ...blogConfig.data.map(entry => {
            const prefix = entry.video ? '/watch' : '/read';
            return `${prefix}/${entry.slug}`;
          })
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
    },
    onFinished: async () => {
      // Post-process generated HTML files to inject blog-specific meta tags
      const fs = await import('fs/promises')
      const path = await import('path')
      
      try {
        const configPath = path.resolve(__dirname, 'public/blog-config.json')
        const configData = await fs.readFile(configPath, 'utf-8')
        const blogConfig: BlogConfig = JSON.parse(configData)
        
        const distPath = path.resolve(__dirname, 'dist')
        
        // Process each blog entry
        for (const entry of blogConfig.data) {
          const prefix = entry.video ? '/watch' : '/read'
          const filePath = path.resolve(distPath, `${prefix.slice(1)}/${entry.slug}.html`)
          
          try {
            const html = await fs.readFile(filePath, 'utf-8')
            const baseUrl = 'https://blog.wheeleruniverse.com'
            const blogUrl = `${baseUrl}${prefix}/${entry.slug}`
            
            // Replace meta tags in the HTML
            const updatedHtml = html
              .replace(
                /<meta name="description" content="[^"]*">/,
                `<meta name="description" content="${entry.name} - Published on ${entry.date} via ${entry.sourceDisplayName || 'External Source'}${entry.collab ? ' (Collaboration)' : ''}. Technical insights and experiences on cloud computing, software development, and technology leadership.">`
              )
              .replace(
                /<meta property="og:url" content="[^"]*">/,
                `<meta property="og:url" content="${blogUrl}">`
              )
              .replace(
                /<meta property="og:title" content="[^"]*">/,
                `<meta property="og:title" content="${entry.name} - Wheeler Universe Blog">`
              )
              .replace(
                /<meta property="og:description" content="[^"]*">/,
                `<meta property="og:description" content="${entry.name} - Published on ${entry.date} via ${entry.sourceDisplayName || 'External Source'}${entry.collab ? ' (Collaboration)' : ''}. Technical insights and experiences on cloud computing, software development, and technology leadership.">`
              )
              .replace(
                /<meta property="twitter:url" content="[^"]*">/,
                `<meta property="twitter:url" content="${blogUrl}">`
              )
              .replace(
                /<meta property="twitter:title" content="[^"]*">/,
                `<meta property="twitter:title" content="${entry.name} - Wheeler Universe Blog">`
              )
              .replace(
                /<meta property="twitter:description" content="[^"]*">/,
                `<meta property="twitter:description" content="${entry.name} - Published on ${entry.date} via ${entry.sourceDisplayName || 'External Source'}${entry.collab ? ' (Collaboration)' : ''}. Technical insights and experiences on cloud computing, software development, and technology leadership.">`
              )
              .replace(
                /<title>[^<]*<\/title>/,
                `<title>${entry.name} - Wheeler Universe Blog</title>`
              )
            
            await fs.writeFile(filePath, updatedHtml)
          } catch (fileError) {
            console.warn(`Failed to process ${filePath}:`, fileError)
          }
        }
      } catch (error) {
        console.warn('Failed to post-process blog meta tags:', error)
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