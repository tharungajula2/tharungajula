import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  props: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await props.params;

  if (!pathSegments || pathSegments.length === 0) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const canonicalRoot = path.resolve(process.cwd(), 'content', 'field_cards');
  const targetPath = path.resolve(canonicalRoot, ...pathSegments);

  // Security check against directory traversal (e.g. ../..)
  if (!targetPath.startsWith(canonicalRoot)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
    return new NextResponse('Field Card Not Found', { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(targetPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error serving Field Card:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
