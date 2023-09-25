import ProductService from "../../services/product/product.service.js";

class ProductController {
  async create(req, res) {
    try {
      const response = await ProductService.create(req.body);
      if (response) {
        return res.status(201).json(req.body);
      }
      return res.status(400).json({message: 'Email já cadastrado.'});
    } catch (error) {
      return res.status(500).json({error: 'internal server error'});
    }
  }

  async list(req, res) {
    try {    
      const response = await ProductService.search();
      return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({error: 'internal server error'});
    }
    
  }

  async update(req, res) {
    try{   
      const id = req.params.id;
      const response = await ProductService.update(req.body, id);
      if (response) {
        return res.status(200).json(req.body);
      }
      return res.status(400).json({message: 'Email já cadastrado.'});
    } catch(error) {
      return res.status(500).json({error: 'internal server error'});
    } 

  }  

  async delete(req, res) {
    try{   
      const id = req.params.id;
      await ProductService.delete(id);
      return res.status(200).json();
    } catch(error) {
      return res.status(500).json({error: 'internal server error'});
    } 
  }   

}

export default new ProductController();