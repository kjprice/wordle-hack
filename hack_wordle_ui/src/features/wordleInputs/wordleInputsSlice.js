import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exactLetters: ['', '', '', '', '', ],
  otherLetters: '',
  ignoredLetters: '',
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
  },
});

export const { setExactLetter, setOtherLetters, setIgnoredLetters } = wordInputSlice.actions;

export const selectExactLetters = (state) => state.wordInput.exactLetters;
export const selectOtherLetters = (state) => state.wordInput.otherLetters;
export const selectIgnoredLetters = (state) => state.wordInput.ignoredLetters;

export default wordInputSlice.reducer;
