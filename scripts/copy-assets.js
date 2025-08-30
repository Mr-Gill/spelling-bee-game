const fs = require('fs-extra');
const path = require('path');

// Ensure dist directory exists
fs.ensureDirSync('dist');

// Copy all assets
const copyAssets = () => {
  try {
    // Copy image assets
    fs.copySync('src/img', 'dist/img');
    
    // Copy audio assets
    fs.copySync('audio', 'dist/audio');
    
    console.log('All assets copied successfully');
  } catch (err) {
    console.error('Error copying assets:', err);
  }
};

copyAssets();
