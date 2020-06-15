const express = require('express');

const router = express.Router();

const { postsController } = require('../controllers');

router.post('/posts', postsController.add);

router.get('/posts/:post_id', postsController.getOne);

router.get('/posts', postsController.getAll);

router.get('/search', postsController.search);

module.exports = router;
