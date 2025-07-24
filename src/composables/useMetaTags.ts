import type { BlogEntry } from '@/types';
import { useHead } from '@unhead/vue';

export function useMetaTags() {
  const createBlogPostMetaTags = (blogEntry: BlogEntry) => {
    const baseUrl = 'https://blog.wheeleruniverse.com';
    const prefix = blogEntry.video ? '/watch' : '/read';
    const blogUrl = `${baseUrl}${prefix}/${blogEntry.slug}`;
    const defaultImage = `${baseUrl}/wheeler-logo.jpg`;

    // Generate description from blog title and metadata
    const description = `${blogEntry.name} - Published on ${blogEntry.date} via ${blogEntry.sourceDisplayName}. Technical insights and experiences on cloud computing, software development, and technology leadership.`;

    return useHead({
      title: `${blogEntry.name} - Wheeler Universe Blog`,
      meta: [
        { name: 'description', content: description },
        {
          property: 'og:title',
          content: `${blogEntry.name} - Wheeler Universe Blog`,
        },
        { property: 'og:description', content: description },
        { property: 'og:image', content: defaultImage },
        { property: 'og:url', content: blogUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: 'Wheeler Universe Blog' },
        { property: 'twitter:card', content: 'summary_large_image' },
        {
          property: 'twitter:title',
          content: `${blogEntry.name} - Wheeler Universe Blog`,
        },
        { property: 'twitter:description', content: description },
        { property: 'twitter:image', content: defaultImage },
        { property: 'twitter:url', content: blogUrl },
        { property: 'twitter:site', content: '@wheeleruniverse' },
        { property: 'twitter:creator', content: '@wheeleruniverse' },
      ],
    });
  };

  const createDefaultMetaTags = () => {
    const baseUrl = 'https://blog.wheeleruniverse.com';
    const defaultDescription =
      'Technical insights and experiences on cloud computing, software development, and technology leadership';

    return useHead({
      title: 'Wheeler Universe Blog',
      meta: [
        { name: 'description', content: defaultDescription },
        { property: 'og:title', content: 'Wheeler Universe Blog' },
        { property: 'og:description', content: defaultDescription },
        { property: 'og:image', content: `${baseUrl}/wheeler-logo.jpg` },
        { property: 'og:url', content: baseUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Wheeler Universe Blog' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: 'Wheeler Universe Blog' },
        { property: 'twitter:description', content: defaultDescription },
        { property: 'twitter:image', content: `${baseUrl}/wheeler-logo.jpg` },
        { property: 'twitter:url', content: baseUrl },
        { property: 'twitter:site', content: '@wheeleruniverse' },
        { property: 'twitter:creator', content: '@wheeleruniverse' },
      ],
    });
  };

  return {
    createBlogPostMetaTags,
    createDefaultMetaTags,
  };
}
