const mongoose = require('mongoose');

const Answer = mongoose.model('Answer', {
  termX: String,
  termY: String
});

module.exports = Answer;
