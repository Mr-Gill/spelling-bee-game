const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Function to copy files/directories
const copyAssets = (src, dest) => {
  try {
    if (fs.lstatSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(item => {
        copyAssets(path.join(src, item), path.join(dest, item));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err.message);
  }
};

console.log('Copying assets...');

// Copy static assets
['index.html', 'style.css', 'tailwind.css', 'manifest.webmanifest', 'service-worker.js', 'leaderboard.json', 'words.json'].forEach(file => {
  if (fs.existsSync(file)) {
    copyAssets(file, path.join('dist', file));
  } else {
    console.warn(`Warning: ${file} not found, skipping...`);
  }
});

// Copy directories
['audio', 'icons', 'img', 'wordlists'].forEach(dir => {
  if (fs.existsSync(dir)) {
    copyAssets(dir, path.join('dist', dir));
  } else {
    console.warn(`Warning: ${dir} directory not found, skipping...`);
  }
});

console.log('Asset copying completed!');
