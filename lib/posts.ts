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
};

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

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string; protocol: string; status: string }),
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

export function getPostData(id: string) {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string; protocol: string; status: string }),
  };
}
