const express = require('express');

const router = express.Router();

const { messageReplyController } = require('../controllers');

router.post(
  '/messageReply/:message_id',
  messageReplyController.addMessageReply
);

module.exports = router;
