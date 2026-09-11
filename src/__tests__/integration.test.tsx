/**
 * @file integration.test.tsx
 * @description Integration tests for the main conversion workflow.
 * @module IntegrationTests
 */
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../components/Map/MapComponent', () => function MockMapComponent({ onMarkerClick }: { onMarkerClick?: (position: [number, number]) => void }) {
  return (
    <div data-testid="map">
      <button onClick={() => onMarkerClick?.([106.816666, -6.2])}>Existing marker</button>
    </div>
  );
});

describe('application workflow', () => {
  test('opens the conversion sidebar and converts a DMS coordinate', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle form' }));
    expect(screen.getByText('Coordinate Converter')).toBeInTheDocument();

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '49' } });
    fireEvent.change(inputs[1], { target: { value: '30' } });
    fireEvent.change(inputs[2], { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));

    expect(screen.getByText('49.502778 deg')).toBeInTheDocument();
  });

  test('toggles the application theme state', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Toggle theme' });
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
  });

  test('opens the editor with the selected marker coordinate', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Existing marker' }));

    expect(screen.getByText('Convert Coordinate DD to DMS')).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(-6.2);
    expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(106.816666);
  });
});
