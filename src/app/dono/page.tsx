"use client";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { KPICard } from "@/components/dashboard/KPICard";

export default function OwnerDashboard() {
  return (
    <AuthGuard allowedRoles={["dono"]}>
      <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Relatório de Auditoria</h1>
            <p className="text-slate-500 font-medium text-sm">Controle financeiro e performance da frota.</p>
          </div>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-emerald-700 transition-all">
            Exportar PDF
          </button>
        </header>

        {/* KPIs Financeiros Estratégicos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard 
            title="Arrecadação Digital (M-Pesa)" 
            value="240.500 MT" 
            subtitle="100% Confirmado" 
          />
          <KPICard 
            title="Arrecadação Física (Dinheiro)" 
            value="85.200 MT" 
            subtitle="Aguardando Depósito" 
          />
          <KPICard 
            title="Despesa (Manutenção)" 
            value="42.000 MT" 
            subtitle="Mês Atual"
          />
          <KPICard 
            title="Lucro Líquido" 
            value="283.700 MT" 
            subtitle="+15% vs mês anterior"
          />
        </div>

        {/* Seção de Auditoria de Cobradores */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Conciliação por Cobrador</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b">
                <th className="px-6 py-4">Cobrador</th>
                <th className="px-6 py-4 text-center">Vendas Dinheiro</th>
                <th className="px-6 py-4 text-center">Status de Entrega</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">Mateus José</td>
                <td className="px-6 py-4 text-center font-bold text-slate-700">12.400 MT</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase">
                    Pendente
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-emerald-600 font-bold text-sm">Confirmar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AuthGuard>
  );
}