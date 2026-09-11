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
  const [selectedCoordinate, setSelectedCoordinate] = useState<[number, number] | null>(null);

  const handleMarkerClick = (position: [number, number]) => {
    setSelectedCoordinate(position);
    setMarkerPosition(position);
    setIsSidebarOpen(true);
    setIsHelpOpen(false);
  };

  return (
    <AppShell isDarkMode={isDarkMode}>
      <MapComponent
        markerPosition={markerPosition}
        onMarkerClick={handleMarkerClick}
      />

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
        initialCoordinate={selectedCoordinate}
        onClose={() => setIsSidebarOpen(false)}
        onAddToMap={(longitude, latitude) => {
          const position: [number, number] = [longitude, latitude];
          setMarkerPosition(position);
          setSelectedCoordinate(position);
        }}
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
