import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  words: []
};

export const wordsListSlice = createSlice({
  name: 'wordsList',
  initialState,
  reducers: {
    setWordsList: (state, action) => {
      const words = action.payload;
      state.words = words;
    },
  },
});

export const { setWordsList } = wordsListSlice.actions;

export const selectWordsList = (state) => state.wordsList.words;

export default wordsListSlice.reducer;
