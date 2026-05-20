import React, { useState } from 'react';
import {
  BookOpen, LogIn, Calculator, FileText, BarChart2,
  User, Crown, ChevronRight, Download, Share2, Save,
  AlertCircle, CheckCircle, Clock, Briefcase
} from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: 'primeiros-passos',  label: 'Primeiros Passos',  icon: LogIn },
  { id: 'calculadora',       label: 'Calculadora',        icon: Calculator },
  { id: 'resultados',        label: 'Resultados e Exportação', icon: FileText },
  { id: 'relatorios',        label: 'Relatórios',         icon: BarChart2 },
  { id: 'minha-conta',       label: 'Minha Conta',        icon: User },
  { id: 'planos',            label: 'Trial e Premium',    icon: Crown },
];

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4 my-4">
      <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
      <p className="text-sm text-blue-800">{children}</p>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-juriscalc-blue text-white flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div>
        <p className="font-semibold text-gray-900 mb-1">{title}</p>
        <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'yellow' | 'gray' }) {
  const colors = {
    blue:   'bg-blue-100 text-blue-800',
    green:  'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray:   'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

// ─── Seções de conteúdo ──────────────────────────────────────────────────────

function PrimeirosPassos() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-juriscalc-navy mb-1">Primeiros Passos</h2>
        <p className="text-gray-500 text-sm">Como criar sua conta e acessar o sistema.</p>
      </div>

      <Step number={1} title="Criar conta">
        Acesse <strong>iuscalc.vercel.app</strong> e clique em <strong>"Criar Conta"</strong>.
        Preencha nome, e-mail, telefone e senha (mínimo 6 caracteres). Após o cadastro
        você já pode entrar — sem necessidade de confirmar e-mail.
      </Step>

      <Step number={2} title="Fazer login">
        Insira seu e-mail e senha. Se esqueceu a senha, clique em <strong>"Esqueci minha senha"</strong>
        e um link de recuperação será enviado para o seu e-mail.
      </Step>

      <Step number={3} title="Navegar pelo sistema">
        Após o login você verá a <strong>Home</strong> com um resumo da sua atividade.
        A barra de navegação no topo dá acesso a todas as áreas:
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li><strong>Calculadora</strong> — realizar novos cálculos</li>
          <li><strong>Relatórios</strong> — visualizar histórico e estatísticas</li>
          <li><strong>Minha Conta</strong> — perfil e configurações</li>
          <li><strong>Seja Premium / Gerenciar Plano</strong> — informações de assinatura</li>
        </ul>
      </Step>

      <Tip>
        Ao criar sua conta você recebe automaticamente <strong>7 dias de acesso gratuito</strong> a
        todas as funcionalidades. Nenhum cartão é necessário para o trial.
      </Tip>
    </div>
  );
}

