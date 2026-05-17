import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { CalculadoraState, HoraExtra } from '@/types/calculadora';

interface AdicionaisBasicosProps {
  state: CalculadoraState;
  updateState: (updates: Partial<CalculadoraState>) => void;
}

export function AdicionaisBasicos({ state, updateState }: AdicionaisBasicosProps) {
  const adicionarHoraExtra = () => {
    const novaHoraExtra: HoraExtra = {
      id: crypto.randomUUID(),
      percentual: 50,
      quantidade: 0,
    };

    updateState({
      adicionais: {
        ...state.adicionais,
        horasExtrasCalculos: [...state.adicionais.horasExtrasCalculos, novaHoraExtra]
      }
    });
  };

  const removerHoraExtra = (id: string) => {
    updateState({
      adicionais: {
        ...state.adicionais,
        horasExtrasCalculos: state.adicionais.horasExtrasCalculos.filter(he => he.id !== id)
      }
    });
  };

  const atualizarHoraExtra = (id: string, updates: Partial<HoraExtra>) => {
    updateState({
      adicionais: {
        ...state.adicionais,
        horasExtrasCalculos: state.adicionais.horasExtrasCalculos.map(he => 
          he.id === id ? { ...he, ...updates } : he
        )
      }
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Adicionais Básicos</h3>
      <div className="space-y-4">
        {/* Insalubridade */}
        <div className="flex items-center justify-between">
          <Label htmlFor="insalubridade">Adicional de Insalubridade</Label>
          <Switch 
            id="insalubridade"
            checked={state.adicionais.calcularInsalubridade}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                calcularInsalubridade: checked
              }
            })}
          />
        </div>
        {state.adicionais.calcularInsalubridade && (
          <div className="pl-4 space-y-4">
            <div>
              <Label>Grau de Insalubridade</Label>
              <Select 
                value={state.adicionais.grauInsalubridade}
                onValueChange={(value: 'minimo' | 'medio' | 'maximo') => updateState({
                  adicionais: {
                    ...state.adicionais,
                    grauInsalubridade: value
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o grau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimo">Mínimo (10%)</SelectItem>
                  <SelectItem value="medio">Médio (20%)</SelectItem>
                  <SelectItem value="maximo">Máximo (40%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Base de Cálculo</Label>
              <Select 
                value={state.adicionais.baseCalculoInsalubridade}
                onValueChange={(value: 'salario_minimo' | 'salario_base') => updateState({
                  adicionais: {
                    ...state.adicionais,
                    baseCalculoInsalubridade: value
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salario_minimo">Salário Mínimo</SelectItem>
                  <SelectItem value="salario_base">Salário Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Aplicar por Período Específico?</Label>
                <Switch 
                  checked={state.adicionais.insalubridadePeriodoEspecifico}
                  onCheckedChange={(checked) => updateState({
                    adicionais: {
                      ...state.adicionais,
                      insalubridadePeriodoEspecifico: checked
                    }
                  })}
                />
              </div>
              {state.adicionais.insalubridadePeriodoEspecifico && (
                <div className="space-y-2">
                  <div>
                    <Label>Data de Início da Insalubridade</Label>
                    <Input
                      type="date"
                      value={state.adicionais.dataInicioInsalubridade}
                      onChange={(e) => updateState({
                        adicionais: {
                          ...state.adicionais,
                          dataInicioInsalubridade: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Data de Fim da Insalubridade</Label>
                    <Input
                      type="date"
                      value={state.adicionais.dataFimInsalubridade}
                      onChange={(e) => updateState({
                        adicionais: {
                          ...state.adicionais,
                          dataFimInsalubridade: e.target.value
                        }
                      })}
                    />
                  </div>
                  <p className="text-sm text-blue-600">O adicional será aplicado apenas durante o período especificado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Periculosidade */}
        <div className="flex items-center justify-between">
          <Label htmlFor="periculosidade">Adicional de Periculosidade</Label>
          <Switch 
            id="periculosidade"
            checked={state.adicionais.calcularPericulosidade}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                calcularPericulosidade: checked
              }
            })}
          />
        </div>
        {state.adicionais.calcularPericulosidade && (
          <div className="pl-4 space-y-4">
            <div>
              <Label>Percentual (%)</Label>
              <Input
                type="number"
                value={state.adicionais.percentualPericulosidade}
                onChange={(e) => updateState({
                  adicionais: {
                    ...state.adicionais,
                    percentualPericulosidade: e.target.value
                  }
                })}
              />
            </div>
            <div>
              <Label>Base de Cálculo</Label>
              <Select 
                value={state.adicionais.baseCalculoPericulosidade}
                onValueChange={(value: 'salario_minimo' | 'salario_base') => updateState({
                  adicionais: {
                    ...state.adicionais,
                    baseCalculoPericulosidade: value
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salario_minimo">Salário Mínimo</SelectItem>
                  <SelectItem value="salario_base">Salário Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Aplicar por Período Específico?</Label>
                <Switch 
                  checked={state.adicionais.periculosidadePeriodoEspecifico}
                  onCheckedChange={(checked) => updateState({
                    adicionais: {
                      ...state.adicionais,
                      periculosidadePeriodoEspecifico: checked
                    }
                  })}
                />
              </div>
              {state.adicionais.periculosidadePeriodoEspecifico && (
                <div className="space-y-2">
                  <div>
                    <Label>Data de Início da Periculosidade</Label>
                    <Input
                      type="date"
                      value={state.adicionais.dataInicioPericulosidade}
                      onChange={(e) => updateState({
                        adicionais: {
                          ...state.adicionais,
                          dataInicioPericulosidade: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Data de Fim da Periculosidade</Label>
                    <Input
                      type="date"
                      value={state.adicionais.dataFimPericulosidade}
                      onChange={(e) => updateState({
                        adicionais: {
                          ...state.adicionais,
                          dataFimPericulosidade: e.target.value
                        }
                      })}
                    />
                  </div>
                  <p className="text-sm text-blue-600">O adicional será aplicado apenas durante o período especificado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Adicional Noturno */}
        <div className="flex items-center justify-between">
          <Label htmlFor="noturno">Adicional Noturno</Label>
          <Switch 
            id="noturno"
            checked={state.adicionais.calcularAdicionalNoturno}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                calcularAdicionalNoturno: checked
              }
            })}
          />
        </div>
        {state.adicionais.calcularAdicionalNoturno && (
          <div className="pl-4 space-y-2">
            <div>
              <Label>Percentual (%)</Label>
              <Input
                type="number"
                value={state.adicionais.percentualAdicionalNoturno}
                onChange={(e) => updateState({
                  adicionais: {
                    ...state.adicionais,
                    percentualAdicionalNoturno: e.target.value
                  }
                })}
              />
            </div>
            <div>
              <Label>Horas Noturnas</Label>
              <Input
                type="number"
                value={state.adicionais.horasNoturnas}
                onChange={(e) => updateState({
                  adicionais: {
                    ...state.adicionais,
                    horasNoturnas: e.target.value
                  }
                })}
              />
            </div>
          </div>
        )}

        {/* Horas Extras */}
        <div className="flex items-center justify-between">
          <Label htmlFor="horasExtras">Horas Extras</Label>
          <Switch 
            id="horasExtras"
            checked={state.adicionais.calcularHorasExtras}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                calcularHorasExtras: checked
              }
            })}
          />
        </div>
        {state.adicionais.calcularHorasExtras && (
          <div className="pl-4 space-y-4">
            {state.adicionais.horasExtrasCalculos.map((horaExtra, index) => (
              <div key={horaExtra.id} className="border p-4 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Cálculo de Hora Extra {index + 1}</Label>
                  <Button variant="ghost" size="icon" onClick={() => removerHoraExtra(horaExtra.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Label htmlFor={`percentualHoraExtra-${horaExtra.id}`}>Percentual (%)</Label>
                <Input
                  id={`percentualHoraExtra-${horaExtra.id}`}
                  type="number"
                  value={horaExtra.percentual || ''}
                  onChange={(e) => atualizarHoraExtra(horaExtra.id, { percentual: parseFloat(e.target.value) || 0 })}
                />
                <Label htmlFor={`quantidadeHoraExtra-${horaExtra.id}`}>Quantidade de Horas</Label>
                <Input
                  id={`quantidadeHoraExtra-${horaExtra.id}`}
                  type="number"
                  value={horaExtra.quantidade || ''}
                  onChange={(e) => atualizarHoraExtra(horaExtra.id, { quantidade: parseFloat(e.target.value) || 0 })}
                />
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={adicionarHoraExtra}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Hora Extra
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 