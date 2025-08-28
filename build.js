// build.js — bundles TS/TSX and copies static assets for GitHub Pages

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

async function rmrf(p) {
  await fsp.rm(p, { recursive: true, force: true });
}

async function mkdirp(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function copyFileSafe(src, dest) {
  try {
    await mkdirp(path.dirname(dest));
    await fsp.copyFile(src, dest);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e; // ignore missing files
  }
}

async function copyDirSafe(srcDir, destDir) {
  try {
    const st = await fsp.stat(srcDir);
    if (!st.isDirectory()) return;
  } catch (e) {
    if (e.code === 'ENOENT') return; // folder doesn't exist → skip
    throw e;
  }

  await mkdirp(destDir);
  const entries = await fsp.readdir(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const s = path.join(srcDir, ent.name);
    const d = path.join(destDir, ent.name);
    if (ent.isDirectory()) {
      await copyDirSafe(s, d);
    } else {
      await fsp.copyFile(s, d);
    }
  }
}

async function main() {
  const root = __dirname;
  const dist = path.join(root, 'dist');

  // Clean & recreate dist
  await rmrf(dist);
  await mkdirp(dist);

  // ---- Build with esbuild ----
  const esbuild = require('esbuild');

  await esbuild.build({
  entryPoints: ['spelling-bee-game.tsx'],
  outfile: path.join(dist, 'app.js'),
  bundle: true,
  minify: true,
  target: ['esnext'],
  jsx: 'automatic',                // so you don’t need `import React ...`
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.json': 'json',
    '.svg': 'file',                // <— NEW
    '.mp3': 'file'                 // <— NEW
  },
  assetNames: 'assets/[name]-[hash]',
  define: { 'process.env.NODE_ENV': '"production"' },
  platform: 'browser',
  format: 'esm'
  });

  // ---- Copy static files if they exist ----
  const staticFiles = [
    'index.html',
    'style.css',
    'manifest.webmanifest',
    'service-worker.js',
    'leaderboard.json',
    'words.json'
  ];
  await Promise.all(
    staticFiles.map(f =>
      copyFileSafe(path.join(root, f), path.join(dist, f))
    )
  );

  // ---- Copy asset folders (covers any files not imported by esbuild) ----
  const folders = ['audio', 'icons', 'img', 'avatars'];
  for (const folder of folders) {
    await copyDirSafe(path.join(root, folder), path.join(dist, folder));
  }

  console.log('✅ Build complete → dist/');
}

main().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
