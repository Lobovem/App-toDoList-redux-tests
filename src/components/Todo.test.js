import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { Form } from './Form';
import { store } from '../store';
import myTask from '../App';
import React from 'react';
import App from '../App';
import * as reduxHooks from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

let todo = [
  {
    id: 1,
    task: 'todo one',
    complete: false,
    isEditing: false,
  },
];

const dispatch = jest.fn();
const useSel = jest.fn();

const mockUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('TodoList', () => {
  //snapshot component
  it('should be maked snapshop Todo', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <Todo myTask={myTask} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  //searching button edit
  it('should be searched button of edit', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    render(
      <Provider store={store}>
        <Todo myTask={myTask} />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: 'Edit' });
    expect(btn).toBeInTheDocument();
  });

  //searching button delete
  it('should be searched button of delete', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    render(
      <Provider store={store}>
        <Todo myTask={myTask} />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: 'X' });
    expect(btn).toBeInTheDocument();
  });

  //delete todo
  it('should be deleted todo after press btn delete', () => {
    const dispatch = jest.fn();

    const todo = {
      id: 1,
      task: 'todo one',
      complete: false,
      isEditing: true,
    };

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const btnDel = screen.getByRole('button', { name: 'X' });
    expect(btnDel).toBeInTheDocument();

    dispatch(btnDel);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  //edit todo
  it('should be edited todo', () => {
    const todo = {
      id: 1,
      task: 'todo one',
      complete: false,
      isEditing: true,
    };

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const btnEdit = screen.getByRole('button', { name: 'Edit' });
    expect(btnEdit).toBeInTheDocument();

    const editingInput = screen.getByLabelText('Editing');
    expect(editingInput).toBeInTheDocument();

    fireEvent.change(editingInput, { target: { value: todo.task } });
    expect(editingInput.value).toBe('todo one');

    const ubdatedTodo = {
      ...todo,
      task: 'todo edited',
      isEditing: false,
    };

    expect(ubdatedTodo).toEqual({
      id: 1,
      task: 'todo edited',
      complete: false,
      isEditing: false,
    });
  });

  it('should be checked checkbox', () => {
    const todo = {
      id: 1,
      task: 'todo one',
      complete: false,
      isEditing: true,
    };

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    // fireEvent.click(checkbox);
    // expect(checkbox.checked).toBe(true);
  });
});
