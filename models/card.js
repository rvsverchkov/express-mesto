const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^(http?:\/\/(www\.)?)([\da-z\.-]+)\.([\/\w\.-]*)*\/#?$/.test(v);
      }
    },
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('card', cardSchema);