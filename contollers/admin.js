const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const { Unauthorized } = require('../errors/unauthorized');
const { ConflictError } = require('../errors/conflicterror');
const { BadRequest } = require('../errors/badrequest');
const { NotFound } = require('../errors/notfound');
const { Forbidden } = require('../errors/forbidden');
const { getJwtToken } = require('../utils/jwt');
const {
  CONFLICT_ERROR_ADMIN,
  BAD_REQUEST_ADMIN,
  UNAUTHORIZED,
  NOT_FOUND_ADMIN,
} = require('../utils/errors-message');

const createAdmin = (req, res, next) => {
  const { email, password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => Admin.create({
      email,
      password: hash,
    }))
    .then((admin) => {
      const newAdmin = {
        email: admin.email,
        _id: admin._id,
      };
      res.status(201).send(newAdmin);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR_ADMIN));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_ADMIN));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Admin.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new Unauthorized(UNAUTHORIZED);
    })
    .then((admin) => bcrypt.compare(password, admin.password).then((isValidPassword) => {
      if (!isValidPassword) {
        throw new Unauthorized(UNAUTHORIZED);
      }
      const token = getJwtToken(admin.id);
      res.status(200).send({ token });
    }))
    .catch(next);
};

const deleteAdmin = (req, res, next) => {
  Admin.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_ADMIN);
    })
    .then((admin) => {
      // if (admin._id.toString() === req.user._id) {
      if (admin) {
        Admin.deleteOne(admin)
          .then(() => res.status(200).send(admin))
          .catch(next);
      } else {
        throw new Forbidden();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(BAD_REQUEST_ADMIN));
      } else {
        next(err);
      }
    });
};

const getAllAdmins = (req, res, next) => {
  Admin.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  createAdmin,
  login,
  deleteAdmin,
  getAllAdmins,
};
