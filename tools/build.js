/* eslint-disable */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const tsc = require.resolve('typescript/bin/tsc');

fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true });

for (const config of ['tsconfig.cjs.json', 'tsconfig.esm.json']) {
  console.log(`> tsc -p ${config}`);
  execFileSync(process.execPath, [tsc, '-p', config], { cwd: root, stdio: 'inherit' });
}

fs.writeFileSync(
  path.join(root, 'dist', 'cjs', 'package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2) + '\n'
);
fs.writeFileSync(
  path.join(root, 'dist', 'esm', 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2) + '\n'
);

console.log('Build finished: dist/cjs (CommonJS + types), dist/esm (ESM)');
