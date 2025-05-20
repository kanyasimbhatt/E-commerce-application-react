import { Outlet, Navigate } from 'react-router-dom';
import { UserProvider } from '../Auth/userProvider';
import ApplicationLayout from '../Products/Layout/ApplicationLayout';

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
        <ApplicationLayout>
          <Outlet />
        </ApplicationLayout>
      ) : (
        <Navigate to="/login" state={{ from: newLocation }} replace />
      )}
    </>
  );
};
