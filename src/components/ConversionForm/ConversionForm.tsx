import React, { useEffect, useState } from 'react';
import { useCoordinateConverter } from '../../hooks/useCoordinateConverter';
import DMStoDD from './DMStoDD';
import DDtoDMS from './DDtoDMS';

interface ConversionFormProps {
  isDarkMode: boolean;
  initialCoordinate: [number, number] | null;
  onAddToMap: (longitude: number, latitude: number) => void;
}

export default function ConversionForm({ isDarkMode, initialCoordinate, onAddToMap }: ConversionFormProps) {
  const [activeTab, setActiveTab] = useState<'DMS_TO_DD' | 'DD_TO_DMS'>('DMS_TO_DD');
  const converter = useCoordinateConverter();
  const { setDecimalLatitude, setDecimalLongitude } = converter;

  useEffect(() => {
    if (!initialCoordinate) return;

    const [longitude, latitude] = initialCoordinate;
    setDecimalLongitude(longitude);
    setDecimalLatitude(latitude);
    setActiveTab('DD_TO_DMS');
  }, [initialCoordinate, setDecimalLatitude, setDecimalLongitude]);

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {(['DMS_TO_DD', 'DD_TO_DMS'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${activeTab === tab ? 'bg-cyan-400 text-slate-950' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
            {tab === 'DMS_TO_DD' ? 'DMS / DD' : 'DD / DMS'}
          </button>
        ))}
      </div>
      {activeTab === 'DMS_TO_DD' ? (
        <DMStoDD
          isDarkMode={isDarkMode}
          latitude={converter.dmsLatitude}
          longitude={converter.dmsLongitude}
          result={converter.decimalResult}
          canPinpoint={Boolean(converter.decimalResult)}
          onLatitudeChange={converter.setDmsLatitude}
          onLongitudeChange={converter.setDmsLongitude}
          onConvert={converter.convertDms}
          onPinpoint={() => {
            if (converter.decimalResult) {
              onAddToMap(
                converter.decimalResult.longitude,
                converter.decimalResult.latitude
              );
            }
          }}
        />
      ) : (
        <DDtoDMS
          isDarkMode={isDarkMode}
          latitude={converter.decimalLatitude}
          longitude={converter.decimalLongitude}
          result={converter.dmsResult}
          onLatitudeChange={converter.setDecimalLatitude}
          onLongitudeChange={converter.setDecimalLongitude}
          onConvert={converter.convertDecimal}
        />
      )}
    </div>
  );
}
