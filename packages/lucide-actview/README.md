# @actview/lucide

Lucide icon library adapter for [ActView](https://github.com/ALiuYiLin/actview).

## Installation

```sh
pnpm add @actview/lucide actview @actview/jsx
pnpm add -D @actview/plugin-vite
```

```sh
npm install @actview/lucide actview @actview/jsx
npm install -D @actview/plugin-vite
```

Configure `jsxImportSource` and the Vite plugin in your ActView app:

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@actview/jsx"
  }
}
```

```ts
// vite.config.ts
import { actviewPlugin } from '@actview/plugin-vite';

export default {
  plugins: [actviewPlugin()],
};
```

## Usage

With `@actview/plugin-vite`, write components as regular functions; the plugin
automatically converts them to `defineComponent`:

```tsx
import { createApp } from 'actview';
import { Camera, LucideProvider } from '@actview/lucide';

function App() {
  return (
    <LucideProvider size={32} color="red">
      <Camera class="my-icon" aria-label="Camera" />
    </LucideProvider>
  );
}

createApp(App).mount('#app');
```

### Imports

```tsx
// Main entry
import { Camera, House } from '@actview/lucide';

// Namespace
import * as icons from '@actview/lucide/icons';

// Deep import
import Camera from '@actview/lucide/icons/camera';

// Custom icons
import { createLucideIcon } from '@actview/lucide';
import type { IconNode } from '@actview/lucide';
```

## Development

```sh
pnpm --filter @actview/lucide build   # generate icons, JS and type declarations
pnpm --filter @actview/lucide test    # generate icons and run tests
```

## Components and hooks

| Export | Description |
| --- | --- |
| `Icon` | Core renderer. Pass `iconNode` manually. |
| `createLucideIcon(name, iconNode)` | Create an icon component. |
| `LucideProvider` | Provide default `size`, `color`, `strokeWidth`, `absoluteStrokeWidth`, and `class`. |
| `useLucideContext()` | Read the injected computed context. Only callable during setup. |

## ActView-specific notes

- Every icon is already wrapped by `defineComponent`. Consumers do not need
  `@actview/plugin-babel` to use these icons.
- `ref` on an icon component points to the component instance, following
  ActView component semantics. ActView component refs are not forwarded to the
  underlying `svg` element; use DOM queries or a wrapper element if you need
  the SVG node itself.
- ActView writes SVG props with `setAttribute` using the exact prop key.
  This package translates common camelCase SVG props (`strokeWidth`,
  `strokeLinecap`, etc.) to their real SVG attribute names.
- `useLucideContext()` returns a computed ref because ActView component setups
  run once. Read `.value` inside the render function to stay reactive.
- ActView `provide/inject` does not currently propagate through
  `renderToString`; SSR output falls back to Lucide defaults.
- ActView's renderer maintains a fixed SVG tag list. SVG `title` children are
  not currently created in the SVG namespace; prefer `aria-label`,
  `aria-labelledby`, or a `desc` child for accessible SVG text.

## License

ISC
