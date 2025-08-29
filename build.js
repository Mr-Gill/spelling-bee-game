const fs = require('fs');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Run esbuild
console.log('Building application...');
execSync(`npx esbuild spelling-bee-game.tsx --bundle --outfile=dist/app.js --jsx=automatic --target=es2020 --format=esm --loader:.mp3=file --loader:.svg=file --loader:.png=file --loader:.jpg=file --loader:.jpeg=file`, { stdio: 'inherit' });

// Function to copy files/directories
const copyAssets = (src, dest) => {
  try {
    if (fs.lstatSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(item => {
        copyAssets(`${src}/${item}`, `${dest}/${item}`);
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err);
  }
};

// Copy static assets
['index.html', 'style.css', 'tailwind.css', 'manifest.webmanifest', 'service-worker.js', 'leaderboard.json', 'words.json'].forEach(file => {
  copyAssets(file, `dist/${file}`);
});

// Copy directories
['audio', 'icons', 'img', 'wordlists'].forEach(dir => {
  copyAssets(dir, `dist/${dir}`);
});

console.log('Build completed successfully!');
