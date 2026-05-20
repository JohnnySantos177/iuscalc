import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, FileText, Clock, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/utils/format";

interface CalculoSalvo {
  id: string;
  nome: string;
  created_at: string;
  total_geral: number;
  dados_contrato?: any;
}

export function HomePage() {
  const { user } = useAuth();
  const [calculosSalvos, setCalculosSalvos] = useState<CalculoSalvo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDadosReais = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        console.log('Carregando dados reais do usuário:', user.id);
        
        // Buscar cálculos salvos reais do usuário
        const { data: calculos, error } = await supabase
          .from('calculos_salvos')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Erro ao carregar cálculos:', error);
        } else {
          console.log('Cálculos carregados:', calculos?.length || 0);
          setCalculosSalvos(calculos || []);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosReais();
  }, [user]);

  // Stats baseadas nos dados reais
  const totalCalculos = calculosSalvos.length;
  const valorTotalCalculado = calculosSalvos.reduce((sum, calc) => sum + Number(calc.total_geral || 0), 0);

  const stats = [
    {
      title: "Cálculos Realizados",
      value: totalCalculos.toString(),
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      title: "Valor Total Calculado",
      value: formatCurrency(valorTotalCalculado),
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Plano Atual",
      value: user?.plan === 'premium' ? 'Premium' : 'Padrão',
      icon: Award,
      color: "text-purple-600"
    },
    {
      title: "Status",
      value: "Ativo",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-juriscalc-navy mb-2">
            Bem-vindo de volta, {user?.name || 'Usuário'}!
          </h1>
          <p className="text-gray-600">
            Aqui está o resumo da sua atividade.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>
                  Acesse rapidamente as funcionalidades principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start">
                  <Link to="/calculadora">
                    <Calculator className="w-4 h-4 mr-2" />
                    Nova Calculadora
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/calculadora">
                    <FileText className="w-4 h-4 mr-2" />
                    Meus Cálculos ({totalCalculos})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/relatorios">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Relatórios
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/manual">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Manual do Usuário
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Calculations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cálculos Recentes</CardTitle>
                <CardDescription>
                  Seus últimos cálculos realizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-juriscalc-blue mx-auto"></div>
                    <p className="mt-2 text-gray-600">Carregando...</p>
                  </div>
                ) : calculosSalvos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum cálculo realizado ainda.</p>
                    <p className="text-sm">Comece criando seu primeiro cálculo!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {calculosSalvos.map((calc) => (
                      <div
                        key={calc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {calc.nome}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Cálculo trabalhista
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-juriscalc-navy">
                            {formatCurrency(Number(calc.total_geral || 0))}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(calc.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/calculadora">
                    Ver Todos os Cálculos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Banner - only show for non-premium users */}
        {user?.plan !== 'premium' && (
          <Card className="mt-8 bg-gradient-to-r from-juriscalc-navy to-juriscalc-blue text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Upgrade para Premium
                  </h3>
                  <p className="text-white/90">
                    Continue usando após o trial e tenha acesso completo ao sistema
                  </p>
                </div>
                <a href="/upgrade">
                  <Button className="bg-juriscalc-yellow text-juriscalc-navy hover:bg-yellow-300">
                    Assinar Agora
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
