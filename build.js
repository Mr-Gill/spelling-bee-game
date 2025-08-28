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
    entryPoints: [path.join(root, 'spelling-bee-game.tsx')],
    outfile: path.join(dist, 'app.js'),
    bundle: true,
    minify: true,
    sourcemap: false,
    // 'import.meta' warning goes away on a modern target:
    target: ['esnext'],
    // Make esbuild emit referenced assets and rewrite imports:
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.json': 'json',
      '.mp3': 'file',
      '.svg': 'file'
    },
    // Assets emitted under dist/assets/<name>-<hash>.<ext>
    assetNames: 'assets/[name]-[hash]',
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'info'
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
