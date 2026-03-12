const fs = require('fs');
const path = require('path');

const dirPath = path.join(process.cwd(), 'content', 'notes', 'wanderloots');

try {
    const files = fs.readdirSync(dirPath);
    let updatedCount = 0;

    // This regex catches the invisible/weird citation characters that GPT/Claude injects
    // Examples: citeturn3search2 or similar unicode artifacts
    // We will match the starting character  and everything up to the closing character 
    const citeRegex = /cite(.*?)/g;

    files.forEach(file => {
        if (!file.endsWith('.md')) return;

        const filePath = path.join(dirPath, file);
        const originalContent = fs.readFileSync(filePath, 'utf8');

        if (citeRegex.test(originalContent)) {
            // Replace the citations and trim any trailing spaces left behind before a newline
            const newContent = originalContent.replace(citeRegex, '').replace(/ +\n/g, '\n');
            fs.writeFileSync(filePath, newContent, 'utf8');
            updatedCount++;
        }
    });

    console.log(`Successfully removed AI citations from ${updatedCount} markdown files.`);
} catch (err) {
    console.error('Error cleaning citations:', err);
}
