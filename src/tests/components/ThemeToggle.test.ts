import ThemeToggle from '@/components/ThemeToggle.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

// Mock the useTheme composable
const mockToggleTheme = vi.fn();
const mockTheme = {
  value: { isDark: false },
};

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme.value.isDark = false;
  });

  it('renders correctly in light mode', () => {
    const wrapper = mount(ThemeToggle);

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').attributes('aria-label')).toBe(
      'Switch to dark mode'
    );
    expect(wrapper.find('button').attributes('title')).toBe(
      'Switch to dark mode'
    );
  });

  it('renders correctly in dark mode', async () => {
    mockTheme.value.isDark = true;
    const wrapper = mount(ThemeToggle);

    await nextTick();

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').attributes('aria-label')).toBe(
      'Switch to light mode'
    );
    expect(wrapper.find('button').attributes('title')).toBe(
      'Switch to light mode'
    );
  });

  it('calls toggleTheme when button is clicked', async () => {
    const wrapper = mount(ThemeToggle);

    await wrapper.find('button').trigger('click');

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    const wrapper = mount(ThemeToggle);
    const button = wrapper.find('button');

    expect(button.attributes('aria-label')).toBeTruthy();
    expect(button.attributes('title')).toBeTruthy();
    expect(button.classes()).toContain('focus:outline-none');
    expect(button.classes()).toContain('focus:ring-2');
  });

  it('has proper styling classes', () => {
    const wrapper = mount(ThemeToggle);
    const button = wrapper.find('button');

    expect(button.classes()).toContain('relative');
    expect(button.classes()).toContain('inline-flex');
    expect(button.classes()).toContain('items-center');
    expect(button.classes()).toContain('justify-center');
    expect(button.classes()).toContain('rounded-md');
    expect(button.classes()).toContain('transition-colors');
  });
});
