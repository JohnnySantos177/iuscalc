import { DadosContrato, Adicionais } from '@/types/calculadora';
import { toast } from 'sonner';

/**
 * Valida os dados do contrato e adicionais, retornando um array de erros.
 */
export const validarDados = (dadosContrato: DadosContrato, adicionais: Adicionais): string[] => {
  const errors: string[] = [];

  if (!dadosContrato.salarioBase || dadosContrato.salarioBase <= 0) {
    errors.push('Salário base deve ser um número válido e maior que zero');
  }

  if (!dadosContrato.dataAdmissao) {
    errors.push('Data de admissão é obrigatória');
  }

  if (!dadosContrato.dataDemissao) {
    errors.push('Data de demissão é obrigatória');
  }

  if (adicionais.calcularDescontosIndevidos) {
    const valor = parseFloat(adicionais.valorDescontosIndevidos.toString());
    if (isNaN(valor) || valor < 0) {
      errors.push('Valor dos descontos indevidos deve ser um número válido e positivo');
    }
  }

  return errors;
};

/**
 * Valida os dados do contrato e exibe toast de erro se inválido.
 * Retorna true se válido, false se inválido.
 */
export const validarDadosContrato = (dadosContrato: DadosContrato): boolean => {
  if (!dadosContrato.salarioBase || Number(dadosContrato.salarioBase) <= 0) {
    toast.error('Informe o salário base para calcular.');
    return false;
  }
  if (!dadosContrato.dataAdmissao) {
    toast.error('Informe a data de admissão.');
    return false;
  }
  if (!dadosContrato.dataDemissao) {
    toast.error('Informe a data de demissão.');
    return false;
  }
  return true;
};

/** Exibe notificação de cálculo realizado com sucesso. */
export const notificarCalculoRealizado = (): void => {
  toast.success('Cálculo realizado com sucesso!');
};

/** Exibe notificação de erro no cálculo. */
export const notificarErroCalculo = (error: unknown): void => {
  console.error('Erro no cálculo:', error);
  const mensagem = error instanceof Error ? error.message : 'Erro inesperado ao calcular.';
  toast.error(`Erro no cálculo: ${mensagem}`);
};

/** Expande os acordeões de resultados na página. */
export const expandirAcordeoes = (): void => {
  // Dispara evento customizado que os acordeões podem escutar
  window.dispatchEvent(new CustomEvent('iuscalc:expandir-resultados'));
};
