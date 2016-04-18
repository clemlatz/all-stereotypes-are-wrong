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
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(fetch) {'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var session = {
	  round: 0,
	  score: 0
	};

	function getStats() {
	  fetch('/stats').then(function (response) {
	    return response.json();
	  }).then(function (json) {
	    var counter = document.querySelector('#stats .count');
	    counter.innerHTML = json.total;
	  });
	}

	function sendAnswer(terms, side, couple1, couple2) {

	  var currentLine = document.querySelector('.current.line');
	  currentLine.style.opacity = .5;

	  var _terms = _slicedToArray(terms, 4);

	  var termA = _terms[0];
	  var termB = _terms[1];
	  var term1 = _terms[2];
	  var term2 = _terms[3];

	  var association1 = void 0,
	      association2 = void 0;

	  if (side == 'left') {
	    association1 = [termA, term1];
	    association2 = [termB, term2];
	  } else {
	    association1 = [termA, term2];
	    association2 = [termB, term1];
	  }

	  var req = new XMLHttpRequest();

	  req.open('POST', '/answer');
	  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	  req.addEventListener('load', function () {
	    if (req.status !== 200) {
	      alert('An error (' + req.status + ') occured.');
	    } else {
	      var results = JSON.parse(req.response);

	      addAnswer(terms, results, side);
	    }
	  });

	  req.addEventListener('error', function () {
	    alert('An error occured.');
	  });

	  req.send('association1=' + association1 + '&association2=' + association2 + '&couple1=' + couple1 + '&couple2=' + couple2);
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
	  var currentLine = document.querySelector('.current.line');
	  var line = document.createElement('div');
	  var count = parseInt(results.count);
	  var total = parseInt(results.total);
	  var percent = Math.floor(count / total * 100);
	  var success = percent > 50;
	  var result = success ? 'Well done' : 'Wrong';
	  var resultClass = success ? 'correct' : 'wrong';
	  var googleTruth = 'https://www.google.com/trends/explore#q=' + terms[0] + ' ' + terms[2] + ', ' + terms[0] + ' ' + terms[3] + ', ' + terms[1] + ' ' + terms[2] + ', ' + terms[1] + ' ' + terms[3];
	  line.classList.add('line');

	  currentLine.style.marginTop = '-155px';

	  if (success) {
	    session.score++;
	  }

	  line.innerHTML = '<div class="round">' + session.round + '/10</div>';
	  line.innerHTML += '<div class="terms ' + side + 'Choice">' + renderTerms(terms) + '</div>';
	  line.innerHTML += '<div class="score ' + resultClass + '">\n    ' + result + '<br>\n    Score: ' + session.score + '/' + session.round + '<br>\n    On ' + total + ' players<br>\n    ' + percent + '% chose like you<br>\n    &gt; <a href="' + googleTruth + '" target="_blank">The Google Truth</a>\n  </div>';

	  answers.insertBefore(line, answers.firstChild);

	  getStats();

	  window.setTimeout(function () {
	    currentLine.classList.add('animated');
	    getQuestion();
	  }, 1000);
	}

	function getQuestion() {

	  fetch('/couples').then(function (response) {
	    return response.json();
	  }).then(function (json) {

	    incrementRound();

	    var couple1 = json[0].id;
	    var termA = json[0].firstTerm.en;
	    var termB = json[0].secondTerm.en;
	    var couple2 = json[1].id;
	    var term1 = json[1].firstTerm.en;
	    var term2 = json[1].secondTerm.en;

	    var currentLine = document.querySelector('.current.line');
	    var termsElement = currentLine.querySelector('.terms');

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
	    rightZone.addEventListener('mouseenter', function () {
	      terms.classList.add('rightChoice');
	    });

	    leftZone.addEventListener('mouseleave', function () {
	      terms.classList.remove('leftChoice');
	    });
	    rightZone.addEventListener('mouseleave', function () {
	      terms.classList.remove('rightChoice');
	    });

	    leftZone.addEventListener('click', function () {
	      sendAnswer([termA, termB, term1, term2], 'left', couple1, couple2);
	    });
	    rightZone.addEventListener('click', function () {
	      sendAnswer([termA, termB, term1, term2], 'right', couple1, couple2);
	    });

	    currentLine.style.marginTop = 0;
	    currentLine.style.opacity = 1;
	    termsElement.classList.remove('leftChoice');
	    termsElement.classList.remove('rightChoice');
	    window.setTimeout(function () {
	      currentLine.classList.remove('animated');
	    }, 1000);
	  });
	}

	function incrementRound() {
	  var currentRound = document.querySelector('.current .round');
	  session.round++;
	  currentRound.innerHTML = session.round + '/10';
	}

	document.addEventListener('DOMContentLoaded', function () {

	  getQuestion();
	  getStats();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	(function() {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.fetch;
	}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);