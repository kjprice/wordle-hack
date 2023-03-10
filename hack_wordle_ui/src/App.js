import React from "react";

import { WordleInputs } from "./features/wordleInputs/WordleInputs";
import WordsResults from "./features/wordsResults/WordsResults";
import WordleKeyboard from "./features/wordleKeyboard/WordleKeyboard";
import loadWords from "./api/loadWords";

import "./App.css";

function App() {
  loadWords();
  return (
    <>
      <div className="row">
        <div className="col">
          <WordleInputs />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <WordleKeyboard />
        </div>
      </div>
      <div style={{ marginTop: 40 }} className="row">
        <div className="col">
          <WordsResults />
        </div>
      </div>
    </>
  );
}

export default App;
