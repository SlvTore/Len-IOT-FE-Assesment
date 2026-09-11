import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { DmsResult } from '../../utils/coordinateConverter';

interface DDtoDMSProps {
  isDarkMode: boolean;
  latitude: number;
  longitude: number;
  result: {
    latitude: DmsResult;
    longitude: DmsResult;
  };
  onLatitudeChange: (value: number) => void;
  onLongitudeChange: (value: number) => void;
  onConvert: () => void;
}

export default function DDtoDMS({
  isDarkMode,
  latitude,
  longitude,
  result,
  onLatitudeChange,
  onLongitudeChange,
  onConvert,
}: DDtoDMSProps) {
  const format = (value: DmsResult) => `${value.degree}° ${value.minutes}' ${value.seconds}" ${value.direction}`;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-medium text-slate-700 dark:text-slate-200">Convert Coordinate DD to DMS</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Enter decimal coordinates to convert them into degrees, minutes, and seconds.</p>
      </div>
      <label className="flex flex-col gap-2 font-medium text-slate-700 dark:text-slate-300">Latitude
        <input type="number" step="any" value={latitude} onChange={(event) => onLatitudeChange(Number(event.target.value))} className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-mono text-slate-900 outline-none focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300" />
      </label>
      <label className="flex flex-col gap-2 font-medium text-slate-700 dark:text-slate-300">Longitude
        <input type="number" step="any" value={longitude} onChange={(event) => onLongitudeChange(Number(event.target.value))} className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-mono text-slate-900 outline-none focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300" />
      </label>
      <button onClick={onConvert} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-300">Convert <ArrowRight className="h-4 w-4" /></button>
      <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300">
        <div className="flex justify-between gap-4"><span>Latitude</span><span>{format(result.latitude)}</span></div>
        <div className="mt-3 flex justify-between gap-4"><span>Longitude</span><span>{format(result.longitude)}</span></div>
      </div>
    </div>
  );
}
