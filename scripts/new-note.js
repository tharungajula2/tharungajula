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
    '0': { name: 'Protocol 0: META', tag: 'META', color: 'Violet' },
    '1': { name: 'Protocol N=1', tag: 'N=1', color: 'Emerald' },
    '2': { name: 'Family OS', tag: 'Family', color: 'Orange' },
    '3': { name: 'Protocol Cognition', tag: 'Cognition', color: 'Sky' }
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
    const slug = slugify(title);
    const date = new Date().toISOString().split('T')[0];
    
    // Pure Atomic Naming Convention: slug.md
    const filename = `${slug}.md`;
    const filepath = path.join(targetDir, filename);

    if (fs.existsSync(filepath)) {
        console.error('\x1b[31m%s\x1b[0m', `Error: A note with the slug '${slug}' already exists.`);
        process.exit(1);
    }
    
    const protocol = PROTOCOLS[protocolKey];
    
    const content = `---
title: "${title}"
date: "${date}"
status: "CONCEPT"
protocol: "${protocolKey}"
tag: "${protocol.tag}"
excerpt: "Enter atomic concept summary here..."
---

Write the atomic mechanism here. 

// Linked Mentions
Related to: [[]]
`;

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(filepath, content);
    console.log('\x1b[32m%s\x1b[0m', `\n✅ Atomic Note Created: ${filename}`);
    console.log(`Title: ${title}`);
    console.log(`Protocol: ${protocol.name} (${protocol.color})`);
    process.exit(0);
};

// Main Execution Flow
const titleArg = process.argv[2];

if (!titleArg) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a Concept Title.');
    console.log('Usage: npm run note "Mitochondrial Dysfunction"');
    process.exit(1);
}

console.log('\nSelect Protocol for this Category:');
console.log('0: Protocol 0 - META (Violet)');
console.log('1: Protocol N=1 (Emerald)');
console.log('2: Family OS (Orange)');
console.log('3: Protocol Cognition (Sky)');

rl.question('\nEnter 0, 1, 2, or 3: ', (answer) => {
    if (['0', '1', '2', '3'].includes(answer.trim())) {
        createNote(titleArg, answer.trim());
        rl.close();
    } else {
        console.log('Invalid protocol. Defaulting to 1 (N=1).');
        createNote(titleArg, '1');
        rl.close();
    }
});
