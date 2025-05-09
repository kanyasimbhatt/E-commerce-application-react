import { Outlet, Navigate } from "react-router-dom";

export default function RouteProtection() {
  const id = localStorage.getItem("user-id") || "";
  return <>{id ? <Outlet /> : <Navigate to="/login" />}</>;
}
