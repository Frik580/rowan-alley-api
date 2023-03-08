const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateDeleteUser = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const validateDeleteAdmin = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateAdmin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateCard = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    years: Joi.string(),
    birthPlace: Joi.string(),
    dutyStation: Joi.string(),
    burialPlace: Joi.string(),
    rank: Joi.string(),
    award: Joi.array(),
    image: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Передана некорректная ссылка на фото героя');
      }),
    trailerLink: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(
          'Передана некорректная ссылка на трейлер фильма о герое',
        );
      }),
    cardId: Joi.number(),
    facts: Joi.array(),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    years: Joi.string().required(),
    birthPlace: Joi.string().required(),
    dutyStation: Joi.string().required(),
    burialPlace: Joi.string().required(),
    rank: Joi.string().required(),
    award: Joi.array(),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Передана некорректная ссылка на фото героя');
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(
          'Передана некорректная ссылка на трейлер фильма о герое',
        );
      }),
    cardId: Joi.number().required(),
    facts: Joi.array().required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateCard,
  validateDeleteCard,
  validateCreateCard,
  validateDeleteUser,
  validateCreateAdmin,
  validateDeleteAdmin,
};
