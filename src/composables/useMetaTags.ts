import type { BlogEntry } from '@/types';

interface MetaTagConfig {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
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
    updateMetaTag('meta[property="og:title"]', config.ogTitle);
    updateMetaTag('meta[property="og:description"]', config.ogDescription);
    updateMetaTag('meta[property="og:image"]', config.ogImage);
    updateMetaTag('meta[property="og:url"]', config.ogUrl);

    // Update Twitter Card tags
    updateMetaTag('meta[property="twitter:title"]', config.twitterTitle);
    updateMetaTag(
      'meta[property="twitter:description"]',
      config.twitterDescription
    );
    updateMetaTag('meta[property="twitter:image"]', config.twitterImage);
    updateMetaTag('meta[property="twitter:url"]', config.ogUrl);
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
      ogTitle: blogEntry.name,
      ogDescription: description,
      ogImage: defaultImage,
      ogUrl: blogUrl,
      twitterTitle: blogEntry.name,
      twitterDescription: description,
      twitterImage: defaultImage,
    };
  };

  const createDefaultMetaTags = (): MetaTagConfig => {
    const baseUrl = 'https://blog.wheeleruniverse.com';
    const defaultDescription =
      'Technical insights and experiences on cloud computing, software development, and technology leadership';

    return {
      title: 'Wheeler Universe Blog',
      description: defaultDescription,
      ogTitle: 'Wheeler Universe Blog',
      ogDescription: defaultDescription,
      ogImage: `${baseUrl}/wheeler-logo.jpg`,
      ogUrl: baseUrl,
      twitterTitle: 'Wheeler Universe Blog',
      twitterDescription: defaultDescription,
      twitterImage: `${baseUrl}/wheeler-logo.jpg`,
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
