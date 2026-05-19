import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthState, LoginData, RegisterData } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Rastreia se o usuário JÁ estava autenticado antes do evento atual
  // Evita redirecionamento em renovações de token (tab focus, refresh automático)
  const jaAutenticado = useRef(false);

  useEffect(() => {
    console.log('Inicializando AuthProvider...');

    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.email || 'no user');
        setSession(session);

        if (session?.user) {
          console.log('Usuário autenticado detectado, buscando perfil...');

          // Só redireciona se for um login NOVO (usuário não estava autenticado antes)
          // Isso evita o redirecionamento ao renovar o token ao trocar de aba
          const eraDeslogado = !jaAutenticado.current;
          jaAutenticado.current = true;

          const paginasPublicas = ['/', '/auth', '/cadastro', '/index'];
          if (event === 'SIGNED_IN' && eraDeslogado && paginasPublicas.includes(window.location.pathname)) {
            console.log('Login novo detectado, redirecionando para /home...');
            navigate('/home');
          }
          
          // Then fetch profile data asynchronously
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              console.log('Buscando perfil do usuário:', session.user.id);
              if (user && user.role === 'super_admin') {
                // Buscar todos os perfis
                const { data, error } = await supabase.rpc('get_all_profiles');
              } else {
                // Buscar apenas o próprio perfil
                const { data: profile, error: profileError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .maybeSingle();

                if (profileError) {
                  console.error('Erro ao buscar perfil:', profileError);
                }

                if (profile && mounted) {
                  console.log('Perfil encontrado:', profile);
                  const mappedUser: User = {
                    id: profile.id,
                    email: profile.email || session.user.email || '',
                    name: profile.nome || session.user.email?.split('@')[0] || '',
                    role: profile.is_super_admin ? 'super_admin' : profile.tipo_usuario === 'admin' ? 'admin' : 'user',
                    plan: profile.tipo_plano === 'premium' ? 'premium' : 'standard',
                    phone: profile.nome || 'Não informado',
                    created_at: profile.created_at || new Date().toISOString(),
                    trial_end_date: profile.tipo_plano === 'padrao' ?
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
                    nomeEscritorio: profile.nome_escritorio || ''
                  };
                  // Sincroniza cache local para que exportações funcionem sem chamada extra ao Supabase
                  if (profile.nome_escritorio) {
                    localStorage.setItem('nomeEscritorio', profile.nome_escritorio);
                  }
                  setUser(mappedUser);
                  console.log('Usuário mapeado com sucesso:', mappedUser.email, mappedUser.role);
                } else if (!profile) {
                  console.warn('Perfil não encontrado, criando usuário básico...');
                  // Create a basic user object even without profile
                  const basicUser: User = {
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.email?.split('@')[0] || '',
                    role: 'user',
                    plan: 'standard',
                    phone: 'Não informado',
                    created_at: new Date().toISOString(),
                    trial_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                  };
                  setUser(basicUser);
                  console.log('Usuário básico criado:', basicUser.email);
                }
              }
            } catch (error) {
              console.error('Erro ao buscar perfil:', error);
              // Even if profile fetch fails, create a basic user
              const basicUser: User = {
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.email?.split('@')[0] || '',
                role: 'user',
                plan: 'standard',
                phone: 'Não informado',
                created_at: new Date().toISOString(),
                trial_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
              };
              setUser(basicUser);
              console.log('Usuário básico criado após erro:', basicUser.email);
            } finally {
              if (mounted) {
                setLoading(false);
                console.log('Loading finalizado');
              }
            }
          }, 100);
        } else {
          console.log('Nenhum usuário autenticado');
          jaAutenticado.current = false;
          setUser(null);
          if (mounted) {
            setLoading(false);
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      console.log('Verificação inicial de sessão:', session?.user?.email || 'no session');
      if (!session && mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (data: LoginData): Promise<boolean> => {
    console.log('Tentando fazer login com:', data.email);
    setError(null);
    setLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error('Erro no login:', error.message);
        setError(error.message);
        toast.error(error.message === 'Invalid login credentials' ? 
          'Email ou senha incorretos' : error.message);
        setLoading(false);
        return false;
      }

      if (authData.user && authData.session) {
        console.log('Login bem-sucedido:', authData.user.email);
        toast.success('Login realizado com sucesso!');
        // Navigation will be handled by auth state change
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      const errorMessage = error.message || 'Erro no login';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    console.log('Tentando registrar usuário:', data.email);
    setError(null);
    
    try {
      if (data.password !== data.confirmPassword) {
        const errorMsg = 'As senhas não coincidem';
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }
      
      if (data.password.length < 6) {
        const errorMsg = 'A senha deve ter pelo menos 6 caracteres';
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nome: data.name,
            name: data.name
          }
        }
      });

      if (error) {
        console.error('Erro no registro:', error.message);
        setError(error.message);
        toast.error(error.message);
        return false;
      }
      
      console.log('Registro realizado com sucesso');
      toast.success('Registro realizado! Verifique seu email para confirmar a conta.');
      return true;
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      const errorMessage = error?.message || 'Erro no registro';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = async () => {
    console.log('Fazendo logout...');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Erro ao fazer logout');
      } else {
        setUser(null);
        setSession(null);
        navigate('/auth');
        toast.success('Logout realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      toast.error('Erro ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        throw error;
      }

      toast.success('Email de recuperação enviado!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar email de recuperação');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      error,
      login,
      register,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Função para buscar usuários (Super Admin vê todos, outros só o próprio)
export async function fetchUsers() {
  const { data, error } = await supabase.rpc('get_all_profiles');
  if (error) {
    throw error;
  }
  return data;
}
