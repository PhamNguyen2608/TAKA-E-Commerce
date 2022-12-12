const mongoose = require('mongoose');
const { Schema } = mongoose;

const replieCommentProduct = new Schema({
  content: { type: String },
  isAdmin: Boolean,
  nameUser: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

// const commentProduct = new Schema({
//   author: {type: String},
//   status: String,
//   isAdmin: Boolean,
//   avatar: {type: String},
//   content: {type:String},
//   byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   replies: [replieCommentProduct]
// })

const CommentSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'products',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    content: {
      type: String,
      required: true,
    },
    replies: [replieCommentProduct],
  },
  {
    collection: 'comments',
    timestamps: true,
  }
);

module.exports = mongoose.model('comment_model', CommentSchema);
