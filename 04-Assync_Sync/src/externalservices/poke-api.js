const axios = require('axios');
exports.getPoke = async function (pokemon, slot) {
  const abilitiesData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  const abilities = abilitiesData.data.abilities.filter((abilitie) => abilitie.slot > slot)
  return abilities;
}