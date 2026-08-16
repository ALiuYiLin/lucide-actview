import type {
  ComponentType,
  SVGAttributes as ActViewSVGAttributes,
  VNodeChild,
} from '@actview/jsx';

/**
 * The subset of SVG elements that Lucide icon nodes use for icon children.
 * Kept intentionally small, matching the icon source format.
 */
type SVGElementType =
  | 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect';

export type IconNode = [
  elementName: SVGElementType,
  attrs: Record<string, string>,
][];

export interface LucideProps extends ActViewSVGAttributes {
  /** Preferred ActView class prop. */
  class?: string;
  /** React-style class alias, normalized to `class`. */
  className?: string;
  style?: string | Record<string, string | number>;
  title?: string;
  key?: string | number | null;
  ref?: any;
  children?: VNodeChild;
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ComponentType<LucideProps>;
