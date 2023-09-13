import connection from "../config/db/mysql.js";

class CheckEmailUtil {
  async CheckEmail(email){
    const response = await connection.query(`Select count(email) count, email
    from users
    where email = '${email}'`);
    //return console.log(response[0][0].count);
    return { count: response[0][0].count, email : email}
  }
}

export default new CheckEmailUtil();