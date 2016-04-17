const mongoose = require('mongoose');


const AnswerSchema = mongoose.Schema({
  answer: String,
  combination: String,
  count: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
}, {
  versionKey: '3'
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
