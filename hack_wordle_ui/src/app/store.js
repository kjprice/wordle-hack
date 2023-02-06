import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import wordInputSlice from '../features/wordleInputs/wordleInputsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wordInput: wordInputSlice,
  },
});
