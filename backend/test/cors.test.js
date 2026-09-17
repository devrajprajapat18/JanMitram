import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

const allowedOrigin = 'https://jan-mitram.vercel.app';

test('allows Vercel origin for preflight signup requests', async () => {
  const app = createApp({
    jwtSecret: 'test-secret',
    clientOrigin: `${allowedOrigin},http://localhost:8080`,
  });

  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/signup`, {
      method: 'OPTIONS',
      headers: {
        Origin: allowedOrigin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    });

    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), allowedOrigin);
    assert.match(response.headers.get('access-control-allow-methods') || '', /POST/i);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
