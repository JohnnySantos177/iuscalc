/**
 * Main utilities file for calculating additional labor values
 */

// Import specialized calculation utilities
import { calcularInsalubridade as insalubridadeCalc, calcularPericulosidade as periculosidadeCalc } from './adicionais/adicionalBasicoUtils';
import { calcularMulta467 as multa467Calc, calcularMulta477 as multa477Calc } from './adicionais/multasUtils';
import { 
  calcularAdicionalNoturno as adicionalNoturnoCalc,
  calcularHorasExtras as horasExtrasCalc
} from './adicionais/jornadaUtils';
import { 
  calcularValeTransporte as valeTransporteCalc,
  calcularValeAlimentacao as valeAlimentacaoCalc
} from './adicionais/beneficiosUtils';
import { 
  calcularDescontosIndevidos as descontosIndevidosCalc
} from './adicionais/descontosUtils';
import { calcularSeguroDesemprego, calcularSalarioFamilia } from './adicionais/beneficiosSociaisUtils';
import { calcularInsalubridade as calcularInsalubridadeUtils } from './adicionais/insalubridadeUtils';
import { calcularPericulosidade as calcularPericulosidadeUtils } from './adicionais/periculosidadeUtils';
import { calcularHonorariosAdvocaticios as calcularHonorariosAdvocaticiosUtils } from './adicionais/honorariosAdvocaticiosUtils';
// Import new period-specific calculations
import { 
  calcularInsalubridadeComPeriodo, 
  calcularPericulosidadeComPeriodo 
} from './adicionais/periodoUtils';
import { DadosContrato, Adicionais } from '@/types/calculadora'; // Importar DadosContrato e Adicionais

// Re-export individual calculation functions for direct usage
export const calcularInsalubridade = calcularInsalubridadeUtils;
export const calcularPericulosidade = calcularPericulosidadeUtils;

// Wrappers for multasUtils functions
export const calcularMulta467 = (calcularMulta: boolean, salarioBase: number): number => {
  if (!calcularMulta) return 0;
  return salarioBase;
};

export const calcularMulta477 = (calcularMulta: boolean, salarioBase: number): number => {
  if (!calcularMulta) return 0;
  return salarioBase;
};

// Wrappers for jornadaUtils functions
export const calcularAdicionalNoturno = (
  calcular: boolean,
  salarioBase: number,
  percentual: number,
  horas: number
): number => {
  if (!calcular) return 0;
  
  const valorHoraNormal = salarioBase / 220;
  const valorHoraNoturna = valorHoraNormal * (1 + (percentual / 100));
  
  return valorHoraNoturna * horas;
};

export const calcularHorasExtras = (
  calcular: boolean,
  salarioBase: number,
  quantidade: number,
  percentual: number
): number => {
  if (!calcular) return 0;
  
  const valorHoraNormal = salarioBase / 220;
  const valorHoraExtra = valorHoraNormal * (1 + (percentual / 100));
  
  return valorHoraExtra * quantidade;
};

export const calcularFeriasVencidas = (
  calcular: boolean,
  salarioBase: number,
  periodos: number
): number => {
  if (!calcular) return 0;
  
  return salarioBase * periodos;
};

export const calcularIndenizacaoDemissao = (
  calcular: boolean,
  valor: number
): number => {
  return calcular ? valor : 0;
};

export const calcularAdicionalTransferencia = (
  calcular: boolean,
  salarioBase: number,
  percentual: number
): number => {
  if (!calcular) return 0;
  
  return salarioBase * (percentual / 100);
};

// Wrappers for beneficiosUtils functions
export const calcularValeTransporte = (
  calcular: boolean,
  valorDiario: number,
  dias: number
): number => {
  if (!calcular) return 0;
  
  return valorDiario * dias;
};

export const calcularValeAlimentacao = (
  calcular: boolean,
  valorDiario: number,
  dias: number
): number => {
  if (!calcular) return 0;
  
  return valorDiario * dias;
};

// Wrappers for descontosUtils functions
export const calcularDescontosIndevidos = (
  calcular: boolean,
  valor: number
): number => {
  if (!calcular) return 0;
  
  return valor;
};

export const calcularDiferencasSalariais = (
  calcular: boolean,
  valor: number
): number => {
  if (!calcular) return 0;
  
  return valor;
};

export const calcularCustom = (calcular: boolean, valor: number): number => {
  return calcular ? valor : 0;
};

