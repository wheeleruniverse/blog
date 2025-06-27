# Wheeler Universe Blog

A modern blog aggregation website built with Vue 3, TypeScript, and Tailwind CSS. This application aggregates blog posts from multiple platforms under the Wheeler Universe brand.

## 🚀 Features

- **Single View Listing** - Main page displays all blog entries in one place
- **JSON-Driven Content** - Blog data loaded from static JSON configuration
- **External Redirects** - Blog entries redirect to original posts on external sites
- **Custom URLs** - Customizable slugs for each blog entry with seamless redirects
- **Advanced Filtering** - Filter by date range, source platform, and collaboration status
- **Real-time Search** - Search functionality by blog title
- **Dark/Light Mode** - Theme toggle with user preference persistence
- **Responsive Design** - Mobile-first approach with smooth animations
- **TypeScript** - Full type safety throughout the application
- **Modern Stack** - Vue 3 Composition API, Vite, Tailwind CSS

## 🛠 Tech Stack

- **Frontend Framework:** Vue 3 with Composition API
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Routing:** Vue Router
- **Code Quality:** ESLint + Prettier
- **Icons:** Heroicons

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
│   └── useTheme.ts     # Theme state management
├── router/             # Vue Router configuration
├── types/              # TypeScript type definitions
├── views/              # Page components
│   ├── HomeView.vue    # Main blog listing page
│   ├── BlogRedirectView.vue # Blog redirect handling
│   └── NotFoundView.vue     # 404 error page
├── style.css           # Global styles and Tailwind imports
└── main.ts             # Application entry point
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

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
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
      "source": "https://example.com/blog-post"
    }
  ]
}
```

### Adding New Blog Posts

1. Add a new entry to the `data` array in `public/blog-config.json`
2. Include all required fields: `date`, `name`, `slug`, `source`
3. Optional fields: `collab` (for collaborative posts)
4. The application will automatically pick up the changes

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
- **Formatting:** `npm run format`

### Type Checking

TypeScript compilation: `npm run build` (includes type checking)

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

The application generates static files that can be deployed to any static hosting service:

- **Netlify** - Drop the `dist` folder
- **Vercel** - Connect your Git repository
- **GitHub Pages** - Upload build artifacts
- **AWS S3 + CloudFront** - Static website hosting

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