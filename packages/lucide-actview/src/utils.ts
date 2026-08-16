/**
 * ActView prop keys are passed verbatim to `setAttribute` for SVG elements.
 * Convert the common camelCase SVG prop names accepted by `@actview/jsx`
 * types into their real SVG attribute names.
 */
const SVG_ATTR_ALIASES: Record<string, string> = {
  className: 'class',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  textAnchor: 'text-anchor',
  xlinkHref: 'xlink:href',
};

/**
 * Return a new props object with camelCase SVG props translated to the
 * attribute names ActView's renderer expects. Unknown keys are preserved.
 */
export function normalizeSvgProps(
  props: Record<string, any>,
): Record<string, any> {
  const normalized: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key === 'key') continue;
    normalized[SVG_ATTR_ALIASES[key] ?? key] = value;
  }

  return normalized;
}
