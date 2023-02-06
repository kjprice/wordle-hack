import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import wordInputSlice from '../features/wordleInputs/wordleInputsSlice';
import wordsListSlice from './wordsListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wordInput: wordInputSlice,
    wordsList: wordsListSlice,
  },
});
