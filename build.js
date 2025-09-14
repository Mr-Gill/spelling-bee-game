const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Load environment variables from .env file
let envVars = {
  NODE_ENV: 'production',
  PUBLIC_URL: '',
  GITHUB_TOKEN: '',
  GITHUB_MODELS_TOKEN: '',
  API_TOKEN: '',
  VITE_WORDLIST_URL: ''
};

// Try to read .env file
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (envVars.hasOwnProperty(key.trim())) {
          envVars[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
        }
      }
    });
    console.log('Loaded environment variables from .env file');
  }
} catch (error) {
  console.log('No .env file found, using defaults');
}

// Build define flags for esbuild
const defineFlags = Object.entries(envVars)
  .map(([key, value]) => `--define:process.env.${key}='"${value}"'`)
  .join(' ');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Run esbuild
console.log('Building application...');
execSync(`npx esbuild src/spelling-bee-game.tsx --bundle --outfile=dist/app.js --jsx=automatic --target=es2020 --format=esm --loader:.mp3=file --loader:.svg=file --loader:.png=file --loader:.jpg=file --loader:.jpeg=file ${defineFlags}`, { stdio: 'inherit' });

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

// Copy static assets (except service-worker.js which needs processing)
['index.html', 'style.css', 'manifest.webmanifest', 'leaderboard.json', 'words.json'].forEach(file => {
  copyAssets(file, `dist/${file}`);
});

// Process service-worker.js template
console.log('Processing service-worker.js template...');
try {
  const serviceWorkerTemplate = fs.readFileSync('service-worker.js', 'utf8');
  const repoName = 'spelling-bee-game'; // From package.json homepage
  const processedServiceWorker = serviceWorkerTemplate.replace(/\{\{REPO_NAME\}\}/g, repoName);
  fs.writeFileSync('dist/service-worker.js', processedServiceWorker);
  console.log('Service worker template processed successfully');
} catch (err) {
  console.error('Error processing service-worker.js:', err);
}

// Copy directories
['icons', 'img', 'wordlists'].forEach(dir => {
  copyAssets(dir, `dist/${dir}`);
});

// Copy audio from src/audio
copyAssets('src/audio', 'dist/audio');

console.log('Build completed successfully!');
