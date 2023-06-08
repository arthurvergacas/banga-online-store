import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface GuardedRouteProps {
  isRouteAccessible?: boolean;
  redirectRoute?: string;
}

export default function GuardedRoute({ isRouteAccessible = false, redirectRoute = '/' }: GuardedRouteProps) {
  const location = useLocation();

  return isRouteAccessible ? (
    <Outlet />
  ) : (
    <Navigate to={redirectRoute} replace state={{ referer: location.pathname }} />
  );
}
