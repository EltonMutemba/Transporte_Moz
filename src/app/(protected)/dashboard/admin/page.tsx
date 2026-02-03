import React from "react";
import { 
  Users, Bus, Wallet, AlertTriangle, 
  ArrowUpRight, TrendingUp, MapPin, MoreHorizontal 
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
            Visão <span className="text-red-600">Geral</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Bem-vindo ao centro de comando operacional.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            Exportar PDF
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-slate-200">
            Novo Relatório
          </button>
        </div>
      </div>

      {/* 2. GRID DE CARTÕES (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Receita Mensal" 
          value="1.240.500 MT" 
          icon={<Wallet size={20}/>} 
          trend="+14.2%" 
          color="blue"
        />
        <StatCard 
          label="Utilizadores Ativos" 
          value="4.821" 
          icon={<Users size={20}/>} 
          trend="+5.1%" 
          color="indigo"
        />
        <StatCard 
          label="Frota em Movimento" 
          value="32 / 45" 
          icon={<Bus size={20}/>} 
          trend="82%" 
          color="emerald"
        />
        <StatCard 
          label="Alertas de Manutenção" 
          value="07" 
          icon={<AlertTriangle size={20}/>} 
          isCritical 
          color="red"
        />
      </div>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL (Duas Colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TABELA DE ÚLTIMAS TRANSAÇÕES (Larga) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">Fluxo de Caixa Recente</h3>
            <TrendingUp size={16} className="text-slate-300" />
          </div>
          <div className="p-2 overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Rota</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <TransactionRow name="Helton Stélio" route="Maputo ➔ Beira" amount="2.500 MT" status="Pago" />
                <TransactionRow name="Artur Mutemba" route="Matola ➔ Xai-Xai" amount="800 MT" status="Pago" />
                <TransactionRow name="Sara Macuácua" route="Nampula ➔ Pemba" amount="3.200 MT" status="Pendente" />
              </tbody>
            </table>
          </div>
        </div>

        {/* LISTA DE ALERTAS / MONITORAMENTO (Estreita) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Monitor de Frota</h3>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          
          <div className="space-y-6">
            <FleetAlert bus="TPM-01-MP" location="Av. Eduardo Mondlane" status="Atrasado 12min" type="warning" />
            <FleetAlert bus="TPM-42-GZ" location="Portagem Sul" status="Em Movimento" type="success" />
            <FleetAlert bus="TPM-09-NB" location="Garagem Central" status="Manutenção" type="error" />
          </div>

          <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            Ver Mapa em Tempo Real
          </button>
        </div>

      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES (Poderiam estar em arquivos separados)

function StatCard({ label, value, icon, trend, isCritical, color }: any) {
  return (
    <div className="bg-white border border-slate-200/60 p-7 rounded-[2.5rem] hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 bg-${color}-50 text-${color}-600 rounded-2xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${isCritical ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">{label}</p>
      <p className={`text-2xl font-black mt-2 tracking-tighter ${isCritical ? 'text-red-600' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

function TransactionRow({ name, route, amount, status }: any) {
  return (
    <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4 rounded-l-2xl border-y border-l border-transparent group-hover:border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black uppercase">
            {name[0]}
          </div>
          <span className="font-bold text-slate-800 tracking-tight">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 border-y border-transparent group-hover:border-slate-100 text-slate-500 font-medium text-xs">
        {route}
      </td>
      <td className="px-6 py-4 border-y border-transparent group-hover:border-slate-100 font-black text-slate-900">
        {amount}
      </td>
      <td className="px-6 py-4 rounded-r-2xl border-y border-r border-transparent group-hover:border-slate-100 text-right">
        <button className="p-2 hover:bg-white rounded-lg transition-colors">
          <MoreHorizontal size={16} className="text-slate-400" />
        </button>
      </td>
    </tr>
  );
}

function FleetAlert({ bus, location, status, type }: any) {
  const colors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500"
  };

  return (
    <div className="flex items-start gap-4">
      <div className={`w-1 h-10 rounded-full ${colors[type as keyof typeof colors]}`} />
      <div>
        <p className="text-xs font-black tracking-tight">{bus}</p>
        <div className="flex items-center gap-1 text-slate-500 mt-0.5">
          <MapPin size={10} />
          <span className="text-[10px] font-bold">{location}</span>
        </div>
        <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${type === 'error' ? 'text-red-400' : 'text-slate-400'}`}>
          {status}
        </p>
      </div>
    </div>
  );
}