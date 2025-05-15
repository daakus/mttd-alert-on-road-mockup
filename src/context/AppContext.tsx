import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'twi';
type DataMode = 'normal' | 'low';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
  safetyPoints: number;
  addSafetyPoints: (points: number) => void;
  hasDownloadedMap: boolean;
  setHasDownloadedMap: (downloaded: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dataMode, setDataMode] = useState<DataMode>('normal');
  const [safetyPoints, setSafetyPoints] = useState(50);
  const [hasDownloadedMap, setHasDownloadedMap] = useState(false);

  const addSafetyPoints = (points: number) => {
    setSafetyPoints(prev => prev + points);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        dataMode,
        setDataMode,
        safetyPoints,
        addSafetyPoints,
        hasDownloadedMap,
        setHasDownloadedMap
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};