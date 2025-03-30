const fs = require('fs');
const path = require('path');

// List of component files that need React import
const componentsToFix = [
  'client/src/App.js',
  'client/src/Components/InfoCard/InfoCard.js',
  'client/src/Components/LogoSearch/LogoSearch.js',
  'client/src/Components/Post/Post.js',
  'client/src/Components/PostShare/PostShare.js',
  'client/src/Components/PostSide/PostSide.js',
  'client/src/Components/ProfileCard/ProfileCard.js',
  'client/src/Components/ProfileModal/ProfileModal.js',
  'client/src/Components/ProfilePageLeft/ProfilePageLeft.js',
  'client/src/Components/RightSide/RightSide.js',
  'client/src/Components/ShareModal/ShareModal.js',
  'client/src/Components/TrendCard/TrendCard.js',
  'client/src/Components/UserFollow/UserFollow.js',
  'client/src/Components/FollowersCard/FollowersCard.js',
  'client/src/Components/Posts/Posts.js',
  'client/src/Components/profileSide/ProfileSide.js'
];

let filesFixed = 0;

// Add React import to each file if it doesn't already have it
componentsToFix.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if React is already imported
      if (!content.includes("import React") && !content.includes("import * as React")) {
        // Add React import at the top of the file
        const newContent = `import React from 'react';\n${content}`;
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Added React import to: ${filePath}`);
        filesFixed++;
      } else {
        console.log(`${filePath} already has React import.`);
      }
    } else {
      console.log(`File not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log(`\nFixed ${filesFixed} files.`); 