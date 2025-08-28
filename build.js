// build.js - bundles TS/TSX and copies static assets for GitHub Pages
// Run by CI: `npm run build`

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

async function copyFileIfExists(src, dest) {
  try {
    await fsp.copyFile(src, dest);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}

async function copyDirIfExists(srcDir, destDir) {
  try {
    const st = await fsp.stat(srcDir);
    if (!st.isDirectory()) return;
  } catch (e) {
    if (e.code === 'ENOENT') return;
    throw e;
  }
  await fsp.mkdir(destDir, { recursive: true });
  const entries = await fsp.readdir(srcDir, { withFileTypes: true });
  await Promise.all(entries.map(async (ent) => {
    const s = path.join(srcDir, ent.name);
    const d = path.join(destDir, ent.name);
    if (ent.isDirectory()) {
      await copyDirIfExists(s, d);
    } else {
      await fsp.copyFile(s, d);
    }
  }));
}

async function main() {
  const dist = path.join(__dirname, 'dist');

  // Clean & recreate dist
  await fsp.rm(dist, { recursive: true, force: true });
  await fsp.mkdir(dist, { recursive: true });

  // Bundle app (TypeScript/TSX -> dist/app.js)
  const esbuild = require('esbuild');
  await esbuild.build({
  entryPoints: ['spelling-bee-game.tsx'],
  outfile: path.join(dist, 'app.js'),
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['esnext'],
  assetNames: 'assets/[name]-[hash]',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.json': 'json',
    '.mp3': 'file',
    '.svg': 'file'
  },
  define: { 'process.env.NODE_ENV': '"production"' }
});

  // Copy top-level static files (only if present)
  const staticFiles = [
    'index.html',
    'style.css',
    'manifest.webmanifest',
    'service-worker.js',
    'leaderboard.json',
    'words.json'
  ];
  await Promise.all(staticFiles.map(async (f) => {
    await copyFileIfExists(path.join(__dirname, f), path.join(dist, f));
  }));

  // Copy asset folders if present
  const folders = ['audio', 'icons', 'img', 'avatars'];
  for (const folder of folders) {
    await copyDirIfExists(path.join(__dirname, folder), path.join(dist, folder));
  }

  console.log('Build complete → dist/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
