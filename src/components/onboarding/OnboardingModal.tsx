import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Calculator, Download, Crown,
  ChevronRight, ChevronLeft, X, Check,
  Share2, Save, FileText, Table2, MessageCircle
} from 'lucide-react';

interface OnboardingModalProps {
  open: boolean;
  nomeUsuario?: string;
  onConcluir: () => void;
}

interface Passo {
  icone: React.ReactNode;
  titulo: string;
  descricao: string;
  cor: string;
  conteudo: React.ReactNode;
}

const passos: Passo[] = [
  {
    icone: <BookOpen className="w-10 h-10 text-white" />,
    titulo: 'Bem-vindo ao IusCalc!',
    descricao: 'Seu assistente de cálculos trabalhistas. Veja em poucos passos como aproveitar tudo que o sistema oferece.',
    cor: 'bg-juriscalc-blue',
    conteudo: (
      <div className="grid grid-cols-2 gap-3 mt-2">
        {[
          { label: 'Cálculos trabalhistas precisos', icon: '⚖️' },
          { label: 'Exportação em PDF e Excel', icon: '📄' },
          { label: 'Compartilhe via WhatsApp', icon: '📱' },
          { label: 'Salve e reutilize cálculos', icon: '💾' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 text-sm text-juriscalc-navy font-medium"
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    icone: <Calculator className="w-10 h-10 text-white" />,
    titulo: 'Calculadora Trabalhista',
    descricao: 'Preencha os dados do contrato e o sistema calcula automaticamente todas as verbas conforme a CLT.',
    cor: 'bg-emerald-500',
    conteudo: (
      <ol className="space-y-3 mt-2">
        {[
          { num: '1', text: 'Informe as datas de admissão e demissão' },
          { num: '2', text: 'Digite o salário base do trabalhador' },
          { num: '3', text: 'Escolha o tipo de rescisão (sem justa causa, pedido de demissão, etc.)' },
          { num: '4', text: 'Adicione opcionais: horas extras, insalubridade, férias vencidas…' },
          { num: '5', text: 'Clique em Calcular e veja o resultado detalhado' },
        ].map((item) => (
          <li key={item.num} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
              {item.num}
            </span>
            <span className="text-sm text-gray-700">{item.text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    icone: <Download className="w-10 h-10 text-white" />,
    titulo: 'Salvar, Exportar e Compartilhar',
    descricao: 'Após calcular, você tem várias opções para guardar e distribuir o resultado.',
    cor: 'bg-violet-500',
    conteudo: (
      <div className="grid grid-cols-2 gap-3 mt-2">
        {[
          { icon: <Save className="w-5 h-5 text-juriscalc-blue" />, label: 'Salvar', desc: 'Guarde o cálculo para consultar depois' },
          { icon: <FileText className="w-5 h-5 text-red-500" />, label: 'PDF', desc: 'Exporte o relatório em PDF' },
          { icon: <Table2 className="w-5 h-5 text-green-600" />, label: 'Excel', desc: 'Planilha com todos os valores' },
          { icon: <MessageCircle className="w-5 h-5 text-green-500" />, label: 'WhatsApp', desc: 'Compartilhe o resumo direto no app' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5 bg-violet-50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm font-semibold text-gray-800">{item.label}</span>
            </div>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icone: <Crown className="w-10 h-10 text-white" />,
    titulo: 'Plano Premium',
    descricao: 'Eleve sua produtividade com recursos exclusivos e cálculos ilimitados.',
    cor: 'bg-amber-500',
    conteudo: (
      <div className="space-y-3 mt-2">
        {[
          { texto: 'Cálculos ilimitados, sem restrições', destaque: false },
          { texto: 'Exportação para PDF e Excel desbloqueada', destaque: false },
          { texto: 'Compartilhamento por WhatsApp e e-mail', destaque: false },
          { texto: 'Suporte prioritário', destaque: false },
        ].map((item) => (
          <div key={item.texto} className="flex items-center gap-3 bg-amber-50 rounded-lg px-4 py-2.5">
            <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{item.texto}</span>
          </div>
        ))}
        <p className="text-xs text-center text-gray-400 pt-1">
          Você pode assinar a qualquer momento em <strong>Seja Premium</strong> no menu.
        </p>
      </div>
    ),
  },
];

export function OnboardingModal({ open, nomeUsuario, onConcluir }: OnboardingModalProps) {
  const [passoAtual, setPassoAtual] = useState(0);
  const passo = passos[passoAtual];
  const isUltimo = passoAtual === passos.length - 1;
  const isPrimeiro = passoAtual === 0;

  const avancar = () => {
    if (isUltimo) {
      onConcluir();
    } else {
      setPassoAtual((p) => p + 1);
    }
  };

  const voltar = () => {
    if (!isPrimeiro) setPassoAtual((p) => p - 1);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onConcluir(); }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0 [&>button]:hidden">
        {/* Cabeçalho colorido */}
        <div className={`${passo.cor} px-6 pt-6 pb-8 relative transition-colors duration-300`}>
          {/* Botão fechar */}
          <button
            onClick={onConcluir}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ícone */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            {passo.icone}
          </div>

          {/* Título */}
          <h2 className="text-xl font-bold text-white mb-1">
            {passoAtual === 0 && nomeUsuario
              ? `Bem-vindo, ${nomeUsuario.split(' ')[0]}!`
              : passo.titulo}
          </h2>
          <p className="text-white/85 text-sm leading-relaxed">{passo.descricao}</p>
        </div>

        {/* Corpo */}
        <div className="px-6 pt-5 pb-6 bg-white">
          {passo.conteudo}

          {/* Barra de progresso + navegação */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            {/* Indicadores de passo */}
            <div className="flex items-center gap-1.5">
              {passos.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === passoAtual
                      ? 'w-6 h-2 bg-juriscalc-blue'
                      : i < passoAtual
                      ? 'w-2 h-2 bg-juriscalc-blue/40'
                      : 'w-2 h-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Botões */}
            <div className="flex items-center gap-2">
              {!isPrimeiro && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={voltar}
                  className="text-gray-500 hover:text-gray-700 px-2"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
              )}

              {isPrimeiro && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onConcluir}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                >
                  Pular tour
                </Button>
              )}

              <Button
                size="sm"
                onClick={avancar}
                className="bg-juriscalc-blue hover:bg-juriscalc-navy text-white px-4"
              >
                {isUltimo ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Começar
                  </>
                ) : (
                  <>
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
