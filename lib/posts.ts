import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDirectory = path.join(process.cwd(), 'content/notes');

export type PostData = {
  id: string;
  title: string;
  date: string;
  tag: string;
  protocol?: string;
  status?: string;
  excerpt: string;
  content?: string;
  outboundLinks?: string[];
  inboundLinks?: Partial<PostData>[];
};

// Helper function to extract and normalize wikilinks
function extractWikiLinks(content: string): string[] {
  const links = new Set<string>();
  // Match standard [[WikiLink]] format
  const regex = /\[\[(.*?)\]\]/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
      // Normalize the matched text into a slug
      const slug = match[1].toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
          
      if (slug) {
         links.add(slug);
      }
  }
  return Array.from(links);
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/notes
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(notesDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'hello-world.md')
    .map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Extract outbound links from the body content
    const outboundLinks = extractWikiLinks(matterResult.content);

    const protocol = matterResult.data.protocol !== undefined ? String(matterResult.data.protocol) : "1";
    let tag = matterResult.data.tag;
    if (!tag) {
        if (protocol === "0") tag = "META";
        else if (protocol === "1") tag = "N=1";
        else if (protocol === "2") tag = "Family";
        else if (protocol === "3") tag = "Cognition";
        else tag = "UNCATEGORIZED";
    }

    // Combine the data with the id
    return {
      id,
      outboundLinks,
      ...(matterResult.data as { title: string; date: string; excerpt: string; status: string }),
      protocol,
      tag,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(notesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getPostData(id: string): PostData {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // 1. Extract outbound links for this specific post
  const outboundLinks = extractWikiLinks(matterResult.content);
  
  // 2. Compute inbound links (backlinks) by checking all posts
  const allPosts = getSortedPostsData();
  const inboundLinks: Partial<PostData>[] = [];
  
  allPosts.forEach(post => {
      // Check if any other post's outboundLinks contains the exact slug
      const matchesId = post.outboundLinks?.some(linkSlug => id === linkSlug);
      
      if (matchesId && post.id !== id) {
          inboundLinks.push({
              id: post.id,
              title: post.title
          });
      }
  });

  const protocol = matterResult.data.protocol !== undefined ? String(matterResult.data.protocol) : "1";
  let tag = matterResult.data.tag;
  if (!tag) {
      if (protocol === "0") tag = "META";
      else if (protocol === "1") tag = "N=1";
      else if (protocol === "2") tag = "Family";
      else if (protocol === "3") tag = "Cognition";
      else tag = "UNCATEGORIZED";
  }

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content,
    outboundLinks,
    inboundLinks,
    ...(matterResult.data as { title: string; date: string; excerpt: string; status: string }),
    protocol,
    tag,
  };
}
