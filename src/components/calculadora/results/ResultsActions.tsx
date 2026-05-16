import { Button } from '@/components/ui/button';
import { Download, Save, Share2 } from 'lucide-react';

interface ResultsActionsProps {
  onSalvar?: () => void;
  onExportar?: () => void; 
  onCompartilhar?: () => void;
}

export function ResultsActions({ onSalvar, onExportar, onCompartilhar }: ResultsActionsProps) {
  return (
    <div className="flex gap-2">
      {onSalvar && (
        <Button variant="outline" size="sm" className="text-juriscalc-blue" onClick={onSalvar}>
          <Save className="w-4 h-4 mr-1" />
          Salvar
        </Button>
      )}
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        className="text-juriscalc-blue" 
      onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onExportar) onExportar();
        }}
      >
        <Download className="w-4 h-4 mr-1" />
        Exportar
      </Button>

      {onCompartilhar && (
        <Button variant="outline" size="sm" className="text-juriscalc-blue" onClick={onCompartilhar}>
          <Share2 className="w-4 h-4 mr-1" />
          Compartilhar
        </Button>
      )}
    </div>
  );
}