const nomes = ['Lucas', 'Jéssika', 'Suzana', 'Patrícia'];

console.log('Usando For');
for (let x = 0; x < nomes.length; x++){
  console.log(nomes[x]);
}

console.log('Usando forEach');
nomes.forEach((nome) => {
  console.log(nome);
})

console.log('Usando filter');
nomes.filter((nome) =>{
  if (nome != 'Suzana') {
    console.log(nome)
  }
})