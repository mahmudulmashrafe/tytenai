/**
 * Tyten AI - Development Server
 * Supports both Bun and standard Node.js runtimes with zero external dependencies.
 */

const http = typeof Bun === 'undefined' ? require('http') : null;
const fs = typeof Bun === 'undefined' ? require('fs') : null;
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');

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

if (typeof Bun !== 'undefined') {
  // Native Bun implementation
  const server = Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let pathname = url.pathname;
      if (pathname === '/') pathname = '/index.html';

      const filePath = path.join(ROOT_DIR, pathname);
      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (!exists) {
        return new Response(Bun.file(path.join(ROOT_DIR, 'index.html')), {
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

  console.log(`\n🚀 [Bun] Tyten AI Server running at http://localhost:${server.port}`);
  console.log(`⚡ Press Ctrl+C to terminate\n`);
} else {
  // Standard Node.js fallback implementation
  const server = http.createServer((req, res) => {
    let safePath = req.url.split('?')[0];
    if (safePath === '/') safePath = '/index.html';

    const filePath = path.join(ROOT_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        fs.readFile(path.join(ROOT_DIR, 'index.html'), (readErr, data) => {
          if (readErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
          return;
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        });
        res.end(data);
      });
    });
  });

  server.listen(PORT, () => {
    console.log(`\n🚀 [Node] Tyten AI Server running at http://localhost:${PORT}`);
    console.log(`⚡ Press Ctrl+C to terminate\n`);
  });
}
