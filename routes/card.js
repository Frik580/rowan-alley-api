const router = require('express').Router();
const { createCard, deleteCard, updateCard } = require('../contollers/card');
const {
  validateDeleteCard,
  validateCreateCard,
  validateUpdateCard,
} = require('../middlewares/validation');

router.delete('/cards/:_id', validateDeleteCard, deleteCard);

router.post('/cards', validateCreateCard, createCard);

router.patch('/cards/:_id', validateUpdateCard, updateCard);

module.exports = router;
