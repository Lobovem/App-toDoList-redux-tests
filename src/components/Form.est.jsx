import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import * as reduxHooks from 'react-redux';
import * as actions from '../store/reducer';
import { Form } from './Form';
import App from '../App';

import { store } from '../store';

// jest.mock('react-redux');

// const jestSelect = jest.spyOn(reduxHooks, 'useSelector');
// const jestDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('Form', () => {
  // it('should be maked snapshot Form', () => {
  //   // eslint-disable-next-line testing-library/render-result-naming-convention
  //   const component = render(
  //     <reduxHooks.Provider store={store}>
  //       <Form />
  //     </reduxHooks.Provider>
  //   );

  //   expect(component).toMatchSnapshot();
  // });

  it('should search button of Form', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const button = screen.getByText('Remove checked');
    expect(button).toBeInTheDocument();
  });
});
