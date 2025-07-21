import AppHeader from '@/components/AppHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

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
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    expect(wrapper.find('img').attributes('src')).toBe('/wheeler-logo.jpg');
    expect(wrapper.find('img').attributes('alt')).toBe('Wheeler Universe Logo');
    expect(wrapper.text()).toContain('Wheeler Universe');
    expect(wrapper.text()).toContain('Blog Aggregator');
  });

  it('displays singular post count correctly', () => {
    const wrapper = mount(AppHeader, {
      props: { ...defaultProps, totalPosts: 1 },
      global: {
        components: { SearchBar, ThemeToggle },
      },
    });

    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('post');
    expect(wrapper.text()).not.toContain('posts');
  });

  it('displays plural post count correctly', () => {
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
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    expect(wrapper.findComponent(ThemeToggle).exists()).toBe(true);
  });

  it('shows desktop search when enabled', () => {
    const wrapper = mount(AppHeader, {
      props: { ...defaultProps, showDesktopSearch: true },
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const desktopSearch = wrapper.find('.hidden.md\\:block');
    expect(desktopSearch.exists()).toBe(true);
    expect(desktopSearch.findComponent(SearchBar).exists()).toBe(true);
  });

  it('hides desktop search when disabled', () => {
    const wrapper = mount(AppHeader, {
      props: { ...defaultProps, showDesktopSearch: false },
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const desktopSearch = wrapper.find('.hidden.md\\:block');
    expect(desktopSearch.exists()).toBe(false);
  });

  it('shows mobile search button when enabled', () => {
    const wrapper = mount(AppHeader, {
      props: { ...defaultProps, showMobileSearch: true },
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const mobileSearchButton = wrapper.find(
      'button[aria-label="Toggle search"]'
    );
    expect(mobileSearchButton.exists()).toBe(true);
    expect(mobileSearchButton.classes()).toContain('md:hidden');
  });

  it('hides mobile search button when disabled', () => {
    const wrapper = mount(AppHeader, {
      props: { ...defaultProps, showMobileSearch: false },
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const mobileSearchButton = wrapper.find(
      'button[aria-label="Toggle search"]'
    );
    expect(mobileSearchButton.exists()).toBe(false);
  });

  it('toggles mobile search bar when button is clicked', async () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const mobileSearchButton = wrapper.find(
      'button[aria-label="Toggle search"]'
    );
    expect(wrapper.find('.md\\:hidden .pb-4').exists()).toBe(false);

    await mobileSearchButton.trigger('click');
    await nextTick();

    expect(wrapper.find('.md\\:hidden.pb-4').exists()).toBe(true);
    expect(
      wrapper.find('.md\\:hidden.pb-4').findComponent(SearchBar).exists()
    ).toBe(true);
  });

  it('emits update:search when desktop search changes', async () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const desktopSearchBar = wrapper
      .find('.hidden.md\\:block')
      .findComponent(SearchBar);
    await desktopSearchBar.vm.$emit('update:modelValue', 'test search');

    expect(wrapper.emitted('update:search')).toBeTruthy();
    expect(wrapper.emitted('update:search')[0]).toEqual(['test search']);
  });

  it('emits update:search when mobile search changes', async () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    // Open mobile search first
    const mobileSearchButton = wrapper.find(
      'button[aria-label="Toggle search"]'
    );
    await mobileSearchButton.trigger('click');
    await nextTick();

    const mobileSearchBar = wrapper
      .find('.md\\:hidden.pb-4')
      .findComponent(SearchBar);
    await mobileSearchBar.vm.$emit('update:modelValue', 'mobile search');

    expect(wrapper.emitted('update:search')).toBeTruthy();
    expect(wrapper.emitted('update:search')[0]).toEqual(['mobile search']);
  });

  it('has proper logo link attributes', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const logoLink = wrapper.find('a[href="https://wheeleruniverse.com"]');
    expect(logoLink.exists()).toBe(true);
    expect(logoLink.attributes('target')).toBe('_blank');
    expect(logoLink.attributes('rel')).toBe('noopener noreferrer');
  });

  it('has proper accessibility attributes', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const mobileSearchButton = wrapper.find(
      'button[aria-label="Toggle search"]'
    );
    expect(mobileSearchButton.attributes('aria-label')).toBe('Toggle search');

    const searchBars = wrapper.findAllComponents(SearchBar);
    searchBars.forEach(searchBar => {
      expect(searchBar.props('placeholder')).toBe('Search blogs...');
      expect(searchBar.props('showResultsCount')).toBe(false);
    });
  });

  it('handles default props correctly', () => {
    const wrapper = mount(AppHeader, {
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    expect(wrapper.text()).toContain('0');
    expect(wrapper.text()).toContain('posts');
    expect(wrapper.find('button[aria-label="Toggle search"]').exists()).toBe(
      true
    );
    expect(wrapper.find('.hidden.md\\:block').exists()).toBe(true);
  });

  it('has proper responsive design classes', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const header = wrapper.find('header');
    expect(header.classes()).toContain('bg-white');
    expect(header.classes()).toContain('dark:bg-wheeler-purple-900');

    const container = wrapper.find('.max-w-7xl');
    expect(container.classes()).toContain('mx-auto');
    expect(container.classes()).toContain('px-4');
    expect(container.classes()).toContain('sm:px-6');
    expect(container.classes()).toContain('lg:px-8');

    const flexContainer = wrapper.find('.flex.items-center.justify-between');
    expect(flexContainer.classes()).toContain('h-16');

    const statsSection = wrapper.find('.hidden.sm\\:flex');
    expect(statsSection.exists()).toBe(true);
  });

  it('renders mobile search button with proper attributes', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const mobileButton = wrapper.find('button[aria-label="Toggle search"]');
    expect(mobileButton.exists()).toBe(true);
    expect(mobileButton.classes()).toContain('md:hidden');
  });

  it('applies correct hover and focus styles', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
      global: {
        components: {
          SearchBar,
          ThemeToggle,
        },
      },
    });

    const logoLink = wrapper.find('a[href="https://wheeleruniverse.com"]');
    expect(logoLink.classes()).toContain('hover:text-wheeler-purple-600');
    expect(logoLink.classes()).toContain('transition-colors');

    const mobileButton = wrapper.find('button[aria-label="Toggle search"]');
    expect(mobileButton.classes()).toContain('hover:bg-wheeler-gray-100');
    expect(mobileButton.classes()).toContain('focus:outline-none');
    expect(mobileButton.classes()).toContain('focus:ring-2');
  });
});
