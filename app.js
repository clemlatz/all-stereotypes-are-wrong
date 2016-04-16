const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

const port      = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/asaw';

const Answer = require('./models/answer');

const couples = require('./data/couples');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(mongo_url);
process.stdout.write(`Mongoose connected to ${mongo_url}\n`);

app.get('/couples', function(request, response) {

  const couple1 = couples.getRandom();
  const couple2 = couples.getRandom(couple1);

  response.json([couple1, couple2]);
});

app.post('/answer', function(request, response) {
  const termX = request.body.termX;
  const termY = request.body.termY;

  const answer = new Answer({
    termX: termX,
    termY: termY
  });

  answer.save(function(err) {
    if (err) {
      response.status(500).send();
      throw err;
    }
    response.status(201).send();
  });
});

app.listen(port, function() {
  process.stdout.write(`ASAW server is listening on port ${port}\n`);
})
