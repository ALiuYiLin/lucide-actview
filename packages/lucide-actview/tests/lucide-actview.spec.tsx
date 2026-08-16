import { describe, expect, it } from 'vitest';
import { render } from '@actview/testing';
import { defineComponent } from 'actview';
import createLucideIcon from '../src/createLucideIcon';
import { coffee } from './testIconNodes';

const Coffee = createLucideIcon('coffee', coffee);

describe('createLucideIcon', () => {
  it('creates a defineComponent icon with a display name', () => {
    expect((Coffee as any).name).toBe('Coffee');
  });

  it('renders the iconNode with Lucide props', () => {
    const App = defineComponent(() => () => (
      <Coffee size={32} color="blue" class="custom-coffee" />
    ));
    const svg = render(App).container.querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('stroke', 'blue');
    expect(svg).toHaveAttribute(
      'class',
      'lucide lucide-icon lucide-coffee custom-coffee',
    );
    expect(svg.querySelectorAll('path, line')).toHaveLength(5);
  });

  it('passes children through to the SVG element', () => {
    const App = defineComponent(() => () => (
      <Coffee>
        <desc>Hot coffee</desc>
      </Coffee>
    ));
    const svg = render(App).container.querySelector('svg')!;

    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(svg.querySelector('desc')?.textContent).toBe('Hot coffee');
  });
});
