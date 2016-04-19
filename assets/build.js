'use strict';

const Chart = require('chart.js');
Chart.defaults.global.responsive = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.tooltips.enabled = false;

const session = {
  round: 0,
  score: 0
};

function getStats() {
  fetch('/stats')
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      const counter = document.querySelector('#stats .count');
      counter.innerHTML = json.total;
    });
}

function sendAnswer(terms, side, couple1, couple2, token) {

  const currentLine = document.querySelector('.current.line');
  currentLine.style.opacity = .5;

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
      const error = JSON.parse(req.response).error;
      alert(`An error ${req.status} (${error}) occured.`);
    } else {
      const results = JSON.parse(req.response);

      addAnswer(terms, results, side);
    }
  });

  req.addEventListener('error', function() {
    alert('An error occured.');
  });

  req.send(`token=${token}&association1=${association1}&association2=${association2}&couple1=${couple1}&couple2=${couple2}`);
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
  const pieColor = success ? '#46BFBD' : '#F7464A';

  let twitterMessage;
  if (side == 'left') {
    twitterMessage = `${terms[0]} = ${terms[2]}\n${terms[1]} = ${terms[3]}\n`.toUpperCase();
  } else {
    twitterMessage = `${terms[0]} = ${terms[3]}\n${terms[1]} = ${terms[2]}\n`.toUpperCase();
  }
  const twitterShare = 'https://twitter.com/home?status=' + encodeURI(twitterMessage) + '%23AllStereotypesAreWrong%0Ahttp://asaw.nokto.net';

  currentLine.style.marginTop = '-156px';

  if (success) {
    session.score++;
  }

  line.classList.add('line');
  line.innerHTML  = `
    <div class="left">
      <p class="round">${session.round}/10</p>
      <p class="share">
        > <a href="${twitterShare}" target="_blank">Share this stereotype</a>
      </p>
    </div>
    <div class="terms ${side}Choice">` + renderTerms(terms) + `</div>
    <div class="score ${resultClass}">
      <canvas class="pie" width="50" height="50"></canvas><br>
      ${result}<br>
      Score: ${session.score}/${session.round}<br>
      On ${total} players<br>
      ${percent}% chose like you<br>
      &gt; <a href="${googleTruth}" target="_blank">The Google Truth</a>
    </div>`;

  answers.insertBefore(line, answers.firstChild);

  const pie = line.querySelector('.pie');
  new Chart(pie, {
    type:'pie',
    data: {
      labels: [ 'Your choice', 'The other choice' ],
      datasets: [{
        data: [count, (total - count)],
        backgroundColor: [ pieColor, '#cccccc' ]
      }]
    }
  });

  getStats();

  if (session.round === 10) {
    addFinalScore();
  } else {
    getQuestion();
  }
}

function addFinalScore() {
  const answers = document.querySelector('#answers');
  const line    = document.createElement('div');
  line.classList.add('line');
  line.classList.add('animated');
  line.style.marginTop = '-156px';

  line.innerHTML = `<div class="final-score">~ FINAL SCORE: ${session.score}/10 ~</div>`;
  answers.insertBefore(line, answers.firstChild);

  session.score = 0;
  session.round = 0;

  // Display after 1 second
  window.setTimeout(function() {
    line.style.marginTop = 0;
    window.setTimeout(function() {
      getQuestion();
    }, 1000);
  }, 1000);
}

function getQuestion() {

  fetch('/couples')
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      incrementRound();

      const couples = json.couples;
      const token   = json.token;
      const couple1 = couples[0].id;
      const termA   = couples[0].firstTerm.en;
      const termB   = couples[0].secondTerm.en;
      const couple2 = couples[1].id;
      const term1   = couples[1].firstTerm.en;
      const term2   = couples[1].secondTerm.en;

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
        termsElement.classList.add('leftChoice');
      });
      rightZone.addEventListener('mouseenter', function() {
        termsElement.classList.add('rightChoice');
      });

      leftZone.addEventListener('mouseleave', function() {
        termsElement.classList.remove('leftChoice');
      });
      rightZone.addEventListener('mouseleave', function() {
        termsElement.classList.remove('rightChoice');
      });

      leftZone.addEventListener('click', function() {
        sendAnswer([termA, termB, term1, term2], 'left', couple1, couple2, token);
      });
      rightZone.addEventListener('click', function() {
        sendAnswer([termA, termB, term1, term2], 'right', couple1, couple2, token);
      });

      currentLine.classList.add('animated');
      window.setTimeout(function () {
        currentLine.style.marginTop = 0;
        currentLine.style.opacity = 1;

        termsElement.classList.remove('leftChoice');
        termsElement.classList.remove('rightChoice');
        window.setTimeout(function() {
          currentLine.classList.remove('animated');
        }, 1000);
      }, 1000);


    });
}

function incrementRound() {
  const currentRound = document.querySelector('.current .round');
  session.round++;
  currentRound.innerHTML = `${session.round}/10`;
}

document.addEventListener('DOMContentLoaded', function() {

  getQuestion();
  getStats();

});
