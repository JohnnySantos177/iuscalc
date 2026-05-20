import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import iusCalcLogo from '@/assets/IusCalc sem fundo.png';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem!');
      return;
    }

    if (novaSenha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setSalvando(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: novaSenha });
      if (error) {
        toast.error('Erro ao redefinir senha: ' + error.message);
      } else {
        toast.success('Senha redefinida com sucesso!');
        navigate('/auth');
      }
    } catch (error) {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardContent className="p-6">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-2xl text-juriscalc-navy">Redefinir Senha</CardTitle>
          <CardDescription>Digite sua nova senha abaixo</CardDescription>
        </CardHeader>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="novaSenha">Nova Senha</Label>
            <Input
              id="novaSenha"
              type="password"
              placeholder="••••••••"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
            <Input
              id="confirmarSenha"
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Redefinir Senha'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export const AuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [isResetMode, setIsResetMode] = useState(false);
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  useEffect(() => {
    // Detectar se é um link de reset de senha (Supabase adiciona #access_token na URL)
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setIsResetMode(true);
    }

    // Também verificar via searchParams
    if (searchParams.get('tab') === 'reset-password') {
      setIsResetMode(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && !isResetMode) {
      navigate('/home');
    }
  }, [user, navigate, isResetMode]);

  return (
    <div className="min-h-screen juriscalc-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src={iusCalcLogo} alt="IusCalc" className="w-24 h-24 mx-auto mb-4" />
          <p className="text-white drop-shadow-lg">Calculadora Jurídica Trabalhista</p>
        </div>

        {isResetMode ? (
          <ResetPasswordForm />
        ) : (
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/20 backdrop-blur-sm text-white">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-juriscalc-navy"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-white data-[state=active]:text-juriscalc-navy"
              >
                Criar Conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        )}

        {/* Rodapé legal */}
        <p className="text-center text-xs text-white/90 mt-6">
          Ao usar o IusCalc, você concorda com nossos{' '}
          <Link to="/termos" className="font-semibold underline hover:text-yellow-300 transition-colors">
            Termos de Uso
          </Link>{' '}
          e nossa{' '}
          <Link to="/privacidade" className="font-semibold underline hover:text-yellow-300 transition-colors">
            Política de Privacidade
          </Link>.
        </p>
      </div>
    </div>
  );
};
