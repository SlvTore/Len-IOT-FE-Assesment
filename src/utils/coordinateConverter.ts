export type Direction = 'N' | 'S' | 'E' | 'W';

export interface DmsResult {
  degree: number;
  minutes: number;
  seconds: number;
  direction: Direction;
}

export function convertDmsToDd(
  degree: number,
  minutes: number,
  seconds: number,
  direction: Direction
): number {
  let decimal = degree + minutes / 60 + seconds / 3600;

  if (direction === 'S' || direction === 'W') {
    decimal *= -1;
  }

  return decimal;
}

export function convertDdToDms(decimal: number, isLatitude: boolean): DmsResult {
  const absoluteDecimal = Math.abs(decimal);
  const degree = Math.floor(absoluteDecimal);
  const minutesFloat = (absoluteDecimal - degree) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);
  const direction: Direction = isLatitude
    ? decimal >= 0 ? 'N' : 'S'
    : decimal >= 0 ? 'E' : 'W';

  return { degree, minutes, seconds, direction };
}
