import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { AtlasModule, AtlasUniverse } from "./types";
import { ATLAS_UNIVERSES } from "./data";

const CONTENT_DIR = path.join(process.cwd(), "content/atlas");

/**
 * COMPATIBILITY LAYER: 
 * Resolves a canonical universe ID to its legacy filesystem folder(s).
 */
function getLegacySourceIds(universeId: string): string[] {
  return [universeId];
}

export async function getUniverseMetadata(universeId: string): Promise<AtlasUniverse | null> {
  const registeredUniverse = ATLAS_UNIVERSES.find(u => u.id === universeId);
  if (!registeredUniverse) return null;

  // Use the first legacy ID as the primary metadata source folder if it exists
  const primaryLegacyId = universeId;
  
  try {
    const metadataPath = path.join(CONTENT_DIR, "universes", primaryLegacyId, "metadata.md");
    const fileContent = await fs.readFile(metadataPath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      ...registeredUniverse, // Start with canonical data from registry
      // Allow overrides from MD if they exist (though data.ts is now primary)
      title: registeredUniverse.title || data.title,
      description: registeredUniverse.description || data.description || data.summary || content.trim(),
    };
  } catch (error) {
    // Return registered data if file not found
    return registeredUniverse;
  }
}

export async function getUniverseModules(universeId: string): Promise<AtlasModule[]> {
  const legacyIds = getLegacySourceIds(universeId);
  const allModules: AtlasModule[] = [];

  for (const legacyId of legacyIds) {
    try {
      const modulesDir = path.join(CONTENT_DIR, "modules", legacyId);
      
      try {
        await fs.access(modulesDir);
      } catch {
        continue; // Skip folders that don't exist
      }

      const files = await fs.readdir(modulesDir);
      const markdownFiles = files.filter(f => f.endsWith(".md"));
      
      const modules = await Promise.all(
        markdownFiles.map(async (fileName) => {
          try {
            const filePath = path.join(modulesDir, fileName);
            const fileContent = await fs.readFile(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            
            const slug = data.slug || fileName.replace(".md", "");
            const moduleNumber = data.module_number || data.order || 0;
            
            return {
              id: data.id || slug,
              slug,
              title: data.title || "Untitled Module",
              order: moduleNumber,
              moduleNumber,
              readingTime: Number(data.reading_time) || 0,
              summary: data.summary || "No summary provided.",
              status: data.status || "draft",
              difficulty: data.difficulty || "beginner",
              tags: data.tags || [],
              isPublic: data.public !== undefined ? data.public : true,
              content: content,
              universe: universeId, // Set canonical universe ID
              createdAt: data.created_at || "",
              updatedAt: data.updated_at || "",
            } as AtlasModule;
          } catch (err) {
            console.error(`Error parsing module file ${fileName}:`, err);
            return null;
          }
        })
      );
      
      allModules.push(...(modules.filter(m => m !== null) as AtlasModule[]));
    } catch (error) {
      console.error(`Error loading modules for legacy universe ${legacyId}:`, error);
    }
  }

  // Final filtering and sorting across all aggregated modules
  return allModules
    .filter(m => m.isPublic)
    .sort((a, b) => a.moduleNumber - b.moduleNumber);
}

/**
 * Returns canonical future IDs instead of directory listing.
 */
export async function getAllUniverseIds(): Promise<string[]> {
  return ATLAS_UNIVERSES.map(u => u.id);
}

export async function getAllPublicModules(): Promise<AtlasModule[]> {
  const universeIds = await getAllUniverseIds();
  const allModules: AtlasModule[] = [];
  
  for (const id of universeIds) {
    const modules = await getUniverseModules(id);
    allModules.push(...modules);
  }
  
  return allModules;
}

export async function getModuleBySlug(universeId: string, moduleSlug: string): Promise<AtlasModule | null> {
  const allModules = await getUniverseModules(universeId);
  return allModules.find(m => m.slug === moduleSlug) || null;
}

export async function getAdjacentModules(universeId: string, currentModuleNumber: number) {
  const allModules = await getUniverseModules(universeId);
  return {
    prev: allModules.find(m => m.moduleNumber === currentModuleNumber - 1) || null,
    next: allModules.find(m => m.moduleNumber === currentModuleNumber + 1) || null,
  };
}

export async function getUniverseStats(universeId: string) {
  const modules = await getUniverseModules(universeId);
  const availableCount = modules.length;
  const totalMinutes = modules.reduce((acc, m) => acc + m.readingTime, 0);
  
  return {
    availableCount,
    totalMinutes
  };
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")     // Replace spaces with -
    .replace(/[^\w-]+/g, "")    // Remove all non-word chars
    .replace(/--+/g, "-")      // Replace multiple - with single -
    .replace(/^-+/, "")        // Trim - from start of text
    .replace(/-+$/, "");       // Trim - from end of text
}

export function extractHeadings(markdown: string) {
  const headingRegex = /^(##|###) (.*)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}
