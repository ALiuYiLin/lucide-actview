import { describe, expect, it } from 'vitest';
import { render } from '@actview/testing';
import { defineComponent, nextTick, reactive } from 'actview';
import createLucideIcon from '../src/createLucideIcon';
import { LucideProvider } from '../src/context';
import { house } from './testIconNodes';

const House = createLucideIcon('house', house);

describe('LucideProvider', () => {
  it('renders icons with default props when no provider is used', () => {
    const App = defineComponent(() => () => <House />);
    const svg = render(App).container.querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('provides size, color, strokeWidth and class to icons', () => {
    const App = defineComponent(() => () => (
      <LucideProvider size={48} color="red" strokeWidth={4} class="provider-class">
        <House class="icon-class" />
      </LucideProvider>
    ));
    const svg = render(App).container.querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
    expect(svg).toHaveAttribute('stroke', 'red');
    expect(svg).toHaveAttribute('stroke-width', '4');
    expect(svg).toHaveAttribute(
      'class',
      'lucide lucide-icon provider-class lucide-house icon-class',
    );
  });

  it('supports absoluteStrokeWidth from the provider', () => {
    const App = defineComponent(() => () => (
      <LucideProvider size={48} strokeWidth={2} absoluteStrokeWidth>
        <House />
      </LucideProvider>
    ));
    const svg = render(App).container.querySelector('svg')!;

    // 2 * 24 / 48 = 1
    expect(svg).toHaveAttribute('stroke-width', '1');
  });

  it('supports multiple children', () => {
    const App = defineComponent(() => () => (
      <LucideProvider size={32}>
        <House />
        <House />
      </LucideProvider>
    ));
    const container = render(App).container;

    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('lets icon props override provider props', () => {
    const App = defineComponent(() => () => (
      <LucideProvider size={48} color="red" strokeWidth={4}>
        <House size={24} color="blue" strokeWidth={2} />
      </LucideProvider>
    ));
    const svg = render(App).container.querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('stroke', 'blue');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('updates icons reactively when provider props change', async () => {
    const state = reactive({ size: 48 });
    const App = defineComponent(() => () => (
      <LucideProvider size={state.size}>
        <House />
      </LucideProvider>
    ));
    const svg = render(App).container.querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '48');

    state.size = 64;
    await nextTick();

    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });
});
