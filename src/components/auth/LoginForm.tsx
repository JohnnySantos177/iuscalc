
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, MessageCircle, Mail, FileText, Table2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function LoginForm() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [enviandoReset, setEnviandoReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário de login submetido');
    
    if (isSubmitting || authLoading) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await login({ email, password });
      if (success) {
        console.log('Login bem-sucedido, aguardando redirecionamento...');
      }
    } catch (error) {
      console.error('Erro no submit do login:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Digite seu email!');
      return;
    }

    setEnviandoReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/auth?tab=reset-password`,
      });

      if (error) {
        toast.error('Erro ao enviar email: ' + error.message);
      } else {
        toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.');
        setShowForgotPassword(false);
        setForgotEmail('');
      }
    } catch (error) {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setEnviandoReset(false);
    }
  };

  const isLoading = authLoading || isSubmitting;
  const canSubmit = email && password && !isLoading;

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
      <CardContent className="p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-juriscalc-navy">
            {showForgotPassword ? 'Recuperar Senha' : 'Entrar'}
          </CardTitle>
          <CardDescription>
            {showForgotPassword 
              ? 'Digite seu email para receber o link de recuperação'
              : 'Acesse sua conta IusCalc'
            }
          </CardDescription>
        </CardHeader>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgotEmail" className="juriscalc-label">Email</Label>
              <Input
                id="forgotEmail"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="juriscalc-input"
                required
                placeholder="seu@email.com"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy"
              disabled={enviandoReset}
            >
              {enviandoReset ? 'Enviando...' : 'Enviar link de recuperação'}
            </Button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-sm text-juriscalc-blue hover:underline text-center"
            >
              Voltar para o login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="juriscalc-label">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="juriscalc-input"
                required
                disabled={isLoading}
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="juriscalc-label">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="juriscalc-input pr-10"
                  required
                  disabled={isLoading}
                  placeholder="Digite sua senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-juriscalc-blue hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy"
              disabled={!canSubmit}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        )}

        {!showForgotPassword && (
          <>
            {/* Premium Plan Information */}
            <div className="mt-6 p-4 bg-juriscalc-navy/95 backdrop-blur-sm rounded-lg text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-xl">★</span>
                <h3 className="text-lg font-semibold">Plano Premium</h3>
              </div>
              <p className="text-sm mb-3 text-white/90">
                Desbloqueie recursos avançados e aumente sua produtividade:
              </p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  Cálculos ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  Suporte prioritário
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  Compartilhamento via WhatsApp, e-mail e exportação PDF/Excel
                </li>
              </ul>
              <a href="/#planos" className="block w-full">
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-juriscalc-navy font-semibold shadow-sm"
                >
                  Assinar Premium
                </Button>
              </a>
            </div>

            {/* Export Options */}
            <div className="mt-4 flex justify-center gap-4">
              <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
                <MessageCircle className="h-4 w-4 text-green-500" />
                WhatsApp
              </button>
              <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
                <Mail className="h-4 w-4 text-blue-500" />
                E-mail
              </button>
              <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
                <FileText className="h-4 w-4 text-red-500" />
                PDF
              </button>
              <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
                <Table2 className="h-4 w-4 text-green-600" />
                Excel
              </button>
            </div>

            {/* Manual Link */}
            <div className="mt-3 flex justify-center">
              <Link
                to="/manual"
                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
              >
                <span>📖</span> Manual Rápido IusCalc
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
