import { Outlet, Navigate } from 'react-router-dom';
import { UserProvider } from '../Auth/userProvider';
import { FavoriteProvider } from '../ViewProduct/FavoritesProvider';
import { VisualModeProvider } from '../Navbar/VisualModeProvider';

export const RouteProtectionWrapper = () => {
  return (
    <VisualModeProvider>
    <UserProvider>
      <FavoriteProvider>
        <RouteProtection />
      </FavoriteProvider>
    </UserProvider>
    </VisualModeProvider>
  )
}

const RouteProtection = () => {
  const id = localStorage.getItem('user-id');
  return (
    <>
      {id ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
