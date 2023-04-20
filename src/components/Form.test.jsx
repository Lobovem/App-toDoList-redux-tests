import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Form } from './Form';
import { store } from '../store';

describe('Form', () => {
  jest.mock('../store/reducer', () => ({
    todoListReduser: jest.fn(),
  }));

  it('should be maked snapshot Form', () => {
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
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Please enter new task...');
    fireEvent.change(input, { target: { value: 'todo one' } });

    expect(input.value).toBe('todo one');
  });

  //TODO Check this test that it added todo
  it('should be changed value input', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Please enter new task...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });
});
