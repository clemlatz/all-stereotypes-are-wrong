function sendAnswer(termX, termY) {
  const req = new XMLHttpRequest(),
    data = new FormData();

  data.append('termX', termX);
  data.append('termY', termY);

  req.open('POST', '/answer');

  req.onload = function() {
    console.log('ok!');
  }

  req.send(data);
}


document.addEventListener('DOMContentLoaded', function() {

  fetch('/couples')
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      const termA = json[0][0];
      const termB = json[0][1];
      const term1 = json[1][0];
      const term2 = json[1][1];

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
