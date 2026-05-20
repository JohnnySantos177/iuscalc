import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrivacidadePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-3xl">

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-juriscalc-blue transition-colors mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="bg-juriscalc-blue text-white rounded-xl p-2.5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-juriscalc-navy">Política de Privacidade</h1>
            <p className="text-sm text-gray-500">Última atualização: maio de 2025</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">1. Introdução</h2>
            <p>
              O IusCalc valoriza e respeita a privacidade dos seus usuários. Esta Política de Privacidade
              descreve como coletamos, utilizamos, armazenamos e protegemos seus dados pessoais, em conformidade
              com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong> e demais
              normas aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">2. Dados que Coletamos</h2>
            <p className="mb-2">Coletamos as seguintes categorias de dados:</p>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-juriscalc-navy mb-1">Dados de cadastro</p>
                <p className="text-sm">Nome completo, endereço de e-mail e telefone, fornecidos voluntariamente no momento do registro.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-juriscalc-navy mb-1">Dados de uso</p>
                <p className="text-sm">Cálculos trabalhistas realizados, configurações de perfil (ex.: nome do escritório) e histórico de cálculos salvos.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-juriscalc-navy mb-1">Dados de acesso</p>
                <p className="text-sm">Logs de autenticação, endereço IP, tipo de dispositivo e navegador, para fins de segurança e diagnóstico.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-juriscalc-navy mb-1">Feedbacks</p>
                <p className="text-sm">Avaliações e mensagens enviadas voluntariamente pelo usuário por meio do formulário de feedback.</p>
              </div>
            </div>
            <p className="text-sm mt-3 text-gray-500">
              <strong>Não coletamos</strong> dados financeiros (cartão, conta bancária) nem dados sensíveis de terceiros inseridos nos cálculos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">3. Finalidade do Tratamento</h2>
            <p className="mb-2">Seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Criar e gerenciar sua conta de usuário;</li>
              <li>Permitir o funcionamento das funcionalidades da plataforma (cálculos, exportações, compartilhamentos);</li>
              <li>Garantir a segurança e integridade do sistema;</li>
              <li>Enviar comunicações relacionadas à conta (confirmação de e-mail, recuperação de senha);</li>
              <li>Melhorar continuamente a plataforma com base nos feedbacks recebidos;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">4. Base Legal para o Tratamento</h2>
            <p>
              O tratamento dos seus dados é realizado com base nas seguintes hipóteses previstas na LGPD:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li><strong>Consentimento</strong> — fornecido no momento do cadastro;</li>
              <li><strong>Execução de contrato</strong> — necessário para a prestação dos serviços contratados;</li>
              <li><strong>Legítimo interesse</strong> — para melhoria e segurança da plataforma;</li>
              <li><strong>Cumprimento de obrigação legal</strong> — quando exigido por lei.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">5. Compartilhamento de Dados</h2>
            <p className="mb-2">
              O IusCalc <strong>não vende nem comercializa</strong> dados pessoais de usuários.
              Dados poderão ser compartilhados apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Supabase</strong> — infraestrutura de banco de dados e autenticação, com sede nos EUA, sob contrato de proteção de dados adequado;</li>
              <li><strong>Hotmart</strong> — plataforma de pagamentos para processamento de assinaturas Premium;</li>
              <li><strong>Autoridades competentes</strong> — quando exigido por ordem judicial ou obrigação legal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">6. Armazenamento e Segurança</h2>
            <p>
              Os dados são armazenados em servidores seguros com criptografia em repouso e em trânsito (TLS/HTTPS).
              O acesso é restrito por políticas de Row Level Security (RLS) no banco de dados, garantindo que
              cada usuário acesse apenas seus próprios dados. Senhas nunca são armazenadas em texto puro.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">7. Retenção de Dados</h2>
            <p>
              Seus dados são mantidos enquanto sua conta estiver ativa ou enquanto necessário para a prestação
              dos serviços. Após o encerramento da conta, os dados serão eliminados ou anonimizados no prazo de
              até 90 dias, salvo obrigação legal de retenção por prazo superior.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">8. Seus Direitos como Titular</h2>
            <p className="mb-2">Em conformidade com a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Acesso</strong> — solicitar uma cópia dos seus dados pessoais;</li>
              <li><strong>Correção</strong> — atualizar dados incompletos, inexatos ou desatualizados;</li>
              <li><strong>Eliminação</strong> — solicitar a exclusão dos dados tratados com base em consentimento;</li>
              <li><strong>Portabilidade</strong> — receber seus dados em formato estruturado;</li>
              <li><strong>Revogação do consentimento</strong> — a qualquer momento, sem prejuízo da licitude do tratamento anterior;</li>
              <li><strong>Informação</strong> — sobre as entidades com quem seus dados foram compartilhados.</li>
            </ul>
            <p className="mt-2 text-sm">
              Para exercer seus direitos, entre em contato pelo suporte da plataforma ou pelo e-mail de contato informado na página inicial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">9. Cookies</h2>
            <p>
              O IusCalc utiliza cookies e armazenamento local exclusivamente para manter a sessão do usuário autenticada
              e salvar preferências de uso (como configurações de interface). Não utilizamos cookies de rastreamento
              publicitário de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">10. Alterações nesta Política</h2>
            <p>
              Esta Política pode ser atualizada periodicamente para refletir melhorias na plataforma ou mudanças
              regulatórias. Alterações significativas serão comunicadas por e-mail ou notificação na plataforma.
              O uso continuado após a publicação implica na aceitação das mudanças.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">11. Contato e Encarregado de Dados (DPO)</h2>
            <p>
              Para dúvidas, solicitações ou reclamações relacionadas à privacidade e ao tratamento de dados pessoais,
              entre em contato pelo suporte disponível dentro da plataforma ou pelo e-mail de contato informado
              na página inicial. Também é possível registrar reclamações junto à{' '}
              <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> em{' '}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-juriscalc-blue underline hover:text-juriscalc-navy"
              >
                www.gov.br/anpd
              </a>.
            </p>
          </section>

        </div>

        {/* Rodapé */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} IusCalc. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
