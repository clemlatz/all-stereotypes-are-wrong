import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="main">
        <div id="header">
          <h1>All Stereotypes Are Wrong</h1>
          <p id="tagline">Choose the most common stereotype</p>
        </div>

        <div id="social">
          <a
            href="https://twitter.com/search?q=%23AllStereotypesAreWrong"
            target="_blank"
          >
            <span class="fa fa-twitter-square"></span>
          </a>{' '}
          <a
            href="https://github.com/iwazaru/all-stereotypes-are-wrong"
            target="_blank"
          >
            <span class="fa fa-github-square"></span>
          </a>
        </div>

        <div id="stats">
          <span class="count"></span> stereotypes so far
        </div>

        <div class="current line">
          <div class="left">
            <span class="round"></span>
          </div>
          <div id="terms" class="terms"></div>
          <div class="right"></div>
        </div>

        <div id="answers"></div>
      </div>
    </div>
  );
}

export default App;
