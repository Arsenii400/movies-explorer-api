const jwt = require('jsonwebtoken');
const IncorrectCredentialsError = require('../errors/incorrect-credentials-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectCredentialsError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very-strong-key');
  } catch (err) {
    throw new IncorrectCredentialsError('Необходима авторизация');
  }

  req.user = payload;
  next();
  return req.user;
};
