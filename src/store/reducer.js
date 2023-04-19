const defaultState = {
  todoListState: JSON.parse(localStorage.getItem('tasks')) || [],
  inputState: '',
};

export const todoListReduser = (state = defaultState, action) => {
  switch (action.type) {
    //check complete or not complete todo
    case 'HANDLE_CHECK':
      return {
        ...state,
        todoListState: state.todoListState.map((todo) => (todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : { ...todo })),
      };

    //add new task
    case 'ADD_TODO':
      //cheking todo input, that not been empty
      if (state.inputState.trim()) {
        return {
          ...state,
          todoListState: [
            ...state.todoListState,
            {
              //generation random id number
              id: Math.random().toString().substring(2, 5),
              task: action.payload,
              complete: false,
              isEditing: false,
            },
          ],
        };
      } else {
        return { ...state };
      }

    //change input of add todo
    case 'INPUT_CHANGE':
      return { ...state, inputState: action.payload };

    //set change edit mode
    case 'SET_CHANGE_EDIT_MODE':
      return {
        ...state,
        todoListState: state.todoListState.map((todo) => (todo.id === action.payload.id ? { ...todo, isEditing: !todo.isEditing } : { ...todo })),
      };

    //edit todo
    case 'EDIT_TODO':
      return {
        ...state,
        todoListState: state.todoListState.map((todo) => {
          if (todo.id === action.payload.myTask.id) {
            todo.task = action.payload.todoTitle;
          }
          return todo;
        }),
      };

    //delete task
    case 'DELETE_TODO':
      return {
        ...state,
        todoListState: state.todoListState.filter((todo) => todo.id !== action.payload.id),
      };

    //delete all complete task
    case 'DELETE_ALL_COMPLETE_TODO':
      return {
        ...state,
        todoListState: state.todoListState.filter((todo) => todo.complete === false),
      };

    default:
      return state;
  }
};
