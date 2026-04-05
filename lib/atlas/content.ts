import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { AtlasModule, AtlasUniverse } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/atlas");

export async function getUniverseMetadata(universeId: string): Promise<AtlasUniverse | null> {
  try {
    const metadataPath = path.join(CONTENT_DIR, "universes", universeId, "metadata.md");
    const fileContent = await fs.readFile(metadataPath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      id: data.id || universeId,
      title: data.title || "Untitled Universe",
      description: data.description || data.summary || content.trim() || "No description provided.",
      moduleCount: data.moduleCount || 0,
      contentType: data.contentType || "Masterclass",
      status: data.status || "active",
    };
  } catch (error) {
    console.error(`Error loading universe metadata for ${universeId}:`, error);
    return null;
  }
}

export async function getUniverseModules(universeId: string): Promise<AtlasModule[]> {
  try {
    const modulesDir = path.join(CONTENT_DIR, "modules", universeId);
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
            universe: data.universe || universeId,
            createdAt: data.created_at || "",
            updatedAt: data.updated_at || "",
          } as AtlasModule;
        } catch (err) {
          console.error(`Error parsing module file ${fileName}:`, err);
          return null;
        }
      })
    );
    
    return (modules.filter(m => m !== null) as AtlasModule[])
      .filter(m => m.isPublic)
      .sort((a, b) => a.moduleNumber - b.moduleNumber);
  } catch (error) {
    console.error(`Error loading modules for universe ${universeId}:`, error);
    return [];
  }
}

export async function getAllUniverseIds(): Promise<string[]> {
  try {
    const universesDir = path.join(CONTENT_DIR, "universes");
    const dirs = await fs.readdir(universesDir);
    return dirs;
  } catch (err) {
    console.error("Error reading universes directory:", err);
    return [];
  }
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
