const fs = require('fs');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Run esbuild
console.log('Building application...');
execSync(`npx esbuild src/spelling-bee-game.tsx --bundle --outfile=dist/app.js --jsx=automatic --target=es2020 --format=esm --loader:.mp3=file --loader:.svg=file --loader:.png=file --loader:.jpg=file --loader:.jpeg=file --define:process.env.NODE_ENV='"production"' --define:process.env.PUBLIC_URL='""' --define:process.env.GITHUB_TOKEN='""' --define:process.env.GITHUB_MODELS_TOKEN='""' --define:process.env.API_TOKEN='""'`, { stdio: 'inherit' });

// Build Tailwind CSS
console.log('Building Tailwind CSS...');
execSync(`npx tailwindcss -i ./src/tailwind.css -o dist/tailwind.css --minify`, { stdio: 'inherit' });

// Function to copy files/directories
const copyAssets = (src, dest) => {
  try {
    if (!fs.existsSync(src)) {
      console.log(`Skipping ${src} - doesn't exist`);
      return;
    }
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
['index.html', 'style.css', 'manifest.webmanifest', 'service-worker.js', 'leaderboard.json', 'words.json'].forEach(file => {
  copyAssets(file, `dist/${file}`);
});

// Copy directories
['icons', 'img', 'wordlists'].forEach(dir => {
  copyAssets(dir, `dist/${dir}`);
});

// Copy audio from src/audio
copyAssets('src/audio', 'dist/audio');

console.log('Build completed successfully!');
