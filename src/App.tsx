import React, { useState } from 'react';
import AppShell from './components/AppShell';
import FloatingButton from './components/FloatingButton/FloatingButton';
import HelpPanel from './components/HelpPanel';
import MapComponent from './components/Map/MapComponent';
import SidebarPanel from './components/SidebarPanel';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  return (
    <AppShell isDarkMode={isDarkMode}>
      <MapComponent markerPosition={markerPosition} />

      <FloatingButton
        isDarkMode={isDarkMode}
        isSidebarOpen={isSidebarOpen}
        isHelpOpen={isHelpOpen}
        onToggleDarkMode={() => setIsDarkMode((value) => !value)}
        onToggleSidebar={() => {
          setIsSidebarOpen((value) => !value);
          setIsHelpOpen(false);
        }}
        onToggleHelp={() => {
          setIsHelpOpen((value) => !value);
          setIsSidebarOpen(false);
        }}
      />

      <SidebarPanel
        isOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        onClose={() => setIsSidebarOpen(false)}
        onAddToMap={(longitude, latitude) =>
          setMarkerPosition([longitude, latitude])
        }
      />

      <HelpPanel
        isDarkMode={isDarkMode}
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </AppShell>
  );
}

export default App;
