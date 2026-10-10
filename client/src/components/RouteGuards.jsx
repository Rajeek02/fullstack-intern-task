import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

/** Only logged-in users may enter; others are redirected to /login (and sent back afterwards). */
export function ProtectedRoute() {
  const { isAuthenticated, booting } = useAuth();
  const location = useLocation();
  if (booting) return <FullPageSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

/** Login/Register are hidden once logged in. */
export function GuestRoute() {
  const { isAuthenticated, booting } = useAuth();
  if (booting) return <FullPageSpinner />;
  if (isAuthenticated) return <Navigate to="/templates" replace />;
  return <Outlet />;
}

function FullPageSpinner() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
