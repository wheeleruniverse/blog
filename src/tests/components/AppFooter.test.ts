import AppFooter from '@/components/AppFooter.vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('AppFooter', () => {
  let wrapper: VueWrapper<InstanceType<typeof AppFooter>>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  const defaultProps = {
    totalPosts: 42,
    collaborationCount: 8,
    sourceCount: 5,
    latestPostDate: '2024-01-15',
  };

  it('renders branding section correctly', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    expect(wrapper.find('img').attributes('src')).toBe('/wheeler-logo.jpg');
    expect(wrapper.find('img').attributes('alt')).toBe('Wheeler Universe Logo');
    expect(wrapper.text()).toContain('Wheeler Universe');
    expect(wrapper.text()).toContain(
      'Aggregating technical insights and experiences from across the web'
    );
    expect(wrapper.text()).toContain(
      'cloud computing, software development, and technology leadership'
    );
  });

  it('displays blog stats correctly', () => {
    wrapper = mount(AppFooter, {
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

  it('handles default props correctly', () => {
    wrapper = mount(AppFooter);

    expect(wrapper.text()).toContain('0'); // totalPosts default
    expect(wrapper.text()).toContain('N/A'); // latestPostDate default
  });

  it('renders social links with correct attributes', () => {
    wrapper = mount(AppFooter, {
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
    expect(linkedinLink.attributes('target')).toBe('_blank');
    expect(linkedinLink.attributes('rel')).toBe('noopener noreferrer');
    expect(linkedinLink.text()).toContain('LinkedIn');

    const devToLink = wrapper.find('a[href="https://dev.to/wheeleruniverse"]');
    expect(devToLink.exists()).toBe(true);
    expect(devToLink.attributes('target')).toBe('_blank');
    expect(devToLink.attributes('rel')).toBe('noopener noreferrer');
    expect(devToLink.text()).toContain('Dev.to');
  });

  it('displays current year dynamically', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(`© ${currentYear} Wheeler Universe`);
  });

  it('displays last updated date', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('Last updated:');
    // The date format will vary based on locale, but should contain current month/year
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    expect(wrapper.text()).toContain(currentDate);
  });

  it('calls scrollToTop when back to top button is clicked', async () => {
    wrapper = mount(AppFooter, {
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

  it('has proper responsive grid layout', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const gridContainer = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-3');
    expect(gridContainer.exists()).toBe(true);
    expect(gridContainer.classes()).toContain('gap-8');

    const footerContainer = wrapper.find('.max-w-7xl');
    expect(footerContainer.classes()).toContain('mx-auto');
    expect(footerContainer.classes()).toContain('px-4');
    expect(footerContainer.classes()).toContain('sm:px-6');
    expect(footerContainer.classes()).toContain('lg:px-8');
  });

  it('has proper styling classes', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const footer = wrapper.find('footer');
    expect(footer.classes()).toContain('bg-white');
    expect(footer.classes()).toContain('dark:bg-wheeler-gray-900');
    expect(footer.classes()).toContain('border-t');
    expect(footer.classes()).toContain('border-wheeler-gray-200');
    expect(footer.classes()).toContain('dark:border-wheeler-gray-700');
  });

  it('displays technology stack information', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('Built with Vue 3 & TypeScript');
  });

  it('has proper hover states for interactive elements', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const socialLinks = wrapper.findAll('a[target="_blank"]');
    socialLinks.forEach(link => {
      expect(link.classes()).toContain('hover:text-wheeler-purple-600');
      expect(link.classes()).toContain('transition-colors');
    });

    const buttons = wrapper
      .findAll('button')
      .filter(b => b.text().includes('Back to top'));
    if (buttons.length > 0) {
      expect(buttons[0].classes()).toContain('hover:text-wheeler-purple-600');
      expect(buttons[0].classes()).toContain('transition-colors');
    }
  });

  it('contains correct SVG icons for social links', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const githubLink = wrapper.find(
      'a[href="https://github.com/wheeleruniverse"]'
    );
    expect(githubLink.find('svg').exists()).toBe(true);
    expect(githubLink.find('svg').attributes('viewBox')).toBe('0 0 24 24');

    const linkedinLink = wrapper.find(
      'a[href="https://www.linkedin.com/in/wheeleruniverse/"]'
    );
    expect(linkedinLink.find('svg').exists()).toBe(true);
    expect(linkedinLink.find('svg').attributes('viewBox')).toBe('0 0 24 24');

    const devToLink = wrapper.find('a[href="https://dev.to/wheeleruniverse"]');
    expect(devToLink.find('svg').exists()).toBe(true);
    expect(devToLink.find('svg').attributes('viewBox')).toBe('0 0 24 24');
  });

  it('has proper section headings', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain('Blog Stats');
    expect(wrapper.text()).toContain('Connect');

    const headings = wrapper.findAll('h4');
    headings.forEach(heading => {
      expect(heading.classes()).toContain('text-sm');
      expect(heading.classes()).toContain('font-semibold');
      expect(heading.classes()).toContain('uppercase');
      expect(heading.classes()).toContain('tracking-wide');
    });
  });

  it('has proper bottom border separator', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const bottomSection = wrapper.find('.mt-8.pt-6.border-t');
    expect(bottomSection.exists()).toBe(true);
    expect(bottomSection.classes()).toContain('border-wheeler-gray-200');
    expect(bottomSection.classes()).toContain('dark:border-wheeler-gray-700');
  });

  it('displays copyright and tech stack in responsive layout', () => {
    wrapper = mount(AppFooter, {
      props: defaultProps,
    });

    const bottomBar = wrapper.find('.flex.flex-col.sm\\:flex-row');
    expect(bottomBar.exists()).toBe(true);
    expect(bottomBar.classes()).toContain('items-center');
    expect(bottomBar.classes()).toContain('justify-between');
    expect(bottomBar.classes()).toContain('space-y-2');
    expect(bottomBar.classes()).toContain('sm:space-y-0');
  });
});
