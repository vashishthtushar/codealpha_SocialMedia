const fs = require('fs');
const path = require('path');

// Function to walk through directories recursively
function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    
    if (stat.isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else if (stat.isFile() && file.endsWith('.js') && !file.endsWith('.test.js')) {
      filelist.push(filepath);
    }
  });
  
  return filelist;
}

// Get all JS files in the src directory
const srcDir = path.join(__dirname, 'client/src');
const jsFiles = walkSync(srcDir);

// Add React import to files that use JSX but don't import React
let filesFixed = 0;

jsFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if file contains JSX (simplified check)
  const hasJSX = content.includes('<') && content.includes('/>') || content.includes('</');
  
  // Check if React is already imported
  const hasReactImport = content.includes("import React") || content.includes("import * as React");
  
  if (hasJSX && !hasReactImport) {
    // Add React import at the top of the file
    const newContent = `import React from 'react';\n${content}`;
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Added React import to: ${file}`);
    filesFixed++;
  }
});

console.log(`\nFixed ${filesFixed} files.`); 