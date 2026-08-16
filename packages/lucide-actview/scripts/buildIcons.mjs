import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = [
  '--output=./src',
  '--templateSrc=./scripts/exportTemplate.mts',
  '--withAliases',
  '--separateAliasesFile',
  '--separateAliasesFileIgnore=fingerprint',
  '--aliasesFileExtension=.ts',
  '--iconFileExtension=.ts',
  '--exportFileName=index.ts',
];

const result = spawnSync('build-icons', args, {
  cwd: packageDir,
  stdio: 'inherit',
  shell: true,
});

if (result.error) {
  console.error('[lucide-actview] Failed to start build-icons:', result.error);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const iconIndex = path.join(packageDir, 'src/icons/index.ts');
const aliasesFile = path.join(packageDir, 'src/aliases/aliases.ts');

if (!existsSync(iconIndex) || !existsSync(aliasesFile)) {
  console.error(
    '[lucide-actview] build-icons exited successfully but generated files are missing.',
  );
  console.error(`Expected: ${iconIndex}`);
  console.error(`Expected: ${aliasesFile}`);
  process.exit(1);
}

  // The ActView adapter factory is authored in `createLucideIcon.tsx`. Remove
  // the legacy `.ts` entry point after successful icon generation so that
  // extensionless imports in Vitest, Rollup and tsc all resolve to the TSX
  // module consistently.
  rmSync(path.join(packageDir, 'src', 'createLucideIcon.ts'), { force: true });
