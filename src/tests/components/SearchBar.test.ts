import SearchBar from '@/components/SearchBar.vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('SearchBar', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders correctly with default props', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Search blog posts...'
    );
    expect(wrapper.find('input').attributes('aria-label')).toBe(
      'Search blog posts'
    );
  });

  it('renders with custom placeholder', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        placeholder: 'Custom placeholder',
      },
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Custom placeholder'
    );
  });

  it('displays current search value', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test search',
      },
    });

    expect(wrapper.find('input').element.value).toBe('test search');
  });

  it('emits update:modelValue when input changes', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('new search term');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([
      'new search term',
    ]);
  });

  it('shows clear button when there is search text', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search text',
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').attributes('aria-label')).toBe(
      'Clear search'
    );
  });

  it('hides clear button when search is empty', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('clears search when clear button is clicked', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search text',
      },
    });

    const clearButton = wrapper.find('button');
    await clearButton.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['']);
  });

  it('displays results count when showResultsCount is true', () => {
    wrapper = mount(SearchBar, {
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

  it('displays singular result text when results count is 1', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search',
        resultsCount: 1,
        showResultsCount: true,
      },
    });

    const resultsDiv = wrapper.find('[class*="absolute top-full"]');
    expect(resultsDiv.text()).toContain('1 result found');
    expect(resultsDiv.text()).not.toContain('results');
  });

  it('hides results count when showResultsCount is false', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search',
        resultsCount: 5,
        showResultsCount: false,
      },
    });

    const resultsDiv = wrapper.find('[class*="absolute top-full"]');
    expect(resultsDiv.exists()).toBe(false);
  });

  it('hides results count when search is empty', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        resultsCount: 5,
        showResultsCount: true,
      },
    });

    const resultsDiv = wrapper.find('[class*="absolute top-full"]');
    expect(resultsDiv.exists()).toBe(false);
  });

  it('updates aria-label with results count', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test',
        resultsCount: 3,
        showResultsCount: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('aria-label')).toBe(
      'Search blog posts. 3 results found for "test"'
    );
  });

  it('has proper CSS classes for styling', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('block');
    expect(input.classes()).toContain('w-full');
    expect(input.classes()).toContain('rounded-lg');
    expect(input.classes()).toContain('focus:ring-2');
  });

  it('handles focus states correctly', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');

    expect(input.classes()).toContain('focus:ring-wheeler-purple-500');
    expect(input.classes()).toContain('focus:border-wheeler-purple-500');
  });
});
