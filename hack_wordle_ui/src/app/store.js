import { configureStore } from '@reduxjs/toolkit';
import wordInputSlice from '../features/wordleInputs/wordleInputsSlice';

export const store = configureStore({
  reducer: {
    wordInput: wordInputSlice,
  },
});
