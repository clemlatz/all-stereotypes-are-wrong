import React from 'react';
import Select from 'react-select';

import './CoupleSelector.css';

export default function CoupleSelector({ couples }) {
  const options = couples.map((couple) => ({
    value: couple.id,
    label: `${couple.firstTerm.en} / ${couple.secondTerm.en}`,
  }));
  return (
    <div className="CoupleSelector">
      <Select options={options} />
    </div>
  );
}
