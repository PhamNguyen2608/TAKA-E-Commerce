const {
  SUCCESS,
  OK,
  ERROR,
  PAGE_SIZE,
  PENDING,
  CANCELED,
} = require('../../configs/constants');
const EmailService = require('../../services/sendEmail');
const catchHandlerError = require('../../helpers/catch_handler_error');
const HttpException = require('../../helpers/http_exception');
const OrderModel = require('../../models/order.model');
const OrderItemModel = require('../../models/order_item.model');
const axios = require('axios');
const mongoose = require('mongoose');
require('../../models/category.model');
require('../../models/brand.model');
class OrderHandlers {
  async createOrder(data) {
    try {
      const result = await OrderModel.create(data);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create order!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateOrder(_id, newData) {
    try {
      const query = { _id };
      const data = newData;

      const option = {
        new: true,
        runValidations: true,
      };

      const result = await OrderModel.findOneAndUpdate(
        query,
        data,
        option
      ).populate({
        path: 'user',
        model: 'user_model',
        select: '_id email first_name last_name phone address',
      });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update order!'),
        };
      const order_items = await OrderItemModel.find({
        order_id: result._id,
      }).populate({
        path: 'product',
        model: 'product_model',
        populate: {
          path: 'brand',
          model: 'brand_model',
        },
      });
      if (data.order_status === 'CONFIRMED') {
        const data = { ...result.toObject(), order_items };
        await EmailService.sendMailOrderProducts(data);
      }

      if (order_items && data.order_status === 'CONFIRMED') {
        let items = [];
        order_items.map((x, index, self) => {
          let item = {};
          item.name = x.product.name;
          item.quantity = parseInt(x.quantity);
          item.price = x.product.sale_percent;

          items.push(item);
        });

        const orderGhn = {
          payment_type_id: 2,
          note: '',
          required_note: 'KHONGCHOXEMHANG',
          to_name: result.user.first_name + result.user.last_name,
          to_phone: result.user.phone,
          to_address: `${result.address.province.name}, ${result.address.district.name}, ${result.address.ward.name}, ${result.address.street}`,
          to_ward_code: result.address.ward.wardCode,
          to_district_id: result.address.ward.districtID,

          weight: 200,
          length: 1,
          width: 19,
          height: 10,

          service_id: 0,
          service_type_id: 2,

          cod_amount: result.payment_type === 'COD' ? result.total_price : 0,
          items,
        };

        try {
          const { data } = await axios.post(
            'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',
            orderGhn,
            {
              headers: {
                'Content-Type': 'application/json',
                shop_id: 113974,
                token: '51fdcf03-ddd8-11ec-ac64-422c37c6de1b',
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async restoreOrder(user_id, query) {
    try {
      const order = await OrderModel.findOne(query);

      if (order.order_status !== CANCELED && order.user !== user_id)
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not canceled order!'),
        };

      const option = {
        new: true,
        runValidations: true,
      };

      const result = await OrderModel.findOneAndUpdate(
        { ...query },
        {
          order_status: PENDING,
          cancelDate: '',
          createdAt: new Date().toISOString(),
        },
        option
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Canceled order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
  async cancelOrder(user_id, query) {
    try {
      const order = await OrderModel.findOne(query);

      if (order.order_status !== PENDING && order.user !== user_id)
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not canceled order!'),
        };

      const option = {
        new: true,
        runValidations: true,
      };

      const result = await OrderModel.findOneAndUpdate(
        { ...query },
        {
          order_status: CANCELED,
          cancelDate: new Date(Date.now()),
        },
        option
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Canceled order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeOrder(_id) {
    try {
      const result = await OrderModel.deleteOne({ _id });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not remove order!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Remove order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getAllOrder() {
    try {
      const total = await OrderModel.count();
      const results = await OrderModel.find()

        .sort({ createdAt: -1 })
        .populate({
          path: 'user',
          model: 'user_model',
          select: '_id first_name last_name avt_url address',
        });

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get orders!'),
        };

      const orderDetails = await Promise.all(
        results.map(async (item) => {
          const order_items = await OrderItemModel.find({
            order_id: item._id,
          }).populate({
            path: 'product',
            model: 'product_model',
            populate: {
              path: 'brand',
              model: 'brand_model',
            },
          });

          return {
            ...item.toObject(),
            order_items,
          };
        })
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get orders successfully!',
          data: orderDetails,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
  async queryOrders(params, conditions) {
    try {
      const { limit, start, page } = conditions;
      const query = {
        ...params,
      };
      if (params?.search?.trim()) {
        if (mongoose.Types.ObjectId.isValid(params.search)) {
          const query = {
            ...params,
            _id: mongoose.Types.ObjectId(params.search),
          };

          const total = await OrderModel.count(params);
          const results = await OrderModel.find(query)

            .sort({ createdAt: -1 })
            .skip(start)
            .limit(limit)
            .populate({
              path: 'user',
              model: 'user_model',
              select: '_id first_name last_name avt_url address',
            });
          if (!results || results === 'null')
            return {
              status: ERROR,
              response: new HttpException(400, 'Can not get orders!'),
            };

          const orderDetails = await Promise.all(
            results.map(async (item) => {
              const order_items = await OrderItemModel.find({
                order_id: item._id,
              }).populate({
                path: 'product',
                model: 'product_model',
                populate: {
                  path: 'brand',
                  model: 'brand_model',
                },
              });

              return {
                ...item.toObject(),
                order_items,
              };
            })
          );

          return {
            status: SUCCESS,
            response: {
              status: OK,
              message: 'Get orders successfully!',
              data: orderDetails,
              pagination: {
                total,
                size: PAGE_SIZE,
                current: page,
              },
            },
          };
        } else {
          return {
            status: SUCCESS,
            response: {
              status: ERROR,
              message: 'Mã đơn hàng không đúng định dạng!',
              data: [],
              pagination: {},
            },
          };
        }
      }
      const total = await OrderModel.count(params);
      const results = await OrderModel.find(params)

        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .populate({
          path: 'user',
          model: 'user_model',
          select: '_id first_name last_name avt_url address',
        });

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get orders!'),
        };

      const orderDetails = await Promise.all(
        results.map(async (item) => {
          const order_items = await OrderItemModel.find({
            order_id: item._id,
          }).populate({
            path: 'product',
            model: 'product_model',
            populate: {
              path: 'brand',
              model: 'brand_model',
            },
          });

          return {
            ...item.toObject(),
            order_items,
          };
        })
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get orders successfully!',
          data: orderDetails,
          pagination: {
            total,
            size: PAGE_SIZE,
            current: page,
          },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryUserOrdersList({ user }) {
    try {
      const results = await OrderModel.find({ user });
      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get orders!'),
        };

      const orderDetails = await Promise.all(
        results.map(async (item) => {
          const order_items = await OrderItemModel.find({
            order_id: item._id,
          }).populate({
            path: 'product',
            model: 'product_model',
            populate: {
              path: 'brand',
              model: 'brand_model',
            },
          });

          return {
            ...item.toObject(),
            order_items,
          };
        })
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get orders successfully!',
          data: orderDetails,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneOrder(_id) {
    try {
      const result = await OrderModel.findOne({
        _id,
      }).populate({
        path: 'user',
        model: 'user_model',
        select: '_id first_name last_name avt_url address email',
      });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get order!'),
        };

      const order_items = await OrderItemModel.find({
        order_id: _id,
      }).populate({
        path: 'product',
        model: 'product_model',
        populate: {
          path: 'brand',
          model: 'brand_model',
        },
      });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get order successfully!',
          data: { ...result.toObject(), order_items },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getPendingOrderCount() {
    try {
      const result = await OrderModel.countDocuments({
        order_status: PENDING,
      });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get order count successfully!',
          data: {
            order_count: result | 0,
          },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
  async getOrderByUserId(idOrder) {
    try {
      const result = await OrderModel.findOne({
        idOrder,
      });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get order!'),
        };

      const order_items = await OrderItemModel.find({
        order_id: idOrder,
      }).populate({
        path: 'product',
        model: 'product_model',
        populate: {
          path: 'brand',
          model: 'brand_model',
        },
      });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get order successfully!',
          data: { ...result.toObject(), order_items },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new OrderHandlers();
