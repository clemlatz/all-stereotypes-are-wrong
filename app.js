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
  const chosen = request.body.chosen;
  const other  = request.body.other;

  Answer.findOne({ answer: chosen }, function(err, chosenAnswer) {
    if (err) throw err;

    if (!chosenAnswer) {
      chosenAnswer = new Answer({
        answer: chosen
      });
    }

    chosenAnswer.count = chosenAnswer.count + 1;
    chosenAnswer.total = chosenAnswer.total + 1;

    chosenAnswer.save(function(err) {
      if (err) throw err;

      Answer.findOne({ answer: other }, function(err, otherAnswer) {
        if (err) {
          response.status(500).send();
          throw err;
        }

        if (!otherAnswer) {
          otherAnswer = new Answer({
            answer: other
          });
        }

        otherAnswer.total = otherAnswer.total + 1;

        otherAnswer.save(function(err) {
          if (err) throw err;

          response.status(200).json({ chosen: chosenAnswer.count, other: otherAnswer.count, total: chosenAnswer.total });
        });
      });
    });

  });
});

app.listen(port, function() {
  process.stdout.write(`ASAW server is listening on port ${port}\n`);
})
