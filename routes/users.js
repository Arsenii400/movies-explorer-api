const user = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/user');
const { updateUserValidation, getUserValidation } = require('../middlewares/user-celebrate');

user.get('/me', getUserValidation, getUser);
user.patch('/me', updateUserValidation, updateUser);

module.exports = user;
