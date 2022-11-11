const user = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/user');
const { updateUserValidation } = require('../middlewares/user-celebrate');

user.get('/me', getUser);
user.patch('/me', updateUserValidation, updateUser);

module.exports = user;
