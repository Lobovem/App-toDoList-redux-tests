// import configureStore from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './reducer';

export const store = configureStore({
  reducer: {
    todoList: todoReducer.reducer,
  },
});
