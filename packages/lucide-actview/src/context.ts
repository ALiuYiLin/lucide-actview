import { computed, defineComponent, provide, useInjects } from 'actview';
import { createElement, Fragment } from '@actview/jsx';
import type { VNodeChild } from '@actview/jsx';

const LUCIDE_CONTEXT_KEY = '@actview/lucide:config';

export interface LucideConfig {
  size: number;
  color: string;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
  class: string;
}

/**
 * ActView does not have a generic Context object. Values are provided through
 * `provide(key, value)` and must be reactive to survive the setup-once
 * component model. The provider therefore injects a computed ref; consumers
 * read `.value` while rendering.
 */
export interface LucideContextValue {
  readonly value: LucideConfig;
  readonly __v_isRef: true;
}

export const DEFAULT_CONFIG: LucideConfig = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  class: '',
};

export interface LucideProviderProps {
  children?: VNodeChild;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

/**
 * Provide default Lucide icon props to all descendant icons.
 *
 * @example
 * ```tsx
 * <LucideProvider size={32} color="red">
 *   <Camera />
 * </LucideProvider>
 * ```
 */
export const LucideProvider = defineComponent(
  (props: LucideProviderProps) => {
    const context = computed<LucideConfig>(() => ({
      size: props.size ?? DEFAULT_CONFIG.size,
      color: props.color ?? DEFAULT_CONFIG.color,
      strokeWidth: props.strokeWidth ?? DEFAULT_CONFIG.strokeWidth,
      absoluteStrokeWidth:
        props.absoluteStrokeWidth ?? DEFAULT_CONFIG.absoluteStrokeWidth,
      class: props.class ?? DEFAULT_CONFIG.class,
    }));

    provide(LUCIDE_CONTEXT_KEY, context);

    return () => createElement(Fragment, { children: props.children });
  },
  'LucideProvider',
);

/**
 * Read the Lucide context inside a component setup. Returns the injected
 * computed ref, or `undefined` when no `LucideProvider` is present.
 * Read `.value` in the render function to keep reactivity.
 */
export function useLucideContext(): LucideContextValue | undefined {
  return useInjects(LUCIDE_CONTEXT_KEY) as LucideContextValue | undefined;
}
