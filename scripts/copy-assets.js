const fs = require('fs-extra');
const path = require('path');

// Ensure dist directory exists
fs.ensureDirSync('dist');

// Copy all assets
const copyAssets = () => {
  try {
    // Copy image assets from src
    fs.copySync('src/img', 'dist/img');
    
    // Copy image assets from root (in case there are additional files)
    if (fs.existsSync('img')) {
      fs.copySync('img', 'dist/img');
    }
    
    // Copy icons directory
    if (fs.existsSync('icons')) {
      fs.copySync('icons', 'dist/icons');
    }
    
    // Copy audio assets
    fs.copySync('audio', 'dist/audio');
    
    console.log('All assets copied successfully');
  } catch (err) {
    console.error('Error copying assets:', err);
  }
};

copyAssets();
