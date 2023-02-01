import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ authentication, loginCheck, route = '/login' }) => {
  if (loginCheck) {
    if (authentication) {
      return <Navigate to={route} replace />;
    }
    return <Outlet />;
  }
  if (!authentication) {
    return <Navigate to={route} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
