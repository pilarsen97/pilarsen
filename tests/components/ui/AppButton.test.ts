import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppButton from '@/components/ui/AppButton.vue';

describe('appButton', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.classes()).toContain('app-button');
    expect(wrapper.classes()).toContain('app-button--primary');
    expect(wrapper.classes()).toContain('app-button--md');
  });

  it('renders as anchor when href is provided', () => {
    const wrapper = mount(AppButton, {
      props: {
        href: 'https://example.com',
      },
      slots: {
        default: 'Link',
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
  });

  it('renders as button by default', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('applies variant classes correctly', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'secondary',
      },
    });

    expect(wrapper.classes()).toContain('app-button--secondary');
  });

  it('applies size classes correctly', () => {
    const wrapper = mount(AppButton, {
      props: {
        size: 'lg',
      },
    });

    expect(wrapper.classes()).toContain('app-button--lg');
  });

  it('shows loading state correctly', () => {
    const wrapper = mount(AppButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Loading',
      },
    });

    expect(wrapper.classes()).toContain('app-button--loading');
    expect(wrapper.find('.app-button__spinner').exists()).toBe(true);
  });

  it('handles disabled state correctly', () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('app-button--disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click me',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('renders icons correctly', () => {
    const wrapper = mount(AppButton, {
      props: {
        iconLeft: 'icon-left',
        iconRight: 'icon-right',
      },
      slots: {
        default: 'Button',
      },
    });

    const leftIcon = wrapper.find('.app-button__icon--left');
    const rightIcon = wrapper.find('.app-button__icon--right');

    expect(leftIcon.exists()).toBe(true);
    expect(leftIcon.classes()).toContain('icon-left');
    expect(rightIcon.exists()).toBe(true);
    expect(rightIcon.classes()).toContain('icon-right');
  });

  it('applies full width class when fullWidth is true', () => {
    const wrapper = mount(AppButton, {
      props: {
        fullWidth: true,
      },
    });

    expect(wrapper.classes()).toContain('app-button--full-width');
  });
});
