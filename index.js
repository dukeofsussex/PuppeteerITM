const fastify = require('fastify');
const puppeteer = require('puppeteer');

const server = fastify({ logger: true });

if (!process.env.SECRET) {
  server.log.error('Please set the "SECRET" environment variable');
  process.exit(1);
}

server.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        secret: { type: 'string' },
        url: { type: 'string', format: 'uri' },
      },
      required: ['secret', 'url'],
    },
  },
  preHandler: async (request, reply) => {
    if (request.query.secret !== process.env.SECRET) {
      reply.code(403);
      throw new Error('Invalid secret');
    }
  },
  handler: async (request) => {
    const browser = await puppeteer.launch({
      args: [
        '--disable-accelerated-2d-canvas',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(process.env.PPT_AGENT || 'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1');

    await page.goto(request.query.url, { waitUntil: process.env.PPT_EVENT || 'domcontentloaded' });

    const content = await page.content();

    await browser.close();
    return content;
  },
});

const start = async () => {
  try {
    await server.listen({ port: 8080, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
