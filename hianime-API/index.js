import app from '@/app.js';

const port = process.env.PORT || 3030;

if (typeof Bun !== 'undefined') {
  const { serve } = await import('bun');
  const bunApp = serve({ port, fetch: app.fetch, idleTimeout: 20 });
  console.log(`server is running visit ${bunApp.url}doc for docs`);
} else {
  const { serve } = await import('@hono/node-server');
  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`server is running visit http://localhost:${info.port}/doc for docs`);
  });
}
