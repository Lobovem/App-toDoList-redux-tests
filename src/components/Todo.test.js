import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { Form } from './Form';
import { store } from '../store';
import myTask from '../App';
import React from 'react';
import App from '../App';

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
});
