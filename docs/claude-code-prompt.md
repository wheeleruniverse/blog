# Blog Website Generation Prompt for Claude Code

Create a complete blog aggregation website using Vue 3, TypeScript, Tailwind CSS, and Vite. The website should aggregate blog posts from multiple platforms under the Wheeler Universe brand.

## Core Requirements

### Tech Stack
- Vue 3 with Composition API
- TypeScript
- Tailwind CSS
- Vite build tool
- Prettier for code formatting
- ESLint for code linting

### Key Features
1. **Single view listing all blogs** - Main page displays all blog entries
2. **JSON-driven content** - Blog data loaded from static JSON configuration file
3. **External redirects** - Blog entries redirect to original posts on external sites
4. **Easy updates** - Content updates via JSON config only, no code changes
5. **Custom URLs** - Customizable slugs for each blog entry
6. **Direct link routing** - Custom URLs should seamlessly redirect to original posts
7. **Date ordering** - Blogs ordered by publication date (newest first)
8. **Date filtering** - Filter blogs by date range
9. **Source filtering** - Filter by blog source/platform
10. **Name search** - Search functionality by blog title

### Stretch Goals
- **Dark/Light mode toggle** with user preference persistence
- **Google Analytics 4 integration** for traffic tracking
- **Feature flag system** for enabling/disabling features without code changes
- **Full-text search preparation** - Structure to support future Elasticsearch integration

## Data Structure

Implement these TypeScript interfaces:

```typescript
interface BlogConfig {
  features: BlogFeature[];
  data: BlogEntry[];
}

interface BlogFeature {
  enabled?: boolean; // disabled: false/undefined, enabled: true
  name: string;
}

interface BlogEntry {
  collab?: boolean; // sole author: false/undefined, co-author: true
  date: string; // YYYY-MM-DD format
  name: string;
  slug: string;
  source: string; // Original blog URL
}
```

## Sample Data

Include this sample configuration in your JSON file:

```json
{
  "features": [
    {
      "enabled": false,
      "name": "full-text-search"
    }
  ],
  "data": [
    {
      "collab": false,
      "date": "2020-12-18",
      "name": "AWS ML Recommendation Engine",
      "slug": "aws-ml-recommendation-engine",
      "source": "https://dev.to/wheeleruniverse/my-october-cloud-guru-challenge-experience-5ecg"
    },
    {
      "date": "2024-05-09",
      "name": "How I Crushed My AWS Certification Renewals Back-to-Back (and Why It Was a Bad Idea)",
      "slug": "aws-cert-renewals-back-to-back",
      "source": "https://dev.to/aws-builders/how-i-crushed-my-aws-certification-renewals-back-to-back-and-why-it-was-a-bad-idea-56fh"
    },
    {
      "collab": true,
      "date": "2021-08-11",
      "name": "Our Quest for the Perfect Code Assessment",
      "slug": "code-assessment-quest",
      "source": "https://www.bravolt.com/post/our-quest-for-the-perfect-code-assessment"
    }
  ]
}
```

## Design Requirements

### Wheeler Universe Branding
- Prominent brand logo placement
- Color scheme that complements the brand logo
- Modern, professional aesthetic
- Responsive design for all device sizes

### User Experience
- Clean, intuitive interface
- Fast loading and smooth interactions
- Clear visual hierarchy
- Accessible design following WCAG guidelines

## Technical Specifications

### Routing
- Home page (`/`) - Main blog listing
- Custom blog URLs (`/:slug`) - Redirect to original blog posts
- 404 handling for invalid slugs

### State Management
- Use Vue 3 Composition API with reactive state
- Implement computed properties for filtered/sorted blog lists
- Persist user preferences (theme, filters) in localStorage

### Performance
- Lazy loading for blog list rendering
- Optimized bundle size with Vite
- Fast search/filter implementations

### Code Quality
- Strict TypeScript configuration
- Comprehensive ESLint rules
- Prettier formatting configuration
- Component composition and reusability

## File Structure
Generate a complete project structure including:
- `src/components/` - Vue components
- `src/composables/` - Composition API utilities
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `public/` - Static assets and JSON config
- Configuration files (vite.config.ts, tailwind.config.js, etc.)

## Specific Components Needed
1. **BlogList** - Main blog listing component
2. **BlogCard** - Individual blog entry display
3. **SearchBar** - Search functionality
4. **FilterPanel** - Date and source filtering
5. **ThemeToggle** - Dark/light mode switcher
6. **Header** - Site header with branding
7. **Footer** - Site footer

Make the codebase production-ready with proper error handling, loading states, and comprehensive TypeScript typing throughout.