import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    todoListState: JSON.parse(localStorage.getItem('tasks')) || [],
    inputState: '',
  },
  reducers: {
    add_todo: (state, action) => {
      if (action.payload !== '') {
        return {
          ...state,
          todoListState: [
            ...state.todoListState,
            {
              id: Math.random(),
              task: action.payload,
              complete: false,
              isEditing: false,
            },
          ],
        };
      } else {
        return { ...state };
      }
    },

    handle_check: (state, action) => {
      return {
        ...state,
        todoListState: state.todoListState.map((todo) => (todo.id === action.payload ? { ...todo, complete: !todo.complete } : { ...todo })),
      };
    },
    input_change: (state, action) => {
      return { ...state, inputState: action.payload };
    },
    set_change_edit_mode: (state, action) => {
      return {
        ...state,
        todoListState: state.todoListState.map((todo) => (todo.id === action.payload ? { ...todo, isEditing: !todo.isEditing } : { ...todo })),
      };
    },
    edit_todo: (state, action) => {
      return {
        ...state,
        todoListState: state.todoListState.map((todo) => {
          if (todo.id === action.payload.myTask.id) {
            todo.task = action.payload.todoTitle;
          }
          return todo;
        }),
      };
    },
    delete_todo: (state, action) => {
      return {
        ...state,
        todoListState: state.todoListState.filter((todo) => todo.id !== action.payload),
      };
    },
    delete_all_todo: (state) => {
      return {
        ...state,
        todoListState: [],
      };
    },
  },
});

export const userInputSelector = (state) => state.counter.inputState;

export const { add_todo } = counterSlice.actions;
export default counterSlice.reducer;
