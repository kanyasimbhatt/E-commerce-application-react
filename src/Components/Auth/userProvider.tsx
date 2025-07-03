import { createContext, useContext, useState } from 'react';
import { getData } from '../../Utils/Store';

export type UsersArrayType = {
  userId: string;
  setUserId: (c: string) => void;
};
const UserContext = createContext<UsersArrayType>({
  userId: '',
  setUserId: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const userData = getData('user-id') || '';
  const [userId, setUserId] = useState<string>(userData);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
