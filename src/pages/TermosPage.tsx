import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermosPage() {
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
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-juriscalc-navy">Termos de Uso</h1>
            <p className="text-sm text-gray-500">Última atualização: maio de 2025</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta ou utilizar o IusCalc — plataforma de cálculos trabalhistas operada por seus desenvolvedores —,
              você declara ter lido, compreendido e concordado com estes Termos de Uso na íntegra.
              Caso não concorde com qualquer disposição, não utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">2. Descrição do Serviço</h2>
            <p>
              O IusCalc é uma ferramenta de apoio para o cálculo de verbas rescisórias e demais direitos trabalhistas
              previstos na Consolidação das Leis do Trabalho (CLT) e legislação complementar brasileira.
              Os resultados gerados têm caráter <strong>informativo e auxiliar</strong>, não substituindo a análise
              técnica de advogado ou profissional habilitado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">3. Cadastro e Conta de Usuário</h2>
            <p className="mb-2">Para utilizar as funcionalidades do IusCalc, o usuário deve:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Fornecer dados verdadeiros, completos e atualizados no cadastro;</li>
              <li>Manter a confidencialidade de suas credenciais de acesso (e-mail e senha);</li>
              <li>Notificar imediatamente o suporte em caso de uso não autorizado da conta;</li>
              <li>Ser responsável por todas as ações realizadas em sua conta.</li>
            </ul>
            <p className="mt-2">
              O IusCalc reserva-se o direito de suspender ou encerrar contas que violem estes Termos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">4. Planos e Pagamentos</h2>
            <p className="mb-2">
              O IusCalc oferece um período de trial gratuito. Após esse período, o acesso completo requer a
              contratação do <strong>Plano Premium</strong>, processado pela plataforma Hotmart.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Os valores e condições de pagamento são os exibidos na página de planos no momento da contratação;</li>
              <li>Cancelamentos e reembolsos seguem as políticas da Hotmart;</li>
              <li>O IusCalc não armazena dados de cartão de crédito ou informações bancárias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">5. Uso Permitido</h2>
            <p className="mb-2">O usuário compromete-se a utilizar o IusCalc exclusivamente para fins lícitos, sendo vedado:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Reproduzir, copiar, vender ou revender qualquer parte da plataforma sem autorização;</li>
              <li>Utilizar meios automatizados (bots, scrapers) para acessar ou extrair dados;</li>
              <li>Tentar comprometer a segurança, disponibilidade ou integridade do sistema;</li>
              <li>Compartilhar credenciais de acesso com terceiros;</li>
              <li>Utilizar a plataforma para fins que violem a legislação brasileira.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">6. Limitação de Responsabilidade</h2>
            <p className="mb-2">
              O IusCalc é uma ferramenta de auxílio e <strong>não se responsabiliza</strong> por:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Decisões tomadas com base nos cálculos gerados pela plataforma;</li>
              <li>Erros decorrentes de dados incorretos inseridos pelo usuário;</li>
              <li>Alterações legislativas que possam tornar os cálculos desatualizados;</li>
              <li>Perdas ou danos indiretos relacionados ao uso ou impossibilidade de uso do serviço.</li>
            </ul>
            <p className="mt-2">
              Recomenda-se sempre a conferência dos resultados por profissional habilitado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">7. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do IusCalc — incluindo código-fonte, layout, marca, textos e funcionalidades —
              é protegido pelas leis de propriedade intelectual e pertence exclusivamente aos seus desenvolvedores.
              É proibida qualquer reprodução sem autorização expressa e por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">8. Disponibilidade do Serviço</h2>
            <p>
              O IusCalc empenha-se em manter a plataforma disponível continuamente, mas não garante
              disponibilidade ininterrupta. Manutenções programadas ou imprevistos técnicos poderão causar
              interrupções temporárias, sem que isso gere direito a indenização.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">9. Alterações nos Termos</h2>
            <p>
              Estes Termos podem ser atualizados periodicamente. Alterações relevantes serão comunicadas
              por e-mail ou notificação na plataforma. O uso continuado após a publicação de novas versões
              implica na aceitação das mudanças.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">10. Foro e Lei Aplicável</h2>
            <p>
              Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de domicílio
              do usuário para dirimir quaisquer disputas, sem prejuízo de solução por meios alternativos de resolução de conflitos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-juriscalc-navy mb-3">11. Contato</h2>
            <p>
              Dúvidas sobre estes Termos podem ser enviadas para o suporte disponível dentro da plataforma
              ou pelo e-mail de contato informado na página inicial.
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
