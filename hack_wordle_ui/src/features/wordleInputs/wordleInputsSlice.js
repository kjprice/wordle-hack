import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Word Inputs
  exactLetters: ['', '', '', '', '', ],
  otherLetters: '',
  ignoredLetters: '',
  shouldRemoveSuggestedLetters: true,
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
    },
    setOtherLetters: (state, action) => {
      const otherLetters = action.payload;

      state.otherLetters = cleanLetters(otherLetters);
    },
    setIgnoredLetters: (state, action) => {
      const ignoredLetters = action.payload;

      state.ignoredLetters = cleanLetters(ignoredLetters);
    },
    setShouldRemoveSuggestedLetters: (state, action) => {
      state.shouldRemoveSuggestedLetters = !state.shouldRemoveSuggestedLetters;
    },
    setFoundWords: (state, action) => {
      const foundWords = action.payload;

      state.errorText = null;
      state.foundWords = foundWords;
    },
    setWordsList: (state, action) => {
      const wordsCountsText = action.payload;
      const wordsCountsList = wordsCountsText.trim().split("\n");
      const wordsCounts = getWordsCountsMap(wordsCountsList);

      const largestWordCount = Math.max(...Object.values(wordsCounts));

      state.wordsCounts = wordsCounts;
      state.largestWordCount = largestWordCount;
      state.wordCountCssThresholds = [0, 2, 10, largestWordCount];
    },
  },
});

export const { setFoundWords, setWordsList, setExactLetter, setOtherLetters, setIgnoredLetters, setShouldRemoveSuggestedLetters } = wordInputSlice.actions;

export const selectExactLetters = (state) => state.wordInput.exactLetters;
export const selectOtherLetters = (state) => state.wordInput.otherLetters;
export const selectIgnoredLetters = (state) => state.wordInput.ignoredLetters;
export const selectShouldRemoveSuggestedLetters = (state) => state.wordInput.shouldRemoveSuggestedLetters;
export const selectFoundWords = (state) => state.wordInput.foundWords;
export const selectWordsCounts = (state) => state.wordInput.wordsCounts;
export const selectWordCountCssThresholds = (state) => state.wordInput.wordCountCssThresholds;

export default wordInputSlice.reducer;
