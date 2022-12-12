const express = require('express');

const {
  getAllConversation,
  postSaveMessage,
  getMessageByConversation,
} = require('../controllers/chat');

const router = express.Router();

router.get('/', getAllConversation);

router.get('/message', getMessageByConversation);

router.post('/save', postSaveMessage);

module.exports = router;
