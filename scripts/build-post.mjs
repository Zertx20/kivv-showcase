import fs from 'fs';
import path from 'path';

const distDir = './dist/client';
const assetsDir = path.join(distDir, 'assets');

// Check if assets directory exists
if (!fs.existsSync(assetsDir)) {
  console.error('Assets directory not found:', assetsDir);
  process.exit(1);
}

// Find the built JS and CSS files
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

if (!jsFile || !cssFile) {
  console.error('Could not find built assets in', assetsDir);
  console.error('Files found:', files);
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KIVV.EDITS - Abdelkrim Khader, Video Editor</title>
  <meta name="description" content="Clean, minimal & high-retention video edits. Let's bring your ideas to life.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <script type="module" crossorigin src="/assets/${jsFile}"></script>
  <link rel="stylesheet" crossorigin href="/assets/${cssFile}">
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('Generated dist/client/index.html');
console.log('JS:', jsFile);
console.log('CSS:', cssFile);
