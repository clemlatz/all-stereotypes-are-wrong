import React, { useState, useEffect } from 'react';

import './Line.css';

function Line({ round }) {
  const [currentCouples, setCurrentCouples] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);

  // Get question couples
  useEffect(() => {
    async function fetchCouples() {
      const response = await fetch('/couples');
      const result = await response.json();
      setCurrentCouples(result.couples);
    }
    fetchCouples();
  }, []);

  if (currentCouples === null) {
    return null;
  }

  const termA = currentCouples[0].firstTerm.en;
  const termB = currentCouples[0].secondTerm.en;
  const term1 = currentCouples[1].firstTerm.en;
  const term2 = currentCouples[1].secondTerm.en;

  let termsClass = ['terms'];
  termsClass.push(`${currentChoice}-choice`);

  return (
    <div className="line">
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
        ></div>
        <div
          className="zone right-zone"
          onMouseEnter={() => setCurrentChoice('right')}
          onMouseLeave={() => setCurrentChoice(null)}
        ></div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Line;
