import { Outlet, Navigate } from "react-router-dom";

export const RouteProtection = () => {
  const id = localStorage.getItem("user-id");
  return <>{id ? <Outlet /> : <Navigate to="/login" />}</>;
};
