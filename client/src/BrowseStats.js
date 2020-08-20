import React from 'react';

export default function BrowseStats({ answer, count, total }) {
  const [, term1, term2, term3, term4] = answer.match(/^(.*),(.*);(.*),(.*)$/)

  const resultClass = (count > total / 2) ? 'right' : 'wrong';

  return (
    <p className={['answer', resultClass].join(' ')}>
      {count} voted<br />
      <strong>{term1}</strong> = <strong>{term2}</strong><br />
      and<br />
      <strong>{term3}</strong> = <strong>{term4}</strong>
    </p>
  );
}