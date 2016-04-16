const express  = require('express');
const mongoose = require('mongoose');

const app = express();

const port      = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/asaw';

const Answer = require('./models/answer');

mongoose.connect(mongo_url);
process.stdout.write(`Mongoose connected to ${mongo_url}\n`);

app.use(express.static('public'));

app.get('/couples', function(request, response) {

  const couples = [
    ['rich', 'poor'],
    ['cat', 'dogs']
  ];

  response.json(couples);
});

app.post('/answer', function(request, response) {

  response.json('OK');
});

app.listen(port, function() {
  process.stdout.write(`ASAW server is listening on port ${port}\n`);
})
