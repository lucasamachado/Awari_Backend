import PaymentService from "../../services/payment/payment.service.js";
class WebHookController {
  async index(req, res) { 
    await PaymentService.updateOrder(req.body.id, req.body.charges[0].status)
    return  res.status(200).json(true);
  }
}



export default new WebHookController();


