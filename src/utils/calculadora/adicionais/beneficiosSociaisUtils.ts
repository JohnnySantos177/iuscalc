
/**
 * Utilities for calculating social benefits
 */
import { 
  VALOR_MAXIMO_SEGURO_DESEMPREGO, 
  FAIXA_1_SEGURO_DESEMPREGO, 
  FAIXA_2_SEGURO_DESEMPREGO,
  VALOR_SALARIO_MINIMO_2025,
  VALOR_ADICIONAL_FAIXA_2,
  VALOR_SALARIO_FAMILIA,
  LIMITE_SALARIO_FAMILIA
} from '@/utils/calculadoraConstants';

/**
 * Calculates unemployment insurance based on 2025 rules
 */
export const calcularSeguroDesemprego = (
  calcular: boolean,
  tipoRescisao: string, 
  tipoTrabalhador: string = 'padrao',
  salarioUltimos3Meses: string = 'sim',
  ultimoSalario: number,
  salarioMes1: number = 0,
  salarioMes2: number = 0,
  mesesTrabalhadosUltimoEmprego: number
): { valorParcela: number, numeroParcelas: number, valorTotal: number } => {
  if (!calcular) return { valorParcela: 0, numeroParcelas: 0, valorTotal: 0 };
  
  // Trabalhador resgatado de trabalho análogo à escravidão (Lei 10.608/2002):
  // direito a 3 parcelas de 1 salário mínimo, independentemente do tipo de rescisão.
  if (tipoTrabalhador === 'resgatado') {
    return {
      valorParcela: VALOR_SALARIO_MINIMO_2025,
      numeroParcelas: 3,
      valorTotal: VALOR_SALARIO_MINIMO_2025 * 3,
    };
  }

  // Verifica se é elegível com base no tipo de rescisão
  const elegivel = tipoRescisao === 'sem_justa_causa' || tipoRescisao === 'rescisao_indireta';

  if (!elegivel) return { valorParcela: 0, numeroParcelas: 0, valorTotal: 0 };

  // Determinar número de parcelas com base no tempo de trabalho
  let numeroParcelas = 0;

  if (mesesTrabalhadosUltimoEmprego >= 6 && mesesTrabalhadosUltimoEmprego < 12) {
    numeroParcelas = 3;
  } else if (mesesTrabalhadosUltimoEmprego >= 12 && mesesTrabalhadosUltimoEmprego < 24) {
    numeroParcelas = 4;
  } else if (mesesTrabalhadosUltimoEmprego >= 24) {
    numeroParcelas = 5;
  }

  let valorParcela = 0;

  // Para empregados domésticos e pescadores artesanais
  if (tipoTrabalhador === 'domestico' || tipoTrabalhador === 'pescador') {
    valorParcela = VALOR_SALARIO_MINIMO_2025;
  } else {
    // Cálculo da média salarial dos últimos 3 meses (art. 5º Lei 7.998/90)
    let mediaSalarial = 0;

    if (salarioUltimos3Meses === 'sim') {
      mediaSalarial = ultimoSalario;
    } else {
      // Média real dos 3 meses informados
      mediaSalarial = (salarioMes1 + salarioMes2 + ultimoSalario) / 3;
    }
    
    // Cálculo do valor da parcela baseado nas faixas de 2025
    if (mediaSalarial <= FAIXA_1_SEGURO_DESEMPREGO) {
      // Primeira faixa: até R$ 2.138,76 - multiplica por 0,8
      valorParcela = mediaSalarial * 0.8;
    } else if (mediaSalarial <= FAIXA_2_SEGURO_DESEMPREGO) {
      // Segunda faixa: entre R$ 2.138,77 e R$ 3.564,96
      valorParcela = ((mediaSalarial - FAIXA_1_SEGURO_DESEMPREGO) * 0.5) + VALOR_ADICIONAL_FAIXA_2;
    } else {
      // Terceira faixa: acima de R$ 3.564,96 - valor fixo
      valorParcela = VALOR_MAXIMO_SEGURO_DESEMPREGO;
    }
    
    // Garantir valor mínimo
    if (valorParcela < VALOR_SALARIO_MINIMO_2025) {
      valorParcela = VALOR_SALARIO_MINIMO_2025;
    }
  }
  
  // Valor total do seguro-desemprego
  const valorTotal = valorParcela * numeroParcelas;
  
  return { valorParcela, numeroParcelas, valorTotal };
};

/**
 * Calculates family salary benefit
 */
export const calcularSalarioFamilia = (
  calcular: boolean,
  salarioBase: number,
  quantidadeFilhos: number
): number => {
  if (!calcular || salarioBase > LIMITE_SALARIO_FAMILIA || quantidadeFilhos <= 0) {
    return 0;
  }
  
  // Cálculo do valor do salário-família
  return VALOR_SALARIO_FAMILIA * quantidadeFilhos;
};
