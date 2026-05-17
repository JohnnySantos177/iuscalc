
import { formatCurrency } from '@/utils/format';

interface HorasExtrasSectionProps {
  horasExtras: {
    ativo: boolean;
    calculos: Array<{
      id: string;
      percentual: number;
      quantidade: number;
      valor?: number;
    }>;
  };
  totalValue: number;
}

export function HorasExtrasSection({ horasExtras, totalValue }: HorasExtrasSectionProps) {
  if (totalValue <= 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between font-medium">
        <span>Horas Extras:</span>
        <span>{formatCurrency(totalValue)}</span>
      </div>
      <div className="pl-4 space-y-1 text-sm">
        {horasExtras.calculos.map((horaExtra, index) => (
          <div key={horaExtra.id} className="flex justify-between text-gray-600">
            <span>Cálculo {index + 1} ({horaExtra.quantidade}h a {horaExtra.percentual}%):</span>
            <span>{formatCurrency(horaExtra.valor || 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
