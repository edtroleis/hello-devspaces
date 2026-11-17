# Hello Dev Spaces API

[![Open in Dev Spaces](https://img.shields.io/badge/Open%20in-Dev%20Spaces-EE0000?logo=redhat&logoColor=white)](https://devspaces.apps.rm1.0a51.p1.openshiftapps.com/dashboard/#/load-factory?url=https://github.com/edtroleis/hello-devspaces)

Aplicação Node.js de exemplo usada na demonstração do **Red Hat OpenShift Dev Spaces**.

É uma API pequena feita com [Express](https://expressjs.com/). Ela informa a versão do Node.js e o nome do pod que atendeu a requisição. A documentação é gerada pelo [Swagger UI](https://swagger.io/tools/swagger-ui/).

## Abrir no Dev Spaces

Clique no badge acima. O Dev Spaces cria um workspace a partir do `devfile.yaml` deste repositório, com:

- a mesma imagem do sample **Node.js Express** (Universal Developer Image, com Node.js e NPM já instalados)
- a porta 3000 publicada como endpoint HTTPS
- os comandos **Download dependencies** (`npm install`) e **Run the web app** (`node app.js`), disponíveis em *Terminal > Run Task... > devfile*

## Pré-requisitos (fora do Dev Spaces)

- Node.js e NPM

## Como executar

```bash
git clone https://github.com/edtroleis/hello-devspaces.git
cd hello-devspaces
npm install
node app.js
```

Saída esperada:

```
App rodando na porta 3000
```

No Dev Spaces, a porta 3000 é detectada sozinha e aparece uma notificação para abrir a aplicação. O link usa uma rota HTTPS pública. Clique em **Open in New Tab**.

## Endpoints

| Rota        | Descrição                                                       |
|-------------|-----------------------------------------------------------------|
| `/`         | Redireciona para `/docs/`                                       |
| `/docs`     | Documentação da API (Swagger UI)                                |
| `/api/info` | JSON com a versão do Node, o nome do pod e o uptime em segundos |

Teste pelo terminal:

```bash
curl -s http://localhost:3000/api/info
```

Formato da resposta:

```json
{ "node": "v16.20.2", "pod": "<nome-do-pod>", "uptime": 42 }
```

## O código (`app.js`)

```js
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
```

## Criando do zero

Para recriar o projeto sem clonar:

```bash
mkdir -p hello-app && cd hello-app && npm init -y > /dev/null
npm install express swagger-ui-express
# crie o app.js com o código acima
node app.js
```
