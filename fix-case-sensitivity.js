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
    } else if (stat.isFile() && file.endsWith('.js')) {
      filelist.push(filepath);
    }
  });
  
  return filelist;
}

// Get all JS files in the src directory
const srcDir = path.join(__dirname, 'client/src');
const jsFiles = walkSync(srcDir);

// Find components with camelCase or PascalCase issues
const componentDirs = [
  { name: 'profileSide', path: 'ProfileSide' },
  { name: 'PostSide', path: 'PostSide' },
  { name: 'RightSide', path: 'RightSide' },
  { name: 'FollowersCard', path: 'FollowersCard' },
  { name: 'LogoSearch', path: 'LogoSearch' },
  { name: 'Post', path: 'Post' },
  { name: 'Posts', path: 'Posts' },
  { name: 'PostShare', path: 'PostShare' },
  { name: 'ProfileCard', path: 'ProfileCard' },
  { name: 'ProfileModal', path: 'ProfileModal' },
  { name: 'ShareModal', path: 'ShareModal' },
  { name: 'TrendCard', path: 'TrendCard' },
  { name: 'UserFollow', path: 'UserFollow' },
  { name: 'InfoCard', path: 'InfoCard' },
  { name: 'ProfilePageLeft', path: 'ProfilePageLeft' }
];

let filesFixed = 0;

// Add React import to files that use JSX but don't import React
jsFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // First, add React import if missing and file uses JSX
  if ((content.includes('<') && (content.includes('/>') || content.includes('</'))) && 
      !content.includes("import React") && !content.includes("import * as React")) {
    content = `import React from 'react';\n${content}`;
    modified = true;
    console.log(`Added React import to: ${file}`);
  }
  
  // Fix import paths for component directories
  componentDirs.forEach(component => {
    // Create regex patterns to match imports with incorrect case
    const importRegexes = [
      new RegExp(`from\\s+['"]\\.\\./.+?/${component.name}/${component.name}['"]`, 'g'),
      new RegExp(`from\\s+['"]\\.\\./.+?/${component.path}/${component.name}['"]`, 'g'),
      new RegExp(`from\\s+['"]\\.\\./.+?/${component.name}/${component.path}['"]`, 'g')
    ];
    
    // Check and fix paths
    importRegexes.forEach(regex => {
      if (regex.test(content)) {
        content = content.replace(regex, (match) => {
          const corrected = match.replace(`/${component.name}/`, `/${component.path}/`)
                                  .replace(`/${component.path}/`, `/${component.path}/`)
                                  .replace(`/${component.name}']`, `/${component.path}']`)
                                  .replace(`/${component.name}"`, `/${component.path}"`);
          console.log(`In ${file}, fixed: ${match} → ${corrected}`);
          modified = true;
          return corrected;
        });
      }
    });
  });
  
  // Save file if modified
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    filesFixed++;
  }
});

console.log(`\nFixed ${filesFixed} files.`); 