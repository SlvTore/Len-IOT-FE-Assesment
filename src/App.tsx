import React, { useState } from 'react';
import MapOSM from './utility/components/MapOSM';
import SidebarForm from './utility/components/SidebarForm';
import {
  HelpCircle,
  MapPinned,
  Moon,
  PanelRightClose,
  PanelRightOpen,
  Sun,
  X,
} from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 ${isDarkMode ? 'dark:bg-gray-900 dark:text-gray-100' : ''}`}>
      
      <header className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">Coordinate Converter Map</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Studi kasus konversi koordinat dari format DMS (Degree, Minutes, Seconds) ke DD (Decimal Degrees) dan visualisasi lokasi presisi di atas peta OpenLayers.
        </p>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 pb-12">
        <MapOSM markerPosition={markerPos} />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-8 flex flex-col gap-3">
          <button
            onClick={toggleDarkMode}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 bg-slate-900 text-cyan-300 shadow-lg transition hover:border-cyan-400 hover:bg-slate-800"
            title="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <button
            onClick={() => {
              setIsHelpOpen((previous) => !previous);
              setIsSidebarOpen(false);
            }}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 shadow-lg transition hover:border-cyan-400 hover:text-cyan-300"
            title={isHelpOpen ? 'Tutup Bantuan' : 'Buka Bantuan'}
            aria-label={isHelpOpen ? 'Tutup Bantuan' : 'Buka Bantuan'}
            aria-expanded={isHelpOpen}
          >
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setIsSidebarOpen((previous) => !previous)}
            className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
            title={isSidebarOpen ? 'Tutup Form Konversi' : 'Buka Form Konversi'}
            aria-label={isSidebarOpen ? 'Tutup Form Konversi' : 'Buka Form Konversi'}
          >
            {isSidebarOpen ? (
              <PanelRightClose className="h-5 w-5" aria-hidden="true" />
            ) : (
              <PanelRightOpen className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <aside
          className={`absolute right-4 top-0 h-full w-80 overflow-hidden rounded-2xl border border-slate-700 bg-[#0B1929] text-white shadow-2xl shadow-slate-950/40 transition-transform duration-300 sm:w-96 ${
            isSidebarOpen
              ? 'translate-x-0'
              : 'translate-x-[120%] opacity-0'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-700 bg-[#0B1929] px-6 py-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <MapPinned className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                      Geo Control
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                      Coordinate Converter
                    </h2>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  title="Close sidebar"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-950/40 p-6">
              <SidebarForm
                onAddToMap={(lon, lat) => setMarkerPos([lon, lat])}
              />
            </div>
          </div>
        </aside>

        <div
          className={`absolute right-4 top-0 h-full w-80 overflow-hidden rounded-2xl border border-slate-700 bg-[#0B1929] text-white shadow-2xl shadow-slate-950/40 transition-transform duration-300 sm:w-96 ${
            isHelpOpen
              ? 'translate-x-0'
              : 'translate-x-[120%] opacity-0'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-700 bg-[#0B1929] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <HelpCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                    Bantuan
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    Cara Menggunakan Aplikasi
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-950/40 p-6">
              <div className="max-w-2xl mx-auto text-white-600 dark:text-gray-400">
                <p>
                  Aplikasi ini digunakan untuk mengonversi koordinat dari format
                  DMS (Degree, Minutes, Seconds) ke DD (Decimal Degrees) dan
                  visualisasi lokasi presisi di atas peta OpenLayers.
                </p>
                <ul>
                  <li>
                    <strong>Format DMS:</strong> Degree, Minutes, Seconds
                  </li>
                  <li>
                    <strong>Format DD:</strong> Decimal Degrees
                  </li>
                  <li>
                    <strong>Fitur:</strong> Konversi dan visualisasi lokasi
                  </li>
                </ul>
              </div>

              <div className="mx-auto max-w-2xl text-sm text-slate-300">
                <h3 className="mb-4 font-semibold text-cyan-300">
                  Langkah Penggunaan
                </h3>

                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-mono text-cyan-400">01</span>
                    <span>
                      Buka panel <strong className="text-white">Coordinate Converter</strong>
                      melalui tombol panel di sisi kanan peta.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-mono text-cyan-400">02</span>
                    <span>
                      Pilih mode konversi:
                      <strong className="text-white"> DMS ke DD</strong> atau
                      <strong className="text-white"> DD ke DMS</strong>.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-mono text-cyan-400">03</span>
                    <span>
                      Masukkan nilai latitude dan longitude sesuai format yang dipilih.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-mono text-cyan-400">04</span>
                    <span>
                      Tekan tombol <strong className="text-white">Convert</strong> untuk
                      menghitung hasil konversi.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-mono text-cyan-400">05</span>
                    <span>
                      Pada mode DMS ke DD, tekan
                      <strong className="text-white"> Pinpoint on map</strong> untuk
                      menampilkan koordinat pada peta.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-mono text-cyan-400">06</span>
                    <span>
                      Gunakan tombol <strong className="text-white">X</strong> atau tombol
                      panel untuk menutup sidebar.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;