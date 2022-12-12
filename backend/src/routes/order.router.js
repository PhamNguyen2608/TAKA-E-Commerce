const { Router } = require('express');
const { USER, ADMIN } = require('../configs/constants');
const OrderControllers = require('../controllers/order');
const auth = require('../middlewares/auth');
const orderRouter = Router();

orderRouter.get('/user', auth(USER), OrderControllers.queryUsersOrdersList);
orderRouter.get('/all', auth(ADMIN), OrderControllers.getAllOrder);
orderRouter.get('/', auth(ADMIN), OrderControllers.queryOrders);
orderRouter.get('/count', auth(ADMIN), OrderControllers.getPendingOrderCount);
// Payment By VnPay
orderRouter.post(
  '/create_payment_url',
  auth(USER),
  OrderControllers.createPaymentUrlByVnPay
);
orderRouter.get(
  '/vnpay_return',
  auth(USER),
  OrderControllers.getPaymentReturnUrlByVnPay
);

//  Payment By PayPal
orderRouter.post(
  '/create_payment_paypal',
  auth(USER),
  OrderControllers.createPaymentUrlByPayPal
);
orderRouter.get(
  '/return_url_paypal',
  auth(USER),
  OrderControllers.getReturnUrlByPayPal
);
// Payment By MOMO
orderRouter.post(
  '/create_payment_momo',
  auth(USER),
  OrderControllers.createPaymentUrlByMoMo
);
// orderRouter.get(
//   '/return_url_paypal',
//   auth(USER),
//   OrderControllers.getReturnUrlByPayPal
// );
//

orderRouter.get('/:_id', OrderControllers.getOneOrder);
// orderRouter.get('/:_id', auth(USER), OrderControllers.getOneOrder);
// orderRouter.get('/:_id', auth(ADMIN), OrderControllers.getOrderByUserId);

orderRouter.post('/', auth(USER), OrderControllers.createOrder);
orderRouter.put('/:_id', auth(ADMIN), OrderControllers.updateOrder);
orderRouter.put('/cancel-order/:_id', auth(USER), OrderControllers.cancelOrder);
orderRouter.put(
  '/restore-order/:_id',
  auth(USER),
  OrderControllers.restoreOrder
);
orderRouter.delete('/:_id', auth(ADMIN), OrderControllers.removeOrder);

module.exports = orderRouter;
