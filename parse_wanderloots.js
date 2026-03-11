const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'content/notes/wanderloots/creator_universe.json');
const outputDir = path.join(process.cwd(), 'content/notes/wanderloots');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Reading from:', inputPath);

try {
    const rawData = fs.readFileSync(inputPath, 'utf8');
    const data = JSON.parse(rawData);
    const nodes = Array.isArray(data) ? data : (data.nodes || []);
    console.log('Nodes found in JSON:', nodes.length);
    
    let count = 0;

    nodes.forEach(node => {
        const name = node.id || node.name || 'Untitled Node';
        const description = node.description || '';
        const domain = node.domain || 'UNSPECIFIED';
        const category = node.universe_category || '0';
        const links = Array.isArray(node.linked_nodes) ? node.linked_nodes : [];
        
        // Slugify filename
        const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '.md';
        const filePath = path.join(outputDir, filename);
        
        // Generate excerpt
        let excerpt = description.substring(0, 100).replace(/"/g, '');
        if (description.length > 100) excerpt += '...';

        // Generate Markdown content (with WikiLinks format!)
        let mdContent = `---
title: "${name.replace(/"/g, '\\"')}"
date: "2026-03-12"
tag: "${domain.toUpperCase()}"
protocol: "${category}"
status: "LIVE"
excerpt: "${excerpt}"
---

# ${name}

${description}

## Neural Links
`;
        if (links.length > 0) {
            links.forEach(link => {
                // Ensure the link text resolves to standard Obsidian style [[WikiLinks]]
                mdContent += `- [[${link}]]\n`;
            });
        } else {
            mdContent += `*No direct neural links established yet.*\n`;
        }

        fs.writeFileSync(filePath, mdContent, 'utf8');
        count++;
    });

    console.log(`Successfully generated ${count} markdown files in ${outputDir} with WikiLink connections!`);
} catch (error) {
    console.error('CRITICAL ERROR processing JSON:', error.message);
}
