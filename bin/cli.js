#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const reset = "\x1b[0m";
const bold = "\x1b[1m";
const cyan = "\x1b[36m";
const green = "\x1b[32m";
const dim = "\x1b[2m";

const projectName = process.argv[2] || 'my-llm-wiki';
const targetPath = path.join(process.cwd(), projectName);
const sourcePath = path.join(__dirname, '..');

const directories = ['raw', 'wiki', 'outputs', 'modules', 'wiki/graph'];
const files = [
  'AGENTS.md',
  'CONFIG.md',
  'README.md',
  'modules/knowledge-graph.md',
  'wiki/graph/network.md'
];

console.log(`${cyan}${bold}Creating LLM Wiki Starter in ${targetPath}...${reset}\n`);

if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true });
}

directories.forEach(dir => {
  const dirPath = path.join(targetPath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, '.gitkeep'), '');
});

files.forEach(file => {
  const src = path.join(sourcePath, file);
  const dest = path.join(targetPath, file);
  
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

console.log(`${green}${bold}Success! LLM Wiki environment initialized.${reset}\n`);
console.log(`${dim}Next steps:${reset}`);
console.log(`  cd ${projectName}`);
console.log(`  Open the directory in your preferred editor.\n`);
