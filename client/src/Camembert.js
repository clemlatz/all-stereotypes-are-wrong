import React from 'react';
import { Pie } from 'react-chartjs-2';

import './Camembert.css';

export default function Camembert({ counts, otherColor }) {
  const total = counts.reduce((total, current) => total + current, 0);
  const colors = counts.map((count) =>
    count >= total / 2 ? '#46BFBD' : '#F7464A'
  );

  if (otherColor) {
    colors[1] = otherColor;
  }

  return (
    <div className="Camembert">
      <Pie
        options={{
          tooltips: { enabled: false },
          legends: { enabled: false },
        }}
        width={70}
        height={70}
        data={{
          datasets: [
            {
              data: counts,
              backgroundColor: colors,
            },
          ],
        }}
      />
    </div>
  );
}
