import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { store } from '../store';
import myTask from '../App';
import React from 'react';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const dispatch = jest.fn();

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

  //complete todo
  it('should be complete todo', () => {
    const onClick = jest.fn();
    const todo = { id: 1, task: 'todo', complete: true, isEditing: false };

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    onClick(checkbox);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  //not complete todo
  it('should be not complete todo', () => {
    const onClick = jest.fn();
    const todo = { id: 1, task: 'todo', complete: false, isEditing: false };

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    onClick(checkbox);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(checkbox).not.toBeChecked();
  });
});
