import { useState } from 'react';
import { type Product } from '../ViewAllProducts/ViewAllProducts';
import { createContext, useContext } from 'react';
import { useUsers } from '../Auth/userProvider';
import { getData } from '../../Store/Store';
import type { User } from '../Types/UserType';

export type FavoritesArrayType = {
  favorites: Product[];
  setFavorites: (c: Product[]) => void;
};
const FavoriteContext = createContext<FavoritesArrayType>({
  favorites: [],
  setFavorites: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export const FavoriteProvider: React.FC<ChildrenType> = ({ children }) => {
  const { userId } = useUsers();
  const userArray = getData();
  const demoObject = {
    favorites: [],
  };
  const userData =
    userArray.find((user: User) => user.id === userId) || demoObject;
  const [favorites, setFavorites] = useState<Product[]>(userData.favorites);
  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
