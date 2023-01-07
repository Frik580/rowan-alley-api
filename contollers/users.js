const User = require('../models/user');
const { BadRequest } = require('../errors/badrequest');
const { Forbidden } = require('../errors/forbidden');
const { NotFound } = require('../errors/notfound');
const { ConflictError } = require('../errors/conflicterror');
const {
  BAD_REQUEST,
  NOT_FOUND_USER,
  BAD_REQUEST_USER,
  CONFLICT_ERROR_USER,
} = require('../utils/errors-message');

const createUser = (req, res, next) => {
  const { name, email } = req.body;
  User.create({ name, email })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR_USER));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_USER);
    })
    .then((user) => {
      if (user) {
        User.deleteOne(user)
          .then(() => res.status(200).send(user))
          .catch(next);
      } else {
        throw new Forbidden();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(BAD_REQUEST_USER));
      } else {
        next(err);
      }
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
};
