import React, { useEffect, useState } from 'react';
import CoupleSelector from './CoupleSelector';

import './BrowsePage.css';

export default function BrowsePage({ browsePageClasses }) {
  const [couples, setCouples] = useState([]);
  const [selectedCouple1, setSelectedCouple1] = useState(null);
  const [selectedCouple2, setSelectedCouple2] = useState(null);
  const [, setStats] = useState(null);

  // Get couples
  useEffect(() => {
    async function fetchCouple() {
      const response = await fetch('/browse/couples');
      const { couples } = await response.json();
      setCouples(couples);
    }
    fetchCouple();
  }, []);

  useEffect(() => {
    if (selectedCouple1 === null || selectedCouple2 === null) {
      return;
    }

    async function fetchCouple() {
      const response = await fetch(
        `/browse/stats?couple1=${selectedCouple1}&couple2=${selectedCouple2}`
      );
      const { stats } = await response.json();
      setStats(stats);
    }
    fetchCouple();
  }, [selectedCouple1, selectedCouple2]);

  function onCouple1Select({ value }) {
    setSelectedCouple1(value);
  }

  function onCouple2Select({ value }) {
    setSelectedCouple2(value);
  }

  return (
    <div className={browsePageClasses.join(' ')}>
      <CoupleSelector couples={couples} onSelect={onCouple1Select} /> are{' '}
      <CoupleSelector couples={couples} onSelect={onCouple2Select} />
    </div>
  );
}
