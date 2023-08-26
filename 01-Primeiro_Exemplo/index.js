const btnBuscaCep = document.getElementById('btnBuscaCep');

btnBuscaCep.addEventListener('click', () => {
    const cep = document.getElementById('cep').value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) =>{
        return res.json();
    }).then((response) => {
        if (response) {
          const endereco = document.getElementById('endereco');
          endereco.innerHTML = `
          <b> Rua: </b> ${response.logradouro}
          <b> Bairro: </b> ${response.bairro}
          <b> Cidade: </b> ${response.localidade}
          <b> UF: </b> ${response.uf}
          `
        }
    }).catch((error) =>{
        console.error(error);
    })
});

