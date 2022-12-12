const { Router } = require('express');
const NotificationControllers = require('../controllers/notification');

const notificationRouter = Router();

notificationRouter.get(
  '/:user_id',
  NotificationControllers.queryUserNotifications
);
notificationRouter.put('/:_id', NotificationControllers.updateNotification);
notificationRouter.get('/', NotificationControllers.queryAllNotifications);

module.exports = notificationRouter;
