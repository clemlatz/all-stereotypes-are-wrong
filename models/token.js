const mongoose = require('mongoose');
const crypto   = require('crypto');

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    default: function() {
      return crypto.randomBytes(32).toString('hex');
    }
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
