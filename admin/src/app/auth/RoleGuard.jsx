// RoleGuard.jsx
import useAuth from "app/hooks/useAuth";
import { Navigate } from 'react-router-dom';

const RoleGuard = ({ allowedRoles = [], children }) => {
  const { user } = useAuth();

  const userRoles = user?.roles?.map(role => role.slug) || [];

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/dashboard/default" />;
  }

  return children;
};

export default RoleGuard;
