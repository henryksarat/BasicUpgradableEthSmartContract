import { render, screen } from '@testing-library/react';
import App from './App';

test('renders some expected text on screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Open Value Stored/i);
  expect(linkElement).toBeInTheDocument();
});
