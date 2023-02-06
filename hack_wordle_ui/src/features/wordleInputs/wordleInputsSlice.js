import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exactLetters: ['', '', '', '', '', ],
};

function takeLastLetter(letters) {
  if (letters.length < 2) {
    return letters;
  }

  return letters[letters.length -1];
}

function cleanLetterValue(letterValue) {
  return takeLastLetter(letterValue).toUpperCase();
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
  },
});

export const { setExactLetter } = wordInputSlice.actions;

export const selectExactLetters = (state) => state.wordInput.exactLetters;

export default wordInputSlice.reducer;
