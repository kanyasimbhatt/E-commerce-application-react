import { Outlet, Navigate } from 'react-router-dom';
import { UserProvider } from '../Auth/userProvider';
import { getData } from '../Utils/Store';

export const RouteProtection = () => {
  const id = getData('user-id');
  return (
    <>
      {id ? (
        <UserProvider>
          <Outlet />{' '}
        </UserProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
