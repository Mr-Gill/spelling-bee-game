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
const indexHtmlPath = path.join(distDir, 'index.html');
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('dist/app.js', 'app.js');
fs.writeFileSync(indexHtmlPath, indexHtml);

fs.copyFileSync('style.css', path.join(distDir, 'style.css'));
fs.copyFileSync('manifest.webmanifest', path.join(distDir, 'manifest.webmanifest'));
fs.copyFileSync('service-worker.js', path.join(distDir, 'service-worker.js'));
fs.copyFileSync('words.json', path.join(distDir, 'words.json'));
fs.copyFileSync('leaderboard.json', path.join(distDir, 'leaderboard.json'));
fs.cpSync('icons', path.join(distDir, 'icons'), { recursive: true });
if (fs.existsSync('img')) {
  fs.cpSync('img', path.join(distDir, 'img'), { recursive: true });
}

// Copy wordlists directory
const copyDir = (src, dest) => {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

if (fs.existsSync('wordlists')) {
    copyDir('wordlists', path.join(distDir, 'wordlists'));
}

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
