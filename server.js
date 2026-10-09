// Lightweight native Bun development server
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    if (pathname === '/') {
      pathname = '/index.html';
    }

    const filePath = `.${pathname}`;
    const file = Bun.file(filePath);
    const exists = await file.exists();

    if (!exists) {
      // 404 fallback or SPA fallback to index.html
      const indexFile = Bun.file('./index.html');
      return new Response(indexFile, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    const ext = pathname.substring(pathname.lastIndexOf('.'));
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new Response(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      }
    });
  }
});

console.log(`\n🚀 Tyten AI Web Server running at http://localhost:${server.port}`);
console.log(`⚡ Press Ctrl+C to terminate\n`);
