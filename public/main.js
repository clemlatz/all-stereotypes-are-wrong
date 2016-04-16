function sendAnswer(terms, side) {

  let [ termA, term1, termB, term2 ] = terms;

  if (side == 'left') {
    chosen = [termA, term1, termB, term2];
    other  = [termA, term2, termB, term1];
  } else {
    chosen = [termA, term2, termB, term1];
    other  = [termA, term1, termB, term2];
  }

  const req = new XMLHttpRequest();

  req.open('POST', '/answer');
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onload = function() {
    if (req.status !== 200) {
      alert(`An error (${req.status}) occured.`);
    } else {
      const results = JSON.parse(req.response);

      addAnswer(chosen, results, side);
    }
  };

  const chosenAnswer = chosen.join('-');
  const otherAnswer  = other.join('-');

  req.send(`chosen=${chosenAnswer}&other=${otherAnswer}`);
}

function renderTerms(terms) {
  return `
    <div class="term" id="termA">${terms[0]}</div>
    <div class="term" id="termB">${terms[1]}</div>
    <div class="term" id="term1">${terms[2]}</div>
    <div class="term" id="term2">${terms[3]}</div>
  `;
}

function addAnswer(chosen, results, side) {
  const answers = document.querySelector('#answers');
  const line = document.createElement('div');
  const chosenCount = parseInt(results.chosen);
  const totalCount = parseInt(results.total);
  const percent = Math.floor((chosenCount / totalCount) * 100);
  const success = (percent > 50);
  const result = success ? 'Well done' : 'Wrong';
  line.classList.add('line');

  line.innerHTML  = '<div class="round">X/10</div>';
  line.innerHTML += `<div class="terms ${side}Choice">` + renderTerms(chosen) + '</div>';
  line.innerHTML += `<div class="score">${result}<br>Score: X/Y<br>On ${totalCount} players<br>${percent}% chose like you<br>&gt; The Google Truth</div>`;

  answers.insertBefore(line, answers.firstChild);
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
        sendAnswer([termA, termB, term1, term2], 'left');
      });
      rightZone.addEventListener('click', function() {
        sendAnswer([termA, termB, term1, term2], 'right');
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {

  displayQuestion();

})
