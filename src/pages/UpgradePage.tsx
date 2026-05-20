import { Crown, Check, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const planos = [
  {
    nome: 'Mensal',
    preco: 'R$ 99,90',
    periodo: '/mês',
    cor: 'blue',
    destaque: false,
    link: 'https://pay.hotmart.com/Q105912864K',
    beneficios: [
      'Acesso completo ao sistema',
      'Cálculos ilimitados',
      'Suporte por email',
      'Atualizações automáticas',
      'Relatórios personalizados',
    ],
  },
  {
    nome: 'Trimestral',
    preco: 'R$ 89,90',
    periodo: '/mês',
    cor: 'red',
    destaque: true,
    link: 'https://pay.hotmart.com/Q105912864K?off=84lcjlm6',
    beneficios: [
      'Acesso completo ao sistema',
      'Cálculos ilimitados',
      'Suporte por email',
      'Atualizações automáticas',
      'Relatórios personalizados',
      'Suporte prioritário',
    ],
  },
  {
    nome: 'Semestral',
    preco: 'R$ 79,90',
    periodo: '/mês',
    cor: 'green',
    destaque: false,
    link: 'https://pay.hotmart.com/Q105912864K?off=ueg4hwk2',
    beneficios: [
      'Acesso completo ao sistema',
      'Cálculos ilimitados',
      'Suporte por email',
      'Atualizações automáticas',
      'Relatórios personalizados',
      'Suporte prioritário',
    ],
  },
];

const corBotao: Record<string, string> = {
  blue: 'bg-blue-700 hover:bg-blue-800',
  red: 'bg-red-600 hover:bg-red-700',
  green: 'bg-green-600 hover:bg-green-700',
};

export function UpgradePage() {
  const { user } = useAuth();
  const isPremium = user?.plan === 'premium';

  if (isPremium) {
    return (
      <div className="min-h-screen bg-blue-50 py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <BadgeCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Você já é Premium!</h1>
            <p className="text-gray-600 mb-6">
              Sua assinatura está ativa e você tem acesso completo a todos os recursos do IusCalc.
            </p>
            <p className="text-sm text-gray-500">
              Para gerenciar ou cancelar sua assinatura, acesse diretamente a plataforma Hotmart onde realizou a compra.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">
            Escolha o plano ideal <span className="text-blue-400">para você</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4 rounded" />
          <p className="text-gray-600 max-w-xl mx-auto">
            Tenha acesso completo a todos os recursos do IusCalc e calcule verbas trabalhistas com precisão e rapidez.
          </p>
        </div>

        {/* Cards dos planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col ${
                plano.destaque ? 'ring-2 ring-yellow-400 scale-105' : ''
              }`}
            >
              {plano.destaque && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow">
                    Mais Popular
                  </span>
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900 mb-1">Plano {plano.nome}</h2>
              <div className="flex items-end gap-1 mb-6">
                <span
                  className={`text-3xl font-bold ${
                    plano.cor === 'blue'
                      ? 'text-blue-700'
                      : plano.cor === 'red'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {plano.preco}
                </span>
                <span className="text-gray-500 text-sm mb-1">{plano.periodo}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plano.beneficios.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <a href={plano.link} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  className={`w-full ${corBotao[plano.cor]} text-white py-3 font-semibold rounded-lg transition-colors`}
                >
                  ASSINAR AGORA
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Rodapé informativo */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Pagamento processado com segurança pela Hotmart. Cancele quando quiser.
        </p>
      </div>
    </div>
  );
}

