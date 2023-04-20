import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { store } from '../store';
import myTask from '../App';

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

    // const btn = screen.getByRole('button', { name: 'Edit' });
    // expect(btn).toBeInTheDocument();

    // const input = screen.getByPlaceholderText('Please enter new task...');
    // fireEvent.change(input, { target: { value: 'test' } });

    // const btn = screen.getByRole('button', { name: '+' });
    // fireEvent.click(btn);

    // const newTodo = screen.getByText('test');

    // expect(newTodo).toBeInTheDocument();
    // expect(input.value).toBe('test');
  });
});
