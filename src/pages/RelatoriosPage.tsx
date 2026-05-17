import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/format';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import {
  Calculator, TrendingUp, TrendingDown, DollarSign,
  Award, BarChart2, PieChart as PieIcon, Clock, AlertTriangle
} from 'lucide-react';

interface CalculoRaw {
  id: string;
  nome: string;
  created_at: string;
  total_geral: number;
  dados_contrato?: any;
  resultados?: string;
  adicionais?: any;
  verbas_rescisorias?: any;
}

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#d97706', '#7c3aed', '#0891b2'];

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const TIPO_RESCISAO_LABELS: Record<string, string> = {
  sem_justa_causa: 'Sem Justa Causa',
  justa_causa: 'Justa Causa',
  pedido_demissao: 'Pedido de Demissão',
  acordo_mutuo: 'Acordo Mútuo',
};

export function RelatoriosPage() {
  const { user } = useAuth();
  const [calculos, setCalculos] = useState<CalculoRaw[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('calculos_salvos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (!error) setCalculos(data || []);
      setLoading(false);
    };
    carregar();
  }, [user]);

  // ── Métricas básicas ────────────────────────────────────────────────────────
  const total = calculos.length;
  const valorTotal = calculos.reduce((s, c) => s + Number(c.total_geral || 0), 0);
  const media = total > 0 ? valorTotal / total : 0;
  const maiorCalculo = total > 0 ? Math.max(...calculos.map(c => Number(c.total_geral || 0))) : 0;
  const menorCalculo = total > 0 ? Math.min(...calculos.map(c => Number(c.total_geral || 0))) : 0;

  // Mês atual vs mês anterior
  const hoje = new Date();
  const mesAtual = calculos.filter(c => {
    const d = new Date(c.created_at);
    return d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();
  });
  const mesAnterior = calculos.filter(c => {
    const d = new Date(c.created_at);
    const ma = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
    return d.getMonth() === ma.getMonth() && d.getFullYear() === ma.getFullYear();
  });
  const crescimento = mesAnterior.length > 0
    ? ((mesAtual.length - mesAnterior.length) / mesAnterior.length) * 100
    : null;

  // ── Cálculos por mês (últimos 6 meses) ─────────────────────────────────────
  const calculosPorMes = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() - (5 - i), 1);
    const mes = d.getMonth();
    const ano = d.getFullYear();
    const itens = calculos.filter(c => {
      const cd = new Date(c.created_at);
      return cd.getMonth() === mes && cd.getFullYear() === ano;
    });
    return {
      mes: MESES[mes],
      quantidade: itens.length,
      valor: itens.reduce((s, c) => s + Number(c.total_geral || 0), 0),
    };
  });

  // ── Tipo de rescisão ────────────────────────────────────────────────────────
  const tipoRescisaoMap: Record<string, number> = {};
  calculos.forEach(c => {
    const tipo = c.dados_contrato?.motivoDemissao || 'nao_informado';
    tipoRescisaoMap[tipo] = (tipoRescisaoMap[tipo] || 0) + 1;
  });
  const tipoRescisaoData = Object.entries(tipoRescisaoMap)
    .map(([key, value]) => ({
      name: TIPO_RESCISAO_LABELS[key] || 'Não informado',
      value,
    }))
    .sort((a, b) => b.value - a.value);

  // ── Verbas mais acionadas ───────────────────────────────────────────────────
  const verbasMap: Record<string, number> = {};
  const VERBAS_LABELS: Record<string, string> = {
    salarioProporcional: 'Saldo de Salário',
    decimoTerceiro: '13º Salário',
    feriasProporcionais: 'Férias Proporcionais',
    avisoPrevio: 'Aviso Prévio',
    fgts: 'FGTS',
    multaFgts: 'Multa FGTS (40%)',
    feriasVencidas: 'Férias Vencidas',
    valeTransporteNaoPago: 'Vale Transporte',
    valeAlimentacaoNaoPago: 'Vale Alimentação',
    descontosIndevidos: 'Descontos Indevidos',
    diferencasSalariais: 'Diferenças Salariais',
    adicionalTransferencia: 'Adicional Transferência',
    indenizacaoDemissaoIndevida: 'Indeniz. Demissão',
  };

  calculos.forEach(c => {
    let res: any = null;
    if (c.resultados) {
      try { res = JSON.parse(c.resultados); } catch { }
    }
    const verbas = res?.detalhamento?.verbas || c.verbas_rescisorias || {};
    Object.entries(verbas).forEach(([key, val]) => {
      if (Number(val) > 0) {
        verbasMap[key] = (verbasMap[key] || 0) + 1;
      }
    });
  });
  const verbasData = Object.entries(verbasMap)
    .map(([key, count]) => ({ name: VERBAS_LABELS[key] || key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // ── Adicionais mais usados ──────────────────────────────────────────────────
  const adicionaisMap: Record<string, number> = {
    'Insalubridade': 0,
    'Periculosidade': 0,
    'Adic. Noturno': 0,
    'Horas Extras': 0,
  };
  calculos.forEach(c => {
    let res: any = null;
    if (c.resultados) { try { res = JSON.parse(c.resultados); } catch { } }
    const ad = res?.detalhamento?.adicionais || c.adicionais || {};
    if (Number(ad.insalubridade) > 0) adicionaisMap['Insalubridade']++;
    if (Number(ad.periculosidade) > 0) adicionaisMap['Periculosidade']++;
    if (Number(ad.noturno) > 0) adicionaisMap['Adic. Noturno']++;
    if (Number(ad.horasExtras) > 0) adicionaisMap['Horas Extras']++;
  });
  const adicionaisData = Object.entries(adicionaisMap)
    .map(([name, count]) => ({ name, count }))
    .filter(d => d.count > 0)
    .sort((a, b) => b.count - a.count);

  // ── Evolução do valor médio (últimos 6 meses) ───────────────────────────────
  const evolucaoMedia = calculosPorMes.map(m => ({
    mes: m.mes,
    media: m.quantidade > 0 ? m.valor / m.quantidade : 0,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Relatórios</h1>
          <p className="text-gray-500">Visão geral do uso da plataforma e dos seus cálculos trabalhistas.</p>
        </div>

        {total === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <BarChart2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Nenhum dado disponível</h2>
              <p className="text-gray-400">Realize e salve cálculos para visualizar os relatórios.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* ── Cards de métricas ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total de Cálculos</p>
                    <p className="text-3xl font-bold text-gray-900">{total}</p>
                    {crescimento !== null && (
                      <p className={`text-xs mt-1 flex items-center gap-1 ${crescimento >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {crescimento >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(crescimento).toFixed(0)}% vs mês anterior
                      </p>
                    )}
                  </div>
                  <Calculator className="w-10 h-10 text-blue-500 opacity-80" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Valor Total Acumulado</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(valorTotal)}</p>
                    <p className="text-xs text-gray-400 mt-1">em todos os cálculos</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-green-500 opacity-80" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Valor Médio por Cálculo</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(media)}</p>
                    <p className="text-xs text-gray-400 mt-1">média geral</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-purple-500 opacity-80" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Este Mês</p>
                    <p className="text-3xl font-bold text-gray-900">{mesAtual.length}</p>
                    <p className="text-xs text-gray-400 mt-1">cálculos realizados</p>
                  </div>
                  <Clock className="w-10 h-10 text-orange-500 opacity-80" />
                </CardContent>
              </Card>
            </div>

            {/* Segunda linha de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-5">
                  <p className="text-sm text-green-700 mb-1">Maior Cálculo</p>
                  <p className="text-2xl font-bold text-green-800">{formatCurrency(maiorCalculo)}</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-5">
                  <p className="text-sm text-blue-700 mb-1">Menor Cálculo</p>
                  <p className="text-2xl font-bold text-blue-800">{formatCurrency(menorCalculo)}</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-5">
                  <p className="text-sm text-purple-700 mb-1">Mês Anterior</p>
                  <p className="text-2xl font-bold text-purple-800">{mesAnterior.length} cálculos</p>
                </CardContent>
              </Card>
            </div>

            {/* ── Gráficos principais ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* Cálculos por mês */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart2 className="w-5 h-5 text-blue-600" />
                    Cálculos por Mês (últimos 6 meses)
                  </CardTitle>
                  <CardDescription>Quantidade de cálculos realizados por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={calculosPorMes} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value: number) => [`${value} cálculo(s)`, 'Quantidade']}
                        contentStyle={{ borderRadius: 8, fontSize: 13 }}
                      />
                      <Bar dataKey="quantidade" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Valor total por mês */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Valor Total por Mês
                  </CardTitle>
                  <CardDescription>Soma dos valores calculados mês a mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={calculosPorMes}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), 'Valor Total']}
                        contentStyle={{ borderRadius: 8, fontSize: 13 }}
                      />
                      <Line type="monotone" dataKey="valor" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* Tipo de rescisão */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <PieIcon className="w-5 h-5 text-purple-600" />
                    Tipo de Rescisão
                  </CardTitle>
                  <CardDescription>Distribuição dos motivos de demissão nos cálculos</CardDescription>
                </CardHeader>
                <CardContent>
                  {tipoRescisaoData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={tipoRescisaoData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {tipoRescisaoData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number, name: string) => [`${value} cálculo(s)`, name]}
                          contentStyle={{ borderRadius: 8, fontSize: 13 }}
                        />
                        <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-10">Dados de rescisão não disponíveis.</p>
                  )}
                </CardContent>
              </Card>

              {/* Evolução da média */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Award className="w-5 h-5 text-orange-500" />
                    Evolução do Valor Médio
                  </CardTitle>
                  <CardDescription>Média dos valores calculados por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={evolucaoMedia} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), 'Valor Médio']}
                        contentStyle={{ borderRadius: 8, fontSize: 13 }}
                      />
                      <Bar dataKey="media" fill="#d97706" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* ── Verbas e adicionais ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* Verbas mais acionadas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Verbas Mais Acionadas
                  </CardTitle>
                  <CardDescription>Itens que aparecem com maior frequência nos cálculos salvos</CardDescription>
                </CardHeader>
                <CardContent>
                  {verbasData.length > 0 ? (
                    <div className="space-y-3">
                      {verbasData.map((v, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-4 text-right">{i + 1}</span>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-gray-700">{v.name}</span>
                              <span className="text-gray-500">{v.count}x</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${(v.count / verbasData[0].count) * 100}%`,
                                  backgroundColor: COLORS[i % COLORS.length],
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-10">Dados de verbas não disponíveis.</p>
                  )}
                </CardContent>
              </Card>

              {/* Adicionais mais usados */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart2 className="w-5 h-5 text-indigo-600" />
                    Adicionais Mais Utilizados
                  </CardTitle>
                  <CardDescription>Frequência de uso dos adicionais trabalhistas</CardDescription>
                </CardHeader>
                <CardContent>
                  {adicionaisData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={adicionaisData} layout="vertical" barSize={22}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={110} />
                        <Tooltip
                          formatter={(value: number) => [`${value} cálculo(s)`, 'Usos']}
                          contentStyle={{ borderRadius: 8, fontSize: 13 }}
                        />
                        <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-400 text-sm">Nenhum adicional registrado nos cálculos salvos.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── Últimos cálculos ── */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Histórico Recente
                </CardTitle>
                <CardDescription>Últimos 10 cálculos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-gray-500">
                        <th className="pb-3 pr-4 font-medium">Nome</th>
                        <th className="pb-3 pr-4 font-medium">Data</th>
                        <th className="pb-3 pr-4 font-medium">Tipo de Rescisão</th>
                        <th className="pb-3 font-medium text-right">Valor Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[...calculos].reverse().slice(0, 10).map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 pr-4 font-medium text-gray-800">{c.nome}</td>
                          <td className="py-3 pr-4 text-gray-500">
                            {new Date(c.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 pr-4 text-gray-500">
                            {TIPO_RESCISAO_LABELS[c.dados_contrato?.motivoDemissao] || '—'}
                          </td>
                          <td className="py-3 text-right font-semibold text-blue-700">
                            {formatCurrency(Number(c.total_geral || 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
