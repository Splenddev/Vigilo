import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// import Loader from './Loader/Loader';

const ProtectedRoutes = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading</p>;

  if (
    !user
    // || !user.isLoggedIn
  ) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location }}
        replace
      />
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoutes;
