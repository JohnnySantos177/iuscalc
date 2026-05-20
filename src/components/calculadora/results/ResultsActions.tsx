import { Button } from '@/components/ui/button';
import { Download, Save, Share2, FileSpreadsheet } from 'lucide-react';

interface ResultsActionsProps {
  onSalvar?: () => void;
  onExportar?: () => void;
  onExportarExcel?: () => void;
  onCompartilhar?: () => void;
}

export function ResultsActions({ onSalvar, onExportar, onExportarExcel, onCompartilhar }: ResultsActionsProps) {
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
        PDF
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-green-700 border-green-300 hover:bg-green-50"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onExportarExcel) onExportarExcel();
        }}
      >
        <FileSpreadsheet className="w-4 h-4 mr-1" />
        Excel
      </Button>

      {onCompartilhar && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-juriscalc-blue"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCompartilhar();
          }}
        >
          <Share2 className="w-4 h-4 mr-1" />
          Compartilhar
        </Button>
      )}
    </div>
  );
}