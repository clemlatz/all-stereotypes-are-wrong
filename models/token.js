const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  combination: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: function() {
      return new Date();
    },
    required: true
  }
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
