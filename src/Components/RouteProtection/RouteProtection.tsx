import { Outlet, Navigate } from 'react-router-dom';
import ApplicationLayout from '../../Layout/Layout';

type ChildrenType = {
  userId: string;
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

export default RouteProtection;
