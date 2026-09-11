import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Map/MapComponent', () => function MockMapComponent() {
  return <div data-testid="map" />;
});

test('renders coordinate converter application', () => {
  render(<App />);
  expect(screen.getByText(/Coordinate Converter Map/i)).toBeInTheDocument();
  expect(screen.getByTestId('map')).toBeInTheDocument();
});
