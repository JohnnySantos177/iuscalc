import { toast } from "sonner";
import { Resultados, DadosContrato } from '@/types/calculadora';

interface ExportData {
  resultados: Resultados;
  dadosContrato: DadosContrato;
  horasExtras: {
    ativo: boolean;
    calculos: Array<{
      id: string;
      percentual: number;
      quantidade: number;
    }>;
  };
  metadata?: {
    dataAtual: string;
    nomeEscritorio: string;
  };
}

// Helper functions for display names
const getVerbaDisplayName = (key: string) => {
  const nomes: { [key: string]: string } = {
    'salarioProporcional': 'Saldo de Salário',
    'decimoTerceiro': '13º Salário Proporcional',
    'feriasProporcionais': 'Férias Proporcionais',
    'avisoPrevio': 'Aviso Prévio',
    'fgts': 'FGTS sobre Verbas',
    'multaFgts': 'Multa do FGTS (40%)',
    'feriasVencidas': 'Férias Vencidas + 1/3',
    'indenizacaoDemissaoIndevida': 'Indenização por Demissão Indevida',
    'valeTransporteNaoPago': 'Vale Transporte Não Pago',
    'valeAlimentacaoNaoPago': 'Vale Alimentação Não Pago',
    'adicionalTransferencia': 'Adicional de Transferência',
    'descontosIndevidos': 'Descontos Indevidos',
    'diferencasSalariais': 'Diferenças Salariais',
    'tercoConstitucional': '1/3 Constitucional sobre Férias',
    'decimoTerceiroAvisoPrevio': '13º Proporcional do Aviso Prévio',
    'feriasAvisoPrevio': 'Férias do Aviso Prévio + 1/3',
    'total': ''
  };
  return nomes[key] || key;
};

const getAdicionalDisplayName = (key: string) => {
  const nomes: { [key: string]: string } = {
    'insalubridade': 'Adicional de Insalubridade',
    'periculosidade': 'Adicional de Periculosidade',
    'noturno': 'Adicional Noturno',
    'horasExtras': 'Horas Extras'
  };
  return nomes[key] || key;
};

const getMultaDisplayName = (key: string) => {
  const nomes: { [key: string]: string } = {
    'art467': 'Multa Art. 467 CLT',
    'art477': 'Multa Art. 477 CLT'
  };
  return nomes[key] || key;
};

