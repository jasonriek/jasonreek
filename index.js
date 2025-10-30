require('dotenv').config();
const path = require('path');
const fastify = require('fastify')({logger: true});
const fastify_view = require('@fastify/view');
const fastify_static = require('@fastify/static');
const handlebars = require('handlebars');

// env vars
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

// Import routes
const geology_router = require('./routes/api/geology');

// Serve static files
fastify.register(fastify_static, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // e.g. http:localhost:3000/public/style.css
});

// Register Handlebars view engine
fastify.register(fastify_view, {
    engine: { handlebars },
    root: path.join(__dirname, 'views'),
    layout: 'layout.hbs',
    includeViewExtension: true
});

// Register routes
fastify.register(geology_router, { prefix: '/api/geology' });

// Routes
fastify.get('/', async (req, reply) => {
  return reply.view('index', { title: 'Home', message: 'Welcome to Fastify!' });
});

// Start server
fastify.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});