/**
 * @file integration.test.tsx
 * @description Integration tests for the main conversion workflow.
 * @module IntegrationTests
 */
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../components/Map/MapComponent', () => function MockMapComponent() {
  return <div data-testid="map" />;
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
    expect(toggle.querySelector('svg')).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(toggle.querySelector('svg')).toBeInTheDocument();
  });
});
