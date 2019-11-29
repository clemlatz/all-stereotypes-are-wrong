import React, { useState, useEffect } from 'react';

import Question from './Question';

import './App.css';

function App() {
  const [round] = useState(1);
  const [stereotypesCount, setStereotypesCount] = useState('...');

  // Get stereotypescount count
  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/stats');
      const stats = await response.json();
      setStereotypesCount(stats.stereotypes);
    }
    fetchStats();
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

        <div id="stats">{stereotypesCount} stereotypes so far</div>

        {/* Current line */}
        <Question
          round={round}
          setStereotypesCount={setStereotypesCount}
        ></Question>

        {/* {answers.forEach(answer => (
          <Line answer={answer} />
        ))} */}

        <div id="stereotypescount"></div>
      </div>
    </div>
  );
}

export default App;
