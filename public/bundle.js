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

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var session = {
	  round: 0,
	  score: 0
	};

	function sendAnswer(terms, side) {
	  var _terms = _slicedToArray(terms, 4);

	  var termA = _terms[0];
	  var termB = _terms[1];
	  var term1 = _terms[2];
	  var term2 = _terms[3];

	  var chosen = void 0,
	      other = void 0;

	  if (side == 'left') {
	    chosen = [termA, term1, termB, term2];
	    other = [termA, term2, termB, term1];
	  } else {
	    chosen = [termA, term2, termB, term1];
	    other = [termA, term1, termB, term2];
	  }

	  var req = new XMLHttpRequest();

	  req.open('POST', '/answer');
	  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	  req.onload = function () {
	    if (req.status !== 200) {
	      alert('An error (' + req.status + ') occured.');
	    } else {
	      var results = JSON.parse(req.response);

	      getQuestion();
	      addAnswer(terms, results, side);
	    }
	  };

	  var chosenAnswer = chosen.join('-');
	  var otherAnswer = other.join('-');

	  req.send('chosen=' + chosenAnswer + '&other=' + otherAnswer);
	}

	function renderTerms(terms) {
	  var _terms2 = _slicedToArray(terms, 4);

	  var termA = _terms2[0];
	  var termB = _terms2[1];
	  var term1 = _terms2[2];
	  var term2 = _terms2[3];

	  return '\n    <div class="term" id="termA">' + termA + '</div>\n    <div class="term" id="termB">' + termB + '</div>\n    <div class="term" id="term1">' + term1 + '</div>\n    <div class="term" id="term2">' + term2 + '</div>\n    <div class="equal" id="equalLeft">=</div>\n    <div class="equal" id="equalRight">=</div>\n  ';
	}

	function addAnswer(terms, results, side) {
	  var answers = document.querySelector('#answers');
	  var line = document.createElement('div');
	  var chosenCount = parseInt(results.chosen);
	  var totalCount = parseInt(results.total);
	  var percent = Math.floor(chosenCount / totalCount * 100);
	  var success = percent > 50;
	  var result = success ? 'Well done' : 'Wrong';
	  var resultClass = success ? 'correct' : 'wrong';
	  var googleTruth = 'https://www.google.com/trends/explore#q=' + terms[0] + ' ' + terms[2] + ', ' + terms[0] + ' ' + terms[3] + ', ' + terms[1] + ' ' + terms[2] + ', ' + terms[1] + ' ' + terms[3];
	  line.classList.add('line');

	  if (success) {
	    session.score++;
	  }

	  line.innerHTML = '<div class="round">' + session.round + '/10</div>';
	  line.innerHTML += '<div class="terms ' + side + 'Choice">' + renderTerms(terms) + '</div>';
	  line.innerHTML += '<div class="score ' + resultClass + '">\n    ' + result + '<br>\n    Score: ' + session.score + '/' + session.round + '<br>\n    On ' + totalCount + ' players<br>\n    ' + percent + '% chose like you<br>\n    &gt; <a href="' + googleTruth + '" target="_blank">The Google Truth</a>\n  </div>';

	  answers.insertBefore(line, answers.firstChild);
	}

	function getQuestion() {

	  fetch('/couples').then(function (response) {
	    return response.json();
	  }).then(function (json) {

	    incrementRound();

	    var termA = json[0].firstTerm.en;
	    var termB = json[0].secondTerm.en;
	    var term1 = json[1].firstTerm.en;
	    var term2 = json[1].secondTerm.en;

	    var termsElement = document.querySelector('.current .terms');

	    termsElement.innerHTML = renderTerms([termA, termB, term1, term2]);

	    var leftZone = document.createElement('div');
	    leftZone.id = 'leftZone';
	    leftZone.classList.add('zone');
	    termsElement.appendChild(leftZone);

	    var rightZone = document.createElement('div');
	    rightZone.id = 'rightZone';
	    rightZone.classList.add('zone');
	    termsElement.appendChild(rightZone);

	    leftZone.addEventListener('mouseenter', function () {
	      terms.classList.add('leftChoice');
	    });
	    leftZone.addEventListener('mouseleave', function () {
	      terms.classList.remove('leftChoice');
	    });
	    rightZone.addEventListener('mouseenter', function () {
	      terms.classList.add('rightChoice');
	    });
	    rightZone.addEventListener('mouseleave', function () {
	      terms.classList.remove('rightChoice');
	    });

	    leftZone.addEventListener('click', function () {
	      sendAnswer([termA, termB, term1, term2], 'left');
	    });
	    rightZone.addEventListener('click', function () {
	      sendAnswer([termA, termB, term1, term2], 'right');
	    });
	  });
	}

	function incrementRound() {
	  var currentRound = document.querySelector('.current .round');
	  session.round++;
	  currentRound.innerHTML = session.round + '/10';
	}

	document.addEventListener('DOMContentLoaded', function () {

	  getQuestion();
	});

/***/ }
/******/ ]);