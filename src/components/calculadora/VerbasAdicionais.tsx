import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculadoraState } from '@/types/calculadora';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VerbasAdicionaisProps {
  state: CalculadoraState;
  updateState: (updates: Partial<CalculadoraState>) => void;
}

export function VerbasAdicionais({ state, updateState }: VerbasAdicionaisProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Verbas e Benefícios Adicionais</h3>
      <div className="space-y-4">
        {/* Férias Vencidas */}
        <div className="flex items-center justify-between">
          <Label htmlFor="ferias">Férias Vencidas (+ 1/3)</Label>
          <Switch 
            id="ferias"
            checked={state.verbas.feriasVencidas.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                feriasVencidas: {
                  ...state.verbas.feriasVencidas,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.feriasVencidas.ativo && (
          <div className="pl-4">
            <Label>Períodos de Férias Vencidas</Label>
            <Input
              type="number"
              value={state.verbas.feriasVencidas.periodos || ''}
              onChange={(e) => updateState({
                verbas: {
                  ...state.verbas,
                  feriasVencidas: {
                    ...state.verbas.feriasVencidas,
                    periodos: parseInt(e.target.value) || 0
                  }
                }
              })}
            />
          </div>
        )}

        {/* Indenização por Demissão Indevida */}
        <div className="flex items-center justify-between">
          <Label htmlFor="indenizacao">Indenização por Demissão Indevida</Label>
          <Switch 
            id="indenizacao"
            checked={state.verbas.indenizacaoDemissaoIndevida.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                indenizacaoDemissaoIndevida: {
                  ...state.verbas.indenizacaoDemissaoIndevida,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.indenizacaoDemissaoIndevida.ativo && (
          <div className="pl-4">
            <Label>Valor da Indenização (R$)</Label>
            <Input
              type="number"
              placeholder="Valor da indenização (padrão: salário base)"
              value={state.verbas.indenizacaoDemissaoIndevida.valor || ''}
              onChange={(e) => updateState({
                verbas: {
                  ...state.verbas,
                  indenizacaoDemissaoIndevida: {
                    ...state.verbas.indenizacaoDemissaoIndevida,
                    valor: parseFloat(e.target.value) || 0
                  }
                }
              })}
            />
          </div>
        )}

        {/* Vale Transporte Não Pago */}
        <div className="flex items-center justify-between">
          <Label htmlFor="valeTransporte">Vale Transporte Não Pago</Label>
          <Switch 
            id="valeTransporte"
            checked={state.verbas.valeTransporteNaoPago.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                valeTransporteNaoPago: {
                  ...state.verbas.valeTransporteNaoPago,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.valeTransporteNaoPago.ativo && (
          <div className="pl-4 space-y-2">
            <div>
              <Label>Valor Mensal (R$)</Label>
              <Input
                type="number"
                value={state.verbas.valeTransporteNaoPago.valor || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    valeTransporteNaoPago: {
                      ...state.verbas.valeTransporteNaoPago,
                      valor: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Quantidade de Meses</Label>
              <Input
                type="number"
                value={state.verbas.valeTransporteNaoPago.meses || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    valeTransporteNaoPago: {
                      ...state.verbas.valeTransporteNaoPago,
                      meses: parseInt(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
          </div>
        )}

        {/* Vale Alimentação Não Pago */}
        <div className="flex items-center justify-between">
          <Label htmlFor="valeAlimentacao">Vale Alimentação Não Pago</Label>
          <Switch 
            id="valeAlimentacao"
            checked={state.verbas.valeAlimentacaoNaoPago.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                valeAlimentacaoNaoPago: {
                  ...state.verbas.valeAlimentacaoNaoPago,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.valeAlimentacaoNaoPago.ativo && (
          <div className="pl-4 space-y-2">
            <div>
              <Label>Valor Mensal (R$)</Label>
              <Input
                type="number"
                value={state.verbas.valeAlimentacaoNaoPago.valor || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    valeAlimentacaoNaoPago: {
                      ...state.verbas.valeAlimentacaoNaoPago,
                      valor: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Quantidade de Meses</Label>
              <Input
                type="number"
                value={state.verbas.valeAlimentacaoNaoPago.meses || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    valeAlimentacaoNaoPago: {
                      ...state.verbas.valeAlimentacaoNaoPago,
                      meses: parseInt(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
          </div>
        )}

        {/* Adicional de Transferência */}
        <div className="flex items-center justify-between">
          <Label htmlFor="adicionalTransferencia">Adicional de Transferência</Label>
          <Switch 
            id="adicionalTransferencia"
            checked={state.verbas.adicionalTransferencia.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                adicionalTransferencia: {
                  ...state.verbas.adicionalTransferencia,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.adicionalTransferencia.ativo && (
          <div className="pl-4 space-y-2">
            <div>
              <Label>Percentual (%)</Label>
              <Input
                type="number"
                value={state.verbas.adicionalTransferencia.percentual || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    adicionalTransferencia: {
                      ...state.verbas.adicionalTransferencia,
                      percentual: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Quantidade de Meses</Label>
              <Input
                type="number"
                value={state.verbas.adicionalTransferencia.meses || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    adicionalTransferencia: {
                      ...state.verbas.adicionalTransferencia,
                      meses: parseInt(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
          </div>
        )}

        {/* Descontos Indevidos */}
        <div className="flex items-center justify-between">
          <Label htmlFor="descontosIndevidos">Descontos Indevidos</Label>
          <Switch 
            id="descontosIndevidos"
            checked={state.verbas.descontosIndevidos.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                descontosIndevidos: {
                  ...state.verbas.descontosIndevidos,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.descontosIndevidos.ativo && (
          <div className="pl-4 space-y-2">
            <div>
              <Label>Valor Total dos Descontos (R$)</Label>
              <Input
                type="number"
                value={state.verbas.descontosIndevidos.valor || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    descontosIndevidos: {
                      ...state.verbas.descontosIndevidos,
                      valor: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Descrição dos Descontos</Label>
              <Input
                type="text"
                value={state.verbas.descontosIndevidos.descricao}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    descontosIndevidos: {
                      ...state.verbas.descontosIndevidos,
                      descricao: e.target.value
                    }
                  }
                })}
              />
            </div>
          </div>
        )}

        {/* Diferenças Salariais */}
        <div className="flex items-center justify-between">
          <Label htmlFor="diferencasSalariais">Diferenças Salariais</Label>
          <Switch 
            id="diferencasSalariais"
            checked={state.verbas.diferencasSalariais.ativo}
            onCheckedChange={(checked) => updateState({
              verbas: {
                ...state.verbas,
                diferencasSalariais: {
                  ...state.verbas.diferencasSalariais,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.verbas.diferencasSalariais.ativo && (
          <div className="pl-4 space-y-2">
            <div>
              <Label>Valor da Diferença Mensal (R$)</Label>
              <Input
                type="number"
                value={state.verbas.diferencasSalariais.valorDiferenca || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    diferencasSalariais: {
                      ...state.verbas.diferencasSalariais,
                      valorDiferenca: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Quantidade de Meses</Label>
              <Input
                type="number"
                value={state.verbas.diferencasSalariais.meses || ''}
                onChange={(e) => updateState({
                  verbas: {
                    ...state.verbas,
                    diferencasSalariais: {
                      ...state.verbas.diferencasSalariais,
                      meses: parseInt(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 