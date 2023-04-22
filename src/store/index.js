// import configureStore from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './reducer';

export const store = configureStore({
  reducer: {
    todoList: counterSlice.reducer,
  },
});
