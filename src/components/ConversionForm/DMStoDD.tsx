import React from 'react';
import { ArrowRight, Crosshair } from 'lucide-react';
import type { DmsInput } from '../../hooks/useCoordinateConverter';

interface DMStoDDProps {
  isDarkMode: boolean;
  latitude: DmsInput;
  longitude: DmsInput;
  result: { latitude: number; longitude: number } | null;
  canPinpoint: boolean;
  onLatitudeChange: (value: DmsInput) => void;
  onLongitudeChange: (value: DmsInput) => void;
  onConvert: () => void;
  onPinpoint: () => void;
}

const inputClass = 'w-14 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300';

export default function DMStoDD({
  isDarkMode,
  latitude,
  longitude,
  result,
  canPinpoint,
  onLatitudeChange,
  onLongitudeChange,
  onConvert,
  onPinpoint,
}: DMStoDDProps) {
  const renderCoordinate = (label: string, value: DmsInput, onChange: (next: DmsInput) => void, directions: string[]) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <span className="w-20 font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <div className="flex gap-1">
        <input type="number" className={inputClass} value={value.degree} onChange={(event) => onChange({ ...value, degree: Number(event.target.value) })} />
        <span className="self-center">°</span>
        <input type="number" className={inputClass} value={value.minutes} onChange={(event) => onChange({ ...value, minutes: Number(event.target.value) })} />
        <span className="self-center">'</span>
        <input type="number" className={inputClass} value={value.seconds} onChange={(event) => onChange({ ...value, seconds: Number(event.target.value) })} />
        <span className="self-center">&quot;</span>
        <select className="bg-transparent font-bold focus:outline-none" value={value.direction} onChange={(event) => onChange({ ...value, direction: event.target.value as DmsInput['direction'] })}>
          {directions.map((direction) => <option key={direction} value={direction}>{direction}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-slate-700 dark:text-slate-200">Convert Coordinate DMS to DD</p>
      {renderCoordinate('Latitude', latitude, onLatitudeChange, ['N', 'S'])}
      {renderCoordinate('Longitude', longitude, onLongitudeChange, ['E', 'W'])}
      <button onClick={onConvert} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 font-bold text-slate-950 hover:bg-cyan-300">
        Convert <ArrowRight className="h-4 w-4" />
      </button>
      <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex justify-between text-slate-700 dark:text-slate-300"><span>Latitude</span><span>{result?.latitude.toFixed(6) ?? '0.000000'} deg</span></div>
        <div className="mt-2 flex justify-between text-slate-700 dark:text-slate-300"><span>Longitude</span><span>{result?.longitude.toFixed(6) ?? '0.000000'} deg</span></div>
      </div>
      <button disabled={!canPinpoint} onClick={onPinpoint} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40">
        <Crosshair className="h-4 w-4" /> Pinpoint on map
      </button>
    </div>
  );
}
