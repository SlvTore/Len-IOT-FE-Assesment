import React, { useState } from 'react';
import { convertDmsToDd, convertDdToDms } from '../coordinateutils';
import { ArrowRight, Crosshair, RotateCcw, X } from 'lucide-react';

interface SidebarFormProps {
  onAddToMap: (lon: number, lat: number) => void;
}

interface DmsResult {
  degree: number;
  minutes: number;
  seconds: number;
  direction: string;
}


export default function SidebarForm({ onAddToMap }: SidebarFormProps) {
  const [activeTab, setActiveTab] = useState<'DMS_TO_DD' | 'DD_TO_DMS'>('DMS_TO_DD');

  // State untuk DMS to DD
  const [dmsLat, setDmsLat] = useState({ deg: 0, min: 0, sec: 0, dir: 'N' as 'N'|'S' });
  const [dmsLon, setDmsLon] = useState({ deg: 0, min: 0, sec: 0, dir: 'E' as 'E'|'W' });
  const [resultDd, setResultDd] = useState({ lat: 0, lon: 0 });
  const [hasConverted, setHasConverted] = useState(false);

  // State untuk DD to DMS
  const [ddLat, setDdLat] = useState<number>(0);
  const [ddLon, setDdLon] = useState<number>(0);
  const [resultDms, setResultDms] = useState<{ lat: DmsResult; lon: DmsResult }>({
      lat: { degree: 0, minutes: 0, seconds: 0, direction: 'N' },
      lon: { degree: 0, minutes: 0, seconds: 0, direction: 'E' }

  });
  const handleConvertDmsToDd = () => {
    const lat = convertDmsToDd(
      dmsLat.deg,
      dmsLat.min,
      dmsLat.sec,
      dmsLat.dir
    );

    const lon = convertDmsToDd(
      dmsLon.deg,
      dmsLon.min,
      dmsLon.sec,
      dmsLon.dir
    );

    setResultDd({ lat, lon });
    setHasConverted(true);
  };

  const handleConvertDdToDms = () => {
    const latStr = convertDdToDms(ddLat, true);
    const lonStr = convertDdToDms(ddLon, false);
    setResultDms({ lat: latStr, lon: lonStr });
  };

  return (
    <div className="flex flex-col h-full text-sm">
      

      <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <button
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
            activeTab === 'DMS_TO_DD'
              ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('DMS_TO_DD')}
        >
          DMS <span className="mx-1 text-slate-500">/</span> DD
        </button>

        <button
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
            activeTab === 'DD_TO_DMS'
              ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('DD_TO_DMS')}
        >
          DD <span className="mx-1 text-slate-500">/</span> DMS
        </button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
            Geo Control
          </p>
          <h2 className="text-lg font-semibold text-white">
            Coordinate Converter
          </h2>
        </div>
        
      </div>

      {activeTab === 'DMS_TO_DD' && (
        <div className="flex flex-col gap-4">
          <p className="mb-2 font-medium text-slate-700 dark:text-slate-200">
            Convert Coordinate DMS to DD
          </p>
          
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <span className="w-20 font-medium text-slate-700 dark:text-slate-200">
              Latitude
            </span>
            <div className="flex gap-1">
              <input
                type="number"
                className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300"
                value={dmsLat.deg}
                onChange={(event) =>
                  setDmsLat({
                    ...dmsLat,
                    deg: Number(event.target.value),
                  })
                }
              />°
              <input type="number" className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300" value={dmsLat.min} onChange={e => setDmsLat({...dmsLat, min: Number(e.target.value)})} />'
              <input type="number" className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300" value={dmsLat.sec} onChange={e => setDmsLat({...dmsLat, sec: Number(e.target.value)})} />"
              <select className="bg-transparent font-bold focus:outline-none" value={dmsLat.dir} onChange={e => setDmsLat({...dmsLat, dir: e.target.value as 'N'|'S'})}>
                <option value="N">N</option><option value="S">S</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <span className="w-20 font-medium text-slate-700 dark:text-slate-200">
              Longitude
            </span>
            <div className="flex gap-1">
              <input
                type="number"
                className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300"
                value={dmsLon.deg}
                onChange={(event) =>
                  setDmsLon({
                    ...dmsLon,
                    deg: Number(event.target.value),
                  })
                }
              />°
              <input type="number" className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300" value={dmsLon.min} onChange={e => setDmsLon({...dmsLon, min: Number(e.target.value)})} />'
              <input type="number" className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300" value={dmsLon.sec} onChange={e => setDmsLon({...dmsLon, sec: Number(e.target.value)})} />"
              <select className="bg-transparent font-bold focus:outline-none" value={dmsLon.dir} onChange={e => setDmsLon({...dmsLon, dir: e.target.value as 'E'|'W'})}>
                <option value="E">E</option><option value="W">W</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleConvertDmsToDd}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Convert
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-2 space-y-2">
            <div className="flex justify-between"><span className="text-gray-500">Latitude</span><span className="font-mono">{resultDd.lat.toFixed(6)} deg</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Longitude</span><span className="font-mono">{resultDd.lon.toFixed(6)} deg</span></div>
          </div>

          <button
            disabled={!hasConverted}
            onClick={() => onAddToMap(resultDd.lon, resultDd.lat)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Crosshair className="h-4 w-4" />
            Pinpoint on map
          </button>
        </div>
      )}

      {activeTab === 'DD_TO_DMS' && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              Convert Coordinate DD to DMS
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Enter decimal coordinates to convert them into degrees, minutes, and seconds.
            </p>
          </div>

          <label className="flex flex-col gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Latitude
            </span>
            <input
              type="number"
              step="any"
              value={ddLat}
              onChange={(event) => setDdLat(Number(event.target.value))}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-mono text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300"
              placeholder="-6.200000"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Longitude
            </span>
            <input
              type="number"
              step="any"
              value={ddLon}
              onChange={(event) => setDdLon(Number(event.target.value))}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-mono text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300"
              placeholder="106.816666"
            />
          </label>

          <button
            onClick={handleConvertDdToDms}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Convert
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600 dark:text-slate-400">
                Latitude
              </span>
              <span className="text-right font-mono text-slate-900 dark:text-cyan-300">
                {resultDms.lat.degree}° {resultDms.lat.minutes}'{' '}
                {resultDms.lat.seconds}" {resultDms.lat.direction}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-slate-600 dark:text-slate-400">
                Longitude
              </span>
              <span className="text-right font-mono text-slate-900 dark:text-cyan-300">
                {resultDms.lon.degree}° {resultDms.lon.minutes}'{' '}
                {resultDms.lon.seconds}" {resultDms.lon.direction}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}