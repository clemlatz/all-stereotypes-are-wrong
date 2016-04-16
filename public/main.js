function sendAnswer(termX, termY) {
  const req = new XMLHttpRequest();

  req.open('POST', '/answer');
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onload = function() {
    if (req.status !== 201) {
      alert(`An error (${req.status}) occured.`);
    }
  };

  req.send(`termX=${termX}&termY=${termY}`);
}


document.addEventListener('DOMContentLoaded', function() {

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
        sendAnswer(termA, term1);
        sendAnswer(termB, term2);
      });
      rightZone.addEventListener('click', function() {
        sendAnswer(termA, term2);
        sendAnswer(termB, term1);
      });
    })

})
