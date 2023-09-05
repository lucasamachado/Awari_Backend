class UserService {
  searchUser() {
    const users = [
      {
        nome: "Lucas",
        sobrenome: "Machado",
        curso: "Backend",
        instituicao: "Awari",
      },
      {
        nome: "João",
        sobrenome: "Souza",
        curso: "Backend",
        instituicao: "Awari",
      },
    ];
    return users;
  }
}

export default new UserService();