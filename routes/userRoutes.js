const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');

const getId = (req, res, next) => {
  const { user_id } = req.params;
  const { id } = req.session.user;
  req.body.user_id = user_id || id;
  next();
};

router.get('/profile/edit', getId, userController.getEditPage);

router.post('/profile/edit', userController.updateProfile);

router.get('/profile/:user_id', getId, userController.getProfile);

router.get('/profile', getId, userController.getProfile);

module.exports = router;
