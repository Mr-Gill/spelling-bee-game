const fs = require('fs-extra');

// Copy img directory to dist directory
fs.copySync('img', 'dist/img');
