const usuarios = [{
  nome: "Lucas",
  curso: "Backend",
  hobbie: "Jogar video game"
},
{
  nome: "Jéssika",
  curso: "Ingles",
  hobbie: "Teatro"
},
{
    nome: "patricia",
    curso: "Pedagogia",
    hobbie: "Caminhada"
  }
]

usuarios.filter(usuario => usuario.nome =='Lucas');
usuarios.map(usuario => usuario.nome);