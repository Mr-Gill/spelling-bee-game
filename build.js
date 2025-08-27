const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Define the destination directory
const distDir = 'dist';

// 1. Clear the dist directory if it exists, then create it.
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy static files (HTML, styles, PWA assets) to dist
fs.copyFileSync('index.html', path.join(distDir, 'index.html'));
fs.copyFileSync('style.css', path.join(distDir, 'style.css'));
fs.copyFileSync('manifest.webmanifest', path.join(distDir, 'manifest.webmanifest'));
fs.copyFileSync('service-worker.js', path.join(distDir, 'service-worker.js'));
fs.copyFileSync('words.json', path.join(distDir, 'words.json'));
fs.cpSync('icons', path.join(distDir, 'icons'), { recursive: true });

// 3. Run esbuild to bundle the application
esbuild.build({
    entryPoints: ['spelling-bee-game.tsx'],
    bundle: true,
    outfile: 'dist/app.js', // Output to dist/app.js
    format: 'esm',        // Output as an ES Module
    jsx: 'automatic',     // Use automatic JSX runtime
}).catch((e) => {
    console.error(e);
    process.exit(1);
});
