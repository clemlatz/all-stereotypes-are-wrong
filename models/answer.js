const mongoose = require('mongoose');

const Answer = mongoose.model('Answer', {
  termX: String,
  termY: String,
  count: {
    type: Number,
    default: 0
  }
});

module.exports = Answer;
