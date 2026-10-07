import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-20 text-center space-y-6">
      <h1 className="text-4xl font-serif font-bold text-foreground">404</h1>
      <h2 className="text-lg font-medium text-foreground">Page not found</h2>
      <p className="text-sm text-muted max-w-md mx-auto">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div>
        <Link
          href="/"
          className="inline-block px-4 py-2 text-xs font-mono font-medium text-background bg-foreground rounded hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
