const mongoose = require('mongoose');


const AnswerSchema = mongoose.Schema({
  answer: String,
  count: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
}, {
  versionKey: '2'
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
