import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectExactLetters,
  selectOtherLetters,
  selectShouldRemoveSuggestedLetters,
  selectFoundWords,
  selectWordsCounts,
  selectWordCountCssThresholds,
} from "../wordleInputs/wordleInputsSlice";

import styles from "./WordResults.module.css";

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

function WordsResults() {
  const foundWords = useSelector(selectFoundWords);
  const wordsCounts = useSelector(selectWordsCounts);
  const wordCountCssThresholds = useSelector(selectWordCountCssThresholds);

  const sortedWords = sortWords(
    foundWords,
    wordsCounts,
    wordCountCssThresholds
  );

  if(foundWords.length === 0) {
    return null;
  }
  return (
    <>
      <h3>Possible Words</h3>
      <p>Found {sortedWords.length} words.</p>
      <ul>
        {sortedWords.map((word) => (
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
