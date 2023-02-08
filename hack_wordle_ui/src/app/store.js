import { configureStore } from '@reduxjs/toolkit';
import wordInputSlice from '../features/wordleInputs/wordleInputsSlice';
import wordResultsSlice from '../features/wordsResults/wordResultsSlice';

export const store = configureStore({
  reducer: {
    wordInput: wordInputSlice,
    wordResults: wordResultsSlice,
  },
});
