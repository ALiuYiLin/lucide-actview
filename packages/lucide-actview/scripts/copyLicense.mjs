import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const licenseSrc = path.resolve(packageDir, '../../LICENSE');
const licenseDest = path.join(packageDir, 'LICENSE');

copyFileSync(licenseSrc, licenseDest);
