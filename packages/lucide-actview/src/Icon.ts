import { createElement } from '@actview/jsx';
import { defineComponent } from 'actview';
import {
  hasA11yProp,
  mergeClasses,
  toKebabCase,
  toPascalCase,
} from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { DEFAULT_CONFIG, useLucideContext } from './context';
import type { IconNode, LucideProps } from './types';
import { normalizeSvgProps } from './utils';
import type { VNodeChild } from '@actview/jsx';

export interface IconProps extends LucideProps {
  iconNode: IconNode;
  /** Internal icon name used for `lucide-{name}` classes. */
  name?: string;
}

function toChildArray(children: VNodeChild | undefined): any[] {
  if (children == null || typeof children === 'boolean') return [];
  return Array.isArray(children) ? children.flat(Infinity) : [children];
}

/**
 * Core Lucide SVG renderer. Accepts an `iconNode` plus all regular Lucide
 * props and renders the final `svg` element with ActView VNodes.
 */
const Icon = defineComponent(
  (props: IconProps) => {
    const contextRef = useLucideContext();

    return () => {
      const {
        color,
        size,
        strokeWidth,
        absoluteStrokeWidth,
        children,
        iconNode,
        name,
        class: className,
        className: classNameAlias,
        ...rest
      } = props;

      const context = contextRef?.value ?? DEFAULT_CONFIG;
      const iconSize = size ?? context.size;
      const calculatedStrokeWidth =
        (absoluteStrokeWidth ?? context.absoluteStrokeWidth) === true
          ? (Number(strokeWidth ?? context.strokeWidth) * 24) /
            Number(iconSize)
          : Number(strokeWidth ?? context.strokeWidth);

      const nameClasses = name
        ? [
            `lucide-${toKebabCase(toPascalCase(name))}`,
            `lucide-${toKebabCase(name)}`,
          ]
        : [];

      const classes = mergeClasses(
        'lucide',
        'lucide-icon',
        context.class,
        ...nameClasses,
        className,
        classNameAlias,
      );

      const childNodes = [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...toChildArray(children),
      ];

      return createElement(
        'svg',
        {
          ...defaultAttributes,
          width: iconSize,
          height: iconSize,
          stroke: color ?? context.color,
          'stroke-width': calculatedStrokeWidth,
          class: classes,
          'aria-hidden':
            children || hasA11yProp(rest) ? undefined : 'true',
          ...normalizeSvgProps(rest),
        },
        childNodes,
      );
    };
  },
  'LucideIcon',
);

export default Icon;
