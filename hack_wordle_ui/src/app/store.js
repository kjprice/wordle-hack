import { configureStore } from '@reduxjs/toolkit';
import wordInputSlice from '../features/wordleInputs/wordleInputsSlice';
import wordsListSlice from './wordsListSlice';

export const store = configureStore({
  reducer: {
    wordInput: wordInputSlice,
    wordsList: wordsListSlice,
  },
});