// Helper functions for beneficiosSociaisUtils
export function calcularSeguroDesempregoHelper(adicionais: Adicionais, salarioBase: number, tipoRescisao: string) {
  if (!adicionais.calcularSeguroDesemprego) return 0;

  // Parse the values properly
  const ultimoSalario = parseFloat(adicionais.ultimoSalario) || salarioBase;
  const salarioMes1 = parseFloat(adicionais.salarioMes1) || ultimoSalario;
  const salarioMes2 = parseFloat(adicionais.salarioMes2) || ultimoSalario;
  const mesesTrabalhados = parseInt(adicionais.mesesTrabalhadosUltimoEmprego) || 12;
  const tipoTrabalhador = adicionais.tipoTrabalhador || 'padrao';
  const salarioUltimos3Meses = adicionais.salarioUltimos3Meses || 'sim';

  // Trabalhador resgatado tem direito especial (Lei 10.608/2002) — não depende do tipo de rescisão
  const isResgatado = tipoTrabalhador === 'resgatado';

  // Para os demais tipos, só é elegível com sem_justa_causa ou rescisao_indireta
  if (!isResgatado && tipoRescisao !== 'sem_justa_causa' && tipoRescisao !== 'rescisao_indireta') {
    return 0;
  }

  // Calculate using the updated function
  const { valorTotal } = calcularSeguroDesemprego(
    true,
    tipoRescisao,
    tipoTrabalhador,
    salarioUltimos3Meses,
    ultimoSalario,
    salarioMes1,
    salarioMes2,
    mesesTrabalhados
  );

  return valorTotal;
}

export const calcularSalarioFamiliaHelper = (
  calcularSalarioFamiliaParam: boolean,
  salarioBase: number,
  quantidadeFilhos: number
): number => {
  // Fix: Use the function directly with correct parameters
  return calcularSalarioFamilia(calcularSalarioFamiliaParam, salarioBase, quantidadeFilhos);
};

// Honorários Advocatícios
export const calcularHonorariosAdvocaticios = (
  calcular: boolean,
  totalGeral: number,
  percentual: number,
  valor: number,
  incluirTotalGeral: boolean
): number => {
  return calcularHonorariosAdvocaticiosUtils(
    calcular,
    totalGeral,
    percentual,
    valor,
    incluirTotalGeral
  );
};

/**
 * Main function to calculate all additionals
 */
