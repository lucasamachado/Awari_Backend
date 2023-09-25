import PaymentService from "../../services/payment/payment.service.js";

class PaymentController {
  async list(req, res) {
    
    const response = await PaymentService.listOrders();
    if (!response) {
      return  res.status(400).json({message : 'Erro na listagem de pagamentos'});  
    }
    return  res.status(200).json(response);
  }


  async Payment(req, res) {
    
    const response = await PaymentService.processPayment(req.body);
    if (!response) {
      return  res.status(400).json({message : 'Erro no pagamento'});  
    }
    return  res.status(201).json(response.data);
  }

  /*
  async update(req, res) {
    
    const response = await PaymentService.updateOrder(req.params.id, req.body);
    if (!response) {
      return  res.status(400).json({message : 'Erro na atualizacao'});  
    }
    return  res.status(200).json(req.body);
  }    
  
  async delete(req, res) {
    
    const response = await PaymentService.deleteOrder(req.params.id);
    if (!response) {
      return  res.status(400).json({message : 'Erro na deleção'});  
    }
    return  res.status(204).json();
  }  */

}



export default new PaymentController();


/*
{
  "user": {
    "name": "Lucas Machadoddd",
    "email": "lucas@teste.com",
    "documentNumber": "12345678909",
    "address" : {
      "street": "Avenida Brigadeiro Faria Lima",
      "number": "1384",
      "complement": "apto 12",
      "locality": "Pinheiros",
      "city": "São Paulo",
      "regionCode": "SP",
      "country": "BRA",
      "postalCode": "01452002"
    }
  },
  "item": {
    "name": "Camisa",
    "quantity": 1,
    "unitAmount": 30.00
  },
  "payment": {
    "cardNumber": "4111111111111111",
    "cardExpMonth": 3,
    "cardExpYear": 2026,
    "cardSecurityCode": "123",
    "cardHolderName": "Lucas Machado"
  }
}

*/