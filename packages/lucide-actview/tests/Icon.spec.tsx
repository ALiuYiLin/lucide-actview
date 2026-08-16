import { describe, expect, it } from 'vitest';
import { render } from '@actview/testing';
import { defineComponent } from 'actview';
import Icon from '../src/Icon';
import { airVent } from './testIconNodes';

const renderIcon = (icon: any) => render(icon).container;

describe('Icon', () => {
  it('renders default SVG attributes', () => {
    const App = defineComponent(() => () => <Icon iconNode={airVent} />);
    const container = renderIcon(App);
    const svg = container.querySelector('svg')!;

    expect(svg).toBeDefined();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('stroke-width', '2');
    expect(svg.querySelectorAll('path')).toHaveLength(4);
  });

  it('applies size, color, strokeWidth and absoluteStrokeWidth', () => {
    const App = defineComponent(() => () => (
      <Icon
        iconNode={airVent}
        size={48}
        color="red"
        strokeWidth={4}
        absoluteStrokeWidth
      />
    ));
    const svg = renderIcon(App).querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
    expect(svg).toHaveAttribute('stroke', 'red');
    // 4 * 24 / 48 = 2
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('normalizes camelCase SVG props to kebab-case attributes', () => {
    const App = defineComponent(() => () => (
      <Icon iconNode={airVent} strokeLinecap="butt" strokeLinejoin="bevel" />
    ));
    const svg = renderIcon(App).querySelector('svg')!;

    expect(svg).toHaveAttribute('stroke-linecap', 'butt');
    expect(svg).toHaveAttribute('stroke-linejoin', 'bevel');
  });

  it('merges classes', () => {
    const App = defineComponent(() => () => (
      <Icon iconNode={airVent} class="icon-class" />
    ));
    const svg = renderIcon(App).querySelector('svg')!;

    expect(svg).toHaveAttribute('class', 'lucide lucide-icon icon-class');
  });

  it('sets aria-hidden by default', () => {
    const App = defineComponent(() => () => <Icon iconNode={airVent} />);

    expect(renderIcon(App).querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('does not set aria-hidden when an aria prop is present', () => {
    const App = defineComponent(() => () => (
      <Icon iconNode={airVent} aria-label="Air conditioning" />
    ));

    expect(renderIcon(App).querySelector('svg')).not.toHaveAttribute(
      'aria-hidden',
    );
  });

  it('does not set aria-hidden when children are present', () => {
    const App = defineComponent(() => () => (
      <Icon iconNode={airVent}>
        <desc>Air conditioning</desc>
      </Icon>
    ));
    const svg = renderIcon(App).querySelector('svg')!;

    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(svg.querySelector('desc')?.textContent).toBe('Air conditioning');
  });

  it('does not override an explicit aria-hidden prop', () => {
    const App = defineComponent(() => () => (
      <Icon iconNode={airVent} aria-hidden={false} />
    ));

    expect(renderIcon(App).querySelector('svg')).not.toHaveAttribute(
      'aria-hidden',
    );
  });
});
