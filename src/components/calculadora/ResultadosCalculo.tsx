import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resultados, DadosContrato } from '@/types/calculadora';
import { exportToPDF } from '@/utils/export/pdfExport';
import { shareViaWhatsApp, shareViaEmail, generateCalculationText } from '@/utils/export/shareUtils';
import { formatCurrency } from '@/utils/format';
import { ResultsActions } from './results/ResultsActions';
import { CalculationSection } from './results/CalculationSection';
import { TotalDisplay } from './results/TotalDisplay';
import { HorasExtrasSection } from './results/HorasExtrasSection';
import { Badge } from '@/components/ui/badge';
import { prepararMetadados } from '@/utils/calculosUtils';
import { 
  Receipt, 
  Clock, 
  AlertTriangle, 
  Gift, 
  DollarSign, 
  FileText,
  Calculator
} from 'lucide-react';

interface ResultadosCalculoProps {
  resultados: Resultados;
  horasExtras: {
    ativo: boolean;
    calculos: Array<{
      id: string;
      percentual: number;
      quantidade: number;
    }>;
  };
  dadosContrato?: DadosContrato;
  onSalvar?: () => void;
}

export function ResultadosCalculo({ resultados, horasExtras, dadosContrato, onSalvar }: ResultadosCalculoProps) {
  const { total, detalhamento } = resultados;

  // Verbas rescisórias principais com valores detalhados
  const verbasRescisoriasItems = [
    { 
      label: 'Saldo de Salário', 
      value: detalhamento.verbas?.salarioProporcional || 0, 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Valor proporcional aos dias trabalhados no último mês'
    },
    { 
      label: '13º Salário Proporcional', 
      value: detalhamento.verbas?.decimoTerceiro || 0, 
      icon: <Gift className="w-4 h-4" />,
      description: 'Proporcional aos meses trabalhados'
    },
    { 
      label: 'Férias Proporcionais', 
      value: detalhamento.verbas?.feriasProporcionais || 0, 
      icon: <Clock className="w-4 h-4" />,
      description: 'Valor das férias proporcionais ao período trabalhado'
    },
    { 
      label: '1/3 Constitucional sobre Férias', 
      value: detalhamento.verbas?.tercoConstitucional || 0, 
      icon: <Clock className="w-4 h-4" />,
      description: 'Adicional de 1/3 sobre o valor das férias'
    },
    { 
      label: 'Aviso Prévio Indenizado', 
      value: detalhamento.verbas?.avisoPrevio || 0, 
      icon: <FileText className="w-4 h-4" />,
      description: 'Valor do aviso prévio não cumprido'
    },
  ].filter(item => item.value > 0);

  // Valores do aviso prévio indenizado (separados)
  const avisoPrevioItems = [
    { 
      label: '13º Proporcional do Aviso Prévio', 
      value: detalhamento.verbas?.decimoTerceiroAvisoPrevio || 0, 
      icon: <Gift className="w-4 h-4" />,
      description: 'Décimo terceiro proporcional ao período do aviso prévio'
    },
    { 
      label: 'Férias do Aviso Prévio + 1/3', 
      value: detalhamento.verbas?.feriasAvisoPrevio || 0, 
      icon: <Clock className="w-4 h-4" />,
      description: 'Férias proporcionais ao aviso prévio com adicional de 1/3'
    },
  ].filter(item => item.value > 0);

  // FGTS e multa
  const fgtsItems = [
    { 
      label: 'FGTS sobre Verbas', 
      value: detalhamento.verbas?.fgts || 0, 
      icon: <Calculator className="w-4 h-4" />,
      description: '8% sobre as verbas rescisórias e aviso prévio'
    },
    { 
      label: 'Multa do FGTS', 
      value: detalhamento.verbas?.multaFgts || 0, 
      icon: <AlertTriangle className="w-4 h-4" />,
      description: 'Multa sobre o FGTS conforme tipo de rescisão (40% sem justa causa, 20% acordo mútuo)'
    }
  ].filter(item => item.value > 0);

  const adicionaisItems = [
    { label: 'Insalubridade', value: detalhamento.adicionais?.insalubridade || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Periculosidade', value: detalhamento.adicionais?.periculosidade || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Adicional Noturno', value: detalhamento.adicionais?.noturno || 0, icon: <Clock className="w-4 h-4" /> }
  ].filter(item => item.value > 0);

  const verbasBeneficiosItems = [
    { 
      label: 'Férias Vencidas + 1/3', 
      value: detalhamento.verbas?.feriasVencidas || 0, 
      icon: <Clock className="w-4 h-4" />,
      description: 'Férias não gozadas com adicional constitucional'
    },
    { 
      label: 'Indenização por Demissão Indevida', 
      value: detalhamento.verbas?.indenizacaoDemissaoIndevida || 0, 
      icon: <AlertTriangle className="w-4 h-4" />,
      description: 'Indenização para contratos por tempo determinado'
    },
    { 
      label: 'Vale Transporte Não Pago', 
      value: detalhamento.verbas?.valeTransporteNaoPago || 0, 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Valores de vale transporte não fornecidos'
    },
    { 
      label: 'Vale Alimentação Não Pago', 
      value: detalhamento.verbas?.valeAlimentacaoNaoPago || 0, 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Valores de vale alimentação não fornecidos'
    },
    { 
      label: 'Adicional de Transferência', 
      value: detalhamento.verbas?.adicionalTransferencia || 0, 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Adicional devido por transferência de localidade'
    },
    { 
      label: 'Descontos Indevidos', 
      value: detalhamento.verbas?.descontosIndevidos || 0, 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Valores descontados indevidamente'
    },
    { 
      label: 'Diferenças Salariais', 
      value: detalhamento.verbas?.diferencasSalariais || 0, 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Diferenças de salário não pagas'
    }
  ].filter(item => item.value > 0);

  const multasItems = [
    { label: 'Multa Art. 467 CLT', value: detalhamento.multas?.art467 || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Multa Art. 477 CLT', value: detalhamento.multas?.art477 || 0, icon: <AlertTriangle className="w-4 h-4" /> }
  ].filter(item => item.value > 0);

  const outrosItems = [
    { label: 'Salário-Família', value: detalhamento.salarioFamilia || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Seguro-Desemprego', value: detalhamento.seguroDesemprego || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Cálculos Personalizados', value: detalhamento.calculosPersonalizados || 0, icon: <Calculator className="w-4 h-4" /> }
  ].filter(item => item.value > 0);

const handleExportar = () => {
    try {
      const { dataCalculo, nomeEscritorio } = prepararMetadados();

      const dadosParaExportar = {
        resultados: resultados,
        dadosContrato: dadosContrato || {} as DadosContrato,
        horasExtras: horasExtras,
        metadata: {
          dataAtual: dataCalculo,
          nomeEscritorio: nomeEscritorio
        }
      };
      
      localStorage.setItem('iuscalc_print_data', JSON.stringify(dadosParaExportar));

      // Executa o seu motor original do PDF que já funciona perfeitamente
      exportToPDF(dadosParaExportar);

      // 🛡️ SEGUIDOR DE FOCO: Assim que a janela voltar a ter atenção do usuário,
      // força o histórico do navegador a se reafirmar na rota da calculadora.
      const garantirRotaPosImpressao = () => {
        if (window.location.pathname !== '/calculadora') {
          window.history.replaceState(null, '', '/calculadora');
        }
        window.removeEventListener('focus', garantirRotaPosImpressao);
      };
      window.addEventListener('focus', garantirRotaPosImpressao);

    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  const handleCompartilhar = () => {
    try {
      const { dataCalculo, nomeEscritorio } = prepararMetadados();

      // 🛡️ SEGUIDOR DE FOCO: Aplica a mesma proteção para o menu de compartilhamento
      const garantirRotaPosCompartilhar = () => {
        if (window.location.pathname !== '/calculadora') {
          window.history.replaceState(null, '', '/calculadora');
        }
        window.removeEventListener('focus', garantirRotaPosCompartilhar);
      };
      window.addEventListener('focus', garantirRotaPosCompartilhar);

      if (navigator.share) {
        navigator.share({
          title: 'Cálculo Trabalhista - IusCalc',
          text: `Relatório gerado em ${dataCalculo} por ${nomeEscritorio}`,
          url: window.location.href,
        }).catch(err => console.error('Erro ao compartilhar:', err));
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const renderItemWithDescription = (item: any, index: number, bgColor: string) => (
    <div key={index} className={`${bgColor} p-4 rounded-lg shadow-sm border-l-4 border-blue-500`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {item.icon}
          <span className="font-semibold text-gray-800">{item.label}</span>
        </div>
        <Badge className="bg-blue-600 text-white text-base px-3 py-1">
          {formatCurrency(item.value)}
        </Badge>
      </div>
      {item.description && (
        <p className="text-sm text-gray-600 ml-6">{item.description}</p>
      )}
    </div>
  );

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-blue-600" />
            Resultados do Cálculo
          </div>
          <ResultsActions
            onSalvar={onSalvar}
            onExportar={handleExportar}
            onCompartilhar={handleCompartilhar}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white shadow-lg">
            <div className="text-sm uppercase tracking-wide mb-2 opacity-90">Valor Total da Reclamação</div>
            <div className="text-4xl font-bold">{formatCurrency(total)}</div>
          </div>

          <div className="grid gap-6">
            {verbasRescisoriasItems.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-blue-800">
                  <Receipt className="w-5 h-5" />
                  1. Verbas Rescisórias
                </h3>
                <div className="space-y-3">
                  {verbasRescisoriasItems.map((item, index) => 
                    renderItemWithDescription(item, index, "bg-white")
                  )}
                </div>
              </div>
            )}

            {avisoPrevioItems.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-purple-800">
                  <FileText className="w-5 h-5" />
                  2. Valores do Aviso Prévio Indenizado
                </h3>
                <div className="space-y-3">
                  {avisoPrevioItems.map((item, index) => 
                    renderItemWithDescription(item, index, "bg-white")
                  )}
                </div>
              </div>
            )}

            {fgtsItems.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-green-800">
                  <Calculator className="w-5 h-5" />
                  3. FGTS e Multa
                </h3>
                <div className="space-y-3">
                  {fgtsItems.map((item, index) => 
                    renderItemWithDescription(item, index, "bg-white")
                  )}
                </div>
              </div>
            )}

            {adicionaisItems.length > 0 && (
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-indigo-800">
                  <Clock className="w-5 h-5" />
                  Adicionais
                </h3>
                <div className="space-y-3">
                  {adicionaisItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium text-gray-700">{item.label}</span>
                      </div>
                      <Badge className="bg-indigo-600 text-white">
                        {formatCurrency(item.value)}
                      </Badge>
                    </div>
                  ))}
                  <HorasExtrasSection
                    horasExtras={horasExtras}
                    totalValue={detalhamento.adicionais.horasExtras}
                  />
                </div>
              </div>
            )}

            {verbasBeneficiosItems.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-green-800">
                  <Gift className="w-5 h-5" />
                  Verbas e Benefícios
                </h3>
                <div className="space-y-3">
                  {verbasBeneficiosItems.map((item, index) => 
                    renderItemWithDescription(item, index, "bg-white")
                  )}
                </div>
              </div>
            )}

            {multasItems.length > 0 && (
              <CalculationSection
                title="Multas"
                items={multasItems}
                icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                className="bg-red-50"
              />
            )}

            {outrosItems.length > 0 && (
              <CalculationSection
                title="Outros Valores"
                items={outrosItems}
                icon={<Calculator className="w-5 h-5 text-purple-600" />}
                className="bg-purple-50"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}