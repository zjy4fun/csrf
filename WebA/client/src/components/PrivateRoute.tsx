// client/src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie.ts';

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = getCookie('username');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
