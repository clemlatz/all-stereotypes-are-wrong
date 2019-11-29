import React, { useState, useEffect } from 'react';

import './Line.css';

async function sendAnswer(
  couple1,
  couple2,
  association1,
  association2,
  token,
  setIsLoading,
  setStereotypesCount
) {
  try {
    setIsLoading(true);
    const response = await fetch('/answer', {
      method: 'POST',
      body: JSON.stringify({
        association1,
        association2,
        couple1,
        couple2,
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    } else {
      setStereotypesCount(json.stats.stereotypes);
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}

function Line({ round, setStereotypesCount }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get question couples
  useEffect(() => {
    async function fetchCouples() {
      const response = await fetch('/couples');
      const { couples, token } = await response.json();
      setCurrentQuestion({ couples, token });
    }
    fetchCouples();
  }, []);

  if (currentQuestion === null) {
    return null;
  }

  const { couples, token } = currentQuestion;
  const [couple1, couple2] = couples;
  const termA = couple1.firstTerm.en;
  const termB = couple1.secondTerm.en;
  const term1 = couple2.firstTerm.en;
  const term2 = couple2.secondTerm.en;

  let lineClass = ['line'];
  isLoading && lineClass.push('loading');

  let termsClass = ['terms'];
  termsClass.push(`${currentChoice}-choice`);

  return (
    <div className={lineClass.join(' ')}>
      <div className="left">
        <span className="round">{round}/10</span>
      </div>
      <div className={termsClass.join(' ')}>
        <div className="term termA">{termA}</div>
        <div className="term termB">{termB}</div>
        <div className="term term1">{term1}</div>
        <div className="term term2">{term2}</div>
        <div className="equal equal-left">=</div>
        <div className="equal equal-right">=</div>
        <div
          className="zone left-zone"
          onMouseEnter={() => setCurrentChoice('left')}
          onMouseLeave={() => setCurrentChoice(null)}
          onClick={() =>
            sendAnswer(
              couple1.id,
              couple2.id,
              [termA, term1].join(),
              [termB, term2].join(),
              token,
              setIsLoading,
              setStereotypesCount
            )
          }
        ></div>
        <div
          className="zone right-zone"
          onMouseEnter={() => setCurrentChoice('right')}
          onMouseLeave={() => setCurrentChoice(null)}
          onClick={() =>
            sendAnswer(
              couple1.id,
              couple2.id,
              [termA, term2].join(),
              [termB, term1].join(),
              token,
              setIsLoading,
              setStereotypesCount
            )
          }
        ></div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Line;
