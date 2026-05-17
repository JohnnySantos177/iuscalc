
import { Adicionais, HoraExtra } from '@/types/calculadora';

/**
 * Calcula o valor do adicional noturno com base no salário, percentual e horas noturnas.
 * @param salarioBase Salário base do trabalhador.
 * @param adicionais Objeto contendo as configurações de adicionais, incluindo o adicional noturno.
 * @returns O valor do adicional noturno ou 0 se não for aplicável.
 */
export const calcularAdicionalNoturno = (salarioBase: number, adicionais: Adicionais): number => {
  if (adicionais.calcularAdicionalNoturno) {
    const percentual = parseFloat(adicionais.percentualAdicionalNoturno.toString());
    const horasNoturnas = parseFloat(adicionais.horasNoturnas.toString());

    if (isNaN(percentual) || isNaN(horasNoturnas)) {
      console.error("Percentual ou horas noturnas inválidos.");
      return 0;
    }

    return (salarioBase / 220) * percentual / 100 * horasNoturnas;
  }

  return 0;
};

/**
 * Calcula o valor das horas extras com base no salário, quantidade de horas extras e percentual.
 * @param salarioBase Salário base do trabalhador.
 * @param adicionais Objeto contendo as configurações de adicionais, incluindo as horas extras.
 * @returns O valor das horas extras ou 0 se não for aplicável.
 */
export const calcularHorasExtras = (salarioBase: number, adicionais: Adicionais): number => {
  if (adicionais.calcularHorasExtras) {
    // Garante que horasExtrasCalculos está definido e é um array
    if (!adicionais.horasExtrasCalculos || !Array.isArray(adicionais.horasExtrasCalculos)) {
      console.error("horasExtrasCalculos não está definido ou não é um array.");
      return 0;
    }

    // Calcula o valor da hora normal
    const valorHoraNormal = salarioBase / 220;

    // Mapeia e calcula o valor de cada hora extra
    const valorTotalHorasExtras = adicionais.horasExtrasCalculos.reduce((total, horasExtrasCalculo: HoraExtra) => {
      const totalHorasExtras = horasExtrasCalculo.quantidade;
      const percentual = parseFloat(horasExtrasCalculo.percentual.toString());

      if (isNaN(percentual) || isNaN(totalHorasExtras)) {
        console.error("Percentual ou quantidade de horas extras inválidos.");
        return total; // Retorna o total acumulado até o momento
      }

      // Hora extra = hora normal + adicional (ex.: 50% → paga 1,5× a hora normal)
      return total + (valorHoraNormal * (1 + percentual / 100) * totalHorasExtras);
    }, 0);

    return valorTotalHorasExtras;
  }

  return 0;
};
