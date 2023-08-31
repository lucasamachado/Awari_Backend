const express = require('express');
const { getPoke } = require('./src/externalservices/poke-api')
const server = express();

server.get('/pokemon/habilidades/:pokemon', async (req, res) => {
  const params = req.params;
  const queries = req.query;
  const abilities = await getPoke(params.pokemon,queries.slot);
  return res.send(abilities);
})

server.listen(3333);

/**npm rund Dev 
 * http://localhost:3333/produtos
 * npm install axios
 * 
*/