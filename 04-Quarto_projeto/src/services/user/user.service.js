import connection from "../../config/db/mysql.js";
import checkEmailUtil from "../../util/check-email.util.js";

class UserService {
  async searchUser() {
    try {
      const users = await connection.query(`select 
                                            id,
                                            name,
                                            surname,
                                            document_number,
                                            email,
                                            password,
                                            address_street,
                                            address_number,
                                            address_complement,
                                            address_locality,
                                            address_city,
                                            address_region_code,
                                            address_country,
                                            address_zip_code 
                                            from users`);

      return users[0];
    } catch (error) {
      console.log(error);
      throw new Error();
    }

  }
  async createUser(payload) {
    try {
      const checkEmail = await checkEmailUtil.CheckEmail(payload.email);
      if ((!checkEmail) || (checkEmail.count === 0)){ 

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
       if ((!checkEmail) || (checkEmail === 0) || (checkEmail.count == 1 && checkEmail.id == id) ){      
      
        await connection.query(`update users set name = '${payload.name}', 
                                surname = '${payload.surname}', 
                                email = '${payload.email}',
                                document_number = '${payload.document_number.toString()}',
                                address_street = '${payload.address_street}',
                                address_number = '${payload.address_number.toString()}',
                                address_complement = '${payload.address_complement}',
                                address_locality = '${payload.address_locality}',
                                address_city = '${payload.address_city}',
                                address_region_code = '${payload.address_region_code}',
                                address_country = '${payload.address_country}',
                                address_zip_code = '${payload.address_zip_code}'
                                where id = ${id}`)
        return true;                    
      }
      return false;
    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }

  async deleteUser(id){
    try {
      
      
        await connection.query(`delete from users where id = ${id}`)
        return true;                    
      
    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }  

  async find(id){
    try{
      const user = await connection.query(`select   name,
                                            surname,
                                            document_number,
                                            email,
                                            password,
                                            address_street,
                                            address_number,
                                            address_complement,
                                            address_locality,
                                            address_city,
                                            address_region_code,
                                            address_country,
                                            address_zip_code  from users where id = ${id}`);
      if (user && user[0]) {
        return user[0][0];
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

}


export default new UserService();