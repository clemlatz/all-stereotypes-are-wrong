import React from 'react';

import './NavMenu.css';

export default function NavMenu({ currentPage, setCurrentPage }) {
  const chooseClasses = ['entry', 'choose'];
  const browseClasses = ['entry', 'browse'];

  if (currentPage === 'choose') {
    chooseClasses.push('selected');
  } else {
    browseClasses.push('selected');
  }

  return (
    <nav className="NavMenu">
      <span
        onClick={() => setCurrentPage('choose')}
        className={chooseClasses.join(' ')}
      >
        Choose the most common stereotype
      </span>{' '}
      {/* or{' '}
      <span
        onClick={() => setCurrentPage('browse')}
        className={browseClasses.join(' ')}
      >
        browse stereotypes
  </span>*/}
    </nav>
  );
}
