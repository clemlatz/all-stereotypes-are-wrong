import React, { useState } from 'react';
import NavMenu from './NavMenu';

import './App.css';
import BrowsePage from './BrowsePage';
import ChoosePage from './ChoosePage';

function App() {
  const [stereotypesCount, setStereotypesCount] = useState('...');
  const [currentPage, setCurrentPage] = useState('choose');

  const choosePageClasses = ['page', 'choose-page'];
  const browsePageClasses = ['page', 'browse-page'];
  if (currentPage === 'choose') {
    choosePageClasses.push('selected');
  } else {
    browsePageClasses.push('selected');
  }

  return (
    <div className="App">
      <div id="main">
        <div id="header">
          <h1>
            All Stereotypes Are Wrong <span className="version">3.0.2</span>
          </h1>
          <NavMenu
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></NavMenu>
        </div>

        <div id="social">
          <a
            href="https://twitter.com/search?q=%23AllStereotypesAreWrong"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="fa fa-twitter-square"></span>
          </a>{' '}
          <a
            href="https://github.com/iwazaru/all-stereotypes-are-wrong"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="fa fa-github-square"></span>
          </a>
        </div>

        <div id="stats">{stereotypesCount} stereotypes so far</div>

        <ChoosePage choosePageClasses={choosePageClasses} setStereotypesCount={setStereotypesCount} />
        <BrowsePage browsePageClasses={browsePageClasses} />
      </div>
    </div>
  );
}

export default App;
