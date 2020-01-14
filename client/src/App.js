import React, { useState, useEffect } from 'react';

import Line from './Line';
import Question from './Question';

import './App.css';

function App() {
  const [round, setRound] = useState(1);
  const [lineNum, setLineNum] = useState(1);
  const [stereotypesCount, setStereotypesCount] = useState('...');
  const [lines, setLines] = useState([], 'lines');

  const [score, setScore] = useState(0);

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
          setRound={setRound}
          setLineNum={setLineNum}
          lineNum={lineNum}
          setLines={setLines}
          setScore={setScore}
          score={score}
        ></Question>

        <div className="answers">
          {lines.map(
            ({ lineNum, round, type, couples, choice, results, score }) => {
              if (type === 'score') {
                return <Line key={lineNum} type="score" score={score} />;
              }

              const [couple1, couple2] = couples;
              return (
                <Line
                  key={lineNum}
                  type="answer"
                  round={round}
                  couple1={couple1}
                  couple2={couple2}
                  currentChoice={choice}
                  results={results}
                  score={score}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
