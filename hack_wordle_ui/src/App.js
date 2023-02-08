import React from 'react';

import { WordleInputs } from './features/wordleInputs/WordleInputs';
import WordsResults from './features/wordsResults/WordsResults';
import loadWords from './api/loadWords';

import './App.css';

function App() {
  loadWords();
  return (
    <>
      <div className="col col-12">
          <div className="row">
              <div className="col">
                  <WordleInputs />
              </div>
          </div>
      </div>
      <div className="col col-12">
          <div className="row">
              <div className="col">
                  <WordsResults />
              </div>
          </div>
      </div>
    </>
  );
}

export default App;
