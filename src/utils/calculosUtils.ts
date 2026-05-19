// Utility functions for handling calculation data

import { Resultados } from '@/types/calculadora'; // Importar Resultados

/**
 * Prepara os metadados para exibição (nome, data, escritório)
 * @param options Objeto opcional com timestamp, nome e nomeEscritorio para sobrescrever padrões.
 */
interface DisplayMetadataOptions {
  timestamp?: string;
  nome?: string;
  nomeEscritorio?: string;
}

export const prepararMetadados = (options?: DisplayMetadataOptions) => {
  const dataCalculo = options?.timestamp ?
    new Date(options.timestamp).toLocaleDateString('pt-BR') :
    new Date().toLocaleDateString('pt-BR');

  const nomeCalculo = options?.nome ? `${options.nome} - ` : '';

  const logoUrl = localStorage.getItem('userLogoUrl');

  // Prioriza nomeEscritorio das opções, depois chave dedicada, depois userName legado, depois default
  const nomeEscritorio = options?.nomeEscritorio || localStorage.getItem('nomeEscritorio') || localStorage.getItem('userName') || 'IusCalc Trabalhista';

  return {
    dataCalculo,
    nomeCalculo,
    logoUrl,
    nomeEscritorio
  };
};

/**
 * Verifica se os resultados do cálculo são válidos para exibição
 * @param resultados Objeto Resultados do cálculo
 */
export const calculosValidos = (resultados: Resultados): boolean => {
  if (!resultados) return false;
  // Verifica se há verbas rescisórias ou adicionais para considerar o cálculo válido
  return !!(resultados.detalhamento.verbas || resultados.detalhamento.adicionais);
};
