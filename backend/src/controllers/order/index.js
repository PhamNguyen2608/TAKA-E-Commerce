const DTO = require('./DTO');
const HttpException = require('../../helpers/http_exception');
const catchRoutesError = require('../../helpers/catch_routes_error');
const OrderHandlers = require('./handlers');
const { ERROR, CLIENT_API } = require('../../configs/constants');
const EmailService = require('../../services/sendEmail');
const dateFormat = require('dateformat');
const querystring = require('qs');
const sha256 = require('sha256');
const crypto = require('crypto');
const paypal = require('paypal-rest-sdk');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const data = DTO.createOrder(req.body);
      const response = await OrderHandlers.createOrder(data);

      // if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateOrder(req, res, next) {
    try {
      const { _id } = req.params;

      const newData = DTO.updateOrder(_id, req.body);
      const response = await OrderHandlers.updateOrder(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error?.status || 500, catchRoutesError(error))
      );
    }
  }

  async restoreOrder(req, res, next) {
    try {
      const user_id = req.user._id;

      const query = DTO.restoreOrder(req.params);
      const response = await OrderHandlers.restoreOrder(user_id, query);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
  async cancelOrder(req, res, next) {
    try {
      const user_id = req.user._id;

      const query = DTO.cancelOrder(req.params);
      const response = await OrderHandlers.cancelOrder(user_id, query);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeOrder(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeOrder(_id);
      const response = await OrderHandlers.removeOrder(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryOrders(req, res, next) {
    try {
      const { params, conditions } = DTO.queryOrders(req.query);
      const response = await OrderHandlers.queryOrders(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
  async getAllOrder(req, res, next) {
    try {
      const response = await OrderHandlers.getAllOrder();

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryUsersOrdersList(req, res, next) {
    try {
      const params = DTO.queryUserOrdersList(req.query);
      const response = await OrderHandlers.queryUserOrdersList(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getPendingOrderCount(req, res, next) {
    try {
      const response = await OrderHandlers.getPendingOrderCount();

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getOneOrder(req, res, next) {
    try {
      const { _id } = DTO.getOneOrder(req.params);

      const response = await OrderHandlers.getOneOrder(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
  async getOrderByUserId(req, res, next) {
    try {
      const { _id } = DTO.getOneOrder(req.params);

      const response = await OrderHandlers.getOrderByUserId(_id);

      // if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
  //VNPay
  async createPaymentUrlByVnPay(req, res, next) {
    let ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let vnpUrl = process.env.VNP_URL;
    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    let orderId = dateFormat(date, 'HHmmss');
    let amount = req.body.amount;
    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.VNP_TMN_CODE;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toán hóa đơn';
    vnp_Params['vnp_OrderType'] = 'billpayment';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = process.env.VNP_RETURN_URL;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = 'NCB';

    const secretKey = process.env.VNP_HASH_SECRET;
    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    const query = '?' + querystring.stringify(vnp_Params, { encode: false });
    vnpUrl += query;

    res.status(200).json({ code: '00', data: vnpUrl, query });
  }

  async getPaymentReturnUrlByVnPay(req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.VNP_HASH_SECRET;

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      res.status(200).json({ RspCode: '00', Message: 'success', rspCode });
    } else {
      res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
  }
  // PayPal payment
  async createPaymentUrlByPayPal(req, res, next) {
    const items = req.body.items;
    const amount = req.body.amount;

    var create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${CLIENT_API}/success`,
        cancel_url: `${CLIENT_API}/checkout`,
      },
      transactions: [
        {
          item_list: {
            items: items,
          },
          amount: {
            currency: 'USD',
            total: amount,
          },
          description: 'This is the payment description.',
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        res.json({ message: error, status: 'error' });
      } else {
        res.json({ message: payment, status: 'success' });
      }
    });
  }

  async getReturnUrlByPayPal(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      // transactions: [
      //   {
      //     amount: {
      //       currency: 'USD',
      //       total: '25.00',
      //     },
      //   },
      // ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          res.json({ message: error, status: 'failed' });
        } else {
          res.json({ message: payment });
        }
      }
    );
  }
  // Momo payment
  async createPaymentUrlByMoMo(req, res, next) {
    const { total_price, _id } = req.body;
    var partnerCode = process.env.PARTNER_CODE_MOMO;
    var accessKey = process.env.ACCESS_KEY_MOMO;
    var secretkey = process.env.SECRET_KEY_MOMO;
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = 'TAKA SHOP - Thanh toán hóa đơn ' + _id;
    var redirectUrl = `${CLIENT_API}/success`;
    var ipnUrl = 'https://callback.url/notify';
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = total_price;
    var requestType = 'captureWallet';
    var extraData = ''; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    // console.log('--------------------RAW SIGNATURE----------------');
    // console.log(rawSignature);
    //signature
    var signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
    // console.log('--------------------SIGNATURE----------------');
    // console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en',
    });
    //Create the HTTPS objects
    const https = require('https');
    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };
    //Send the request and get the response
    const request = https.request(options, (response) => {
      console.log(`Status: ${response.statusCode}`);
      console.log(`Headers: ${JSON.stringify(response.headers)}`);
      response.setEncoding('utf8');
      response.on('data', (body) => {
        // console.log('Body: ');
        // console.log(body);
        // console.log('payUrl: ');
        // console.log(JSON.parse(body).payUrl);
        res.json({ payUrl: JSON.parse(body).payUrl });
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    });

    // req.on('error', (e) => {
    //   console.log(`problem with request: ${e.message}`);
    // });
    // write data to request body
    console.log('Sending....');
    request.write(requestBody);
    request.end();
  }
}
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
module.exports = new OrderController();
