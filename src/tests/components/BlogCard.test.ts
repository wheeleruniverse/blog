import BlogCard from '@/components/BlogCard.vue';
import type { BlogEntry } from '@/types';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

// Mock the utils
vi.mock('@/utils', () => ({
  formatDate: vi.fn((date: string) => `Formatted: ${date}`),
  getDomainFromUrl: vi.fn((_url: string) => 'example.com'),
}));

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(() => Promise.resolve()),
  },
  writable: true,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: { origin: 'https://localhost:3000' },
  writable: true,
});

describe('BlogCard', () => {
  let wrapper: any;
  const mockBlogEntry: BlogEntry = {
    slug: 'test-blog-post',
    name: 'Test Blog Post',
    date: '2024-01-01',
    source: 'https://example.com/post',
    sourceDisplayName: 'Example Site',
    collab: false,
    video: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (navigator.clipboard.writeText as any) = vi.fn(() => Promise.resolve());
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders blog entry information correctly', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    expect(wrapper.text()).toContain('Test Blog Post');
    expect(wrapper.text()).toContain('Formatted: 2024-01-01');
    expect(wrapper.text()).toContain('Example Site');
    expect(wrapper.find('a[href="/test-blog-post"]').exists()).toBe(true);
  });

  it('displays source domain when sourceDisplayName is not provided', () => {
    const entryWithoutDisplayName = {
      ...mockBlogEntry,
      sourceDisplayName: undefined,
    };
    wrapper = mount(BlogCard, {
      props: { entry: entryWithoutDisplayName },
    });

    expect(wrapper.text()).toContain('example.com');
  });

  it('shows collaboration badge when collab is true', () => {
    const collabEntry = { ...mockBlogEntry, collab: true };
    wrapper = mount(BlogCard, {
      props: { entry: collabEntry },
    });

    expect(wrapper.text()).toContain('Collaboration');
    expect(wrapper.find('[class*="bg-wheeler-coral-100"]').exists()).toBe(true);
  });

  it('shows video badge when video is true', () => {
    const videoEntry = { ...mockBlogEntry, video: true };
    wrapper = mount(BlogCard, {
      props: { entry: videoEntry },
    });

    expect(wrapper.text()).toContain('Video');
    expect(wrapper.find('[class*="bg-wheeler-pink-100"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Watch Now');
  });

  it('shows "Read More" for non-video entries', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    expect(wrapper.text()).toContain('Read More');
    expect(wrapper.text()).not.toContain('Watch Now');
  });

  it('hides badges section when neither collab nor video is true', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const badgesSection = wrapper.find(
      '[class*="border-t border-wheeler-gray-100"]'
    );
    expect(badgesSection.exists()).toBe(false);
  });

  it('renders copy button correctly', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const copyButton = wrapper.find(
      'button[aria-label="Copy link to Test Blog Post"]'
    );
    expect(copyButton.exists()).toBe(true);
    expect(copyButton.attributes('title')).toBe('Copy local link');
  });

  it('calls clipboard writeText when copy button is clicked', async () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const copyButton = wrapper.find(
      'button[aria-label="Copy link to Test Blog Post"]'
    );
    await copyButton.trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://localhost:3000/test-blog-post'
    );
  });

  it('shows copy feedback after click', async () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const copyButton = wrapper.find(
      'button[aria-label="Copy link to Test Blog Post"]'
    );
    await copyButton.trigger('click');
    await nextTick();

    // Check that feedback is shown (button title changes)
    expect(copyButton.attributes('title')).toBe('Copied!');
  });

  it('has proper accessibility attributes', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const copyButton = wrapper.find('button[aria-label*="Copy link"]');
    expect(copyButton.exists()).toBe(true);
    expect(copyButton.attributes('aria-label')).toBeTruthy();

    const readMoreLink = wrapper.find('a[href="/test-blog-post"]');
    expect(readMoreLink.exists()).toBe(true);
    // Some links might not have aria-label, so just check they exist
    expect(readMoreLink.attributes('href')).toBe('/test-blog-post');

    const timeElement = wrapper.find('time');
    expect(timeElement.exists()).toBe(true);
    expect(timeElement.attributes('datetime')).toBe('2024-01-01');
  });

  it('has proper CSS classes for styling and animations', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const article = wrapper.find('article');
    expect(article.exists()).toBe(true);
    expect(article.classes()).toContain('bg-white');
    expect(article.classes()).toContain('dark:bg-wheeler-gray-800');
    expect(article.classes()).toContain('rounded-lg');
    expect(article.classes()).toContain('shadow-md');
    expect(article.classes()).toContain('hover:shadow-lg');
    expect(article.classes()).toContain('transition-all');
  });

  it('handles responsive design classes', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    const titleLink = wrapper.find('a[href="/test-blog-post"]');
    expect(titleLink.exists()).toBe(true);
    expect(titleLink.classes()).toContain('text-lg');
    expect(titleLink.classes()).toContain('sm:text-xl');

    // Check for responsive container classes
    const article = wrapper.find('article');
    expect(article.classes()).toContain('p-4');
    expect(article.classes()).toContain('sm:p-6');
  });

  it('renders with correct link structure', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    // Check that both title link and read more button link to correct URL
    const titleLink = wrapper.find('a[href="/test-blog-post"]');
    const readMoreButton = wrapper.find('a[aria-label="Read Test Blog Post"]');

    expect(titleLink.exists()).toBe(true);
    expect(readMoreButton.exists()).toBe(true);
    expect(readMoreButton.attributes('href')).toBe('/test-blog-post');
  });

  it('displays formatted date correctly', () => {
    wrapper = mount(BlogCard, {
      props: { entry: mockBlogEntry },
    });

    // The formatDate mock returns "Formatted: {date}"
    expect(wrapper.text()).toContain('Formatted: 2024-01-01');

    const timeElement = wrapper.find('time');
    expect(timeElement.attributes('datetime')).toBe('2024-01-01');
  });

  it('renders both collaboration and video badges when both are true', () => {
    const bothFlagsEntry = { ...mockBlogEntry, collab: true, video: true };
    wrapper = mount(BlogCard, {
      props: { entry: bothFlagsEntry },
    });

    expect(wrapper.text()).toContain('Collaboration');
    expect(wrapper.text()).toContain('Video');
    expect(wrapper.text()).toContain('Watch Now');

    // Should have badges section visible
    const badgesSection = wrapper.find(
      '[class*="border-t border-wheeler-gray-100"]'
    );
    expect(badgesSection.exists()).toBe(true);
  });
});