function Calculadora() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-juriscalc-navy mb-1">Calculadora</h2>
        <p className="text-gray-500 text-sm">Preencha os dados e obtenha o cálculo completo em segundos.</p>
      </div>

      <Step number={1} title="Dados do contrato">
        Preencha os campos obrigatórios:
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li><strong>Salário base</strong> — salário bruto mensal</li>
          <li><strong>Data de admissão</strong> e <strong>data de demissão</strong></li>
          <li><strong>Tipo de rescisão</strong> — veja os tipos abaixo</li>
          <li><strong>Aviso prévio</strong> — se foi ou não cumprido</li>
          <li><strong>Dias trabalhados</strong> no último mês (preenchido automaticamente)</li>
        </ul>
      </Step>

      <div className="bg-gray-50 rounded-xl p-5">
        <p className="font-semibold text-gray-800 mb-3">Tipos de rescisão disponíveis:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { tipo: 'Sem justa causa', desc: 'Dispensa pelo empregador. Gera multa de 40% do FGTS e aviso prévio indenizado.' },
            { tipo: 'Pedido de demissão', desc: 'Iniciado pelo empregado. Desconto do aviso prévio se não cumprido.' },
            { tipo: 'Justa causa', desc: 'Falta grave do empregado. Sem multa FGTS, 13º ou férias proporcionais.' },
            { tipo: 'Acordo mútuo', desc: 'Art. 484-A CLT. Multa de 20% do FGTS e aviso prévio reduzido à metade.' },
            { tipo: 'Rescisão indireta', desc: 'Falta grave do empregador. Mesmo direitos da dispensa sem justa causa.' },
          ].map(item => (
            <div key={item.tipo} className="flex gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{item.tipo}</p>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Step number={2} title="Adicionais (opcional)">
        Na seção de adicionais você pode incluir verbas extras ao cálculo:
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {[
            'Horas extras (50% ou 100%)',
            'Adicional noturno',
            'Insalubridade',
            'Periculosidade',
            'Férias vencidas',
            'Multa Art. 467 CLT',
            'Multa Art. 477 CLT',
            'Vale-transporte não pago',
            'Vale-alimentação não pago',
            'Diferenças salariais',
            'Seguro-desemprego',
            'Cálculos personalizados',
          ].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-gray-700">
              <ChevronRight className="w-3.5 h-3.5 text-juriscalc-blue shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </Step>

      <Step number={3} title="Calcular">
        Clique no botão <strong>"Calcular"</strong>. Os resultados aparecem imediatamente
        abaixo com todas as verbas discriminadas por categoria.
      </Step>

      <Tip>
        Para cálculos com <strong>férias vencidas</strong>, informe quantos períodos
        aquisitivos completos (anos) o empregado não gozou. O sistema calcula automaticamente
        o valor com o 1/3 constitucional incluído.
      </Tip>
    </div>
  );
}

function Resultados() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-juriscalc-navy mb-1">Resultados e Exportação</h2>
        <p className="text-gray-500 text-sm">O que fazer depois de calcular.</p>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        Após clicar em <strong>"Calcular"</strong>, os resultados são exibidos organizados em seções:
        Verbas Rescisórias, Valores do Aviso Prévio, FGTS e Multa, e Adicionais.
        O valor total aparece destacado no topo em verde.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-juriscalc-blue font-semibold">
            <Save className="w-4 h-4" />
            Salvar
          </div>
          <p className="text-sm text-gray-600">
            Salva o cálculo com um nome personalizado. Fica disponível em
            <strong> Cálculos Recentes</strong> na home e pode ser consultado a qualquer momento.
          </p>
        </div>

        <div className="border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-juriscalc-blue font-semibold">
            <Download className="w-4 h-4" />
            PDF
          </div>
          <p className="text-sm text-gray-600">
            Gera um demonstrativo profissional em PDF com todos os valores, dados do contrato
            e o nome do seu escritório (configurado em Minha Conta).
          </p>
        </div>

        <div className="border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <Download className="w-4 h-4" />
            Excel
          </div>
          <p className="text-sm text-gray-600">
            Exporta o cálculo em planilha <strong>.xlsx</strong> com todas as verbas
            separadas por categoria, pronta para usar em peças ou controles internos.
          </p>
        </div>

        <div className="border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-juriscalc-blue font-semibold">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </div>
          <p className="text-sm text-gray-600">
            Envia o resumo do cálculo diretamente pelo <strong>WhatsApp</strong>,
            formatado com todos os valores e o nome do escritório.
          </p>
        </div>
      </div>

      <Tip>
        O <strong>nome do escritório</strong> aparece no cabeçalho do PDF e na mensagem do
        WhatsApp. Configure em <strong>Minha Conta → Dados do Escritório</strong>.
      </Tip>
    </div>
  );
}

function Relatorios() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-juriscalc-navy mb-1">Relatórios</h2>
        <p className="text-gray-500 text-sm">Acompanhe seu histórico e estatísticas de uso.</p>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        A aba <strong>Relatórios</strong> centraliza o histórico de todos os cálculos realizados
        na sua conta, com visão consolidada de valores e datas.
      </p>

      <div className="space-y-4">
        <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
          <BarChart2 className="w-5 h-5 text-juriscalc-blue shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 text-sm">Histórico de cálculos</p>
            <p className="text-gray-600 text-sm mt-1">
              Lista todos os cálculos salvos com nome, data e valor total.
              Clique em qualquer registro para visualizar o detalhamento completo.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
          <Clock className="w-5 h-5 text-juriscalc-blue shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 text-sm">Cálculos recentes</p>
            <p className="text-gray-600 text-sm mt-1">
              Os últimos cálculos também aparecem na <strong>Home</strong> para acesso rápido,
              sem precisar entrar na aba de Relatórios.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
          <Briefcase className="w-5 h-5 text-juriscalc-blue shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 text-sm">Reutilizar cálculos</p>
            <p className="text-gray-600 text-sm mt-1">
              Qualquer cálculo salvo pode ser reaberto na Calculadora para edição.
              Isso é útil para ajustar valores ou gerar uma nova versão do demonstrativo.
            </p>
          </div>
        </div>
      </div>

      <Tip>
        Dê nomes descritivos aos cálculos ao salvar (ex: <em>"João Silva – Demissão 03/2025"</em>)
        para encontrá-los facilmente depois nos Relatórios.
      </Tip>
    </div>
  );
}

