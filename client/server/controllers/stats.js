const getStats = require('../helpers/get-stats');

module.exports = async function(request, response) {
  const stats = await getStats();
  response.json(stats);
};
