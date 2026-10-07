import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('dist');
const port = Number(process.env.PORT || 4321);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const sendFile = async (response, file, status = 200) => {
  const body = await readFile(file);
  response.writeHead(status, {
    'Content-Type': mimeTypes[extname(file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': body.length
  });
  response.end(body);
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost');
    const decodedPath = decodeURIComponent(url.pathname);
    const relativePath = normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, '');
    let candidate = join(root, relativePath);

    if (!candidate.startsWith(root)) throw new Error('Invalid path');

    try {
      const info = await stat(candidate);
      if (info.isDirectory()) candidate = join(candidate, 'index.html');
      await sendFile(response, candidate);
    } catch {
      await sendFile(response, join(root, '404.html'), 404);
    }
  } catch {
    await sendFile(response, join(root, '404.html'), 404);
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`GitHub Pages preview: http://127.0.0.1:${port}`);
});
