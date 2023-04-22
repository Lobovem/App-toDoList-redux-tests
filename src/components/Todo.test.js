import { Provider, useDispatch } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { store } from '../store';
import myTask from '../App';
import React from 'react';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('TodoList', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    render(
      <Provider store={store}>
        <Todo myTask={myTask} />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: 'Edit' });
    expect(btn).toBeInTheDocument();
  });

  //edit todo
  it('should be edited todo', () => {
    useDispatch.mockReturnValue(dispatch);

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

    const btnApply = screen.getByRole('button', { name: 'Apply' });
    expect(btnApply).toBeInTheDocument();

    const editingInput = screen.getByLabelText('Editing');
    expect(editingInput).toBeInTheDocument();

    fireEvent.change(editingInput, { target: { value: 'todo new' } });
    fireEvent.click(btnApply);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'todoList/set_change_edit_mode',
      payload: todo,
    });
  });

  //searching button delete
  it('should be searched button of delete', () => {
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
    useDispatch.mockReturnValue(dispatch);

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

    fireEvent.click(btnDel);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'todoList/delete_todo', payload: todo });
  });

  //completed todo after click checkbox, dispatch hadle_check after click checkbox
  it('should be completed todo, dispatch hadle_check after click checkbox', () => {
    const todo = { task: 'todo', complete: false, isEditing: false };
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'todoList/handle_check',
      payload: todo,
    });
  });

  //not completed todo after click checkbox, dispatch hadle_check after click checkbox
  it('should be not completed todo, dispatch hadle_check after click checkbox', () => {
    const todo = { task: 'todo', complete: true, isEditing: false };
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Todo myTask={todo} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(checkbox).not.toBeChecked();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'todoList/handle_check',
      payload: todo,
    });
  });
});
