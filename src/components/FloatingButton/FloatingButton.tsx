import React from 'react';
import { HelpCircle, Moon, PanelRightClose, PanelRightOpen, Sun } from 'lucide-react';

interface FloatingButtonProps {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isHelpOpen: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
  onToggleHelp: () => void;
}

export default function FloatingButton({ isDarkMode, isSidebarOpen, isHelpOpen, onToggleDarkMode, onToggleSidebar, onToggleHelp }: FloatingButtonProps) {
  const buttonClass = isDarkMode
    ? 'grid h-11 w-11 place-items-center rounded-xl border border-slate-700 bg-slate-900 text-cyan-300 shadow-lg transition hover:border-cyan-400 hover:bg-slate-800'
    : 'grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:border-cyan-500 hover:text-cyan-600';
  return (
    <div className="absolute right-8 top-4 flex flex-col gap-3">
      <button onClick={onToggleDarkMode} className={buttonClass} title="Toggle theme" aria-label="Toggle theme">{isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
      <button onClick={onToggleHelp} className={buttonClass} title={isHelpOpen ? 'Tutup Bantuan' : 'Buka Bantuan'} aria-label="Bantuan" aria-expanded={isHelpOpen}><HelpCircle className="h-5 w-5" /></button>
      <button onClick={onToggleSidebar} className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300" title={isSidebarOpen ? 'Tutup Form' : 'Buka Form'} aria-label="Toggle form">{isSidebarOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}</button>
    </div>
  );
}
