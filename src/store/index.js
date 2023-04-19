import { combineReducers, createStore } from 'redux';
import { todoListReduser } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({ todoListReduser: todoListReduser });
export const store = createStore(rootReducer, composeWithDevTools());
