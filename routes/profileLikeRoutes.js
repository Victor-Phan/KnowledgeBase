const express = require('express');

const router = express.Router();

const { profileLikeController } = require('../controllers');

router.post('/like', profileLikeController.toggleLike);

module.exports = router;
