import type { BlogEntry } from '@/types';

interface MetaTagConfig {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function useMetaTags() {
  const updateMetaTags = (config: MetaTagConfig): void => {
    // Update document title
    document.title = config.title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, content: string): void => {
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (tag) {
        tag.content = content;
      } else {
        // Create new meta tag if it doesn't exist
        tag = document.createElement('meta');
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) tag.setAttribute('property', property);
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) tag.setAttribute('name', name);
        }
        tag.content = content;
        document.head.appendChild(tag);
      }
    };

    // Update basic meta tags
    updateMetaTag('meta[name="description"]', config.description);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', config.title);
    updateMetaTag('meta[property="og:description"]', config.description);
    updateMetaTag('meta[property="og:image"]', config.image);
    updateMetaTag('meta[property="og:url"]', config.url);

    // Update Twitter Card tags
    updateMetaTag('meta[property="twitter:title"]', config.title);
    updateMetaTag('meta[property="twitter:description"]', config.description);
    updateMetaTag('meta[property="twitter:image"]', config.image);
    updateMetaTag('meta[property="twitter:url"]', config.url);
  };

  const createBlogPostMetaTags = (blogEntry: BlogEntry): MetaTagConfig => {
    const baseUrl = 'https://blog.wheeleruniverse.com';
    const blogUrl = `${baseUrl}/${blogEntry.slug}`;
    const defaultImage = `${baseUrl}/wheeler-logo.jpg`;

    // Generate description from blog title and metadata
    const description = `${blogEntry.name} - Published on ${blogEntry.date} via ${blogEntry.sourceDisplayName}. Technical insights and experiences on cloud computing, software development, and technology leadership.`;

    return {
      title: `${blogEntry.name} - Wheeler Universe Blog`,
      description,
      image: defaultImage,
      url: blogUrl,
    };
  };

  const createDefaultMetaTags = (): MetaTagConfig => {
    const baseUrl = 'https://blog.wheeleruniverse.com';
    const defaultDescription =
      'Technical insights and experiences on cloud computing, software development, and technology leadership';

    return {
      title: 'Wheeler Universe Blog',
      description: defaultDescription,
      image: `${baseUrl}/wheeler-logo.jpg`,
      url: baseUrl,
    };
  };

  const updateBlogPostMetaTags = (blogEntry: BlogEntry): void => {
    const metaConfig = createBlogPostMetaTags(blogEntry);
    updateMetaTags(metaConfig);
  };

  const resetToDefaultMetaTags = (): void => {
    const defaultConfig = createDefaultMetaTags();
    updateMetaTags(defaultConfig);
  };

  return {
    updateMetaTags,
    createBlogPostMetaTags,
    createDefaultMetaTags,
    updateBlogPostMetaTags,
    resetToDefaultMetaTags,
  };
}
