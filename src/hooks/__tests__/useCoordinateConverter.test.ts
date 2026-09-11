/**
 * @file useCoordinateConverter.test.ts
 * @description Unit tests for coordinate conversion state management.
 * @module UseCoordinateConverterTests
 */
import { act, renderHook } from '@testing-library/react';
import { useCoordinateConverter } from '../useCoordinateConverter';

describe('useCoordinateConverter', () => {
  test('starts with empty results and default coordinate values', () => {
    const { result } = renderHook(() => useCoordinateConverter());

    expect(result.current.decimalResult).toBeNull();
    expect(result.current.dmsLatitude).toEqual({ degree: 0, minutes: 0, seconds: 0, direction: 'N' });
    expect(result.current.dmsLongitude).toEqual({ degree: 0, minutes: 0, seconds: 0, direction: 'E' });
  });

  test('converts DMS input and stores the decimal result', () => {
    const { result } = renderHook(() => useCoordinateConverter());

    act(() => {
      result.current.setDmsLatitude({ degree: 49, minutes: 30, seconds: 10, direction: 'N' });
      result.current.setDmsLongitude({ degree: 123, minutes: 30, seconds: 20, direction: 'W' });
    });

    act(() => result.current.convertDms());

    expect(result.current.decimalResult).toEqual({
      latitude: expect.closeTo(49.502778, 6),
      longitude: expect.closeTo(-123.505556, 6),
    });
  });

  test('converts decimal input and stores DMS output', () => {
    const { result } = renderHook(() => useCoordinateConverter());

    act(() => {
      result.current.setDecimalLatitude(49.502778);
      result.current.setDecimalLongitude(-123.505556);
    });

    act(() => {
      result.current.convertDecimal();
    });

    expect(result.current.dmsResult.latitude).toEqual({ degree: 49, minutes: 30, seconds: 10, direction: 'N' });
    expect(result.current.dmsResult.longitude).toEqual({ degree: 123, minutes: 30, seconds: 20, direction: 'W' });
  });
});
