import React, { useEffect, useState } from 'react';

export default function BrowsePage({ browsePageClasses }) {
  const [couples, setCouples] = useState([]);

  // Get couples
  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/browse/couples');
      const { couples } = await response.json();
      setCouples(couples);
    }
    fetchStats();
  }, []);

  return (
    <div className={browsePageClasses.join(' ')}>
      {couples.map(couple => <p>{couple.id}</p>)}
    </div>
  );
}