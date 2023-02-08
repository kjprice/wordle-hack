import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';

import {
  setShouldRemoveSuggestedLetters,
  selectFoundWords,
  selectWordsCounts,
  selectWordCountCssThresholds,
  selectShouldRemoveSuggestedLetters
} from "../wordsResults/wordResultsSlice";


import {
  selectExactLetters,
  selectOtherLetters,
} from "../wordleInputs/wordleInputsSlice";

import { wordContainsAnyLetters } from './findWords';

import styles from "./WordResults.module.css";

const SUGGESTED_WORDS = [
  'party',
  'cloud',
  'singe',
];

const SUGGESTED_LETTERS = SUGGESTED_WORDS.join('').split('');

function getWordCountThreshold(wordsCounts, wordCountCssThresholds, word) {
  const count = wordsCounts[word];
  for (let i = 0; i < wordCountCssThresholds.length; i++) {
    const threshold = wordCountCssThresholds[i];
    if (count <= threshold) {
      return i;
    }
  }
}

const WORD_COUNT_CSS_CLASSES = [
  "",
  styles.rare,
  styles.common,
  styles.ubiquitous,
];

function sortWords(words, wordsCounts, wordCountCssThresholds) {
  return [...words].sort((word1, word2) => {
    const countDiff =
      getWordCountThreshold(wordsCounts, wordCountCssThresholds, word2) -
      getWordCountThreshold(wordsCounts, wordCountCssThresholds, word1);
    if (countDiff !== 0) {
      return countDiff;
    }

    return word1.localeCompare(word2);
  });
}

function wordCountCssClass(wordsCounts, wordCountCssThresholds, word) {
  const wordCountThreshold = getWordCountThreshold(
    wordsCounts,
    wordCountCssThresholds,
    word
  );
  return (
    styles.textFrequency + " " + WORD_COUNT_CSS_CLASSES[wordCountThreshold]
  );
}

function wordCountRarityIcon(wordsCounts, wordCountCssThresholds, word) {
  const cssClass = wordCountCssClass(wordsCounts, wordCountCssThresholds, word);

  return <div className={cssClass}></div>;
}

function WordRowItem(props) {
  const { wordsCounts, wordCountCssThresholds, word } = props;
  return (
    <li className={styles.wordItem}>
      {wordCountRarityIcon(wordsCounts, wordCountCssThresholds, word)}
      {word}
    </li>
  );
}

function removeSuggestedLetters(words, exactLetters, otherLetters) {
  const lettersToKeep = new Set(exactLetters.map(l => l.toLowerCase()) + otherLetters.toLowerCase().split(''));
  const lettersToRemove = SUGGESTED_LETTERS.filter(letter => !lettersToKeep.has(letter)).join('');

  const goodWords = [];
  for (const word of words) {
    if (!wordContainsAnyLetters(word, lettersToRemove)){ 
      goodWords.push(word);
    }
  }
  return goodWords;
}

function WordsResults() {
  const dispatch = useDispatch();
  const foundWords = useSelector(selectFoundWords);
  const wordsCounts = useSelector(selectWordsCounts);
  const wordCountCssThresholds = useSelector(selectWordCountCssThresholds);
  const shouldRemoveSuggestedLetters = useSelector(selectShouldRemoveSuggestedLetters);
  const exactLetters = useSelector(selectExactLetters);
  const otherLetters = useSelector(selectOtherLetters);

  const sortedWords = sortWords(
    foundWords,
    wordsCounts,
    wordCountCssThresholds
  );

  let filteredWords = sortedWords;
  if (shouldRemoveSuggestedLetters) {
    filteredWords = removeSuggestedLetters(filteredWords, exactLetters, otherLetters);
  }

  if(foundWords.length === 0) {
    return null;
  }
  return (
    <>
      <h3>Possible Words</h3>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Filter Suggested Words"
        checked={shouldRemoveSuggestedLetters}
        onChange={() => dispatch(setShouldRemoveSuggestedLetters())}
      />
      <ul>
        {filteredWords.map((word) => (
          <WordRowItem
            key={word}
            word={word}
            wordsCounts={wordsCounts}
            wordCountCssThresholds={wordCountCssThresholds}
          />
        ))}
      </ul>
    </>
  );
}

export default WordsResults;
