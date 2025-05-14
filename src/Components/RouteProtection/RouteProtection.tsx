import { Outlet, Navigate } from 'react-router-dom';
import { FavoriteProvider } from '../ViewProduct/FavoritesProvider';
import { UserProvider } from '../Auth/userProvider';

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
