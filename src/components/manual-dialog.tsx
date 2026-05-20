import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"

interface ManualDialogProps {
  children: React.ReactNode;
}

export function ManualDialog({ children }: ManualDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-juriscalc-navy">Manual Rápido de Uso - IusCalc</DialogTitle>
          <DialogDescription className="text-base">
            <div className="space-y-6 py-4">
              <p>
                Bem-vindo ao IusCalc! Nosso sistema foi feito para te ajudar a realizar cálculos trabalhistas de forma rápida e precisa. Este manual vai te guiar pelas principais funções.
              </p>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">1. Entrando no Sistema</h3>
                <p><strong>Login:</strong> Use seu e-mail e senha. Se não tiver conta, clique em "Criar Conta".</p>
                <p><strong>Recuperar Senha:</strong> Se esqueceu, use a opção "Esqueci minha senha".</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">2. Tela Inicial (Dashboard)</h3>
                <p>Aqui você encontra um resumo rápido e pode navegar:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Menu:</strong> Acesse Calculadora e Relatórios no topo.</li>
                  <li><strong>Resumo:</strong> Veja os campos principais para começar um cálculo.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">3. Como Calcular Verbas Rescisórias</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Passo 1: Preencha os dados básicos:</p>
                    <ul className="list-disc pl-6">
                      <li>Datas de Admissão e Demissão</li>
                      <li>Salário Base</li>
                      <li>Tipo de Rescisão</li>
                      <li>Aviso Prévio (se aplicável)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium">Passo 2: Adicione outros valores (se precisar):</p>
                    <p>Marque opções como Insalubridade, Férias Vencidas, Multas da CLT, e até mesmo seus próprios Cálculos Personalizados.</p>
                  </div>

                  <div>
                    <p className="font-medium">Passo 3: Clique em Calcular.</p>
                    <p>O resultado total aparecerá na seção "Resultados do Cálculo".</p>
                  </div>

                  <div>
                    <p className="font-medium">Passo 4: O que fazer com o cálculo:</p>
                    <ul className="list-disc pl-6">
                      <li><strong>Salvar:</strong> Guarde o cálculo para usar depois.</li>
                      <li><strong>Compartilhar:</strong> Envie por WhatsApp ou E-mail.</li>
                      <li><strong>Exportar:</strong> Salve como PDF ou Excel.</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-4">
                  <span className="font-semibold">Importante:</span> Você pode <strong>editar e reutilizar</strong> todos os cálculos salvos. Isso agiliza muito seu trabalho!
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">4. Mais Funcionalidades</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Cálculos Salvos:</strong> Acesse seus cálculos anteriores. Clique em "Usar" para carregar um cálculo ou "Verificar" para revisar os detalhes.
                  </li>
                  <li>
                    <strong>Minha Conta:</strong> Altere seus dados e personalize seu perfil.
                  </li>
                </ul>
              </section>

              <p className="mt-6 text-sm text-gray-600">
                Qualquer dúvida, entre em contato com nosso suporte. O e-mail está no canto inferior direito da tela.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
} 