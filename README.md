[![Netlify Status](https://api.netlify.com/api/v1/badges/c182530f-a9a3-4ad8-a713-364fde4f8443/deploy-status)](https://app.netlify.com/projects/wheeleruniverse-blog/deploys)

# Wheeler Universe Blog

A modern blog aggregation website built with Vue 3, TypeScript, and Tailwind CSS using Static Site Generation (SSG). This application aggregates blog posts from multiple platforms under the Wheeler Universe brand with optimized SEO and social media sharing capabilities.

## 🚀 Features

- **Static Site Generation** - Pre-rendered pages for optimal performance and SEO
- **Content-Aware URLs** - Semantic `/read/` and `/watch/` URLs based on content type
- **Dynamic Meta Tags** - Blog-specific SEO meta tags for social media sharing
- **Single View Listing** - Main page displays all blog entries in one place
- **JSON-Driven Content** - Blog data loaded from static JSON configuration
- **Elegant Redirects** - Beautiful redirect pages with countdown and manual options
- **Video Content Support** - Special handling for video content with `/watch/` URLs
- **Advanced Filtering** - Filter by date range, source platform, and collaboration status
- **Real-time Search** - Search functionality by blog title
- **Dark/Light Mode** - Theme toggle with user preference persistence
- **Responsive Design** - Mobile-first approach with smooth animations
- **TypeScript** - Full type safety throughout the application
- **Modern Stack** - Vue 3 Composition API, Vite SSG, Tailwind CSS

## 🛠 Tech Stack

- **Frontend Framework:** Vue 3 with Composition API
- **Static Site Generation:** Vite SSG (vite-ssg)
- **Meta Tags:** @unhead/vue for SEO optimization
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Routing:** Vue Router
- **Testing:** Vitest + Vue Test Utils
- **Code Quality:** ESLint + Prettier
- **Icons:** Heroicons
- **Deployment:** Netlify with automatic deployments

## 🏗 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AppHeader.vue   # Site header with navigation
│   ├── AppFooter.vue   # Site footer with stats
│   ├── BlogCard.vue    # Individual blog entry display
│   ├── BlogList.vue    # Blog listing container
│   ├── SearchBar.vue   # Search functionality
│   ├── FilterPanel.vue # Date and source filtering
│   └── ThemeToggle.vue # Dark/light mode switcher
├── composables/        # Vue composition utilities
│   ├── useBlogData.ts  # Blog data management
│   ├── useMetaTags.ts  # SEO meta tag management
│   └── useTheme.ts     # Theme state management
├── router/             # Vue Router configuration
├── types/              # TypeScript type definitions
├── views/              # Page components
│   ├── HomeView.vue    # Main blog listing page
│   ├── BlogRedirectView.vue # Blog redirect with SEO meta tags
│   └── NotFoundView.vue     # 404 error page
├── tests/              # Test files
│   ├── AllComponents.test.ts    # Integration tests
│   └── components/     # Component-specific tests
├── utils/              # Utility functions
├── style.css           # Global styles and Tailwind imports
└── main.ts             # ViteSSG application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

The application uses Static Site Generation (SSG) to pre-render all pages:

```bash
npm run build
```

This generates:
- Static HTML files with blog-specific meta tags
- Optimized assets and CSS
- Content-aware routes (`/read/` and `/watch/`)
- Netlify redirect configuration

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production with SSG
npm run build:clean  # Full clean build with linting and tests
npm run preview      # Preview production build
npm run test         # Run test suite
npm run lint         # Run ESLint
npm run prettier:write # Format code
```

## 📝 Configuration

### Blog Data Configuration

Blog posts are configured in `public/blog-config.json`:

```json
{
  "features": [
    {
      "enabled": true,
      "name": "dark-mode"
    }
  ],
  "data": [
    {
      "collab": false,
      "date": "2024-05-09",
      "name": "Blog Post Title",
      "slug": "blog-post-slug",
      "source": "https://example.com/blog-post",
      "sourceDisplayName": "Example Site",
      "video": false,
      "github": "https://github.com/user/repo"
    }
  ]
}
```

### Adding New Blog Posts

1. Add a new entry to the `data` array in `public/blog-config.json`
2. Include all required fields: `date`, `name`, `slug`, `source`
3. Optional fields:
   - `collab` - Mark as collaborative post (shows collaboration badge)
   - `video` - Mark as video content (uses `/watch/` URL and shows video badge)
   - `sourceDisplayName` - Custom display name for the source
   - `github` - Associated GitHub repository URL
4. The build process automatically generates routes and meta tags
5. URLs will be content-aware: `/read/slug` for articles, `/watch/slug` for videos

### Feature Flags

Enable/disable features in the `features` array:

- `dark-mode` - Dark/light theme toggle
- `google-analytics` - Google Analytics integration
- `full-text-search` - Full-text search (future feature)

## 🎨 Customization

### Branding

The Wheeler Universe branding can be customized in:

- `tailwind.config.js` - Color scheme and design tokens
- `src/components/AppHeader.vue` - Logo and site title
- `src/style.css` - Global styles and custom CSS

### Theme Colors

Customize the color palette in `tailwind.config.js`:

```javascript
colors: {
  'wheeler-blue': {
    // Custom blue color scale
  },
  'wheeler-gray': {
    // Custom gray color scale
  }
}
```

## 🔧 Development

### Code Quality

- **Linting:** `npm run lint`
- **Formatting:** `npm run prettier:write`
- **Testing:** `npm run test`
- **Full Pipeline:** `npm run build:clean`

### Type Checking

TypeScript compilation: `npm run build` (includes type checking)

### SEO and Meta Tags

The application automatically generates:
- Blog-specific meta tags for each post
- Open Graph tags for social media sharing
- Twitter Card optimization
- Content-aware canonical URLs
- Dynamic page titles and descriptions

### URL Structure

- **Home:** `/` - Main blog listing
- **Articles:** `/read/{slug}` - Reading content with redirect page
- **Videos:** `/watch/{slug}` - Video content with redirect page
- **Static Generation:** All routes pre-rendered at build time

## 📱 Responsive Design

The application is built mobile-first with responsive breakpoints:

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast dark mode
- Focus management

## 🚀 Deployment

The application uses Static Site Generation and can be deployed to any static hosting service:

### Netlify (Recommended)
- Automatic deployments on Git push
- Pre-configured build settings
- Built-in SPA routing support
- Custom domain and HTTPS
- Branch previews

### Other Platforms
- **Vercel** - Connect your Git repository with auto-deploy
- **GitHub Pages** - Upload `dist` folder from build process
- **AWS S3 + CloudFront** - Static website hosting with CDN
- **Any Static Host** - Upload the generated `dist` folder

### Build Process

The SSG build automatically:
1. Generates static HTML files for all blog routes
2. Injects blog-specific meta tags for SEO
3. Creates content-aware URLs (`/read/` and `/watch/`)
4. Optimizes assets and generates sourcemaps
5. Creates Netlify `_redirects` file for SPA routing

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the GitHub repository.