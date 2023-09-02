import {Router} from "express";

const routes = Router();

routes.get('/usuarios', (req, res) => {
//http://localhost:3333/RotaGet/?curso=back&aula=06  
  console.log(req.query);
  const response = {
    Nome : 'Lucas',
    Sobrenome : 'Machado'
  }
  //return res.send('Deu certo RotaGet');
  return res.status(201).json(response);
})

routes.get('/usuarios/:nome', (req, res) => {
//  http://localhost:3333/RotaGet/Lucas
  console.log(req.params);
  return res.send('Deu certo RotaGet');
})

routes.post('/usuarios', (req, res) => {
  console.log(req.body);
  return res.status(201).json(req.body);
});

routes.put('/usuarios/:id', (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
});

routes.delete('/Usuarios/:id', (req, res) => {
    return res.status(204).json();
});

export default routes;