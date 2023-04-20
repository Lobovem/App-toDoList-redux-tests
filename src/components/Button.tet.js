import { render, screen, waitFor } from '@testing-library/react';
import { Button } from './Button';

describe('btn', () => {
  it('should search button of Form', () => {
    render(<Button title="btn" />);

    const btn = screen.getByText('btn');
    expect(btn).toBeInTheDocument();
  });

  it('should be click button of Remove checked', async () => {
    const handleClick = jest.fn();

    render(<Button title="btn" onClick={handleClick} />);

    const button = screen.getByText('btn');
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
