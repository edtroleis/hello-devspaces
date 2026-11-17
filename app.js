const express = require('express');
const os = require('os');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.get('/api/info', (req, res) => {
  res.json({ node: process.version, pod: os.hostname(), uptime: Math.round(process.uptime()) });
});

const spec = {
  openapi: '3.0.0',
  info: { title: 'Hello Dev Spaces API', version: '1.0.0' },
  paths: {
    '/api/info': {
      get: { summary: 'Versão do Node e pod que atendeu', responses: { 200: { description: 'OK' } } },
    },
  },
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
app.get('/', (req, res) => res.redirect('/docs/'));

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
