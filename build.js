const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['spelling-bee-game.tsx'],
  bundle: true,
  outfile: 'app.js',
  jsx: 'automatic',
}).catch(() => process.exit(1));
