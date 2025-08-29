const fs = require('fs');

// Function to copy a directory recursively
const copyDir = (src, dest) => {
  try {
    fs.cpSync(src, dest, { recursive: true });
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err);
  }
};

// Ensure dist directory exists
fs.mkdirSync('dist', { recursive: true });

// Copy individual files
['index.html', 'style.css', 'manifest.webmanifest', 'service-worker.js', 'leaderboard.json', 'words.json'].forEach(file => {
  try {
    fs.copyFileSync(file, `dist/${file}`);
  } catch (err) {
    console.error(`Error copying ${file}:`, err);
  }
});

// Copy directories
['audio', 'icons', 'img', 'avatars'].forEach(dir => {
  copyDir(dir, `dist/${dir}`);
});
