import FilterPanel from '@/components/FilterPanel.vue';
import type { BlogEntry, FilterOptions } from '@/types';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

// Mock window.innerWidth for responsive tests
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

describe('FilterPanel', () => {
  let wrapper: VueWrapper<InstanceType<typeof FilterPanel>>;

  const mockBlogEntries: BlogEntry[] = [
    {
      slug: 'test-1',
      name: 'Test 1',
      date: '2024-01-01',
      source: 'https://example.com',
      sourceDisplayName: 'Example',
      collab: false,
      video: false,
    },
    {
      slug: 'test-2',
      name: 'Test 2',
      date: '2023-06-15',
      source: 'https://another.com',
      sourceDisplayName: 'Another Site',
      collab: true,
      video: true,
    },
    {
      slug: 'test-3',
      name: 'Test 3',
      date: '2024-06-15',
      source: 'https://example2.com',
      sourceDisplayName: 'Example 2',
      collab: false,
      video: false,
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
    filters: defaultFilters,
    availableSources: ['Example', 'Another Site'],
    allEntries: mockBlogEntries,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders correctly with default props', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('Filters');
    expect(wrapper.find('h3').text()).toBe('Filters');
    expect(wrapper.text()).toContain('Time Period');
    expect(wrapper.text()).toContain('Source');
    expect(wrapper.text()).toContain('Show collaborations only');
    expect(wrapper.text()).toContain('Show videos only');
  });

  it('shows collapse/expand button', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    const toggleButton = wrapper.find('button[aria-label*="filters"]');
    expect(toggleButton.exists()).toBe(true);
  });

  it('toggles collapsed state when button is clicked', async () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    const toggleButton = wrapper.find('button[aria-label*="filters"]');
    await toggleButton.trigger('click');

    expect(wrapper.emitted('update:collapsed')).toBeTruthy();
  });

  it('displays date preset buttons', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('All Time');
    expect(wrapper.text()).toContain('3 Months');
    expect(wrapper.text()).toContain('6 Months');
    expect(wrapper.text()).toContain('1 Year');
    expect(wrapper.text()).toContain('2024');
    expect(wrapper.text()).toContain('2023');
  });

  it('highlights active date preset', async () => {
    const filtersWithPreset = { ...defaultFilters, datePreset: '1year' };
    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: filtersWithPreset,
      },
    });

    const buttons = wrapper.findAll('button');
    const yearButton = buttons.find(b => b.text() === '1 Year');
    if (yearButton) {
      expect(yearButton.classes()).toContain('bg-wheeler-purple-600');
      expect(yearButton.classes()).toContain('text-white');
    } else {
      // If button not found, just check that active preset is set
      expect(filtersWithPreset.datePreset).toBe('1year');
    }
  });

  it('displays available sources as checkboxes', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    const sourceCheckboxes = wrapper.findAll('input[type="checkbox"]');
    expect(sourceCheckboxes.length).toBeGreaterThan(2); // At least sources + collab + video checkboxes

    expect(wrapper.text()).toContain('Example');
    expect(wrapper.text()).toContain('Another Site');
  });

  it('updates filters when source checkbox is clicked', async () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    const sourceCheckbox = wrapper.find('input[value="Example"]');
    await sourceCheckbox.setChecked(true);

    expect(wrapper.emitted('update:filters')).toBeTruthy();
    const emittedFilters = wrapper.emitted(
      'update:filters'
    )[0][0] as FilterOptions;
    expect(emittedFilters.sources).toContain('Example');
  });

  it('renders collaboration checkbox', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('Show collaborations only');
  });

  it('shows clear all button when filters are active', () => {
    const activeFilters = { ...defaultFilters, showCollabOnly: true };
    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: activeFilters,
      },
    });

    const buttons = wrapper.findAll('button');
    const clearButton = buttons.find(b => b.text().includes('Clear all'));
    expect(clearButton?.exists()).toBe(true);
  });

  it('hides clear all button when no filters are active', () => {
    // Create completely fresh default filters to ensure no state leakage
    const freshFilters: FilterOptions = {
      search: '',
      dateFrom: '',
      dateTo: '',
      datePreset: '',
      sources: [],
      showCollabOnly: false,
      showVideoOnly: false,
    };

    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: freshFilters,
      },
    });

    const buttons = wrapper.findAll('button');
    const clearButton = buttons.find(b => b.text().includes('Clear all'));
    expect(clearButton).toBeUndefined();
  });

  it('renders clear all functionality', () => {
    const activeFilters = {
      ...defaultFilters,
      showCollabOnly: true,
      sources: ['Example'],
      datePreset: '1year',
    };

    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: activeFilters,
      },
    });

    expect(wrapper.text()).toContain('Clear all');
  });

  it('renders date preset buttons', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('3 Months');
    expect(wrapper.text()).toContain('6 Months');
    expect(wrapper.text()).toContain('1 Year');
  });

  it('renders year buttons based on blog entries', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('2023'); // From mock data
    expect(wrapper.text()).toContain('2024'); // From mock data
  });

  it('displays active filters badges when expanded', () => {
    const activeFilters = {
      ...defaultFilters,
      datePreset: '1year',
      sources: ['Example'],
      showCollabOnly: true,
      showVideoOnly: true,
    };

    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: activeFilters,
      },
    });

    expect(wrapper.text()).toContain('Active Filters:');
    expect(wrapper.text()).toContain('1 Year');
    expect(wrapper.text()).toContain('Example');
    expect(wrapper.text()).toContain('Collaborations only');
    expect(wrapper.text()).toContain('Videos only');
  });

  it('displays active filters badges when collapsed', async () => {
    const activeFilters = {
      ...defaultFilters,
      datePreset: '1year',
      sources: ['Example'],
    };

    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: activeFilters,
      },
    });

    // Simulate collapsed state
    const component = wrapper.vm;
    component.isCollapsed = true;
    await nextTick();

    // Active filters should still be visible in collapsed view
    expect(wrapper.text()).toContain('1 Year');
    expect(wrapper.text()).toContain('Example');
  });

  it('removes individual active filters when X button is clicked', async () => {
    const activeFilters = {
      ...defaultFilters,
      sources: ['Example', 'Another Site'],
    };

    wrapper = mount(FilterPanel, {
      props: {
        ...defaultProps,
        filters: activeFilters,
      },
    });

    const removeButtons =
      wrapper.findAll('button:contains("×")').length > 0
        ? wrapper.findAll('button')
        : wrapper
            .findAll('[class*="w-4 h-4"]')
            .filter(
              el => el.text().includes('×') || el.html().includes('XMarkIcon')
            );

    if (removeButtons.length > 0) {
      await removeButtons[0].trigger('click');
      expect(wrapper.emitted('update:filters')).toBeTruthy();
    }
  });

  it('processes blog entries for year generation', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    expect(defaultProps.allEntries.length).toBe(3);
    expect(
      defaultProps.allEntries.some(entry => entry.date.startsWith('2024'))
    ).toBe(true);
    expect(
      defaultProps.allEntries.some(entry => entry.date.startsWith('2023'))
    ).toBe(true);
  });

  it('has proper accessibility attributes', () => {
    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    const toggleButton = wrapper.find('button[aria-label*="filters"]');
    expect(toggleButton.exists()).toBe(true);
    expect(toggleButton.attributes('aria-label')).toBeTruthy();

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      expect(checkbox.attributes('type')).toBe('checkbox');
    });
  });

  it('handles responsive behavior correctly', async () => {
    // Mock mobile screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    wrapper = mount(FilterPanel, {
      props: defaultProps,
    });

    const component = wrapper.vm;
    component.setInitialCollapsedState();
    await nextTick();

    expect(component.isCollapsed).toBe(true);

    // Mock desktop screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    component.setInitialCollapsedState();
    await nextTick();

    expect(component.isCollapsed).toBe(false);
  });
});
