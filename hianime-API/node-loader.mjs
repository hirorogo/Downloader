import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const baseDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(baseDir, 'src');

function tryResolve(filePath) {
  for (const c of [filePath, filePath + '.js', filePath + '.mjs', path.join(filePath, 'index.js')]) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

export function resolve(specifier, context, nextResolve) {
  // @/ alias → ./src/
  if (specifier.startsWith('@/')) {
    const resolved = tryResolve(path.join(srcDir, specifier.slice(2)));
    if (resolved) return { url: pathToFileURL(resolved).href, shortCircuit: true };
  }

  // Relative imports missing extensions
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const parentDir = context.parentURL
      ? path.dirname(fileURLToPath(context.parentURL))
      : baseDir;
    const resolved = tryResolve(path.join(parentDir, specifier));
    if (resolved) return { url: pathToFileURL(resolved).href, shortCircuit: true };
  }

  return nextResolve(specifier, context);
}
