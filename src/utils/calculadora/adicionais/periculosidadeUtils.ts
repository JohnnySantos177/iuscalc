
/**
 * Utilities for calculating dangerousness additional
 */
import { VALOR_SALARIO_MINIMO_2025 } from '@/utils/calculadoraConstants';

/**
 * Calculates dangerousness additional
 * Art. 193 CLT: adicional de periculosidade = 30% sobre o salário base ou salário mínimo.
 */
export const calcularPericulosidade = (
  salarioBase: number,
  percentualPericulosidade: number,
  baseCalculoPericulosidade: string
): number => {
  // Base pode ser o salário base do empregado ou o salário mínimo nacional
  const baseCalculo = baseCalculoPericulosidade === 'salario_base' ? salarioBase : VALOR_SALARIO_MINIMO_2025;

  return baseCalculo * (percentualPericulosidade / 100);
};
