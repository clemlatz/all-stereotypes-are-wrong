/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	const session = {
	  round: 0,
	  score: 0
	}

	function sendAnswer(terms, side) {

	  let [ termA, termB, term1, term2 ] = terms;

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

	      getQuestion();
	      addAnswer(terms, results, side);
	    }
	  };

	  const chosenAnswer = chosen.join('-');
	  const otherAnswer  = other.join('-');

	  req.send(`chosen=${chosenAnswer}&other=${otherAnswer}`);
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
	  const line = document.createElement('div');
	  const chosenCount = parseInt(results.chosen);
	  const totalCount = parseInt(results.total);
	  const percent = Math.floor((chosenCount / totalCount) * 100);
	  const success = (percent > 50);
	  const result = success ? 'Well done' : 'Wrong';
	  const resultClass = success ? 'correct' : 'wrong';
	  const googleTruth = `https://www.google.com/trends/explore#q=${terms[0]} ${terms[2]}, ${terms[0]} ${terms[3]}, ${terms[1]} ${terms[2]}, ${terms[1]} ${terms[3]}`;
	  line.classList.add('line');

	  if (success) {
	    session.score++;
	  }

	  line.innerHTML  = `<div class="round">${session.round}/10</div>`;
	  line.innerHTML += `<div class="terms ${side}Choice">` + renderTerms(terms) + '</div>';
	  line.innerHTML += `<div class="score ${resultClass}">
	    ${result}<br>
	    Score: ${session.score}/${session.round}<br>
	    On ${totalCount} players<br>
	    ${percent}% chose like you<br>
	    &gt; <a href="${googleTruth}" target="_blank">The Google Truth</a>
	  </div>`;

	  answers.insertBefore(line, answers.firstChild);
	}

	function getQuestion() {

	  fetch('/couples')
	    .then(function(response) {
	      return response.json();
	    }).then(function(json) {

	      incrementRound();

	      const termA = json[0].firstTerm.en;
	      const termB = json[0].secondTerm.en;
	      const term1 = json[1].firstTerm.en;
	      const term2 = json[1].secondTerm.en;

	      const termsElement = document.querySelector('.current .terms');

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
	        sendAnswer([termA, termB, term1, term2], 'left');
	      });
	      rightZone.addEventListener('click', function() {
	        sendAnswer([termA, termB, term1, term2], 'right');
	      });
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


/***/ }
/******/ ]);