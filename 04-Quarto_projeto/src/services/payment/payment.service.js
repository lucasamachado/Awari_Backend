import axios from 'axios';
import mongo from '../../config/db/mongodb.js'
import { ObjectId } from 'mongodb';
import userService from '../user/user.service.js';
import {v4 as uuidv4} from 'uuid'
import productService from '../product/product.service.js';


class PaymentService {
  async processPayment(input) {
    const user =await userService.find(input.user.userId);
    const product =await productService.find(input.item.productId);
    if (!productService.checkStock(input.item.quantity, product.stock)) {
      return false;
    }
    const payload = {
      input,
      user,
      product
    }
    const payment = this.mountPaymentBody(payload);
    console.log(payment)
    try
    {
      const response = await axios.post(`${process.env.PAYMENT_GATEWAY_BASE_URL}/orders`, payment, {
        headers: {
          'Authorization': `${process.env.PAYMENT_GATEWAY_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });
      const db = await mongo();
      await db.collection('payments').insertOne({
        id: response.data.id,
        gatawayReferenceId: response.data.reference_id,
        referenceId: uuidv4(),
        customer: response.data.customer,
        items: response.data.items,
        status: response.data.charges[0].status,
        charge: { 
          id: response.data.charges[0].id, 
          amount: response.data.charges[0].amount
        },
        paymentType: response.data.charges[0].payment_method.type
      })
      await productService.updateStock(input.item.quantity, product.id)
      return response;

    } catch (error) {
      console.log(error.response.data);
      return false;
    };
    
  }

  async listOrders() {
    try {
      const db = await mongo();
      const orders = await db.collection('payments').find().toArray();
      //const orders = await db.collection('payments').findOne({gatewayId : 'AAAAAA'}); busca somente um
      return(orders)
    } catch (error) {
      console.log(error.response.data);
      return false;
    }
  }


  async updateOrder(id, status) {
    try {
      const db = await mongo();
      await db.collection('payments').updateOne(
        {id : id},
        {$set : {status} }
      )
        //const orders = await db.collection('payments').findOne({gatewayId : 'AAAAAA'}); busca somente um
      return(order)
    } catch (error) {
      return false;
    }
  }

/*
  async deleteOrder(id) {
    try {
      const db = await mongo();
      console.log(id)
      const orders = await db.collection('payments').deleteOne({_id: new ObjectId(id)})
      //const orders = await db.collection('payments').findOne({gatewayId : 'AAAAAA'}); busca somente um
      return(orders)
    } catch (error) {
      console.log(error.response.data);
      return false;
    }
  }*/

  mountPaymentBody (body) {
    const unitAmount = body.product.price * 100;
    const referenceId =  Math.random().toString().replace('.','');    
    return {
      reference_id: `purchase-${referenceId}`,
      customer: {
        name: body.user.name,
        email: body.user.email,
        tax_id: body.user.document_number
      },
      shipping: {
        address: {
          street: body.user.address_street,
          number: body.user.address_number,
          city: body.user.address_city,
          region_code: body.user.address_region_code,
          country: body.user.address_country,
          postal_code: body.user.address_zip_code,
          complement: body.user.address_complement,
          locality: body.user.address_locality
        }
      },
      items: [
        {
          name: body.product.name,
          quantity: body.input.item.quantity,
          unit_amount: unitAmount
        }
      ],
      charges: [
        {
          amount: {
            value: unitAmount * body.input.item.quantity,
            currency: 'BRL'
          },
          payment_method: {
            card: {
              holder: {
                name: body.input.payment.cardHolderName
              },
              number: body.input.payment.cardNumber,
              exp_month: body.input.payment.cardExpMonth,
              exp_year: body.input.payment.cardExpYear,
              security_code: body.input.payment.cardSecurityCode,
              soft_descriptor: 'Camisa'
            },
            type: 'CREDIT_CARD',
            installments: 1,
            capture: true,
            soft_descriptor: `Loja Teste`
          },
          reference_id: `payment-${referenceId}`,
          description: `Compra de - ${body.product.name}`
        }
      ],
      notification_urls : [
        "https://21ff-2804-d59-7f46-e600-f885-a717-593-405.ngrok-free.app/webhooks"  
      ]
    }
  }

}

export default new PaymentService();

