import { useEffect } from 'react'; // 👈 Adicionado useEffect para recuperar os dados
import { useCalculadoraState } from '@/hooks/calculadora/useCalculadoraState';
import { useCalculos } from '@/hooks/calculadora/useCalculos';
import { useCalculosSalvos, CalculoSalvo } from '@/hooks/useCalculosSalvos';
import { AdicionaisBasicos } from '@/components/calculadora/AdicionaisBasicos';
import { VerbasAdicionais } from '@/components/calculadora/VerbasAdicionais';
import { MultasOutrosAdicionais } from '@/components/calculadora/MultasOutrosAdicionais';
import { ResultadosCalculo } from '@/components/calculadora/ResultadosCalculo';
import { ContractDataForm } from '@/components/calculadora/ContractDataForm';
import { SavedCalculations } from '@/components/calculadora/SavedCalculations';
import { toast } from 'sonner';
import { CalculadoraState, DadosContrato } from '@/types/calculadora';

export function CalculadoraPage() {
  const { state, updateState } = useCalculadoraState();
  const { calcular } = useCalculos();
  const { 
    calculosSalvos, 
    salvarCalculo, 
    removerCalculo, 
    renomearCalculo, 
    carregarCalculo 
  } = useCalculosSalvos();

  // 🛡️ TRAVA ANTICRASH: Se o Lovable resetar a página, recupera os dados na hora!
  useEffect(() => {
    const dadosSalvosTemporarios = localStorage.getItem('iuscalc_active_state');
    if (dadosSalvosTemporarios && !state.resultados) {
      try {
        const parsedState = JSON.parse(dadosSalvosTemporarios);
        updateState(parsedState);
      } catch (e) {
        console.error('Erro ao restaurar estado pós-impressão:', e);
      }
    }
  }, []);

  const handleCalcular = () => {
    try {
      console.log('Botão calcular clicado. Estado atual:', state);
      
      if (!state.dadosContrato.salarioBase || state.dadosContrato.salarioBase <= 0) {
        toast.error('É necessário informar um salário base válido!');
        return;
      }

      if (!state.dadosContrato.dataAdmissao || !state.dadosContrato.dataDemissao) {
        toast.error('É necessário informar as datas de admissão e demissão!');
        return;
      }

      if (!state.dadosContrato.motivoDemissao) {
        toast.error('É necessário selecionar o tipo de rescisão!');
        return;
      }

      const stateCopy: CalculadoraState = {
        ...state,
        dadosContrato: {
          ...state.dadosContrato,
          salarioBase: Number(state.dadosContrato.salarioBase) || 0
        }
      };
      
      const resultados = calcular(stateCopy);
      
      // Salva o estado completo no cache antes de aplicar na tela
      const finalState = { ...stateCopy, resultados };
      localStorage.setItem('iuscalc_active_state', JSON.stringify(finalState));
      
      updateState({ resultados });
      toast.success('Cálculo realizado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao calcular resultados:', error);
      toast.error('Erro ao realizar o cálculo. Verifique os dados informados.');
    }
  };

  const handleSalvarCalculo = () => {
    if (!state.resultados) {
      toast.error('Realize um cálculo antes de salvar!');
      return;
    }

    if (!state.dadosContrato.salarioBase || state.dadosContrato.salarioBase <= 0) {
      toast.error('É necessário informar um salário base válido!');
      return;
    }

    if (!state.dadosContrato.dataAdmissao || !state.dadosContrato.dataDemissao) {
      toast.error('É necessário informar as datas de admissão e demissão!');
      return;
    }

    const nomePersonalizado = prompt('Digite um nome para este cálculo (opcional):');
    
    const stateWithCalculosPersonalizados = {
      ...state,
      calculosPersonalizados: state.calculosPersonalizados || []
    };
    
    salvarCalculo(stateWithCalculosPersonalizados, state.resultados, nomePersonalizado || undefined);
  };

  const handleEditarCalculo = (calculo: CalculoSalvo) => {
    const newState = {
      dadosContrato: calculo.dadosContrato,
      adicionais: calculo.adicionais,
      verbas: calculo.verbas,
      multas: calculo.multas,
      salarioFamilia: calculo.salarioFamilia,
      seguroDesemprego: calculo.seguroDesemprego,
      resultados: calculo.resultados
    };
    
    // Alimenta o cache temporário também na edição
    localStorage.setItem('iuscalc_active_state', JSON.stringify(newState));
    updateState(newState);
    
    toast.success('Cálculo carregado para edição!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Calculadora Trabalhista</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <ContractDataForm 
              data={{
                daysWorked: parseInt(state.dadosContrato.diasTrabalhados) || 0,
                monthsWorked: parseInt(state.dadosContrato.mesesTrabalhados) || 0,
                fixedTermContract: state.dadosContrato.contratoTempoDeterminado || false,
                noticePeriodFulfilled: state.dadosContrato.avisoPrevioCumprido || false,
                fgtsDeposited: state.dadosContrato.fgtsDepositado || false,
                admissionDate: state.dadosContrato.dataAdmissao,
                terminationDate: state.dadosContrato.dataDemissao,
                baseSalary: state.dadosContrato.salarioBase,
                terminationType: (state.dadosContrato.motivoDemissao || '') as any
              }}
              onUpdate={(field, value) => {
                const dadosContratoUpdates: Partial<DadosContrato> = {};
                
                switch (field) {
                  case 'daysWorked':
                    dadosContratoUpdates.diasTrabalhados = String(value);
                    break;
                  case 'monthsWorked':
                    dadosContratoUpdates.mesesTrabalhados = String(value);
                    break;
                  case 'fixedTermContract':
                    dadosContratoUpdates.contratoTempoDeterminado = value as boolean;
                    break;
                  case 'noticePeriodFulfilled':
                    dadosContratoUpdates.avisoPrevioCumprido = value as boolean;
                    break;
                  case 'fgtsDeposited':
                    dadosContratoUpdates.fgtsDepositado = value as boolean;
                    break;
                  case 'admissionDate':
                    dadosContratoUpdates.dataAdmissao = value as string;
                    break;
                  case 'terminationDate':
                    dadosContratoUpdates.dataDemissao = value as string;
                    break;
                  case 'baseSalary':
                    dadosContratoUpdates.salarioBase = Number(value) || 0;
                    break;
                  case 'terminationType':
                    dadosContratoUpdates.motivoDemissao = value as string;
                    break;
                }
                
                const updatedDadosContrato = {
                  ...state.dadosContrato,
                  ...dadosContratoUpdates
                };

                // Atualiza o cache a cada mudança para evitar perdas
                localStorage.setItem('iuscalc_active_state', JSON.stringify({ ...state, dadosContrato: updatedDadosContrato }));

                updateState({
                  dadosContrato: updatedDadosContrato
                });
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <AdicionaisBasicos state={state} updateState={(updates) => {
              const newState = { ...state, ...updates };
              localStorage.setItem('iuscalc_active_state', JSON.stringify(newState));
              updateState(updates);
            }} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <VerbasAdicionais state={state} updateState={(updates) => {
              const newState = { ...state, ...updates };
              localStorage.setItem('iuscalc_active_state', JSON.stringify(newState));
              updateState(updates);
            }} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <MultasOutrosAdicionais state={state} updateState={(updates) => {
              const newState = { ...state, ...updates };
              localStorage.setItem('iuscalc_active_state', JSON.stringify(newState));
              updateState(updates);
            }} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <button
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              onClick={handleCalcular}
            >
              Calcular
            </button>
          </div>

          {state.resultados && (
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <ResultadosCalculo 
                resultados={state.resultados} 
                horasExtras={state.adicionais.horasExtras}
                dadosContrato={state.dadosContrato}
                onSalvar={handleSalvarCalculo}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <SavedCalculations
          calculos={calculosSalvos}
          onDelete={removerCalculo}
          onLoad={handleEditarCalculo}
          onRename={renomearCalculo}
        />
      </div>
    </div>
  );
}