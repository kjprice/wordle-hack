import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordsCounts: {},
  largestWordCount: 0,
  wordCountCssThresholds: [],
  foundWords: [],
  errorText: null,
  shouldRemoveSuggestedLetters: true,
};

function getWordsCountsMap(wordsCountsList) {
  const wordsCounts = {};
  for (const wordsCountLine of wordsCountsList) {
    const [word, count] = wordsCountLine.split(" ");
    wordsCounts[word] = parseInt(count);
  }

  return wordsCounts;
}

export const wordResultsSlice = createSlice({
  name: "wordResults",
  initialState,
  reducers: {
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
    setShouldRemoveSuggestedLetters: (state, action) => {
      state.shouldRemoveSuggestedLetters = !state.shouldRemoveSuggestedLetters;
    }
  },
});

export const { setFoundWords, setWordsList, setShouldRemoveSuggestedLetters } = wordResultsSlice.actions;

export const selectFoundWords = (state) => state.wordResults.foundWords;
export const selectWordsCounts = (state) => state.wordResults.wordsCounts;
export const selectWordCountCssThresholds = (state) => state.wordResults.wordCountCssThresholds;
export const selectShouldRemoveSuggestedLetters = (state) => state.wordResults.shouldRemoveSuggestedLetters;

export default wordResultsSlice.reducer;
