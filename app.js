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
  const association1 = request.body.association1.split(',').sort().join(',');
  const association2 = request.body.association2.split(',').sort().join(',');
  const couple1      = request.body.couple1;
  const couple2      = request.body.couple2;

  const combinationContent = [couple1, couple2].sort().join();
  const answerContent = [association1, association2].sort().join(';');

  Answer.findOne({ answer: answerContent }, function(err, answer) {
    if (err) throw err;

    if (!answer) {
      answer = new Answer({
        answer: answerContent,
        combination: combinationContent
      });
    }

    answer.count = answer.count + 1;

    answer.save(function(err) {
      if (err) throw err;

      // // Answer.findOne({ answer: other }, function(err, otherAnswer) {
      // //   if (err) {
      // //     response.status(500).send();
      // //     throw err;
      // //   }
      // //
      // //   if (!otherAnswer) {
      // //     otherAnswer = new Answer({
      // //       answer: other,
      // //       combination: combination
      // //     });
      // //   }
      //
      //   otherAnswer.total = otherAnswer.total + 1;
      //
      //   otherAnswer.save(function(err) {
      //     if (err) throw err;

          response.status(200).json({ count: answer.count, other: 0, total: 0 });
      //   });
      // });
    });

  });
});

app.listen(port, function() {
  process.stdout.write(`ASAW server is listening on port ${port}\n`);
})
