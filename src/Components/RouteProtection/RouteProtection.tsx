import { Outlet, Navigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { useUsers } from '../Auth/userProvider';

const RouteProtection = () => {
  const newLocation = `${location}`;
  const { userId } = useUsers();
  return (
    <>
      {userId ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to="/login" state={{ from: newLocation }} replace />
      )}
    </>
  );
};

export default RouteProtection;
