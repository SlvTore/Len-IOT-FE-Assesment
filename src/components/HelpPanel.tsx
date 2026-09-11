import React from 'react';
import { HelpCircle, X } from 'lucide-react';

interface HelpPanelProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onClose: () => void;
}

export default function HelpPanel({
  isOpen,
  isDarkMode,
  onClose,
}: HelpPanelProps) {
  const panelTheme = isDarkMode
    ? 'border-slate-700 bg-[#0B1929] text-white'
    : 'border-slate-200 bg-white text-slate-900';

  const contentTheme = isDarkMode
    ? 'border-slate-700 bg-slate-950/40 text-slate-300'
    : 'border-slate-200 bg-slate-50 text-slate-700';

  return (
    <aside
      className={`absolute right-4 top-0 h-full w-80 overflow-hidden rounded-2xl border shadow-2xl transition-transform sm:w-96 ${
        isOpen ? 'translate-x-0' : 'translate-x-[120%] opacity-0'
      } ${panelTheme}`}
    >
      <div className="flex h-full flex-col">
        <header
          className={`flex items-start justify-between border-b px-6 py-5 ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-cyan-400" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500">
                Bantuan
              </p>
              <h2 className="text-lg font-semibold">
                Cara Menggunakan Aplikasi
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup bantuan"
            className={`rounded-lg p-2 ${
              isDarkMode
                ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className={`flex-1 overflow-y-auto p-6 text-sm ${contentTheme}`}>
          <h3 className="mb-4 font-semibold text-cyan-500">
            Langkah Penggunaan
          </h3>

          <ol className="space-y-4">
            {[
              'Buka panel Coordinate Converter.',
              'Pilih mode DMS ke DD atau DD ke DMS.',
              'Masukkan latitude dan longitude.',
              'Tekan Convert.',
              'Gunakan Pinpoint on map untuk menampilkan lokasi.',
              'Tekan X untuk menutup panel.',
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-cyan-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
}
