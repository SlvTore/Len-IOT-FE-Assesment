/**
 * @file performance.test.ts
 * @description Basic performance checks for pure coordinate conversion.
 * @module PerformanceTests
 */
import { convertDdToDms, convertDmsToDd } from '../utils/coordinateConverter';

describe('coordinate conversion performance', () => {
  test('converts a batch of coordinates without changing the result shape', () => {
    const startedAt = performance.now();
    const results = Array.from({ length: 1000 }, (_, index) => {
      const decimal = convertDmsToDd(index % 90, 30, 10, 'N');
      return convertDdToDms(decimal, true);
    });
    const elapsed = performance.now() - startedAt;

    expect(results).toHaveLength(1000);
    expect(results[0]).toHaveProperty('degree');
    expect(elapsed).toBeLessThan(500);
  });
});
