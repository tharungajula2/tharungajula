import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  if (!pathSegments || pathSegments.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const decodedSegments = pathSegments.map((segment) => decodeURIComponent(segment));
  const baseContentDir = path.join(process.cwd(), 'content', 'slides');
  const targetFilePath = path.join(baseContentDir, ...decodedSegments);

  // Security check to prevent directory traversal outside content/slides
  const relative = path.relative(baseContentDir, targetFilePath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(targetFilePath) || fs.statSync(targetFilePath).isDirectory()) {
    return new NextResponse('File Not Found', { status: 404 });
  }

  const ext = path.extname(targetFilePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const fileBuffer = fs.readFileSync(targetFilePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
