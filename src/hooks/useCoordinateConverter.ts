import { useState } from 'react';
import {
  convertDdToDms,
  convertDmsToDd,
  type Direction,
  type DmsResult,
} from '../utils/coordinateConverter';

export interface DmsInput {
  degree: number;
  minutes: number;
  seconds: number;
  direction: Direction;
}

export interface DecimalCoordinate {
  latitude: number;
  longitude: number;
}

const initialDmsResult = {
  latitude: { degree: 0, minutes: 0, seconds: 0, direction: 'N' as Direction },
  longitude: { degree: 0, minutes: 0, seconds: 0, direction: 'E' as Direction },
};

export function useCoordinateConverter() {
  const [dmsLatitude, setDmsLatitude] = useState<DmsInput>({ degree: 0, minutes: 0, seconds: 0, direction: 'N' });
  const [dmsLongitude, setDmsLongitude] = useState<DmsInput>({ degree: 0, minutes: 0, seconds: 0, direction: 'E' });
  const [decimalLatitude, setDecimalLatitude] = useState(0);
  const [decimalLongitude, setDecimalLongitude] = useState(0);
  const [decimalResult, setDecimalResult] = useState<DecimalCoordinate | null>(null);
  const [dmsResult, setDmsResult] = useState<{ latitude: DmsResult; longitude: DmsResult }>(initialDmsResult);

  const convertDms = () => {
    const result = {
      latitude: convertDmsToDd(dmsLatitude.degree, dmsLatitude.minutes, dmsLatitude.seconds, dmsLatitude.direction),
      longitude: convertDmsToDd(dmsLongitude.degree, dmsLongitude.minutes, dmsLongitude.seconds, dmsLongitude.direction),
    };
    setDecimalResult(result);
    return result;
  };

  const convertDecimal = () => {
    const result = {
      latitude: convertDdToDms(decimalLatitude, true),
      longitude: convertDdToDms(decimalLongitude, false),
    };
    setDmsResult(result);
    return result;
  };

  return {
    dmsLatitude,
    dmsLongitude,
    decimalLatitude,
    decimalLongitude,
    decimalResult,
    dmsResult,
    setDmsLatitude,
    setDmsLongitude,
    setDecimalLatitude,
    setDecimalLongitude,
    convertDms,
    convertDecimal,
  };
}
