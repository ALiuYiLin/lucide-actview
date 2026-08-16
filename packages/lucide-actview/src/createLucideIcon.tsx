import { defineComponent } from 'actview';
import { toPascalCase } from '@lucide/shared';
import Icon from './Icon';
import type { IconNode, LucideIcon, LucideProps } from './types';

/**
 * Create an ActView Lucide icon component.
 *
 * ActView's JSX transform only converts `.tsx` files. Keeping this factory in a
 * `.tsx` file makes the adapter consistent with regular ActView components:
 * props are spread into the core `Icon` renderer via JSX, and the resulting
 * component is still a precompiled `defineComponent` object so consumers do
 * not need `@actview/plugin-babel` to use the generated icons.
 */
const createLucideIcon = (
  iconName: string,
  iconNode: IconNode,
): LucideIcon => {
  const Component = defineComponent(
    (props: LucideProps) => () => (
      <Icon {...props} name={iconName} iconNode={iconNode} />
    ),
    toPascalCase(iconName),
  );

  return Component as unknown as LucideIcon;
};

export default createLucideIcon;
