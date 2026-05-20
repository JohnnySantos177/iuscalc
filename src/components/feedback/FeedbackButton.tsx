import { useState } from 'react';
import { MessageSquarePlus, Star, Send, X, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const LABELS: Record<number, string> = {
  1: 'Muito insatisfeito',
  2: 'Insatisfeito',
  3: 'Neutro',
  4: 'Satisfeito',
  5: 'Muito satisfeito',
};

export function FeedbackButton() {
  const { user } = useAuth();
  const [aberto, setAberto] = useState(false);
  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  if (!user) return null;

  const resetar = () => {
    setNota(0);
    setHover(0);
    setMensagem('');
    setEnviado(false);
  };

  const fechar = () => {
    setAberto(false);
    setTimeout(resetar, 300);
  };

  const enviar = async () => {
    if (nota === 0) {
      toast.error('Selecione uma avaliação antes de enviar.');
      return;
    }

    setEnviando(true);
    try {
      const { error } = await supabase.from('feedbacks').insert({
        user_id: user.id,
        nota,
        mensagem: mensagem.trim() || null,
      });

      if (error) throw error;

      setEnviado(true);
      setTimeout(fechar, 2000);
    } catch (err) {
      console.error('Erro ao enviar feedback:', err);
      toast.error('Não foi possível enviar o feedback. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const estrelaAtiva = hover || nota;

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-juriscalc-blue hover:bg-juriscalc-navy text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        title="Enviar feedback"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal */}
      <Dialog open={aberto} onOpenChange={(v) => { if (!v) fechar(); }}>
        <DialogContent className="sm:max-w-sm p-0 overflow-hidden gap-0 [&>button]:hidden">

          {/* Cabeçalho */}
          <div className="bg-juriscalc-blue px-6 pt-5 pb-6 relative">
            <button
              onClick={fechar}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-white mb-1">
              <MessageSquarePlus className="w-5 h-5" />
              <h2 className="text-lg font-bold">Sua opinião importa</h2>
            </div>
            <p className="text-white/80 text-sm">
              Como está sendo sua experiência com o IusCalc?
            </p>
          </div>

          {/* Corpo */}
          <div className="px-6 py-5 bg-white">
            {enviado ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="font-semibold text-gray-800">Obrigado pelo feedback!</p>
                <p className="text-sm text-gray-500">Sua opinião nos ajuda a melhorar o sistema.</p>
              </div>
            ) : (
              <>
                {/* Estrelas */}
                <div className="flex flex-col items-center gap-2 mb-5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        onClick={() => setNota(i)}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                        aria-label={`Nota ${i}`}
                      >
                        <Star
                          className={`w-9 h-9 transition-colors duration-150 ${
                            i <= estrelaAtiva
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 h-5">
                    {estrelaAtiva > 0 ? LABELS[estrelaAtiva] : 'Toque em uma estrela para avaliar'}
                  </p>
                </div>

                {/* Mensagem */}
                <Textarea
                  placeholder="Conta pra gente o que achou, o que poderia melhorar ou o que está faltando... (opcional)"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="resize-none text-sm min-h-[90px] mb-4"
                  maxLength={500}
                />
                <p className="text-xs text-gray-400 text-right mb-4">{mensagem.length}/500</p>

                {/* Botão enviar */}
                <Button
                  onClick={enviar}
                  disabled={enviando || nota === 0}
                  className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy"
                >
                  {enviando ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar feedback
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
