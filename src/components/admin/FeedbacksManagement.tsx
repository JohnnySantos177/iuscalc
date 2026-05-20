import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MessageSquare, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedbackItem {
  id: string;
  user_id: string;
  user_email: string;
  nota: number;
  mensagem: string | null;
  created_at: string;
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= nota ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

const COR_NOTA: Record<number, string> = {
  1: 'bg-red-100 text-red-700',
  2: 'bg-orange-100 text-orange-700',
  3: 'bg-yellow-100 text-yellow-700',
  4: 'bg-green-100 text-green-700',
  5: 'bg-emerald-100 text-emerald-700',
};

export function FeedbacksManagement() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarFeedbacks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_all_feedbacks');
      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      console.error('Erro ao carregar feedbacks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFeedbacks();
  }, []);

  // Estatísticas
  const total = feedbacks.length;
  const media = total > 0
    ? (feedbacks.reduce((s, f) => s + f.nota, 0) / total).toFixed(1)
    : '—';
  const comMensagem = feedbacks.filter((f) => f.mensagem).length;

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-100 rounded-xl p-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de feedbacks</p>
              <p className="text-2xl font-bold text-juriscalc-navy">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 rounded-xl p-3">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Média de avaliação</p>
              <p className="text-2xl font-bold text-juriscalc-navy">{media} <span className="text-sm font-normal text-gray-400">/ 5</span></p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-purple-100 rounded-xl p-3">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Com mensagem</p>
              <p className="text-2xl font-bold text-juriscalc-navy">{comMensagem}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Feedbacks dos Usuários</CardTitle>
            <CardDescription>Ordenados do mais recente para o mais antigo</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={carregarFeedbacks} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin text-juriscalc-blue" />
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>Nenhum feedback recebido ainda.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {/* Nota badge */}
                  <div className={`flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg ${COR_NOTA[fb.nota]}`}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {fb.nota}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Estrelas nota={fb.nota} />
                      <span className="text-sm text-gray-500 truncate">{fb.user_email}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {new Date(fb.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {fb.mensagem ? (
                      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{fb.mensagem}</p>
                    ) : (
                      <p className="text-xs text-gray-400 italic mt-1">Sem mensagem</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
