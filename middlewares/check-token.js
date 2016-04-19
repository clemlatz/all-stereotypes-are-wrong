const Token = require('../models/token');

const getCombinationId = require('../helpers/get-combination-id');

module.exports = function(request, response, next) {
  request.combination = getCombinationId(request.body.couple1, request.body.couple2);

  Token.findOne({ token: request.body.token, combination: request.combination }).exec()
  .then(function(token) {
      if (!token) {
        response.status(400).send({ error: 'Invalid token' });
      } else {
        Token.remove({ _id: token._id }).exec().then(function() {
          next();
        });
      }
  });
}
