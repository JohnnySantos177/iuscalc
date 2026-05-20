import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { identifyUser, resetUser, trackPageView } from '@/lib/analytics';

/**
 * Rastreia automaticamente:
 * - Page views a cada mudança de rota
 * - Identificação do usuário ao logar (enriquece todos os eventos com e-mail e plano)
 * - Reset ao fazer logout
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();

  // Page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Identificação / reset do usuário
  useEffect(() => {
    if (user) {
      identifyUser(user.id, {
        email: user.email,
        name: user.name,
        plan: user.plan,
      });
    } else {
      resetUser();
    }
  }, [user?.id, user?.plan]);

  return <>{children}</>;
}
