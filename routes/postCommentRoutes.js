const express = require('express');

const router = express.Router();

const { postCommentController } = require('../controllers');

router.post('/postcomment/:post_id', postCommentController.add);

module.exports = router;