// Modificado para usar Iframe Invisível e evitar perda de foco (Fim do Reset para a Home)
export const exportToPDF = (data: ExportData) => {
  const { resultados, dadosContrato, horasExtras, metadata } = data;

  // Format values as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const dataAtual = metadata?.dataAtual || new Date().toLocaleDateString('pt-BR');
  const nomeEscritorio = metadata?.nomeEscritorio || localStorage.getItem('nomeEscritorio') || localStorage.getItem('userName') || 'IusCalc';

  const htmlContent = `
    <html>
    <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
      }
      .logo {
        max-height: 60px;
        max-width: 200px;
        margin-bottom: 10px;
      }
      h1, h2 {
        font-size: 18px;
        text-align: center;
        margin-bottom: 20px;
        color: #1D2D5A;
      }
      h3 {
        font-size: 16px;
        color: #1D2D5A;
        margin: 15px 0 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
      }
      .section {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .result-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 8px;
        background-color: #f8f9fa;
        border-radius: 4px;
      }
      .result-label {
        font-weight: 500;
        color: #444;
      }
      .result-value {
        font-weight: 600;
        color: #1D2D5A;
      }
      .valor-total {
        background-color: #1D2D5A;
        padding: 15px 20px;
        border-radius: 10px;
        text-align: center;
        margin-top: 20px;
        color: #FFFFFF;
      }
      .titulo {
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: #FFFFFF;
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      .valor {
        display: block;
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
      }
      .text-sm {
        font-size: 12px;
      }
      .text-gray-500 {
        color: #6b7280;
      }
      @media print {
        body {
          padding: 0;
        }
        .section {
          box-shadow: none;
          border: 1px solid #eee;
        }
        .valor-total {
          background-color: #1D2D5A !important;
          color: #FFFFFF !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .titulo, .valor {
          color: #FFFFFF !important;
        }
        .result-item {
          background-color: #f8f9fa !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    </style>
    </head>
    <body>
      <div class="header">
        <h1>DEMONSTRATIVO DE CÁLCULOS TRABALHISTAS</h1>
        <p>Cálculos: ${nomeEscritorio}</p>
        <p>Data: ${dataAtual}</p>
      </div>

      <div class="section">
        <h3>Dados do Contrato</h3>
        ${dadosContrato ? `
          <div class="result-item">
            <span class="result-label">Salário Base:</span>
            <span class="result-value">${formatCurrency(dadosContrato.salarioBase)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Data de Admissão:</span>
            <span class="result-value">${new Date(dadosContrato.dataAdmissao).toLocaleDateString('pt-BR')}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Data de Demissão:</span>
            <span class="result-value">${new Date(dadosContrato.dataDemissao).toLocaleDateString('pt-BR')}</span>
          </div>
          <div class="result-item">
          <span class="result-label">Tipo de Rescisão:</span>
          <span class="result-value">${
            dadosContrato.motivoDemissao === 'sem_justa_causa' ? 'Dispensa sem Justa Causa' :
            dadosContrato.motivoDemissao === 'justa_causa' ? 'Dispensa por Justa Causa' :
            dadosContrato.motivoDemissao === 'pedido_demissao' ? 'Pedido de Demissão' :
            dadosContrato.motivoDemissao === 'acordo_mutuo' ? 'Acordo Mútuo' : 'Não informado'
          }</span>
          </div>
        ` : `<p class="text-gray-500">Dados do contrato não disponíveis.</p>`}
      </div>

      <div class="section">
        <h3>Verbas Rescisórias</h3>
        ${Object.entries(resultados.detalhamento.verbas || {})
          .filter(([key, value]) => (value as number) > 0 && key !== 'total')
          .map(([key, value]) => `
            <div class="result-item">
              <span class="result-label">${getVerbaDisplayName(key)}:</span>
              <span class="result-value">${formatCurrency(value as number)}</span>
            </div>
          `).join('')}
        ${horasExtras.ativo && (resultados.detalhamento.adicionais?.horasExtras || 0) > 0 ? `
          <div class="result-item">
            <span class="result-label">Horas Extras:</span>
            <span class="result-value">${formatCurrency(resultados.detalhamento.adicionais.horasExtras)}</span>
          </div>
        ` : ''}
      </div>
      
      <div class="section">
        <h3>Adicionais</h3>
        ${Object.entries(resultados.detalhamento.adicionais || {})
          .filter(([key, value]) => (value as number) > 0 && key !== 'horasExtras')
          .map(([key, value]) => `
            <div class="result-item">
              <span class="result-label">${getAdicionalDisplayName(key)}:</span>
              <span class="result-value">${formatCurrency(value as number)}</span>
            </div>
          `).join('')}
      </div>
      
      <div class="section">
        <h3>Multas</h3>
        ${Object.entries(resultados.detalhamento.multas || {})
          .filter(([key, value]) => (value as number) > 0 && key !== 'total')
          .map(([key, value]) => `
            <div class="result-item">
              <span class="result-label">${getMultaDisplayName(key)}:</span>
              <span class="result-value">${formatCurrency(value as number)}</span>
            </div>
          `).join('')}
      </div>
      
      <div class="section">
        <h3>Outros Valores</h3>
        ${(resultados.detalhamento.salarioFamilia || 0) > 0 ? `
          <div class="result-item">
            <span class="result-label">Salário-Família:</span>
            <span class="result-value">${formatCurrency(resultados.detalhamento.salarioFamilia)}</span>
          </div>
        ` : ''}
        ${(resultados.detalhamento.seguroDesemprego || 0) > 0 ? `
          <div class="result-item">
            <span class="result-label">Seguro-Desemprego:</span>
            <span class="result-value">${formatCurrency(resultados.detalhamento.seguroDesemprego)}</span>
          </div>
        ` : ''}
        ${(resultados.detalhamento.calculosPersonalizados || 0) > 0 ? `
          <div class="result-item">
            <span class="result-label">Cálculos Personalizados:</span>
            <span class="result-value">${formatCurrency(resultados.detalhamento.calculosPersonalizados)}</span>
          </div>
        ` : ''}
      </div>
      
      <div class="valor-total">
        <span class="titulo">Valor Total da Reclamação</span>
        <span class="valor">${formatCurrency(resultados.total)}</span>
      </div>
    </body>
    </html>
  `;

  // 🛡️ A MÁGICA DO IFRAME INVISÍVEL
  const iframeId = 'print-iframe-iuscalc';
  
  // Limpa qualquer iframe antigo que tenha ficado preso
  const iframeAntigo = document.getElementById(iframeId);
  if (iframeAntigo) {
    document.body.removeChild(iframeAntigo);
  }

  // Cria um iframe totalmente invisível
  const iframe = document.createElement('iframe');
  iframe.id = iframeId;
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;

  if (iframeDoc) {
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    // Aguarda o HTML renderizar dentro do iframe e chama a impressão
    setTimeout(() => {
      if (iframe.contentWindow) {
        iframe.contentWindow.focus(); // Foca apenas o iframe
        iframe.contentWindow.print();
        toast.success('Demonstrativo de cálculos enviado para impressão como PDF!');

        // Remove o iframe da memória após um tempo seguro para não pesar o navegador
        setTimeout(() => {
          const frameParaRemover = document.getElementById(iframeId);
          if (frameParaRemover) {
            document.body.removeChild(frameParaRemover);
          }
        }, 5000);
      }
    }, 500);
  } else {
    toast.error('Erro ao gerar o documento para impressão.');
  }
};