
import * as XLSX from 'xlsx';
import { toast } from "sonner";
import { Resultados } from "@/types/calculadora";

interface ExcelExportData {
  verbasRescisorias?: Resultados['detalhamento']['verbas'];
  adicionais?: Resultados['detalhamento']['adicionais'] & Resultados['detalhamento']['multas'] & {
    feriasVencidas?: number;
    indenizacaoDemissaoIndevida?: number;
    valeTransporteNaoPago?: number;
    valeAlimentacaoNaoPago?: number;
    adicionalTransferencia?: number;
    descontosIndevidos?: number;
    diferencasSalariais?: number;
    calculosPersonalizados?: number;
    seguroDesemprego?: number;
    salarioFamilia?: number;
  };
  totalGeral?: number;
  timestamp?: string;
  nomeEscritorio?: string;
  customCalculo?: number;
}

export const exportToExcel = (data: ExcelExportData, fileName?: string) => {
  if (!data) {
    toast.error('Não há dados para exportar!');
    return;
  }

  try {
    // Prepare verbas rescisórias data
    const verbas = data.verbasRescisorias || {};
    const verbasRows = Object.entries(verbas)
      .filter(([key, value]) => 
        typeof value === 'number' && 
        value > 0 && 
        key !== 'total'
      )
      .map(([key, value]) => {
        const descricao = 
          key === 'salarioProporcional' ? 'Saldo de Salário' :
          key === 'avisoPrevio' ? 'Aviso Prévio' :
          key === 'decimoTerceiro' ? '13º Salário Proporcional' :
          key === 'feriasProporcionais' ? 'Férias Proporcionais' :
          key === 'tercoConstitucional' ? '1/3 Constitucional' :
          key === 'fgts' ? 'FGTS sobre verbas' :
          key === 'multaFgts' ? 'Multa FGTS (40%)' : key;
        
        return { 
          "Tipo": "Verbas Rescisórias", 
          "Descrição": descricao, 
          "Valor": value 
        };
      });
    
    // Prepare adicionais data
    const adicionais = data.adicionais || {};
    const adicionaisRows = Object.entries(adicionais)
      .filter(([key, value]) => 
        typeof value === 'number' && 
        value > 0 
      )
      .map(([key, value]) => {
        const descricao = 
          key === 'insalubridade' ? 'Adicional de Insalubridade' :
          key === 'periculosidade' ? 'Adicional de Periculosidade' :
          key === 'art467' ? 'Multa Art. 467 da CLT' :
          key === 'art477' ? 'Multa Art. 477 da CLT' :
          key === 'noturno' ? 'Adicional Noturno' :
          key === 'horasExtras' ? 'Horas Extras' :
          key === 'feriasVencidas' ? 'Férias Vencidas' :
          key === 'indenizacaoDemissaoIndevida' ? 'Indenização por Demissão' :
          key === 'valeTransporteNaoPago' ? 'Vale Transporte Não Pago' :
          key === 'valeAlimentacaoNaoPago' ? 'Vale Alimentação Não Pago' :
          key === 'adicionalTransferencia' ? 'Adicional de Transferência' :
          key === 'descontosIndevidos' ? 'Descontos Indevidos' :
          key === 'diferencasSalariais' ? 'Diferenças Salariais' :
          key === 'calculosPersonalizados' ? 'Cálculo Personalizado' :
          key === 'seguroDesemprego' ? 'Seguro Desemprego' :
          key === 'salarioFamilia' ? 'Salário Família' : key;
        
        return { 
          "Tipo": "Adicionais e Multas", 
          "Descrição": descricao, 
          "Valor": value 
        };
      });
    
    // Combine all data
    const exportData = [
      ...verbasRows,
      ...adicionaisRows,
    ];
    
    // Add the total value at the end
    if (data.totalGeral) {
      exportData.push({ 
        "Tipo": "Total", 
        "Descrição": "VALOR TOTAL DA RECLAMAÇÃO", 
        "Valor": data.totalGeral 
      });
    } else {
      // Calculate total from verbas and adicionais if totalGeral is not provided
      const totalVerbas = Object.entries(verbas).reduce((sum: number, [key, val]) => {
        const numVal = typeof val === 'number' ? val : 0;
        return sum + numVal;
      }, 0);
      const totalAdicionais = Object.entries(adicionais).reduce((sum: number, [key, val]) => {
        const numVal = typeof val === 'number' ? val : 0;
        return sum + numVal;
      }, 0);
      const calculatedTotal = totalVerbas + totalAdicionais;
      
      exportData.push({ 
        "Tipo": "Total", 
        "Descrição": "VALOR TOTAL DA RECLAMAÇÃO", 
        "Valor": calculatedTotal 
      });
    }

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cálculos");

    // Column widths
    const colWidths = [
      { wch: 20 }, // Tipo
      { wch: 30 }, // Descrição
      { wch: 15 }, // Valor
    ];
    ws['!cols'] = colWidths;

    // Generate file name with current date
    const date = new Date();
    const defaultFileName = `calculo_trabalhista_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.xlsx`;
    
    // Add header information with logo
    const nomeEscritorio = data.nomeEscritorio || localStorage.getItem('nomeEscritorio') || localStorage.getItem('userName') || 'IusCalc';
    
    // Insert a header row with information
    XLSX.utils.sheet_add_aoa(ws, [
      ['DEMONSTRATIVO DE CÁLCULOS TRABALHISTAS'],
      [`Cálculos: ${nomeEscritorio}`],
      [`Data: ${date.toLocaleDateString('pt-BR')}`],
      [''] // Empty row before the data
    ], { origin: 'A1' });
    
    // Make header cells merge and style for better appearance
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(
      { s: {r: 0, c: 0}, e: {r: 0, c: 2} }, // Merge first row across all columns
      { s: {r: 1, c: 0}, e: {r: 1, c: 2} }, // Merge second row
      { s: {r: 2, c: 0}, e: {r: 2, c: 2} }  // Merge third row
    );
    
    // Add only "IusCalc" at the bottom of the Excel file (without website URL)
    XLSX.utils.sheet_add_aoa(ws, [
      ['IusCalc']
    ], { origin: { r: exportData.length + 5, c: 0 } });
    
    // Merge the IusCalc row
    ws['!merges'].push({ s: {r: exportData.length + 5, c: 0}, e: {r: exportData.length + 5, c: 2} });
    
    // Export to file
    XLSX.writeFile(wb, fileName || defaultFileName);
    toast.success('Demonstrativo de cálculos exportado em Excel com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao exportar para Excel:', error);
    toast.error('Erro ao exportar para Excel. Tente novamente.');
    return false;
  }
};
