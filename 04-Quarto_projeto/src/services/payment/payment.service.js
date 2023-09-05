import axios from 'axios';


class PaymentService {
  async processPayment() {
    const payment = {
      customer: {
        name: "Lucas Machado",
        email: "lucas.pva@hotmail.com",
        tax_id: "64162900060"
      },
      reference_id: "1",
      items: [
        {
          name: "Tênis",
          quantity: 2,
          unit_amount: 10000
        }
      ]
    
    }
    try
    {
      const response = await axios.post('https://sandbox.api.pagseguro.com/orders',
      payment,
      {
        'Authorization':'BB16903243274A28AD8256F1CFD89DA3',
        'accept':'application/json',
        'content-type':'application/json'
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    };
    
  }
}

export default new PaymentService();

