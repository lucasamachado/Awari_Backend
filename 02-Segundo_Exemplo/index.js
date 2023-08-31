const express = require('express');
const axios = require('axios');

const server = express();
server.get('/rota', async (req, res) => {
  //http://localhost:3333/rota?nome=Lucas
  const result = await axios.get(`https://viacep.com.br/ws/${req.query.cep }/json`);
  console.log (result.data);
  //console.log(req.query);
  return res.send('Deu certo!');
});

server.listen(3333);