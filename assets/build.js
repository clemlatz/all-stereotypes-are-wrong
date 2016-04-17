const session = {
  round: 0,
  score: 0
}

function sendAnswer(terms, side, couple1, couple2) {

  let [ termA, termB, term1, term2 ] = terms;
  let association1, association2;

  if (side == 'left') {
    association1 = [termA, term1];
    association2 = [termB, term2];
  } else {
    association1 = [termA, term2];
    association2 = [termB, term1];
  }

  const req = new XMLHttpRequest();

  req.open('POST', '/answer');
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  req.addEventListener('load', function() {
    if (req.status !== 200) {
      alert(`An error (${req.status}) occured.`);
    } else {
      const results = JSON.parse(req.response);

      addAnswer(terms, results, side);
    }
  });

  req.addEventListener('error', function() {
    alert(`An error occured.`);
  });

  req.send(`association1=${association1}&association2=${association2}&couple1=${couple1}&couple2=${couple2}`);
}

function renderTerms(terms) {
  const [ termA, termB, term1, term2 ] = terms;
  return `
    <div class="term" id="termA">${termA}</div>
    <div class="term" id="termB">${termB}</div>
    <div class="term" id="term1">${term1}</div>
    <div class="term" id="term2">${term2}</div>
    <div class="equal" id="equalLeft">=</div>
    <div class="equal" id="equalRight">=</div>
  `;
}

function addAnswer(terms, results, side) {
  const answers = document.querySelector('#answers');
  const currentLine = document.querySelector('.current.line');
  const line = document.createElement('div');
  const count = parseInt(results.count);
  const total = parseInt(results.total);
  const percent = Math.floor((count / total) * 100);
  const success = (percent > 50);
  const result = success ? 'Well done' : 'Wrong';
  const resultClass = success ? 'correct' : 'wrong';
  const googleTruth = `https://www.google.com/trends/explore#q=${terms[0]} ${terms[2]}, ${terms[0]} ${terms[3]}, ${terms[1]} ${terms[2]}, ${terms[1]} ${terms[3]}`;
  line.classList.add('line');

  currentLine.style.marginTop = '-155px';

  if (success) {
    session.score++;
  }

  line.innerHTML  = `<div class="round">${session.round}/10</div>`;
  line.innerHTML += `<div class="terms ${side}Choice">` + renderTerms(terms) + '</div>';
  line.innerHTML += `<div class="score ${resultClass}">
    ${result}<br>
    Score: ${session.score}/${session.round}<br>
    On ${total} players<br>
    ${percent}% chose like you<br>
    &gt; <a href="${googleTruth}" target="_blank">The Google Truth</a>
  </div>`;

  answers.insertBefore(line, answers.firstChild);

  window.setTimeout(function () {
    currentLine.classList.add('animated');
    getQuestion();
  });
}

function getQuestion() {

  fetch('/couples')
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      incrementRound();

      const couple1 = json[0].id;
      const termA = json[0].firstTerm.en;
      const termB = json[0].secondTerm.en;
      const couple2 = json[1].id;
      const term1 = json[1].firstTerm.en;
      const term2 = json[1].secondTerm.en;

      const currentLine = document.querySelector('.current.line');
      const termsElement = currentLine.querySelector('.terms');

      termsElement.innerHTML = renderTerms([termA, termB, term1, term2]);

      const leftZone = document.createElement('div');
      leftZone.id = 'leftZone';
      leftZone.classList.add('zone');
      termsElement.appendChild(leftZone);

      const rightZone = document.createElement('div');
      rightZone.id = 'rightZone';
      rightZone.classList.add('zone');
      termsElement.appendChild(rightZone);

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
        sendAnswer([termA, termB, term1, term2], 'left', couple1, couple2);
      });
      rightZone.addEventListener('click', function() {
        sendAnswer([termA, termB, term1, term2], 'right', couple1, couple2);
      });

      currentLine.style.marginTop = 0;
      window.setTimeout(function() {
        currentLine.classList.remove('animated');
      }, 1000)
    });
}

function incrementRound() {
  const currentRound = document.querySelector('.current .round');
  session.round++;
  currentRound.innerHTML = `${session.round}/10`;
}

document.addEventListener('DOMContentLoaded', function() {

  getQuestion();

});
