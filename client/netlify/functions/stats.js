const statsController = require('../../server/controllers/stats');

exports.handler = async function () {
  let responseContent;
  const responseHandler = {
    json: function(json) {
      responseContent = JSON.stringify(json);
    }
  }

  await statsController(undefined, responseHandler);

  return {
    statusCode: 200,
    body: JSON.stringify(responseContent),
  };
};
