import SearchBar from '@/components/SearchBar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock the useTheme composable
const mockToggleTheme = vi.fn();
const mockTheme = { value: { isDark: false } };

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('Simple Component Tests', () => {
  describe('ThemeToggle', () => {
    it('renders a button', () => {
      const wrapper = mount(ThemeToggle);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('calls toggleTheme when clicked', async () => {
      const wrapper = mount(ThemeToggle);
      await wrapper.find('button').trigger('click');
      expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('has accessibility attributes', () => {
      const wrapper = mount(ThemeToggle);
      const button = wrapper.find('button');
      expect(button.attributes('aria-label')).toBeTruthy();
      expect(button.attributes('title')).toBeTruthy();
    });
  });

  describe('SearchBar', () => {
    it('renders input field', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      });
      expect(wrapper.find('input').exists()).toBe(true);
    });

    it('emits update:modelValue when input changes', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      });

      await wrapper.find('input').setValue('test search');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
        'test search',
      ]);
    });

    it('displays default placeholder text', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      });

      expect(wrapper.find('input').attributes('placeholder')).toBe(
        'Search blog posts...'
      );
    });

    it('displays custom placeholder text', () => {
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

    it('shows clear button when there is text', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'some text' },
      });

      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('clears search when clear button is clicked', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'some text' },
      });

      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
    });
  });
});
