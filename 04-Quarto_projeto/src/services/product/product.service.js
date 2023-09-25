import connection from "../../config/db/mysql.js";

class ProductService {

  async create(payload) {
    try {
      await connection.query(`insert into products
                                            (name, description, price, image_url, stock) 
                                            values
                                            ('${payload.name}', '${payload.description}', ${payload.price}, '${payload.image_url}', ${payload.stock})`);
      return true

    } catch (error) {
      console.log(error);
      throw new Error();
    }

  }   
  
  
  async search() {
    try {
      const product = await connection.query(`select 
                                            id, name, description, price, image_url, stock from products`);

      return product[0];
    } catch (error) {
      console.log(error);
      throw new Error();
    }

  }


  async update(payload, id){
    try {
    
      
        await connection.query(`update products set name = '${payload.name}', 
                                description = '${payload.description}', 
                                price = ${payload.price},
                                image_url = '${payload.image_url}',
                                stock = ${payload.stock}
                                where id = ${id}`)
        return true;                    

    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }  

  async delete(id){
    try {
      
      
        await connection.query(`delete from products where id = ${id}`)
        return true;                    
      
    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }    


  async find(id){
    try{
      const product = await connection.query(`select id, name, description, price, image_url, stock from products where id = ${id}`);
      if (product && product[0]) {
        return product[0][0];
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }  

  checkStock(quantity, stockQuantity){
    if (quantity <= stockQuantity){
      return true
    }
    return false 
  }

  async updateStock(quantity, id){
    try {
    
      
        await connection.query(`update products set stock = stock - ${quantity} 
                                where id = ${id}`)
        return true;                    

    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }    

}


export default new ProductService();