function MinhaConta() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-juriscalc-navy mb-1">Minha Conta</h2>
        <p className="text-gray-500 text-sm">Perfil, escritório e configurações.</p>
      </div>

      <div className="space-y-5">
        <div>
          <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-juriscalc-blue" />
            Informações Pessoais
          </p>
          <p className="text-sm text-gray-600">
            Altere seu nome completo, e-mail e telefone clicando em <strong>"Editar Informações"</strong>.
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-juriscalc-blue" />
            Dados do Escritório
          </p>
          <p className="text-sm text-gray-600">
            Insira o <strong>nome do seu escritório</strong> neste campo e clique em <strong>"Salvar"</strong>.
            Esse nome aparecerá automaticamente no cabeçalho de todos os PDFs exportados e nas mensagens
            de WhatsApp — identificando os cálculos com a marca do seu escritório.
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-juriscalc-blue" />
            Alterar Senha
          </p>
          <p className="text-sm text-gray-600">
            Digite a nova senha duas vezes e clique em <strong>"Alterar Senha"</strong>.
            A nova senha passa a valer imediatamente.
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-juriscalc-blue" />
            Estatísticas de Uso
          </p>
          <p className="text-sm text-gray-600">
            Veja o total de cálculos realizados, cálculos salvos e exportações de PDF
            vinculadas à sua conta.
          </p>
        </div>
      </div>
    </div>
  );
}

function Planos() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-juriscalc-navy mb-1">Trial e Premium</h2>
        <p className="text-gray-500 text-sm">Entenda os planos e como assinar.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border-2 border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <p className="font-bold text-gray-900">Trial Gratuito</p>
            <Badge color="yellow">7 dias</Badge>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5">
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Acesso completo ao sistema</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Todos os tipos de rescisão</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />PDF, Excel e WhatsApp</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Sem necessidade de cartão</li>
          </ul>
        </div>

        <div className="border-2 border-juriscalc-blue rounded-xl p-5 relative">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-yellow-500" />
            <p className="font-bold text-gray-900">Premium</p>
            <Badge color="blue">Assinatura</Badge>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5">
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Tudo do trial, sem data de expiração</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Suporte por e-mail</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Atualizações automáticas</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />Relatórios personalizados</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5">
        <p className="font-semibold text-gray-900 mb-3">Como assinar</p>
        <Step number={1} title='Clique em "Seja Premium" na barra de navegação'>
          Você verá os planos disponíveis: Mensal, Trimestral e Semestral.
        </Step>
        <Step number={2} title='Escolha o plano e clique em "Assinar Agora"'>
          Você será redirecionado para a Hotmart, plataforma segura de pagamento.
        </Step>
        <Step number={3} title="Após a confirmação do pagamento">
          Entre em contato pelo suporte para que seu plano seja ativado na plataforma.
          Em breve essa etapa será automática.
        </Step>
      </div>

      <Tip>
        Quando seu trial expirar, o sistema redireciona automaticamente para a página de planos.
        Seus cálculos salvos são preservados — nada é perdido.
      </Tip>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

const contentMap: Record<string, React.ReactNode> = {
  'primeiros-passos': <PrimeirosPassos />,
  'calculadora':       <Calculadora />,
  'resultados':        <Resultados />,
  'relatorios':        <Relatorios />,
  'minha-conta':       <MinhaConta />,
  'planos':            <Planos />,
};

export function ManualPage() {
  const [activeSection, setActiveSection] = useState('primeiros-passos');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-juriscalc-blue text-white rounded-xl p-2.5">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-juriscalc-navy">Manual do Usuário</h1>
            <p className="text-sm text-gray-500">Tudo que você precisa saber para usar o IusCalc</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <aside className="md:w-56 shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm border p-2 sticky top-6">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 text-left ${
                      isActive
                        ? 'bg-juriscalc-blue text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 bg-white rounded-2xl shadow-sm border p-6 md:p-8 min-h-[500px]">
            {contentMap[activeSection]}
          </main>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          IusCalc · Dúvidas? Entre em contato pelo suporte.
        </p>
      </div>
    </div>
  );
}
