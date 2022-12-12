const mongoose = require('mongoose');
const {
  COD,
  PAYPAL,
  VNPAY,
  ZALOPAY,
  MOMO,
  DONE,
  PENDING,
  CONFIRMED,
  CANCELED,
  GHN,
  GHTK,
} = require('../configs/constants');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    order_status: {
      type: String,
      enum: [DONE, PENDING, CONFIRMED, CANCELED],
      default: PENDING,
    },
    payment_type: {
      type: String,
      enum: [COD, PAYPAL, VNPAY, ZALOPAY, MOMO],
      default: COD,
    },
    service_type: {
      type: String,
      enum: [GHN, GHTK],
      default: GHTK,
    },
    service_total: {
      type: Number,
    },
    total_price: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    confirmDate: {
      type: String,
      default: '',
    },
    doneDate: {
      type: String,
      default: '',
    },
    cancelDate: {
      type: String,
      default: '',
    },
    address: {
      province: {
        name: String,
        code: String,
      },
      district: {
        name: String,
        code: String,
      },
      ward: {
        name: String,
        code: String,
        districtID: Number,
        wardCode: String,
      },
      street: {
        type: String,
        required: true,
      },
    },
    exporter: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

module.exports = mongoose.model('order_model', OrderSchema);
