function sendAnswer(chosen, other) {
  const req = new XMLHttpRequest();

  req.open('POST', '/answer');
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onload = function() {
    if (req.status !== 200) {
      alert(`An error (${req.status}) occured.`);
    } else {
      const results = JSON.parse(req.response),
        chosen = parseInt(results.chosen),
        total = parseInt(results.total),
        percent = (chosen / total) * 100;
      let result;

      if (percent >= 50) {
        result = `CORRECT (${Math.floor(percent)}%)`;
      } else {
        result = `WRONG (${Math.floor(percent)}%)`;
      }

      document.querySelector('#answer').textContent = result;
    }
  };

  req.send(`chosen=${chosen}&other=${other}`);
}

function displayQuestion() {

  fetch('/couples')
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      const termA = json[0].firstTerm.en;
      const termB = json[0].secondTerm.en;
      const term1 = json[1].firstTerm.en;
      const term2 = json[1].secondTerm.en;

      const termsElement = document.querySelector('#terms');
      const termAElement = document.querySelector('#termA');
      const termBElement = document.querySelector('#termB');
      const termBResult  = document.querySelector('#termB');
      const term1Element = document.querySelector('#term1');
      const term2Element = document.querySelector('#term2');
      const leftZone     = document.querySelector('#leftZone');
      const rightZone    = document.querySelector('#rightZone');

      termAElement.innerHTML = termA;
      termBElement.innerHTML = termB;
      term1Element.innerHTML = term1;
      term2Element.innerHTML = term2;

      leftZone.addEventListener('mouseenter', function() {
        terms.classList.add('leftChoice');
      });
      leftZone.addEventListener('mouseleave', function() {
        terms.classList.remove('leftChoice');
      });
      rightZone.addEventListener('mouseenter', function() {
        terms.classList.add('rightChoice');
      });
      rightZone.addEventListener('mouseleave', function() {
        terms.classList.remove('rightChoice');
      });

      leftZone.addEventListener('click', function() {
        sendAnswer(`${termA}-${term1}-${termB}-${term2}`, `${termA}-${term2}-${termB}-${term1}`);
      });
      rightZone.addEventListener('click', function() {
        sendAnswer(`${termA}-${term2}-${termB}-${term1}`, `${termA}-${term1}-${termB}-${term2}`);
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {

  displayQuestion();

})
