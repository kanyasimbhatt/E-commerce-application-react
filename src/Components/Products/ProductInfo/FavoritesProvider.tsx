import { useState } from 'react';
import type { Product } from '../../../Types/ProductType';
import { createContext, useContext } from 'react';
import { useUsers } from '../../Auth/userProvider';
import { getData } from '../../../Utils/Store';
import type { User } from '../../../Types/UserType';

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
  const userArray = getData('users-array');
  const userData = userArray.find((user: User) => user.id === userId);

  const favoritesArray = userData.favorites || [];
  const [favorites, setFavorites] = useState<Product[]>(favoritesArray);
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
