import PaymentService from "../../services/payment/payment.service.js";

class PaymentController {
  async Payment(req, res) {
    const response = await PaymentService.processPayment();
    if (!response) {
      return  res.status(400).json({message : 'Erro no pagamento'});  
    }
    return  res.status(201).json(response);
  }

}

export default new PaymentController();