const bcrypt = require('bcrypt');
const { userModel } = require('../models');

const loginScripts = { signinCSS: true, passwordCheck: true, };
const registerCSS = { signupCSS: true };

const saltRounds = 10;

const encryptPassword = async (pw) => {
  try {
    const encrypted = await new Promise((res, rej) => {
      bcrypt.hash(pw, saltRounds).then(res).catch(rej);
    });
    return encrypted;
  } catch (e) {
    throw e;
  }
};

const isPasswordValid = async (input, pw) => {
  try {
    const result = await new Promise((res, rej) => {
      bcrypt.compare(input, pw).then(res).catch(rej);
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.register = async (req, res, next) => {
  try {
    const newUser = { ...req.session.user, ...req.body };
    newUser.password = await encryptPassword(newUser.password);

    const { insertId } = await userModel.insertUser(newUser);
    req.session.user = { email: newUser.email, id: insertId };
    return res.redirect('/');
  } catch (e) {
    next(e);
  }
};

exports.signup = async (req, res, next) => {
  req.session.user = req.body;
  return res.render('signupPage', registerCSS);
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [validUser] = await userModel.getUserByEmail(email);

    if (!validUser) {
      throw new Error('No such user');
    }

    if (!(await isPasswordValid(password, validUser.password)))
      throw new Error('Invalid password');

    req.session.user = { email: validUser.email, id: validUser.id };
    return res.redirect('/');
  } catch (e) {
    next(e);
  }
};

exports.signinPage = (req, res) => res.render('landingPage', loginScripts);

exports.signout = (req, res) => {
  req.session.destroy(() => console.log('User signed out'));
  return res.redirect('/signin');
};
