const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

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
  process.stdout.write(`ASAW server is listening on port ${port}`);
})
