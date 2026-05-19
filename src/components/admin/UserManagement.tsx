import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Users, Edit, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import iusCalcLogo from '@/assets/IusCalc sem fundo.png';

// Interface para o usuário no contexto de gerenciamento
interface ManagedUser {
  id: string;
  email: string;
  nome: string;
  tipo_usuario: 'usuario' | 'admin' | 'admin_mestre';
  tipo_plano: 'padrao' | 'premium';
  created_at: string;
  is_admin: boolean;
}

interface FormData {
  email: string;
  nome: string;
  tipo_usuario: 'usuario' | 'admin' | 'admin_mestre';
  tipo_plano: 'padrao' | 'premium';
  is_admin: boolean;
}

export function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nome: '',
    tipo_usuario: 'usuario',
    tipo_plano: 'padrao',
    is_admin: false,
  });

  // Carregar usuários reais do Supabase
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      console.log('Carregando usuários do banco de dados...');
      // Busca via função RPC para liberar todos os perfis ao Super Admin
      const { data, error } = await supabase.rpc('get_all_profiles');

      if (error) {
        throw error;
      }

      const mappedUsers: ManagedUser[] = data?.map(profile => ({
        id: profile.id,
        email: profile.email || 'Não informado',
        nome: profile.nome || 'Não informado',
        tipo_usuario: (profile.tipo_usuario as 'usuario' | 'admin' | 'admin_mestre') || 'usuario',
        tipo_plano: (profile.tipo_plano as 'padrao' | 'premium') || 'padrao',
        created_at: profile.created_at,
        is_admin: profile.is_admin || false,
      })) || [];

      console.log(`${mappedUsers.length} usuários carregados`);
      setUsers(mappedUsers);
    } catch (error: any) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    loadUsers();
  }, []);

  const handleUpdateUser = async () => {
  if (!editingUser) return;

  try {
    const { error } = await supabase.rpc('update_user_profile', {
      target_user_id: editingUser.id,
      new_nome: formData.nome,
      new_email: formData.email,
      new_tipo_usuario: formData.tipo_usuario,
      new_tipo_plano: formData.tipo_plano,
      new_is_admin: formData.tipo_usuario !== 'usuario',
      new_is_premium: formData.tipo_plano === 'premium',
    });

    if (error) throw error;

    await loadUsers();
    setIsDialogOpen(false);
    toast.success('Usuário e plano atualizados!');
  } catch (error: any) {
    toast.error('Erro ao atualizar: ' + error.message);
  }
};

  const handleEditUser = async (user: ManagedUser) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      nome: user.nome,
      tipo_usuario: user.tipo_usuario,
      tipo_plano: user.tipo_plano,
      is_admin: user.is_admin,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
  if (userId === currentUser?.id) {
    toast.error('Você não pode excluir sua própria conta');
    return;
  }

  // Use o toast de confirmação ou o confirm nativo
  const confirmed = window.confirm('Tem certeza que deseja excluir este usuário? Esta ação removerá todos os cálculos e dados vinculados e não pode ser desfeita.');
  
  if (!confirmed) return;

  // Inicia o loading para dar feedback visual
  setIsLoading(true); 

  try {
    console.log('Iniciando exclusão do usuário:', userId);
    
    const { error } = await supabase.rpc('delete_user', { target_user_id: userId });

    if (error) {
      // Se o erro persistir, o console dirá o motivo exato (ex: violação de FK)
      console.error('Erro retornado pelo RPC:', error);
      throw new Error(error.message);
    }

    // Atualiza a lista local removendo o usuário deletado sem precisar recarregar tudo do banco
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success('Usuário excluído com sucesso!');

  } catch (error: any) {
    console.error('Erro ao excluir usuário:', error);
    toast.error('Não foi possível excluir o usuário: ' + (error.message || 'Erro desconhecido'));
  } finally {
    setIsLoading(false);
  }
};

  const getRoleDisplayName = (role: string) => {
    const roles: { [key: string]: string } = {
      'usuario': 'Usuário',
      'admin': 'Administrador',
      'admin_mestre': 'Super Admin'
    };
    return roles[role] || role;
  };

  const getPlanDisplayName = (plan: string) => {
    const plans: { [key: string]: string } = {
      'padrao': 'Padrão',
      'premium': 'Premium'
    };
    return plans[plan] || plan;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-juriscalc-navy flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Gerenciamento de Usuários ({users.length})
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadUsers}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-juriscalc-blue hover:bg-juriscalc-navy" 
                disabled={!editingUser}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Usuário</DialogTitle>
                <DialogDescription>
                  Atualize as informações do usuário selecionado
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={e =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo_usuario">Tipo de Usuário</Label>
                  <Select
                    value={formData.tipo_usuario}
                    onValueChange={(value: 'usuario' | 'admin' | 'admin_mestre') =>
                      setFormData({ ...formData, tipo_usuario: value, is_admin: value !== 'usuario' })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usuario">Usuário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="admin_mestre">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo_plano">Plano</Label>
                  <Select
                    value={formData.tipo_plano}
                    onValueChange={(value: 'padrao' | 'premium') =>
                      setFormData({ ...formData, tipo_plano: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="padrao">Padrão</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingUser(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleUpdateUser}
                  className="bg-juriscalc-blue hover:bg-juriscalc-navy"
                >
                  Atualizar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-juriscalc-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando usuários...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhum usuário encontrado.</p>
          <Button onClick={loadUsers} className="mt-4">
            Tentar Novamente
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    user.tipo_usuario === 'admin_mestre' 
                      ? 'bg-red-100 text-red-800'
                      : user.tipo_usuario === 'admin'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {getRoleDisplayName(user.tipo_usuario)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    user.tipo_plano === 'premium' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {getPlanDisplayName(user.tipo_plano)}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUser(user)}
                      title="Editar usuário"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Excluir usuário"
                      disabled={user.id === currentUser?.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
