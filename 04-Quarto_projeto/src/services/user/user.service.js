import connection from "../../config/db/mysql.js";
import checkEmailUtil from "../../util/check-email.util.js";

class UserService {
  async searchUser() {
    try {
      const users = await connection.query('select * from users');
      return users[0];
    } catch (error) {
      console.log(error);
      throw new Error();
    }

  }
  async createUser(payload) {
    try {
      const checkEmail = await checkEmailUtil.CheckEmail(payload.email);
      if (checkEmail.count === 0){ 

        await connection.query(`insert into users
                                              (name, surname, email, password) 
                                              values
                                              ('${payload.name}', '${payload.surname}', '${payload.email}', '${payload.password}')`);
      return true
      } 
       return false;
    } catch (error) {
      console.log(error);
      throw new Error();
    }

  }  

  async updateUser(payload, id){
    try {
      const checkEmail = await checkEmailUtil.CheckEmail(payload.email);  
      if ((checkEmail === 0) || (checkEmail.count === 1 && checkEmail.email === payload.email) ){      
        await connection.query(`update users set name = '${payload.name}', 
                                surname = '${payload.surname}', 
                                email = '${payload.email}'
                                where id = ${id}`)
        return true;                    
      }
      return false;
    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }
}


export default new UserService();