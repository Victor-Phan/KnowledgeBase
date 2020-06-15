const checkSignin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    next(new Error('User not signed in'));
  }
};

module.exports = {
  checkSignin,
};
