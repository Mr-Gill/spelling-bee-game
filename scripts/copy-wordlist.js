const fs = require('fs').promises;
const path = require('path');

async function copyWordList() {
  try {
    const source = path.join(process.cwd(), 'wordlist.json');
    const dest = path.join(process.cwd(), 'dist', 'wordlist.json');
    
    // Ensure the dist directory exists
    await fs.mkdir(path.dirname(dest), { recursive: true });
    
    // Copy the file
    await fs.copyFile(source, dest);
    
    console.log('Word list copied to dist directory');
  } catch (error) {
    console.error('Error copying word list:', error);
    process.exit(1);
  }
}

copyWordList();
