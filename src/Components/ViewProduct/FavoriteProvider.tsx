import { useState } from 'react';
import { createContext, useContext } from 'react';
import { type Product } from '../ViewAllProducts/ViewAllProducts';

export type FavoritesArrayType = {
  favorites: Product[];
  setFavorites: (c: Product[]) => void;
};
const FavoritesContext = createContext<FavoritesArrayType>({
  favorites: [],
  setFavorites: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<ChildrenType> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(
    JSON.parse(localStorage.getItem('favorites-array') as string) || []
  );
  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
