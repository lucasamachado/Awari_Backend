import PaymentService from "../../services/payment/payment.service.js";

class PaymentController {
  async Payment(req, res) {
    console.log(req.body)
    const response = await PaymentService.processPayment(req.body);
    if (!response) {
      return  res.status(400).json({message : 'Erro no pagamento'});  
    }
    return  res.status(201).json(response);
  }

}

export default new PaymentController();


/*
{
  "user": {
    "name": "Lucas Machado",
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
    "cardExpMonth": 12,
    "cardExpYear": 2030,
    "cardSecurityCode": "123",
    "cardHolderName": "Lucas Machado"
  }
}

*/