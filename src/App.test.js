import { render, screen } from '@testing-library/react';
import AlarmClock from './AlarmClock';

test('renders learn react link', () => {
  render(<AlarmClock />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
