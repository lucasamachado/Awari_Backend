import {Router} from "express";
import UserController from './controllers/user/user.controller.js'
import ProductController from './controllers/product/product.controller.js'
import PaymentController from './controllers/payment/payment.controller.js'
import webhookController from "./controllers/webhook/webhook.controller.js";

const routes = Router();

/*Rotas de webhook*/
routes.post('/webhooks', webhookController.index)

/*Rotas de usuário*/
routes.get('/usuarios', UserController.list)
routes.post('/usuarios', UserController.create);
routes.put('/usuarios/:id', UserController.update);
routes.patch('/usuarios/:id', UserController.update);
routes.delete('/Usuarios/:id',UserController.delete);


/*Rotas de produtos*/
routes.get('/produtos', ProductController.list)
routes.post('/produtos', ProductController.create);
routes.put('/produtos/:id', ProductController.update);
routes.patch('/produtos/:id', ProductController.update);
routes.delete('/produtos/:id',ProductController.delete);

/*Rotas de pagamento*/
routes.post('/payment',PaymentController.Payment);
routes.get('/payment',PaymentController.list);
//routes.delete('/payment/:id',PaymentController.delete);
//routes.put('/payment/:id',PaymentController.update);
//routes.patch('/payment/:id',PaymentController.update);

export default routes;