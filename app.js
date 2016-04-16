const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

const port      = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/asaw';

const Answer = require('./models/answer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(mongo_url);
process.stdout.write(`Mongoose connected to ${mongo_url}\n`);

app.get('/couples', function(request, response) {

  const couples = [
    ['rich', 'poor'],
    ['cat', 'dogs']
  ];

  response.json(couples);
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
