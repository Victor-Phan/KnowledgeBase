const express = require('express');

const router = express.Router();

const { authController } = require('../controllers');

router.post('/register', authController.register);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

router.get('/signin', authController.signinPage);

router.post('/signup', authController.signup);

module.exports = router;
