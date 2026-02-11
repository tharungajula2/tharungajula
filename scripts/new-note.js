const fs = require('fs');
const path = require('path');

// Get the title from the command line arguments
const title = process.argv[2];

if (!title) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a title.');
  console.log('Usage: npm run note "Your Note Title"');
  process.exit(1);
}

// Helper to slugify the title
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

const slug = slugify(title);
const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const filename = `${date}-${slug}.md`;
const targetDir = path.join(__dirname, '..', 'content', 'notes');
const filepath = path.join(targetDir, filename);

// Ensure directory exists
if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir, { recursive: true });
}

// Frontmatter Template with Image Instructions
const content = `---
title: "${title}"
date: "${date}"
tag: "Systems"
excerpt: "Brief summary of the concept..."
---

## The Concept

Write your daily lab note here...

### Adding Images
To add an image:
1. Drop your image into \`public/images/notes/\`
2. Use the standard markdown syntax below:

![Image Description](/images/notes/your-image-filename.png)

`;

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error('\x1b[31m%s\x1b[0m', `Error: File ${filename} already exists.`);
  process.exit(1);
}

// Write the file
fs.writeFileSync(filepath, content);

console.log('\x1b[32m%s\x1b[0m', `✅ Lab Note Created: ${filename}`);
console.log(`Path: content/notes/${filename}`);
console.log(`\nTo add images, drop them in: public/images/notes/`);
