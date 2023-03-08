const mongoose = require('mongoose');
const { urlPattern } = require('../utils/constants');

const awardSchema = new mongoose.Schema({
  name: String,
  year: String,
  description: String,
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  years: {
    type: String,
    // required: true,
  },
  birthPlace: {
    type: String,
    // required: true,
  },
  dutyStation: {
    type: String,
    // required: true,
  },
  burialPlace: {
    type: String,
    // required: true,
  },
  rank: {
    type: String,
    // required: true,
  },
  award: [awardSchema],
  // awards: [String],
  image: {
    type: String,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: 'Передана некорректная ссылка на фото героя',
    },
    // required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: 'Передана некорректная ссылка на трейлер фильма о герое',
    },
    // required: true,
  },
  cardId: {
    type: Number,
    unique: true,
    // required: true,
  },
  facts: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    // required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