export function calcularAdicionais(
  salarioBase: number, 
  adicionais: Adicionais,
  saldoSalario: number = 0,
  avisoPrevia: number = 0,
  decimoTerceiro: number = 0,
  ferias: number = 0,
  tercoConstitucional: number = 0,
  dadosContrato?: DadosContrato
) {
  let adicionalInsalubridade = 0;
  let adicionalPericulosidade = 0;
  let multa467 = 0;
  let multa477 = 0;
  let adicionalNoturno = 0;
  let horasExtras = 0;
  let feriasVencidas = 0;
  let indenizacaoDemissao = 0;
  let valeTransporte = 0;
  let valeAlimentacao = 0;
  let adicionalTransferencia = 0;
  let descontosIndevidos = 0;
  let diferencasSalariais = 0;
  let customCalculo = 0;
  let seguroDesemprego = 0;
  let salarioFamilia = 0;
  let honorariosAdvocaticios = 0;
  
  // Calculate insalubrity with period consideration
  if (adicionais.calcularInsalubridade) {
    adicionalInsalubridade = calcularInsalubridadeComPeriodo(
      salarioBase,
      adicionais.grauInsalubridade,
      adicionais.baseCalculoInsalubridade,
      adicionais.insalubridadePeriodoEspecifico || false,
      dadosContrato?.dataAdmissao || '',
      dadosContrato?.dataDemissao || '',
      adicionais.dataInicioInsalubridade || '',
      adicionais.dataFimInsalubridade || ''
    );
  }
  
  // Calculate perillosity with period consideration
  if (adicionais.calcularPericulosidade) {
    adicionalPericulosidade = calcularPericulosidadeComPeriodo(
      salarioBase,
      parseFloat(adicionais.percentualPericulosidade),
      adicionais.baseCalculoPericulosidade,
      adicionais.periculosidadePeriodoEspecifico || false,
      dadosContrato?.dataAdmissao || '',
      dadosContrato?.dataDemissao || '',
      adicionais.dataInicioPericulosidade || '',
      adicionais.dataFimPericulosidade || ''
    );
  }
  
  // Calculate late payment fine (Multa 467)
  if (adicionais.calcularMulta467) {
    multa467 = multa467Calc(
      adicionais.calcularMulta467, 
      saldoSalario,
      avisoPrevia,
      decimoTerceiro,
      ferias,
      tercoConstitucional
    );
  }
  
  // Calculate fine for not annotating the employment record (Multa 477)
  if (adicionais.calcularMulta477) {
    multa477 = multa477Calc(adicionais.calcularMulta477, salarioBase);
  }
  
  // Calculate night shift allowance
  if (adicionais.calcularAdicionalNoturno) {
    adicionalNoturno = adicionalNoturnoCalc(salarioBase, adicionais);
  }
  
  // Calculate overtime
  if (adicionais.calcularHorasExtras) {
    horasExtras = horasExtrasCalc(salarioBase, adicionais);
  }
  
  // Calculate vacation pay
  if (adicionais.calcularFeriasVencidas) {
    const periodosFeriasVencidas = parseFloat(adicionais.periodosFeriasVencidas) || 0;
    feriasVencidas = calcularFeriasVencidas(
      adicionais.calcularFeriasVencidas,
      salarioBase,
      periodosFeriasVencidas
    );
  }
  
  // Calculate dismissal compensation
  if (adicionais.calcularIndenizacaoDemissao) {
    const valorIndenizacaoDemissao = parseFloat(adicionais.valorIndenizacaoDemissao) || 0;
    indenizacaoDemissao = calcularIndenizacaoDemissao(
      adicionais.calcularIndenizacaoDemissao,
      valorIndenizacaoDemissao
    );
  }
  
  // Calculate transportation voucher
  if (adicionais.calcularValeTransporte) {
    const valorDiarioVT = parseFloat(adicionais.valorDiarioVT) || 0;
    const diasValeTransporte = parseFloat(adicionais.diasValeTransporte) || 0;
    valeTransporte = calcularValeTransporte(
      adicionais.calcularValeTransporte,
      valorDiarioVT,
      diasValeTransporte
    );
  }
  
  // Calculate food voucher
  if (adicionais.calcularValeAlimentacao) {
    const valorDiarioVA = parseFloat(adicionais.valorDiarioVA) || 0;
    const diasValeAlimentacao = parseFloat(adicionais.diasValeAlimentacao) || 0;
    valeAlimentacao = calcularValeAlimentacao(
      adicionais.calcularValeAlimentacao,
      valorDiarioVA,
      diasValeAlimentacao
    );
  }
  
  // Calculate transfer allowance
  if (adicionais.calcularAdicionalTransferencia) {
    const percentualAdicionalTransferencia = parseFloat(adicionais.percentualAdicionalTransferencia) || 0;
    adicionalTransferencia = calcularAdicionalTransferencia(
      adicionais.calcularAdicionalTransferencia,
      salarioBase,
      percentualAdicionalTransferencia
    );
  }
  
  // Calculate undue discounts
  if (adicionais.calcularDescontosIndevidos) {
    const valorDescontosIndevidos = parseFloat(adicionais.valorDescontosIndevidos) || 0;
    descontosIndevidos = calcularDescontosIndevidos(
      adicionais.calcularDescontosIndevidos,
      valorDescontosIndevidos
    );
  }
  
  // Calculate salary differences
  if (adicionais.calcularDiferencasSalariais) {
    const valorDiferencasSalariais = parseFloat(adicionais.valorDiferencasSalariais) || 0;
    diferencasSalariais = calcularDiferencasSalariais(
      adicionais.calcularDiferencasSalariais,
      valorDiferencasSalariais
    );
  }
  
  // Calculate custom calculations from array
  if (adicionais.calculosCustom.ativo && adicionais.calculosCustom.itens.length > 0) {
    customCalculo = adicionais.calculosCustom.itens.reduce((total, item) => {
      return total + (item.valor || 0);
    }, 0);
  }
  
  // Calculate unemployment insurance - use the contract's termination type
  if (adicionais.calcularSeguroDesemprego) {
    const tipoRescisao = dadosContrato?.motivoDemissao || 'sem_justa_causa';
    seguroDesemprego = calcularSeguroDesempregoHelper(adicionais, salarioBase, tipoRescisao);
  }
  
  // Calculate family salary
  if (adicionais.calcularSalarioFamilia) {
    const quantidadeFilhos = parseFloat(adicionais.quantidadeFilhos) || 0;
    salarioFamilia = calcularSalarioFamiliaHelper(
      adicionais.calcularSalarioFamilia,
      salarioBase,
      quantidadeFilhos
    );
  }
  
  // Calculate attorney's fees
  if (adicionais.calcularHonorariosAdvocaticios) {
    const percentualHonorariosAdvocaticios = parseFloat(adicionais.percentualHonorariosAdvocaticios) || 0;
    const valorHonorariosAdvocaticios = parseFloat(adicionais.valorHonorariosAdvocaticios) || 0;
    
    const totalGeralSemHonorarios = saldoSalario + avisoPrevia + decimoTerceiro + ferias + 
      tercoConstitucional + adicionalInsalubridade + adicionalPericulosidade + 
      multa467 + multa477 + adicionalNoturno + horasExtras + feriasVencidas + 
      indenizacaoDemissao + valeTransporte + valeAlimentacao + adicionalTransferencia + 
      descontosIndevidos + diferencasSalariais + customCalculo + seguroDesemprego + 
      salarioFamilia;
      
    honorariosAdvocaticios = calcularHonorariosAdvocaticios(
      adicionais.calcularHonorariosAdvocaticios,
      totalGeralSemHonorarios,
      percentualHonorariosAdvocaticios,
      valorHonorariosAdvocaticios,
      adicionais.incluirTotalGeralHonorarios
    );
  }
  
  return {
    adicionalInsalubridade,
    adicionalPericulosidade,
    multa467,
    multa477,
    adicionalNoturno,
    horasExtras,
    feriasVencidas,
    indenizacaoDemissao,
    valeTransporte,
    valeAlimentacao,
    adicionalTransferencia,
    descontosIndevidos,
    diferencasSalariais,
    customCalculo,
    seguroDesemprego,
    salarioFamilia,
    honorariosAdvocaticios,
  };
}
