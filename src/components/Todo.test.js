import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { store } from '../store';
import myTask from '../App';
import { Form } from './Form';
import configureStore from 'redux-mock-store';

describe('TodoList', () => {
  const todo = {
    id: '1',
    task: 'test',
    complete: false,
    isEditing: false,
  };
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

  // it('should be added todo to list', () => {
  //   const mockStore = configureStore();
  //   const initialState = {
  //     todos: [],
  //   };
  //   const store = mockStore(initialState);
  //   // eslint-disable-next-line testing-library/render-result-naming-convention
  //   render(
  //     <Provider store={store}>
  //       <Form />
  //       <Todo myTask={myTask} />
  //     </Provider>
  //   );

  //   const input = screen.getByPlaceholderText('Please enter new task...');

  //   fireEvent.change(input, { target: { value: 'test' } });

  //   const btn = screen.getByRole('button', { name: '+' });
  //   fireEvent.click(btn);

  //   const actions = store.getActions();

  //   expect(actions).toEqual([{ type: 'ADD_TODO', payload: { id: 1, text: 'Новая задача' } }]);

  //   const newTodo = screen.getByText('test');

  //   expect(newTodo).toBeInTheDocument();
  //   // expect(input.value).toBe('test');
  // });
});
