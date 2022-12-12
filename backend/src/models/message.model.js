const mongoose = require('mongoose');
const { Schema } = mongoose;
const MessageSchema = new Schema(
  {
    idConversation: {
      type: Schema.Types.ObjectId,
      ref: 'conversation',
    },
    sender: {
      type: String,
      ref: 'user',
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('message', MessageSchema);
