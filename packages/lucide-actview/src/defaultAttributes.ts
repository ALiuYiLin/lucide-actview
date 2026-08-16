/**
 * ActView renderer calls `setAttribute` with the exact prop key for SVG
 * attributes. Unlike React/Solid, it does not convert camelCase SVG props to
 * kebab-case, so the default attributes must already use SVG attribute names.
 */
export default {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} satisfies Record<string, string | number>;
