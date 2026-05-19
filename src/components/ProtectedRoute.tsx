import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'super_admin';
  skipTrialCheck?: boolean;
}

export function ProtectedRoute({ children, requiredRole, skipTrialCheck = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  // Verifica expiração do trial (exceto premium, super_admin e a própria página de upgrade)
  if (!skipTrialCheck && user.plan !== 'premium' && user.role !== 'super_admin') {
    const trialExpirado = user.trial_end_date
      ? new Date(user.trial_end_date) < new Date()
      : false;

    if (trialExpirado) {
      return <Navigate to="/upgrade" replace />;
    }
  }

  return <>{children}</>;
}
