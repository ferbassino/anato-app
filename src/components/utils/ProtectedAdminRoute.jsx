import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({ adminRoute, redirectPath = "/" }) => {
  if (!adminRoute) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedAdminRoute;
