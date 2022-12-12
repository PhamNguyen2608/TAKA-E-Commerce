const { Server } = require('socket.io');
const ConversationModel = require('../models/conversation.model.js');
const NotificationModel = require('../models/notification.model.js');
const schedule = require('node-schedule');
const userModel = require('../models/user.model.js');
const ConnectSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });

  // khi client connect to server
  // Schedule
  const job = schedule.scheduleJob('0 */12 * * *', async () => {
    console.log('The answer to life, the universe, and everything!');
    const res = await userModel.find({ role: 2 });
    res.forEach(async (item) => {
      const notification = new NotificationModel({
        user_id: item._id,
        order_id: '',
        type: 'SYSTEM',
        content: `Bạn đang có 2 lần quay may mắn. Hãy quay để thử vận may nào!!!`,
      });
      await notification.save();
    });

    io.emit('schedule', 1);

    // io.emit('hi', '62b589eb71e3f9ec5c38a3ee');
  });
  io.on('connection', (socket) => {
    // Notification
    socket.on('create_notification_order', async (data) => {
      socket.join(data.userId);
      const notification = new NotificationModel({
        user_id: data.userId,
        order_id: data.order_id,
        type: 'ORDER',
        content: `Đơn hàng ${data.order_id}  đã được xác nhận`,
      });
      io.emit('hi', { _id: data.userId, order_id: data.order_id });
      await notification.save();
    });

    // Chat message
    //server lắng nghe dữ liệu từ client
    socket.on('join_conversation', (idUser) => {
      ConversationModel.findOne({ idUser }).then((conversation) => {
        if (!conversation) return;

        const idConversation = String(conversation._id);
        socket.join(idConversation);
      });
    });
    // Admin join notification
    socket.on('admin_join_notification', (idNotification) => {
      socket.join(idNotification);
    });

    // create and join room
    socket.on('create_conversation', (currentUser) => {
      const conversation = new ConversationModel({
        idUser: currentUser._id,
        nameConversation: currentUser.first_name + currentUser.last_name,
      });

      conversation.save().then((data) => {
        socket.join(String(data._id));
        socket.emit('response_room', data);
      });
    });

    // chat ben admin
    socket.on('chat', async (data) => {
      const { _id, sender, message, idConversation } = data;

      const conversation = await ConversationModel.updateOne(
        {
          _id: idConversation,
        },
        {
          lastMessage: message,
        }
        // {new: true}
      );
      // Admin hiển thị lass message
      io.emit('lastMessage', conversation);

      const payload = {
        idConversation,
        sender,
        message,
        _id,
      };

      io.to(idConversation).emit('newMessage', payload);

      const conver = await ConversationModel.findOne({ _id: idConversation });
      io.emit('show-me', conver);
    });

    socket.on('disconnect', () => {
      io.emit('user-leave', 'ban ay da roi khoi cuoc tro chuyen');
      console.log('🚀 ~ file: socket.js ~ line 109 ~ socket.on ~ disconnect');
    });
  });
};

module.exports = ConnectSocket;
