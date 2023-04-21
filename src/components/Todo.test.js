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
  it('should be maked snapshop Todo', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <Todo myTask={myTask} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

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

  // it('should clear the input when a todo is added', () => {
  //   let todo = {
  //     id: 1,
  //     task: 'todo one',
  //     complete: false,
  //     isEditing: true,
  //   };

  //   render(
  //     <Provider store={store}>
  //       <Todo todo={todo} />
  //     </Provider>
  //   );

  //   const input = screen.getByRole('textbox');
  //   expect(input).toBeInTheDocument();
  // });
});
