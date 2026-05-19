
import { DadosContrato, Adicionais, Resultados } from '@/types/calculadora';
import { realizarCalculos } from '@/utils/calculadora/calculosUtils';
import {
  validarDadosContrato,
  notificarCalculoRealizado,
  notificarErroCalculo,
  expandirAcordeoes
} from '@/utils/calculadora/validacaoUtils';

export const useCalculos = (
  dadosContrato: DadosContrato,
  adicionais: Adicionais,
  setResultados: React.Dispatch<React.SetStateAction<Resultados>>
) => {
  const calcularResultados = () => {
    if (!validarDadosContrato(dadosContrato)) {
      return;
    }

    try {
      const resultadosCalculados = realizarCalculos(dadosContrato, adicionais);
      setResultados(resultadosCalculados);
      notificarCalculoRealizado();
      expandirAcordeoes();
      console.log("Cálculos realizados:", resultadosCalculados);
    } catch (error) {
      notificarErroCalculo(error);
    }
  };

  return { calcularResultados };
};
