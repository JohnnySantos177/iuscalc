
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, User, Lock, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const MinhaContaPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    calculosRealizados: 0,
    calculosSalvos: 0,
    exportacoesPDF: 0
  });

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [alterandoSenha, setAlterandoSenha] = useState(false);

  const [nomeEscritorio, setNomeEscritorio] = useState('');
  const [salvandoEscritorio, setSalvandoEscritorio] = useState(false);

  useEffect(() => {
    if (!user) return;
    const carregarEscritorio = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('nome_escritorio')
        .eq('id', user.id)
        .maybeSingle();
      const valor = data?.nome_escritorio || localStorage.getItem('nomeEscritorio') || '';
      setNomeEscritorio(valor);
    };
    carregarEscritorio();
  }, [user]);

  const handleSalvarEscritorio = async () => {
    if (!user) return;
    setSalvandoEscritorio(true);
    try {
      const valor = nomeEscritorio.trim();
      const { error } = await supabase
        .from('profiles')
        .update({ nome_escritorio: valor })
        .eq('id', user.id);
      if (error) throw error;
      // Atualiza cache local para que exportações usem o valor atualizado imediatamente
      localStorage.setItem('nomeEscritorio', valor);
      toast.success('Nome do escritório salvo com sucesso!');
    } catch {
      toast.error('Erro ao salvar nome do escritório.');
    } finally {
      setSalvandoEscritorio(false);
    }
  };

  useEffect(() => {
    const carregarEstatisticas = async () => {
      if (!user) return;

      try {
        const { count: calculosSalvos } = await supabase
          .from('calculos_salvos')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        const { count: calculosRealizados } = await supabase
          .from('calculos')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        setStats({
          calculosRealizados: calculosRealizados || 0,
          calculosSalvos: calculosSalvos || 0,
          exportacoesPDF: 0
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    };

    carregarEstatisticas();
  }, [user]);

  const handleAlterarSenha = async () => {
    if (!novaSenha || !confirmarSenha) {
      toast.error('Preencha todos os campos!');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem!');
      return;
    }

    if (novaSenha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setAlterandoSenha(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: novaSenha });

      if (error) {
        toast.error('Erro ao alterar senha: ' + error.message);
      } else {
        toast.success('Senha alterada com sucesso!');
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
      }
    } catch (error) {
      toast.error('Erro inesperado ao alterar senha.');
    } finally {
      setAlterandoSenha(false);
    }
  };

  if (!user) return null;

  const trialDaysLeft = user.trial_end_date 
    ? Math.max(0, Math.ceil((new Date(user.trial_end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-juriscalc-navy mb-8">Minha Conta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Pessoais */}
        <Card className="juriscalc-card">
          <CardHeader>
            <CardTitle className="text-juriscalc-navy flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Gerencie suas informações de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="juriscalc-label">Nome Completo</Label>
              <Input
                id="name"
                value={user.name}
                className="juriscalc-input"
                readOnly
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="juriscalc-label">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                className="juriscalc-input"
                readOnly
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="juriscalc-label">Telefone</Label>
              <Input
                id="phone"
                value={user.phone || 'Não informado'}
                className="juriscalc-input"
                readOnly
              />
            </div>
            
            <Button className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy">
              Editar Informações
            </Button>
          </CardContent>
        </Card>

        {/* Plano e Assinatura */}
        <Card className="juriscalc-card">
          <CardHeader>
            <CardTitle className="text-juriscalc-navy flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Plano e Assinatura
            </CardTitle>
            <CardDescription>
              Informações sobre seu plano atual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Plano Atual</span>
              <Badge variant={user.plan === 'premium' ? 'default' : 'secondary'} className="capitalize">
                {user.plan === 'premium' ? 'Premium' : 'Padrão'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Ativo
              </Badge>
            </div>
            
            {user.plan === 'standard' && user.trial_end_date && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avaliação termina em</span>
                <span className="font-semibold text-juriscalc-gold">
                  {trialDaysLeft} dias
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Membro desde</span>
              <span className="font-semibold">
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
            
            {user.plan === 'standard' ? (
              <a href="/upgrade" className="block w-full">
                <Button className="w-full bg-juriscalc-gold hover:bg-juriscalc-gold/90">
                  <Crown className="w-4 h-4 mr-2" />
                  Fazer Upgrade para Premium
                </Button>
              </a>
            ) : (
              <Button variant="outline" className="w-full">
                Gerenciar Assinatura
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dados do Escritório */}
      <Card className="juriscalc-card mt-6">
        <CardHeader>
          <CardTitle className="text-juriscalc-navy flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Dados do Escritório
          </CardTitle>
          <CardDescription>
            O nome do escritório será exibido nos PDFs e no compartilhamento via WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="nomeEscritorio">Nome do Escritório</Label>
              <Input
                id="nomeEscritorio"
                placeholder="Ex: Silva & Associados Advocacia"
                value={nomeEscritorio}
                onChange={(e) => setNomeEscritorio(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSalvarEscritorio()}
              />
            </div>
            <Button
              className="bg-juriscalc-blue hover:bg-juriscalc-navy"
              onClick={handleSalvarEscritorio}
              disabled={salvandoEscritorio}
            >
              {salvandoEscritorio ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alterar Senha */}
      <Card className="juriscalc-card mt-6">
        <CardHeader>
          <CardTitle className="text-juriscalc-navy flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Alterar Senha
          </CardTitle>
          <CardDescription>
            Defina uma nova senha para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="novaSenha">Nova Senha</Label>
              <Input
                id="novaSenha"
                type="password"
                placeholder="••••••••"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
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
              />
            </div>
            <div className="flex items-end">
              <Button
                className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy"
                onClick={handleAlterarSenha}
                disabled={alterandoSenha}
              >
                {alterandoSenha ? 'Alterando...' : 'Alterar Senha'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card className="juriscalc-card mt-6">
        <CardHeader>
          <CardTitle className="text-juriscalc-navy">Estatísticas de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-juriscalc-blue mb-2">{stats.calculosRealizados}</div>
              <div className="text-sm text-gray-600">Cálculos realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-juriscalc-blue mb-2">{stats.calculosSalvos}</div>
              <div className="text-sm text-gray-600">Cálculos salvos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-juriscalc-blue mb-2">{stats.exportacoesPDF}</div>
              <div className="text-sm text-gray-600">Exportações PDF</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
