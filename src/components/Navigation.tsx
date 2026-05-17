import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calculator, User, LogOut, Crown, BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { path: '/home', label: 'Home', icon: User },
    { path: '/calculadora', label: 'Calculadora', icon: Calculator },
    { path: '/relatorios', label: 'Relatórios', icon: BarChart2 },
    { path: '/minha-conta', label: 'Minha Conta', icon: User },
  ];

  // Lógica de Admin
  if (user.role === 'admin' || user.role === 'super_admin' || user.tipo_usuario === 'admin_mestre') {
    navItems.push({ path: '/admin', label: 'Admin', icon: Crown });
  }

  const isPremium = user?.tipo_plano === 'premium';
  const isSuperAdmin = user?.role === 'super_admin' || user?.tipo_usuario === 'admin_mestre';

  // Exibir botão de Upgrade apenas para quem não é Premium/Admin
  if (!isPremium && !isSuperAdmin) {
    navItems.push({ path: '/upgrade', label: 'Seja Premium', icon: Crown });
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="text-2xl font-bold text-juriscalc-navy">
              IusCalc
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-juriscalc-blue text-white shadow-md'
                      : 'text-juriscalc-navy hover:bg-juriscalc-blue/10 hover:text-juriscalc-blue'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-juriscalc-blue text-white">
                      {user.nome?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem asChild>
                  <Link to="/minha-conta" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Minha Conta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};