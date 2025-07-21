import BlogCard from '@/components/BlogCard.vue';
import BlogList from '@/components/BlogList.vue';
import type { BlogEntry, FilterOptions } from '@/types';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('BlogList', () => {
  const mockEntries: BlogEntry[] = [
    {
      slug: 'test-blog-1',
      name: 'Test Blog 1',
      date: '2024-01-01',
      source: 'https://example.com/1',
      sourceDisplayName: 'Example Site',
      collab: false,
      video: false,
    },
    {
      slug: 'test-blog-2',
      name: 'Test Blog 2',
      date: '2024-01-02',
      source: 'https://example.com/2',
      sourceDisplayName: 'Example Site',
      collab: true,
      video: true,
    },
  ];

  const defaultFilters: FilterOptions = {
    search: '',
    dateFrom: '',
    dateTo: '',
    datePreset: '',
    sources: [],
    showCollabOnly: false,
    showVideoOnly: false,
  };

  const defaultProps = {
    entries: mockEntries,
    totalEntries: 10,
    filters: defaultFilters,
    loading: false,
  };

  it('renders blog entries correctly', () => {
    const wrapper = mount(BlogList, {
      props: defaultProps,
      global: {
        components: {
          BlogCard,
        },
      },
    });

    expect(wrapper.text()).toContain('Showing 2 of 10 blog posts');
    expect(wrapper.findAllComponents(BlogCard)).toHaveLength(2);
  });

  it('displays loading state correctly', () => {
    const wrapper = mount(BlogList, {
      props: {
        ...defaultProps,
        entries: [],
        loading: true,
      },
    });

    expect(wrapper.findAll('.animate-pulse')).toHaveLength(3);
    expect(wrapper.find('.bg-wheeler-gray-200').exists()).toBe(true);
  });

  it('shows empty state when no entries match filters', () => {
    const wrapper = mount(BlogList, {
      props: {
        ...defaultProps,
        entries: [],
        loading: false,
      },
    });

    expect(wrapper.text()).toContain('No posts found');
    expect(wrapper.text()).toContain(
      'Try adjusting your filters or search terms'
    );
    expect(wrapper.find('button').text()).toBe('Clear Filters');
  });

  it('shows filters active indicator when filters are applied', () => {
    const filtersWithSearch: FilterOptions = {
      ...defaultFilters,
      search: 'test search',
    };

    const wrapper = mount(BlogList, {
      props: {
        ...defaultProps,
        filters: filtersWithSearch,
      },
    });

    expect(wrapper.text()).toContain('Filters active');
    expect(wrapper.find('button[class*="underline"]').exists()).toBe(true);
  });

  it('hides filters indicator when no filters are active', () => {
    const wrapper = mount(BlogList, {
      props: defaultProps,
    });

    expect(wrapper.text()).not.toContain('Filters active');
    expect(wrapper.find('button[class*="underline"]').exists()).toBe(false);
  });

  it('emits clear-filters event when clear button is clicked in summary', async () => {
    const filtersWithSearch: FilterOptions = {
      ...defaultFilters,
      search: 'test search',
    };

    const wrapper = mount(BlogList, {
      props: {
        ...defaultProps,
        filters: filtersWithSearch,
      },
    });

    const clearButton = wrapper.find('button[class*="underline"]');
    await clearButton.trigger('click');

    expect(wrapper.emitted('clear-filters')).toBeTruthy();
    expect(wrapper.emitted('clear-filters')).toHaveLength(1);
  });

  it('emits clear-filters event when clear button is clicked in empty state', async () => {
    const wrapper = mount(BlogList, {
      props: {
        ...defaultProps,
        entries: [],
        loading: false,
      },
    });

    const clearButton = wrapper.find('button');
    await clearButton.trigger('click');

    expect(wrapper.emitted('clear-filters')).toBeTruthy();
    expect(wrapper.emitted('clear-filters')).toHaveLength(1);
  });

  it('detects active filters correctly for different filter types', () => {
    // Test dateFrom filter
    const wrapper1 = mount(BlogList, {
      props: {
        ...defaultProps,
        filters: { ...defaultFilters, dateFrom: '2024-01-01' },
      },
    });
    expect(wrapper1.text()).toContain('Filters active');

    // Test showCollabOnly filter
    const wrapper2 = mount(BlogList, {
      props: {
        ...defaultProps,
        filters: { ...defaultFilters, showCollabOnly: true },
      },
    });
    expect(wrapper2.text()).toContain('Filters active');

    // Test no active filters
    const wrapper3 = mount(BlogList, {
      props: {
        ...defaultProps,
        filters: defaultFilters,
      },
    });
    expect(wrapper3.text()).not.toContain('Filters active');
  });

  it('renders blog cards with proper animation classes', () => {
    const wrapper = mount(BlogList, {
      props: defaultProps,
      global: {
        components: {
          BlogCard,
        },
      },
    });

    const blogCards = wrapper.findAllComponents(BlogCard);
    blogCards.forEach(card => {
      expect(card.classes()).toContain('animate-fade-in');
    });
  });

  it('has proper CSS classes for responsive grid layout', () => {
    const wrapper = mount(BlogList, {
      props: defaultProps,
    });

    const gridContainer = wrapper.find('.grid');
    expect(gridContainer.classes()).toContain('gap-6');
    expect(gridContainer.classes()).toContain('md:gap-8');
  });

  it('displays correct results count with proper pluralization', () => {
    const wrapper1 = mount(BlogList, {
      props: {
        ...defaultProps,
        entries: [mockEntries[0]], // Only one entry
        totalEntries: 5,
      },
    });

    expect(wrapper1.text()).toContain('Showing 1 of 5 blog posts');

    const wrapper2 = mount(BlogList, {
      props: {
        ...defaultProps,
        entries: mockEntries,
        totalEntries: 10,
      },
    });

    expect(wrapper2.text()).toContain('Showing 2 of 10 blog posts');
  });

  it('passes correct props to BlogCard components', () => {
    const wrapper = mount(BlogList, {
      props: defaultProps,
      global: {
        components: {
          BlogCard,
        },
      },
    });

    const blogCards = wrapper.findAllComponents(BlogCard);

    expect(blogCards[0].props('entry')).toEqual(mockEntries[0]);
    expect(blogCards[1].props('entry')).toEqual(mockEntries[1]);
  });
});
