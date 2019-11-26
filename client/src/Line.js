import React, { useState, useEffect } from 'react';

import './Line.css';

function Line({ round }) {
  const [currentCouples, setCurrentCouples] = useState(null);

  // Get question couples
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/couples');
      const result = await response.json();
      setCurrentCouples(result.couples);
    }
    fetchData();
  }, []);

  if (currentCouples === null) {
    return null;
  }

  const termA = currentCouples[0].firstTerm.en;
  const termB = currentCouples[0].secondTerm.en;
  const term1 = currentCouples[1].firstTerm.en;
  const term2 = currentCouples[1].secondTerm.en;

  return (
    <div className="line">
      <div className="left">
        <span className="round">{round}/10</span>
      </div>
      <div id="terms" className="terms">
        <div className="term termA">{termA}</div>
        <div className="term termB">{termB}</div>
        <div className="term term1">{term1}</div>
        <div className="term term2">{term2}</div>
        <div className="equal" id="equalLeft">
          =
        </div>
        <div className="equal" id="equalRight">
          =
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Line;
