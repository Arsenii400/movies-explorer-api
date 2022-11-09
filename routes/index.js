const router = require('express').Router();
const user = require('./users');
const movie = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/user');
const { createUserValidation, loginValidation } = require('../middlewares/user-celebrate');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', user);
router.use('/movies', movie);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый путь не найден'));
});

module.exports = router;
