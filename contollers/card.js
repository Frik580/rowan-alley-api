const Card = require('../models/card');
const { BadRequest } = require('../errors/badrequest');
const { Forbidden } = require('../errors/forbidden');
const { NotFound } = require('../errors/notfound');
const {
  BAD_REQUEST,
  NOT_FOUND_CARD,
  BAD_REQUEST_CARD,
} = require('../utils/errors-message');

const createCard = (req, res, next) => {
  const {
    name,
    years,
    birthPlace,
    dutyStation,
    burialPlace,
    rank,
    award,
    image,
    trailerLink,
    cardId,
    facts,
  } = req.body;
  Card.create({
    name,
    years,
    birthPlace,
    dutyStation,
    burialPlace,
    rank,
    award,
    image,
    trailerLink,
    cardId,
    facts,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_CARD);
    })
    .then((card) => {
      console.log(card.owner.toString());
      console.log(req.user._id);
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne(card)
          .then(() => res.status(200).send(card))
          .catch(next);
      } else {
        throw new Forbidden();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(BAD_REQUEST_CARD));
      } else {
        next(err);
      }
    });
};

const updateCard = (req, res, next) => {
  const {
    name,
    years,
    birthPlace,
    dutyStation,
    burialPlace,
    rank,
    award,
    image,
    trailerLink,
    cardId,
    facts,
  } = req.body;
  Card.findByIdAndUpdate(
    req.params._id,
    {
      name,
      years,
      birthPlace,
      dutyStation,
      burialPlace,
      rank,
      award,
      image,
      trailerLink,
      cardId,
      facts,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound(NOT_FOUND_CARD);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_CARD));
      } else {
        next(err);
      }
    });
};

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports = {
  createCard,
  deleteCard,
  getAllCards,
  updateCard,
};
