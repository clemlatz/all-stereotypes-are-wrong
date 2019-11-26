import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [answers, setAnswers] = useState('...');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/stats');
      const stats = await response.json();
      setAnswers(stats.total);
    }
    fetchData();
  }, []);

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
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="fa fa-twitter-square"></span>
          </a>{' '}
          <a
            href="https://github.com/iwazaru/all-stereotypes-are-wrong"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="fa fa-github-square"></span>
          </a>
        </div>

        <div id="stats">{answers} stereotypes so far</div>

        <div className="current line">
          <div className="left">
            <span className="round"></span>
          </div>
          <div id="terms" className="terms"></div>
          <div className="right"></div>
        </div>

        <div id="answers"></div>
      </div>
    </div>
  );
}

export default App;
