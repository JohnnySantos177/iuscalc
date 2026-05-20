
import { useState } from 'react';
import { UserManagement } from '@/components/admin/UserManagement';
import { DatabaseManagement } from '@/components/admin/DatabaseManagement';
import { SystemSettings } from '@/components/admin/SystemSettings';
import { SecurityManagement } from '@/components/admin/SecurityManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { SystemLogs } from '@/components/admin/SystemLogs';
import { FeedbacksManagement } from '@/components/admin/FeedbacksManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings, Database, Shield, BarChart, ClipboardList, MessageSquare } from 'lucide-react';

export function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-juriscalc-navy mb-8">
        Painel de Super Administrador
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Banco de Dados
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="feedbacks" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Feedbacks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseManagement />
        </TabsContent>

        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecurityManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="logs">
          <SystemLogs />
        </TabsContent>

        <TabsContent value="feedbacks">
          <FeedbacksManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
