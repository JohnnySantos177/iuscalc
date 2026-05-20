import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
                Bem-vindo ao IusCalc! O IusCalc é uma ferramenta intuitiva e eficiente projetada para ajudar advogados e escritórios de advocacia a realizar cálculos de verbas trabalhistas com rapidez e precisão. Este manual foi criado para guiá-lo nas funcionalidades essenciais da plataforma.
              </p>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">1. Acesso ao Sistema</h3>
                <p><strong>Login:</strong> Acesse a plataforma utilizando seu e-mail e senha cadastrados. Caso seja a primeira vez, clique em "Criar Conta" para se registrar.</p>
                <p><strong>Tela Inicial de Login:</strong> Insira suas credenciais e clique em "Entrar". Se tiver problemas para acessar, utilize a opção "Esqueci minha senha" para recuperação.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">2. Dashboard - Página Inicial</h3>
                <p>Após o login, você será direcionado para a página principal do sistema. Aqui, você pode:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Menu de Navegação:</strong> No topo, utilize os menus Calculadora e Relatórios para acessar as principais funcionalidades.</li>
                  <li><strong>Resumo do Cálculo de Verbas Rescisórias:</strong> A tela de cálculo mostra os campos principais, como Data de Admissão, Data de Demissão, Salário Base, Tipo de Rescisão, e outros detalhes essenciais para o cálculo.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">3. Calculadora de Verbas Rescisórias</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Passo 1: Complete os campos obrigatórios:</p>
                    <ul className="list-disc pl-6">
                      <li>Data de Admissão e Data de Demissão</li>
                      <li>Salário Base</li>
                      <li>Tipo de Rescisão</li>
                      <li>Aviso Prévio Cumprido (Ative a opção, se aplicável)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium">Passo 2: Se necessário, ajuste as Adicionais e Multas aplicáveis:</p>
                    <p>Marque as opções relevantes como Adicional de Insalubridade, Férias Vencidas (+1/3), Multa do Art. 467 da CLT, entre outros.</p>
                  </div>

                  <div>
                    <p className="font-medium">Passo 3: Clique em Calcular.</p>
                    <p>O sistema irá gerar automaticamente o total das verbas rescisórias.</p>
                  </div>

                  <div>
                    <p className="font-medium">Passo 4: Revise os resultados</p>
                    <p>Revise os resultados que aparecem na seção Resultados do Cálculo. O valor total será mostrado de forma clara.</p>
                  </div>
                </div>

                <p className="mt-4">
                  Você também pode Salvar o Cálculo, Exportar para diferentes formatos (WhatsApp, E-mail, PDF ou Excel) e reutilizar cálculos salvos a qualquer momento.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">5. Outras Funcionalidades</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Cálculos Salvos:</strong> Na tela de Cálculos Salvos, você pode revisar e acessar os cálculos realizados anteriormente. Basta clicar em Usar ou Verificar para editar ou confirmar.
                  </li>
                  <li>
                    <strong>Minha Conta:</strong> Acesse Minha Conta e personalize suas preferências, como nome e imagem (foto ou logotipo).
                  </li>
                </ul>
              </section>

              <p className="mt-6 text-sm text-gray-600">
                Se precisar de ajuda adicional, entre em contato com o suporte através do e-mail de contato localizado no canto inferior direito da tela.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}