const mongoose = require('mongoose');

const CombinationSchema = mongoose.Schema({
  combination: String,
  count: {
    type: Number,
    default: 0
  }
}, {
  versionKey: '0'
});

const Combination = mongoose.model('Combination', CombinationSchema);

module.exports = Combination;
