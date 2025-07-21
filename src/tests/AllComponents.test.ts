import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

// Import all components
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import BlogCard from '@/components/BlogCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

// Mock external dependencies
const mockToggleTheme = vi.fn();
const mockTheme = { value: { isDark: false } };

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

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

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('Vue Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme.value.isDark = false;
  });

  describe('ThemeToggle', () => {
    it('renders a button with correct attributes', () => {
      const wrapper = mount(ThemeToggle);
      const button = wrapper.find('button');

      expect(button.exists()).toBe(true);
      expect(button.attributes('aria-label')).toBe('Switch to dark mode');
      expect(button.attributes('title')).toBe('Switch to dark mode');
    });

    it('calls toggleTheme when clicked', async () => {
      const wrapper = mount(ThemeToggle);
      await wrapper.find('button').trigger('click');
      expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('updates aria-label for dark mode', async () => {
      mockTheme.value.isDark = true;
      const wrapper = mount(ThemeToggle);
      await nextTick();

      const button = wrapper.find('button');
      expect(button.attributes('aria-label')).toBe('Switch to light mode');
      expect(button.attributes('title')).toBe('Switch to light mode');
    });

    it('has proper styling classes', () => {
      const wrapper = mount(ThemeToggle);
      const button = wrapper.find('button');

      expect(button.classes()).toContain('relative');
      expect(button.classes()).toContain('inline-flex');
      expect(button.classes()).toContain('rounded-md');
      expect(button.classes()).toContain('transition-colors');
    });
  });

  describe('SearchBar', () => {
    it('renders input field with default placeholder', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      });

      expect(wrapper.find('input').exists()).toBe(true);
      expect(wrapper.find('input').attributes('placeholder')).toBe(
        'Search blog posts...'
      );
    });

    it('renders input field with custom placeholder', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: '',
          placeholder: 'Custom placeholder',
        },
      });

      expect(wrapper.find('input').attributes('placeholder')).toBe(
        'Custom placeholder'
      );
    });

    it('emits update:modelValue when input changes', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      });

      await wrapper.find('input').setValue('test search');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test search']);
    });

    it('shows clear button when there is text', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'some text' },
      });

      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('button').attributes('aria-label')).toBe(
        'Clear search'
      );
    });

    it('clears search when clear button is clicked', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'some text' },
      });

      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['']);
    });

    it('displays results count when enabled', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: 'search',
          resultsCount: 5,
          showResultsCount: true,
        },
      });

      const resultsDiv = wrapper.find('[class*="absolute top-full"]');
      expect(resultsDiv.exists()).toBe(true);
      expect(resultsDiv.text()).toContain('5 results found');
    });
  });

  describe('BlogCard', () => {
    const mockBlogEntry = {
      slug: 'test-blog-post',
      name: 'Test Blog Post',
      date: '2024-01-01',
      source: 'https://example.com/post',
      sourceDisplayName: 'Example Site',
      collab: false,
      video: false,
    };

    it('renders blog entry information correctly', () => {
      const wrapper = mount(BlogCard, {
        props: { entry: mockBlogEntry },
      });

      expect(wrapper.text()).toContain('Test Blog Post');
      expect(wrapper.text()).toContain('Formatted: 2024-01-01');
      expect(wrapper.text()).toContain('Example Site');
      expect(wrapper.find('a[href="/test-blog-post"]').exists()).toBe(true);
    });

    it('shows collaboration badge when collab is true', () => {
      const collabEntry = { ...mockBlogEntry, collab: true };
      const wrapper = mount(BlogCard, {
        props: { entry: collabEntry },
      });

      expect(wrapper.text()).toContain('Collaboration');
      expect(wrapper.find('[class*="bg-wheeler-coral-100"]').exists()).toBe(
        true
      );
    });

    it('shows video badge and "Watch Now" when video is true', () => {
      const videoEntry = { ...mockBlogEntry, video: true };
      const wrapper = mount(BlogCard, {
        props: { entry: videoEntry },
      });

      expect(wrapper.text()).toContain('Video');
      expect(wrapper.text()).toContain('Watch Now');
    });

    it('shows "Read More" for non-video entries', () => {
      const wrapper = mount(BlogCard, {
        props: { entry: mockBlogEntry },
      });

      expect(wrapper.text()).toContain('Read More');
      expect(wrapper.text()).not.toContain('Watch Now');
    });
  });

  describe('AppHeader', () => {
    const defaultProps = {
      totalPosts: 42,
      showMobileSearch: true,
      showDesktopSearch: true,
    };

    it('renders logo and branding correctly', () => {
      const wrapper = mount(AppHeader, {
        props: defaultProps,
        global: {
          components: { SearchBar, ThemeToggle },
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe('/wheeler-logo.jpg');
      expect(wrapper.find('img').attributes('alt')).toBe(
        'Wheeler Universe Logo'
      );
      expect(wrapper.text()).toContain('Wheeler Universe');
      expect(wrapper.text()).toContain('Blog Aggregator');
    });

    it('displays post count correctly', () => {
      const wrapper = mount(AppHeader, {
        props: { ...defaultProps, totalPosts: 42 },
        global: {
          components: { SearchBar, ThemeToggle },
        },
      });

      expect(wrapper.text()).toContain('42');
      expect(wrapper.text()).toContain('posts');
    });

    it('renders theme toggle component', () => {
      const wrapper = mount(AppHeader, {
        props: defaultProps,
        global: {
          components: { SearchBar, ThemeToggle },
        },
      });

      expect(wrapper.findComponent(ThemeToggle).exists()).toBe(true);
    });

    it('toggles mobile search bar when button is clicked', async () => {
      const wrapper = mount(AppHeader, {
        props: defaultProps,
        global: {
          components: { SearchBar, ThemeToggle },
        },
      });

      const mobileSearchButton = wrapper.find(
        'button[aria-label="Toggle search"]'
      );
      expect(wrapper.find('.md\\:hidden.pb-4').exists()).toBe(false);

      await mobileSearchButton.trigger('click');
      await nextTick();

      expect(wrapper.find('.md\\:hidden.pb-4').exists()).toBe(true);
    });

    it('has proper logo link attributes', () => {
      const wrapper = mount(AppHeader, {
        props: defaultProps,
        global: {
          components: { SearchBar, ThemeToggle },
        },
      });

      const logoLink = wrapper.find('a[href="https://wheeleruniverse.com"]');
      expect(logoLink.exists()).toBe(true);
      expect(logoLink.attributes('target')).toBe('_blank');
      expect(logoLink.attributes('rel')).toBe('noopener noreferrer');
    });
  });

  describe('AppFooter', () => {
    const defaultProps = {
      totalPosts: 42,
      collaborationCount: 8,
      sourceCount: 5,
      latestPostDate: '2024-01-15',
    };

    it('renders branding section correctly', () => {
      const wrapper = mount(AppFooter, {
        props: defaultProps,
      });

      expect(wrapper.find('img').attributes('src')).toBe('/wheeler-logo.jpg');
      expect(wrapper.find('img').attributes('alt')).toBe(
        'Wheeler Universe Logo'
      );
      expect(wrapper.text()).toContain('Wheeler Universe');
      expect(wrapper.text()).toContain('Aggregating technical insights');
    });

    it('displays blog stats correctly', () => {
      const wrapper = mount(AppFooter, {
        props: defaultProps,
      });

      expect(wrapper.text()).toContain('Blog Stats');
      expect(wrapper.text()).toContain('Total Posts:');
      expect(wrapper.text()).toContain('42');
      expect(wrapper.text()).toContain('Collaborations:');
      expect(wrapper.text()).toContain('8');
      expect(wrapper.text()).toContain('Sources:');
      expect(wrapper.text()).toContain('5');
      expect(wrapper.text()).toContain('Latest Post:');
      expect(wrapper.text()).toContain('2024-01-15');
    });

    it('renders social links with correct attributes', () => {
      const wrapper = mount(AppFooter, {
        props: defaultProps,
      });

      const githubLink = wrapper.find(
        'a[href="https://github.com/wheeleruniverse"]'
      );
      expect(githubLink.exists()).toBe(true);
      expect(githubLink.attributes('target')).toBe('_blank');
      expect(githubLink.attributes('rel')).toBe('noopener noreferrer');
      expect(githubLink.text()).toContain('GitHub');

      const linkedinLink = wrapper.find(
        'a[href="https://www.linkedin.com/in/wheeleruniverse/"]'
      );
      expect(linkedinLink.exists()).toBe(true);
      expect(linkedinLink.text()).toContain('LinkedIn');

      const devToLink = wrapper.find(
        'a[href="https://dev.to/wheeleruniverse"]'
      );
      expect(devToLink.exists()).toBe(true);
      expect(devToLink.text()).toContain('Dev.to');
    });

    it('displays current year dynamically', () => {
      const wrapper = mount(AppFooter, {
        props: defaultProps,
      });

      const currentYear = new Date().getFullYear();
      expect(wrapper.text()).toContain(`© ${currentYear} Wheeler Universe`);
    });

    it('calls scrollToTop when back to top button is clicked', async () => {
      const wrapper = mount(AppFooter, {
        props: defaultProps,
      });

      const buttons = wrapper
        .findAll('button')
        .filter(b => b.text().includes('Back to top'));
      expect(buttons.length).toBeGreaterThan(0);
      const backToTopBtn = buttons[0];

      await backToTopBtn.trigger('click');
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
});
