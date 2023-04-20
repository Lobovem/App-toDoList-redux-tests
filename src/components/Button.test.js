import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Test', () => {
  it('should search button of Form', () => {
    render(<Button title="btn" />);

    const btn = screen.getByText('btn');
    expect(btn).toBeInTheDocument();
  });

  // s
});
