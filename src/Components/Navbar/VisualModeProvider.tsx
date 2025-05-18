import { useState } from 'react';
import { createContext, useContext } from 'react';

export type VisualModeType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const SidebarContext = createContext<VisualModeType>({
  darkMode: false,
  setDarkMode: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export const VisualModeProvider: React.FC<ChildrenType> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useVisualMode = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
