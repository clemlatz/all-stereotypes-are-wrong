import React, { Fragment } from 'react';

import './Line.css';
import AnswerStats from './AnswerStats';
import termsFromCouples from './lib/terms-from-couples';

export default function Line({
  round,
  type,
  couple1,
  couple2,
  currentChoice,
  results,
  isLoading,
  onSideChoose,
  onSendAnswer,
}) {
  const { termA, termB, term1, term2 } = termsFromCouples(couple1, couple2);

  let lineClass = ['line'];
  lineClass.push(type);
  isLoading && lineClass.push('loading');

  let termsClass = ['terms'];
  termsClass.push(`${currentChoice}-choice`);

  let twitter = null;
  if (type === 'answer') {
    let twitterMessage;
    if (currentChoice === 'left') {
      twitterMessage = `${termA} = ${term1}\n${termB} = ${term2}\n`.toUpperCase();
    } else {
      twitterMessage = `${termA} = ${term2}\n${termB} = ${term1}\n`.toUpperCase();
    }
    twitter =
      'https://twitter.com/intent/tweet?text=' +
      encodeURI(twitterMessage) +
      '%23AllStereotypesAreWrong%0Ahttps://asaw.iwazaru.fr';
  }

  return (
    <div className={lineClass.join(' ')}>
      <div className="left">
        <span className="round">{round}/10</span>
        {twitter && (
          <p className="share">
            >{' '}
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              Share this stereotype
            </a>
          </p>
        )}
      </div>
      <div className={termsClass.join(' ')}>
        <div className="term termA">{termA}</div>
        <div className="term termB">{termB}</div>
        <div className="term term1">{term1}</div>
        <div className="term term2">{term2}</div>
        <div className="equal equal-left">=</div>
        <div className="equal equal-right">=</div>
        {type === 'question' && (
          <Fragment>
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
      {type === 'answer' ? (
        <AnswerStats results={results} couples={{ couple1, couple2 }} />
      ) : (
        <div className="right" />
      )}
    </div>
  );
}
