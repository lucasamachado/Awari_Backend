import axios from 'axios';


class PaymentService {
  async processPayment(input) {
    const payment = this.mountPaymentBody(input);
    console.log(process.env.PAYMENT_GATEWAY_BASE_URL);
    console.log(process.env.PAYMENT_GATEWAY_TOKEN);
    try
    {
      console.log(JSON.stringify(payment));
      const response = await axios.post(`${process.env.PAYMENT_GATEWAY_BASE_URL}/orders`,
      {
        'Authorization': process.env.PAYMENT_GATEWAY_TOKEN,
        'accept':'application/json',
        'content-type':'application/json'
      },JSON.stringify(payment));
      return response;
    } catch (error) {
      console.log(error.response.data);
      return false;
    };
    
  }

  mountPaymentBody (body) {
    const unitAmount = body.item.unitAmount * 100;
    const referenceId =  Math.random().toString().replace('.','');    
    return {
      reference_id: `purchase-${referenceId}`,
      customer: {
        name: body.user.name,
        email: body.user.email,
        tax_id: body.user.documentNumber
      },
      shipping: {
        address: {
          street: body.user.address.street,
          number: body.user.address.number,
          city: body.user.address.city,
          region_code: body.user.address.regionCode,
          country: body.user.address.country,
          postal_code: body.user.address.postalCode,
          complement: body.user.address.complement,
          locality: body.user.address.locality
        }
      },
      items: [
        {
          name: body.item.name,
          quantity: body.item.quantity,
          unit_amount: unitAmount
        }
      ],
      charges: [
        {
          amount: {
            value: unitAmount * body.item.quantity,
            currency: 'BRL'
          },
          payment_method: {
            card: {
              holder: {
                name: body.payment.cardHolderName
              },
              id: '1',
              number: body.payment.cardNumber,
              exp_month: body.payment.cardExpMonth,
              exp_year: body.payment.cardExpYear,
              security_code: body.payment.cardSecurityCode
            },
            type: 'CREDIT_CARD',
            installments: 1,
            capture: true,
            soft_descriptor: `Loja Teste - ${body.item.name}`
          },
          reference_id: `payment-${referenceId}`,
          description: `Compra de - ${body.item.name}`
        }
      ]
    }
  }

}

export default new PaymentService();

