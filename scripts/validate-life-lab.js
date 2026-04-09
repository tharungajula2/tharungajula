const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), 'content/life-lab');
const UNIVERSES_DIR = path.join(CONTENT_DIR, 'universes');
const MODULES_DIR = path.join(CONTENT_DIR, 'modules');

console.log('🚀 Starting Life Lab Content Validation (CJS)...\n');

let errorCount = 0;
let warningCount = 0;

function logError(msg) {
  console.error(`❌ ERROR: ${msg}`);
  errorCount++;
}

function logWarning(msg) {
  console.warn(`⚠️ WARNING: ${msg}`);
  warningCount++;
}

async function validate() {
  try {
    // 1. Validate Universes
    if (!fs.existsSync(UNIVERSES_DIR)) {
      logError('Universes directory missing at ' + UNIVERSES_DIR);
      return;
    }

    const universes = fs.readdirSync(UNIVERSES_DIR);

    for (const universeId of universes) {
      const universePath = path.join(UNIVERSES_DIR, universeId);
      if (!fs.statSync(universePath).isDirectory()) continue;

      const metadataPath = path.join(universePath, 'metadata.md');
      if (!fs.existsSync(metadataPath)) {
        logError(`Universe [${universeId}] is missing metadata.md`);
      } else {
        const content = fs.readFileSync(metadataPath, 'utf-8');
        const { data } = matter(content);
        
        if (!data.title) logError(`Universe [${universeId}] metadata missing 'title'`);
        if (!data.id) logWarning(`Universe [${universeId}] metadata missing 'id' (using folder name)`);
      }

      // 2. Validate Modules for this universe
      const universeModulesDir = path.join(MODULES_DIR, universeId);
      if (!fs.existsSync(universeModulesDir)) {
        logWarning(`Universe [${universeId}] has no modules directory at ${universeModulesDir}`);
        continue;
      }

      const moduleFiles = fs.readdirSync(universeModulesDir).filter(f => f.endsWith('.md') && f !== 'README.md');
      const seenModuleNumbers = new Set();
      const seenSlugs = new Set();

      for (const moduleFile of moduleFiles) {
        const filePath = path.join(universeModulesDir, moduleFile);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content: bodyContent } = matter(fileContent);

        const context = `Module [${universeId}/${moduleFile}]`;

        // Required Fields
        if (!data.title) logError(`${context} missing 'title'`);
        if (!data.slug) logWarning(`${context} missing 'slug' (using filename)`);
        if (data.module_number === undefined) logError(`${context} missing 'module_number'`);

        // Uniqueness within universe
        if (data.module_number !== undefined) {
          if (seenModuleNumbers.has(data.module_number)) {
            logError(`${context} duplicate 'module_number': ${data.module_number}`);
          }
          seenModuleNumbers.add(data.module_number);
        }

        const slug = data.slug || moduleFile.replace('.md', '');
        if (seenSlugs.has(slug)) {
          logError(`${context} duplicate 'slug': ${slug}`);
        }
        seenSlugs.add(slug);

        // Content Quality
        if (!data.summary) logWarning(`${context} summary is missing`);
        if (!bodyContent.trim()) logError(`${context} body content is empty`);
        
        const h2Count = (bodyContent.match(/^## /gm) || []).length;
        if (h2Count < 2) {
          logWarning(`${context} has low H2 count (${h2Count}). TOC might be thin.`);
        }
      }
    }

    console.log('\n--- Validation Result ---');
    if (errorCount === 0 && warningCount === 0) {
      console.log('✅ All Life Lab content is valid and healthy!');
    } else {
      console.log(`${errorCount} Errors, ${warningCount} Warnings found.`);
      if (errorCount > 0) {
        process.exit(1);
      }
    }

  } catch (err) {
    console.error('FATAL ERROR DURING VALIDATION:', err);
    process.exit(1);
  }
}

validate();
