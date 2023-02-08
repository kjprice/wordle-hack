import { createSlice } from '@reduxjs/toolkit';

import { SUGGESTED_LETTERS } from "../../config";
import findWords from "../wordsResults/findWords";

const initialState = {
  // Word Inputs
  exactLetters: ['', '', '', '', '', ],
  otherLetters: '',
  ignoredLetters: '',
  shouldRemoveSuggestedLetters: true,
  allIgnoredLetters: '',
  // Word Results
  wordsCounts: {},
  largestWordCount: 0,
  wordCountCssThresholds: [],
  foundWords: [],
};

function takeLastLetter(letters) {
  if (letters.length < 2) {
    return letters;
  }

  return letters[letters.length -1];
}

function cleanLetterValue(letterValue) {
  return takeLastLetter(cleanLetters(letterValue));
}

function cleanLetters(letters) {
  return letters.toUpperCase().trim().replace(/[^A-Z]+/, '');
}

function getWordsCountsMap(wordsCountsList) {
  const wordsCounts = {};
  for (const wordsCountLine of wordsCountsList) {
    const [word, count] = wordsCountLine.split(" ");
    wordsCounts[word] = parseInt(count);
  }

  return wordsCounts;
}

function getAllIgnoredLetters(state) {
  const { ignoredLetters, exactLetters, otherLetters, shouldRemoveSuggestedLetters } = state;
  let allIgnoredLetters = ignoredLetters.split('');
  if (shouldRemoveSuggestedLetters) {
    allIgnoredLetters = allIgnoredLetters.concat(SUGGESTED_LETTERS);
  }
  const lettersToKeep = new Set([...exactLetters, ...otherLetters.split('')].map(l => l.toLowerCase()))
  allIgnoredLetters = allIgnoredLetters.map(l => l.toLowerCase()).filter(letter => !lettersToKeep.has(letter));
  return allIgnoredLetters.join('');
}

function setAllIgnoredLetters(state) {
  state.allIgnoredLetters = getAllIgnoredLetters(state);
}

function findAndSetWords(state) {
  const { wordsCounts, exactLetters, otherLetters, allIgnoredLetters } = state;
  state.foundWords = findWords(wordsCounts, exactLetters, otherLetters, allIgnoredLetters);
}

export const wordInputSlice = createSlice({
  name: 'wordInputs',
  initialState,
  reducers: {
    setExactLetter: (state, action) => {
      const {
        letterPosition,
        letterValue,
      } = action.payload;

      state.exactLetters = [...state.exactLetters];
      state.exactLetters[letterPosition] = cleanLetterValue(letterValue);
      setAllIgnoredLetters(state);
      findAndSetWords(state);
    },
    setOtherLetters: (state, action) => {
      const otherLetters = action.payload;

      state.otherLetters = cleanLetters(otherLetters);
      setAllIgnoredLetters(state);
      findAndSetWords(state);
    },
    setIgnoredLetters: (state, action) => {
      const ignoredLetters = action.payload;

      state.ignoredLetters = cleanLetters(ignoredLetters);
      setAllIgnoredLetters(state);
      findAndSetWords(state);
    },
    setShouldRemoveSuggestedLetters: (state, action) => {
      state.shouldRemoveSuggestedLetters = !state.shouldRemoveSuggestedLetters;
      setAllIgnoredLetters(state);
      findAndSetWords(state);
    },
    setWordsList: (state, action) => {
      const wordsCountsText = action.payload;
      const wordsCountsList = wordsCountsText.trim().split("\n");
      const wordsCounts = getWordsCountsMap(wordsCountsList);

      const largestWordCount = Math.max(...Object.values(wordsCounts));

      state.wordsCounts = wordsCounts;
      state.largestWordCount = largestWordCount;
      state.wordCountCssThresholds = [0, 2, 10, largestWordCount];
      setAllIgnoredLetters(state);
    },
  },
});

export const { setFoundWords, setWordsList, setExactLetter, setOtherLetters, setIgnoredLetters, setShouldRemoveSuggestedLetters } = wordInputSlice.actions;

export const selectExactLetters = (state) => state.wordInput.exactLetters;
export const selectOtherLetters = (state) => state.wordInput.otherLetters;
export const selectIgnoredLetters = (state) => state.wordInput.ignoredLetters;
export const selectAllIgnoredLetters = (state) => state.wordInput.allIgnoredLetters;
export const selectShouldRemoveSuggestedLetters = (state) => state.wordInput.shouldRemoveSuggestedLetters;
export const selectFoundWords = (state) => state.wordInput.foundWords;
export const selectWordsCounts = (state) => state.wordInput.wordsCounts;
export const selectWordCountCssThresholds = (state) => state.wordInput.wordCountCssThresholds;

export default wordInputSlice.reducer;
