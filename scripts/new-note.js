const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const targetDir = path.join(__dirname, '..', 'content', 'notes');

const PROTOCOLS = {
    '1': { name: 'Protocol N=1', tag: 'N=1', color: 'Emerald' },
    '2': { name: 'Family OS', tag: 'Family', color: 'Orange' },
    '3': { name: 'Protocol Learn', tag: 'Learn', color: 'Sky' }
};

// Helper to get next note number
const getNextNoteNumber = () => {
    if (!fs.existsSync(targetDir)) return '001';
    
    const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.md') && f !== 'hello-world.md');
    if (files.length === 0) return '001';

// ... (previous code)

    // Extract numbers from filenames. 
    // Matches both "Notes-00X-" and "YYYY-MM-DD-Notes-00X-" (case insensitive)
    const numbers = files.map(f => {
        const match = f.match(/notes-(\d+)-/i);
        return match ? parseInt(match[1]) : 0;
    });

    const maxNum = Math.max(...numbers, 0);
    return String(maxNum + 1).padStart(3, '0');
};

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

const createNote = (title, protocolKey) => {
    const nextNum = getNextNoteNumber();
    const slug = slugify(title);
    const date = new Date().toISOString().split('T')[0];
    
    // New Naming Convention: YYYY-MM-DD-notes-00X-slug.md
    // Lowercase 'notes' to match user preference in "notes-001"
    const filename = `${date}-notes-${nextNum}-${slug}.md`;
    const filepath = path.join(targetDir, filename);
    
    // ... (rest of the function)
    
    const protocol = PROTOCOLS[protocolKey];
    
    const content = `---
title: "Notes ${nextNum}: ${title}"
date: "${date}"
tag: "${protocol.tag}"
protocol: "${protocolKey}"
excerpt: "Brief summary of the concept..."
---

## The Concept

Write your daily lab note here...

### Adding Images
![Image Description](/images/notes/placeholder.png)
`;

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(filepath, content);
    console.log('\x1b[32m%s\x1b[0m', `\n✅ Note Created: ${filename}`);
    console.log(`Title: Notes ${nextNum}: ${title}`);
    console.log(`Protocol: ${protocol.name} (${protocol.color})`);
    process.exit(0);
};

// Main Execution Flow
const titleArg = process.argv[2];

if (!titleArg) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a title.');
    console.log('Usage: npm run note "Your Title"');
    process.exit(1);
}

console.log('\nSelect Protocol for this Category:');
console.log('1: Protocol N=1 (Emerald)');
console.log('2: Family OS (Orange)');
console.log('3: Protocol Learn (Sky)');

rl.question('\nEnter 1, 2, or 3: ', (answer) => {
    if (['1', '2', '3'].includes(answer.trim())) {
        createNote(titleArg, answer.trim());
        rl.close();
    } else {
        console.log('Invalid styling. Defaulting to N=1.');
        createNote(titleArg, '1');
        rl.close();
    }
});
