import UserService from "../../services/user/user.service.js";

class UserController {
  create(req, res) {
    console.log(req.body);
    return res.status(201).json(req.body);
  }

  list(req, res) {
    const response = UserService.searchUser();
    return res.status(200).json(response);
  }

  update(req, res) {
    console.log(req.body);
    return res.status(200).json(req.body);
  }  

  delete(req, res) {
    console.log(req.body);
    return res.status(200).json(req.body);
  }   

}

export default new UserController();