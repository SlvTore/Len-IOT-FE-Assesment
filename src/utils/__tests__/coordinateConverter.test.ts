/**
 * @file coordinateConverter.test.ts
 * @description Unit tests for coordinate conversion utilities.
 * @module CoordinateConverterTests
 */
import {
  convertDdToDms,
  convertDmsToDd,
} from '../coordinateConverter';

describe('DMS to DD conversion', () => {
  test('converts northern latitude accurately', () => {
    expect(convertDmsToDd(49, 30, 10, 'N')).toBeCloseTo(49.502778, 6);
  });

  test('converts western longitude to a negative value', () => {
    expect(convertDmsToDd(123, 30, 20, 'W')).toBeCloseTo(-123.505556, 6);
  });

  test('handles zero and coordinate boundaries', () => {
    expect(convertDmsToDd(0, 0, 0, 'N')).toBe(0);
    expect(convertDmsToDd(90, 0, 0, 'N')).toBe(90);
    expect(convertDmsToDd(180, 0, 0, 'E')).toBe(180);
  });

  test('supports fractional minutes', () => {
    expect(convertDmsToDd(33, 13.5, 0, 'E')).toBeCloseTo(33.225, 6);
  });

  test('applies all cardinal directions', () => {
    expect(convertDmsToDd(10, 0, 0, 'N')).toBe(10);
    expect(convertDmsToDd(10, 0, 0, 'S')).toBe(-10);
    expect(convertDmsToDd(10, 0, 0, 'E')).toBe(10);
    expect(convertDmsToDd(10, 0, 0, 'W')).toBe(-10);
  });
});

describe('DD to DMS conversion', () => {
  test('converts positive latitude', () => {
    expect(convertDdToDms(49.502778, true)).toEqual({
      degree: 49,
      minutes: 30,
      seconds: 10,
      direction: 'N',
    });
  });

  test('converts negative longitude', () => {
    expect(convertDdToDms(-123.505556, false)).toEqual({
      degree: 123,
      minutes: 30,
      seconds: 20,
      direction: 'W',
    });
  });

  test('handles zero and cardinal direction selection', () => {
    expect(convertDdToDms(0, true).direction).toBe('N');
    expect(convertDdToDms(33.23, false)).toEqual({
      degree: 33,
      minutes: 13,
      seconds: 48,
      direction: 'E',
    });
  });

  test('round trips a coordinate within one second', () => {
    const dms = convertDdToDms(-123.505556, false);
    const decimal = convertDmsToDd(dms.degree, dms.minutes, dms.seconds, dms.direction);
    expect(decimal).toBeCloseTo(-123.505556, 5);
  });
});
