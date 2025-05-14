import { Outlet, Navigate } from 'react-router-dom';
import { UserProvider } from '../Auth/userProvider';
import { FavoriteProvider } from '../ViewProduct/FavoritesProvider';

export const RouteProtection = () => {
  const id = localStorage.getItem('user-id');
  return (
    <>
      {id ? (
        <UserProvider>
          <FavoriteProvider>
            <Outlet />
          </FavoriteProvider>
        </UserProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
