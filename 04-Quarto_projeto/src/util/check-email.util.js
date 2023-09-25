import connection from "../config/db/mysql.js";

class CheckEmailUtil {
  async CheckEmail(email){
    const response = await connection.query(`Select count(email) qtd , id
    from users
    where email = '${email}'
    group by id`);
    if (response[0] && response[0].length > 0) {
    return {count: response[0][0].qtd, id : response[0][0].id}
    }
    return false

    
  }
}

export default new CheckEmailUtil();