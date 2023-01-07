const router = require('express').Router();
const {
  createAdmin,
  login,
  deleteAdmin,
  getAllAdmins,
} = require('../contollers/admin');
const { getAllCards } = require('../contollers/card');
const { createUser } = require('../contollers/users');
const {
  validateCreateAdmin,
  validateLogin,
  validateDeleteAdmin,
  validateCreateUser,
} = require('../middlewares/validation');
const { NOT_FOUND } = require('../utils/errors-message');
const auth = require('../middlewares/auth');
const usersRouter = require('./user');
const cardRouter = require('./card');

const { NotFound } = require('../errors/notfound');

router.post('/signup', validateCreateAdmin, createAdmin);
router.post('/signin', validateLogin, login);
router.post('/users', validateCreateUser, createUser);
router.get('/cards', getAllCards);

router.use(auth);

router.get('/admin', getAllAdmins);
router.delete('/admin/:_id', validateDeleteAdmin, deleteAdmin);

router.use('/', usersRouter);
router.use('/', cardRouter);

router.use('*', () => {
  throw new NotFound(NOT_FOUND);
});
module.exports = router;
