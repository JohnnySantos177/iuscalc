
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  FileText, 
  Share, 
  Trash2,
  Calculator
} from 'lucide-react';
import { CalculoSalvo } from '@/hooks/useCalculosSalvos';
import { CalculationViewer } from './CalculationViewer';
import { exportToPDF } from '@/utils/export/pdfExport';
import { shareViaWhatsApp, generateCalculationText } from '@/utils/export/shareUtils';
import { formatCurrency } from '@/utils/format';

interface SavedCalculationsProps {
  calculos: CalculoSalvo[];
  onDelete: (id: string) => void;
  onLoad: (calculo: CalculoSalvo) => void;
  onRename: (id: string, novoNome: string) => void;
}

export const SavedCalculations = ({ 
  calculos, 
  onDelete, 
  onLoad,
  onRename
}: SavedCalculationsProps) => {
  const [editandoNome, setEditandoNome] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [calculoVisualizando, setCalculoVisualizando] = useState<CalculoSalvo | null>(null);

  const iniciarEdicaoNome = (calculo: CalculoSalvo) => {
    setEditandoNome(calculo.id);
    setNovoNome(calculo.nome);
  };

  const salvarNome = async (id: string) => {
    if (novoNome.trim()) {
      await onRename(id, novoNome.trim());
      setEditandoNome(null);
      setNovoNome('');
    }
  };

  const cancelarEdicao = () => {
    setEditandoNome(null);
    setNovoNome('');
  };

  const exportarPDF = (calculo: CalculoSalvo) => {
    // Criar o elemento para impressão
    const printDiv = document.createElement('div');
    printDiv.id = 'print-results-only';
    
    // Formatar a data atual
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    // Obter o nome do escritório
    const nomeEscritorio = localStorage.getItem('userName') || 'IusCalc';

    // Criar o HTML para impressão
    printDiv.innerHTML = `
      <div class="section">
        <h2>DEMONSTRATIVO DE CÁLCULOS TRABALHISTAS</h2>
        <p class="text-sm text-gray-500">Cálculos: ${nomeEscritorio}</p>
        <p class="text-sm text-gray-500">Data: ${dataAtual}</p>
      </div>

      <div class="section">
        <h3>Dados do Contrato</h3>
        ${calculo.dadosContrato ? `
          <div class="result-item">
            <span class="result-label">Salário Base:</span>
            <span class="result-value">${formatCurrency(calculo.dadosContrato.salarioBase)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Data de Admissão:</span>
            <span class="result-value">${new Date(calculo.dadosContrato.dataAdmissao).toLocaleDateString('pt-BR')}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Data de Demissão:</span>
            <span class="result-value">${new Date(calculo.dadosContrato.dataDemissao).toLocaleDateString('pt-BR')}</span>
          </div>
        ` : `<p class="text-gray-500">Dados do contrato não disponíveis para este cálculo.</p>`}
      </div>
      
      <div class="valor-total">
        <span class="titulo">Valor Total da Reclamação</span>
        <span class="valor">${formatCurrency(calculo.resultados?.total || 0)}</span>
      </div>
    `;
    
    // Adicionar o elemento ao documento
    document.body.appendChild(printDiv);
    
    const exportData = {
      verbasRescisorias: calculo.resultados?.detalhamento?.verbas || {},
      adicionais: calculo.resultados?.detalhamento?.adicionais || {},
      totalGeral: calculo.resultados?.total || 0,
      nome: calculo.nome,
      timestamp: calculo.dataCriacao,
      nomeEscritorio: nomeEscritorio,
      resultados: calculo.resultados,
      dadosContrato: calculo.dadosContrato,
      horasExtras: { ativo: false, calculos: [] }
    };
    
    exportToPDF(exportData);
    
    // Remover o elemento após a exportação
    setTimeout(() => {
      if (document.body.contains(printDiv)) {
        document.body.removeChild(printDiv);
      }
    }, 1000);
  };

  const compartilharCalculo = (calculo: CalculoSalvo) => {
    const dataCalculo = new Date(calculo.dataCriacao).toLocaleDateString('pt-BR');
    const nomeEscritorio = localStorage.getItem('userName') || 'IusCalc';

    const textoCalculo = generateCalculationText(
      { ...calculo.resultados, dadosContrato: calculo.dadosContrato },
      { dataCalculo: dataCalculo, nomeEscritorio: nomeEscritorio, nomeCalculo: calculo.nome }
    );

    shareViaWhatsApp(textoCalculo);
  };

  if (calculos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cálculos Salvos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum cálculo salvo ainda.</p>
            <p className="text-sm">Realize um cálculo e salve para vê-lo aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Cálculos Salvos ({calculos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculos.map((calculo) => (
                <TableRow key={calculo.id}>
                  <TableCell>
                    {editandoNome === calculo.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={novoNome}
                          onChange={(e) => setNovoNome(e.target.value)}
                          className="h-8"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') salvarNome(calculo.id);
                            if (e.key === 'Escape') cancelarEdicao();
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => salvarNome(calculo.id)}
                          className="h-8 px-2"
                        >
                          ✓
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelarEdicao}
                          className="h-8 px-2"
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <span 
                        onClick={() => iniciarEdicaoNome(calculo)}
                        className="cursor-pointer hover:text-blue-600"
                        title="Clique para renomear"
                      >
                        {calculo.nome}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(calculo.dataCriacao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(calculo.resultados?.total || 0)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCalculoVisualizando(calculo)}
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onLoad(calculo)}
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportarPDF(calculo)}
                        title="Exportar PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => compartilharCalculo(calculo)}
                        title="Compartilhar"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja remover este cálculo?')) {
                            onDelete(calculo.id);
                          }
                        }}
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {calculoVisualizando && (
        <CalculationViewer
          calculo={calculoVisualizando}
          onClose={() => setCalculoVisualizando(null)}
        />
      )}
    </>
  );
};
