import { Outlet, Navigate } from 'react-router-dom';
import { UserProvider } from '../Auth/userProvider';

type ChildrenType = {
  userId: string;
};

export const RouteProtectionWrapper = ({ userId }: ChildrenType) => {
  return (
    <UserProvider>
      <RouteProtection userId={userId} />
    </UserProvider>
  );
};

const RouteProtection = ({ userId }: ChildrenType) => {
  const newLocation = `${location}`;
  return (
    <>
      {userId ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: newLocation }} replace />
      )}
    </>
  );
};
