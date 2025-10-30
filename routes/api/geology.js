// routes/geology.js
require('dotenv').config();
const axios = require('axios');

const API_BASE = process.env.API_BASE;

async function geologyRouter(fastify, options) {
    const API_BASE = 'http://10.6.0.6:58233';

    // GET /api/geology/rocks → FastAPI /rocks
    fastify.get('/rocks', async (req, reply) => {
        try {
            const response = await axios.get(`${API_BASE}/rocks`);
            reply.code(response.status).send(response.data);
        } 
        catch (err) {
            fastify.log.error(`Error contacting FastAPI: ${err.message}`);
            reply.code(500).send({ error: 'Failed to reach FastAPI backend' });
        }
    });

    // GET /api/geology/minerals → FastAPI /minerals
    fastify.get('/minerals', async (req, reply) => {
        try {
            const response = await axios.get(`${API_BASE}/minerals`);
            reply.code(response.status).send(response.data);
        } 
        catch (err) {
            fastify.log.error(`Error contacting FastAPI: ${err.message}`);
            reply.code(500).send({ error: 'Failed to reach FastAPI backend' });
        }
    });

      // POST /api/geology/add_rock → FastAPI /rocks
  fastify.post('/add_rock', async (req, reply) => {
    try {
      const response = await axios.post(`${API_BASE}/rocks`, req.body, {
        headers: { 'Content-Type': 'application/json' },
      });
      reply.code(response.status).send(response.data);
    } catch (err) {
      fastify.log.error(`Error posting to FastAPI: ${err.message}`);
      reply.code(500).send({ error: 'Failed to post to FastAPI backend' });
    }
  });
}

module.exports = geologyRouter;
