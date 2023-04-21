import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { Provider } from 'react-redux';
import { Form } from './Form';
import { Todo } from './Todo';
import { store } from '../store';
import myTask from '../App';
import App from '../App';
import * as reduxHooks from 'react-redux';
import * as actions from '../store/reducer';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

let MyTask = [
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

describe('Form', () => {
  it('should be maked snapshot Form', () => {
    // mockUseSelector.mockReturnValue([]);
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it('should search button of Remove checked', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const btn = screen.getByRole('button', { name: 'Remove checked' });

    expect(btn).toBeInTheDocument();
  });

  //TODO Does work this test correctly? I need to check it
  it('should be one click button of Remove checked', () => {
    const handleClick = jest.fn();

    render(
      <Provider store={store}>
        <Form onClick={handleClick} />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: 'Remove checked' });
    handleClick(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should search button of add todo', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const btn = screen.getByRole('button', { name: '+' });

    expect(btn).toBeInTheDocument();
  });

  it('should search input', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Please enter new task...');

    expect(input).toBeInTheDocument();
  });

  it('should be empty data in input', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Please enter new task...');

    expect(input.value).toBe('');
  });

  it('should be filled text of "todo one" in input', () => {
    useDispatch.mockReturnValue(dispatch);
    render(<Form />);
    const input = screen.getByPlaceholderText('Please enter new task...');
    fireEvent.change(input, { target: { value: 'todo one' } });

    expect(input.value).toBe('todo one');
  });

  // it('should be added new todo item to the list', () => {
  //   mockUseSelector.mockReturnValue(myTask);

  //   render(
  //     <Provider store={store}>
  //       <App>
  //         <Form myTask={myTask}></Form>
  //       </App>
  //     </Provider>
  //   );

  //   const input = screen.getByPlaceholderText('Please enter new task...');
  //   fireEvent.change(input, { target: { value: 'new todo' } });

  //   const btn = screen.getByRole('button', { name: '+' });
  //   fireEvent.click(btn);

  //   const newTodo = screen.getByText('new todo');

  //   expect(newTodo).toBeInTheDocument();
  // });
});
