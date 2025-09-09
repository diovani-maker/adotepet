const express = require('express');
const bodyParser = require('body-parser');
const petsRouter = require('./api/pets');  // Importando a API de pets

const app = express();

// Middleware para permitir que o servidor receba JSON
app.use(bodyParser.json());  // Para aceitar JSON no corpo das requisições

// Usar a rota de pets com prefixo /api
app.use('/api', petsRouter);

// Definir a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
