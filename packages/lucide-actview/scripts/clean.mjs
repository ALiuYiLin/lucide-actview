import { existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

for (const target of ['dist', 'stats', 'src/createLucideIcon.ts']) {
  rmSync(path.join(packageDir, target), { recursive: true, force: true });
}

const iconsDir = path.join(packageDir, 'src/icons');
if (existsSync(iconsDir)) {
  for (const file of readdirSync(iconsDir)) {
    if (file.endsWith('.ts')) {
      rmSync(path.join(iconsDir, file), { force: true });
    }
  }
}
