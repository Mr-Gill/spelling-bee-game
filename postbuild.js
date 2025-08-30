const fs = require('fs-extra');
const path = require('path');

/**
 * Post-build script to copy static assets to the dist directory
 */

try {
  const sourceDir = path.resolve(__dirname, 'img');
  const destDir = path.resolve(__dirname, 'dist/img');
  
  console.log('Starting post-build process...');
  
  // Ensure the source directory exists
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }
  
  // Create destination directory if it doesn't exist
  fs.ensureDirSync(destDir);
  
  console.log(`Copying files from ${sourceDir} to ${destDir}...`);
  
  // Copy files with overwrite
  fs.copySync(sourceDir, destDir, { overwrite: true });
  
  console.log('Successfully copied static assets to dist directory');
  
} catch (error) {
  console.error('Error during post-build process:', error);
  process.exit(1);
}
