const { Token } = require('../models');
const getCombinationId = require('../helpers/get-combination-id');

module.exports = async function(request, response, next) {
  request.combination = getCombinationId(
    request.body.couple1,
    request.body.couple2
  );

  const token = await Token.findOne({
    token: request.body.token,
    combination: request.combination,
  });

  if (!token) {
    response.status(400).send({ error: 'Invalid token' });
  } else {
    await Token.destroy({ where: { id: token.id } });
    next();
  }
};
