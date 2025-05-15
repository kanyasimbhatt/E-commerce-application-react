import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useUsers } from '../Auth/userProvider';
import { getData } from '../../Store/Store';
import type { User } from '../Types/UserType';

export type SidebarArrayType = {
  open: boolean;
  setOpen: (c: boolean) => void;
};
const SidebarContext = createContext<SidebarArrayType>({
  open: false,
  setOpen: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export const SidebarProvider: React.FC<ChildrenType> = ({ children }) => {
  const { userId } = useUsers();
  const userArray = getData();
  const demoObject = {
    Sidebar: false,
  };
  const userData =
    userArray.find((user: User) => user.id === userId) || demoObject;
  const [open, setOpen] = useState<boolean>(userData.Sidebar);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
