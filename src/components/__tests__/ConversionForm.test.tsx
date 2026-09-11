/**
 * @file ConversionForm.test.tsx
 * @description Component tests for the coordinate conversion form.
 * @module ConversionFormTests
 */
import { fireEvent, render, screen } from '@testing-library/react';
import ConversionForm from '../ConversionForm/ConversionForm';

describe('ConversionForm', () => {
  test('renders the DMS to DD form by default', () => {
    render(<ConversionForm isDarkMode={false} initialCoordinate={null} onAddToMap={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'DMS / DD' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'DD / DMS' })).toBeInTheDocument();
    expect(screen.getByText('Convert Coordinate DMS to DD')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pinpoint on map/i })).toBeDisabled();
  });

  test('switches to the DD to DMS form', () => {
    render(<ConversionForm isDarkMode={false} initialCoordinate={null} onAddToMap={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'DD / DMS' }));

    expect(screen.getByText('Convert Coordinate DD to DMS')).toBeInTheDocument();
    expect(screen.getByText('Enter decimal coordinates to convert them into degrees, minutes, and seconds.')).toBeInTheDocument();
  });

  test('converts DMS input and enables map placement', () => {
    const onAddToMap = jest.fn();
    render(<ConversionForm isDarkMode={false} initialCoordinate={null} onAddToMap={onAddToMap} />);

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '49' } });
    fireEvent.change(inputs[1], { target: { value: '30' } });
    fireEvent.change(inputs[2], { target: { value: '10' } });
    fireEvent.change(inputs[3], { target: { value: '123' } });
    fireEvent.change(inputs[4], { target: { value: '30' } });
    fireEvent.change(inputs[5], { target: { value: '20' } });
    fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: 'W' } });

    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));

    expect(screen.getByText('49.502778 deg')).toBeInTheDocument();
    expect(screen.getByText(/-123\.505556/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pinpoint on map/i })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /Pinpoint on map/i }));
    expect(onAddToMap).toHaveBeenCalledWith(-123.50555555555556, 49.50277777777778);
  });
});
