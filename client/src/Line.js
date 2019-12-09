import React, { Fragment } from 'react';

import './Line.css';

export default function Line({
  round,
  type,
  couple1,
  couple2,
  currentChoice,
  isLoading,
  onSideChoose,
  onSendAnswer,
}) {
  const termA = couple1.firstTerm.en;
  const termB = couple1.secondTerm.en;
  const term1 = couple2.firstTerm.en;
  const term2 = couple2.secondTerm.en;

  let lineClass = ['line'];
  lineClass.push(type);
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
        {type === 'question' && (
          <Fragment>
            <div className="equal equal-left">=</div>
            <div className="equal equal-right">=</div>
            <div
              className="zone left-zone"
              onMouseEnter={() => onSideChoose('left')}
              onMouseLeave={() => onSideChoose(null)}
              onClick={() =>
                onSendAnswer([termA, term1].join(), [termB, term2].join())
              }
            ></div>
            <div
              className="zone right-zone"
              onMouseEnter={() => onSideChoose('right')}
              onMouseLeave={() => onSideChoose(null)}
              onClick={() =>
                onSendAnswer([termA, term2].join(), [termB, term1].join())
              }
            ></div>
          </Fragment>
        )}
      </div>
      <div className="right"></div>
    </div>
  );
}
