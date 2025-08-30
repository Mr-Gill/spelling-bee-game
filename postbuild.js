const fs = require('fs-extra');

// Copy img directory to build directory
fs.copySync('img', 'build/img');
