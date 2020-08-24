import React from 'react';

import termsFromCouples from './lib/terms-from-couples';
import Camembert from './Camembert';

export default function AnswerStats({ results, couples }) {
  const { count, total, percent, success } = results;

  const { termA, termB, term1, term2 } = termsFromCouples(
    couples.couple1,
    couples.couple2
  );
  const googleTruth = `https://www.google.com/trends/explore#q=${termA} ${term1}, ${termB} ${term2}, ${termA} ${term2}, ${termB} ${term1}`;

  const rightClass = success ? 'right correct' : 'right wrong';

  return (
    <div className={rightClass}>
      <Camembert counts={[count, total - count]} otherColor="#cccccc" />
      <div>
        <strong>
          {percent}% of {total}
        </strong>{' '}
        players
        <br />
        chose like you
        <br />
        {success ? (
          <span>
            <span className="fa fa-thumbs-o-up"></span>{' '}
            <strong>Well done</strong> +1pt
          </span>
        ) : (
          <span>
            <span className="fa fa-thumbs-o-down"></span> <strong>Wrong</strong>
          </span>
        )}
        <br />
        <br />
        &gt;{' '}
        <a href={googleTruth} target="_blank" rel="noopener noreferrer">
          The Google Truth
        </a>
      </div>
    </div>
  );
}
