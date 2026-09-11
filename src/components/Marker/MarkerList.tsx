import React from 'react';

interface MarkerListProps {
  markerPosition: [number, number] | null;
}

export default function MarkerList({ markerPosition }: MarkerListProps) {
  if (!markerPosition) return null;

  return (
    <div className="font-mono text-xs text-slate-300">
      {markerPosition[1].toFixed(6)}, {markerPosition[0].toFixed(6)}
    </div>
  );
}
