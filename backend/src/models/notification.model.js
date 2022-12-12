const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    order_id: {
      type: String,
      // required: true,
      // ref: 'orders',
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      // default: 'ORDER',
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'notifications',
    timestamps: true,
  }
);

module.exports = mongoose.model('notification_model', NotificationSchema);
