import React from 'react';
import { MapPinned, X } from 'lucide-react';
import ConversionForm from './ConversionForm/ConversionForm';

interface SidebarPanelProps {
  isOpen: boolean;
  isDarkMode: boolean;
  initialCoordinate: [number, number] | null;
  onClose: () => void;
  onAddToMap: (longitude: number, latitude: number) => void;
}

export default function SidebarPanel({ isOpen, isDarkMode, initialCoordinate, onClose, onAddToMap }: SidebarPanelProps) {
  return (
    <aside
      className={`absolute right-4 top-0 h-full w-80 overflow-hidden rounded-2xl border shadow-2xl transition-transform sm:w-96 ${
        isOpen ? 'translate-x-0' : 'translate-x-[120%] opacity-0'
      } ${
        isDarkMode
          ? 'border-slate-700 bg-[#0B1929] text-white'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div className="flex h-full flex-col">
        <header
          className={`border-b px-6 py-5 ${
            isDarkMode
              ? 'border-slate-700 bg-[#0B1929]'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <MapPinned className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">Geo Control</p>
                <h2 className="text-lg font-semibold">Coordinate Converter</h2>
              </div>
            </div>
            <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Tutup sidebar">
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>
        <div
          className={`flex-1 overflow-y-auto p-6 ${
            isDarkMode ? 'bg-slate-950/40' : 'bg-slate-50'
          }`}
        >
          <ConversionForm
            isDarkMode={isDarkMode}
            initialCoordinate={initialCoordinate}
            onAddToMap={onAddToMap}
          />
        </div>
      </div>
    </aside>
  );
}