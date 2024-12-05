import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../Store/auth.store';

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
