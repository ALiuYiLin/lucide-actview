import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' with { type: 'json' };

const external = ['actview', /^@actview\/jsx(\/.*)?$/];

export default [
  {
    input: 'src/lucide-actview.ts',
      plugins: plugins({
        pkg,
        esbuildOptions: {
          jsx: 'automatic',
          jsxImportSource: '@actview/jsx',
        },
      }),
    external,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
  },
];
