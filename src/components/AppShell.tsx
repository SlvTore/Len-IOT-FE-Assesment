import React from 'react';

interface AppShellProps {
  isDarkMode: boolean;
  children: React.ReactNode;
}

export default function AppShell({
  isDarkMode,
  children,
}: AppShellProps) {
  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isDarkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-gray-50 text-slate-900'
      }`}
    >
      <header className="px-6 pb-8 pt-12 text-center">
        <h1
          className={`mb-4 text-4xl font-bold ${
            isDarkMode ? 'text-cyan-300' : 'text-blue-600'
          }`}
        >
          Coordinate Converter Map
        </h1>

        <p
          className={`mx-auto max-w-2xl ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Konversi koordinat DMS dan DD serta visualisasi lokasi presisi di atas
          peta.
        </p>
      </header>

      <main className="relative mx-auto max-w-7xl overflow-x-hidden px-4 pb-12">
        {children}
      </main>
    </div>
  );
}