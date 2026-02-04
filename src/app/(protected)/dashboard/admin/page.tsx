import React from "react";
import { Bus, MapPin, Wallet, TrendingUp, Clock, ArrowUpRight, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getOperationalData() {
  try {
    const [trips, totalBuses, totalClients, revenueData] = await Promise.all([
      prisma.trip.findMany({
        take: 5,
        orderBy: { departureTime: 'asc' },
        include: { bus: true } 
      }),
      prisma.bus.count(),
      prisma.user.count({
        where: { role: 'CLIENT' }
      }),
      prisma.trip.aggregate({
        _sum: { price: true },
        where: { status: 'AVAILABLE' }
      })
    ]);

    const totalRevenue = Number(revenueData._sum.price || 0);

    return { 
      trips: trips || [], 
      activeBuses: totalBuses || 0, 
      totalUsers: totalClients || 0,
      totalRevenue
    };
  } catch (error) {
    console.error("Erro na busca de dados:", error);
    return { trips: [], activeBuses: 0, totalUsers: 0, totalRevenue: 0 };
  }
}

export default async function AdminDashboardPage() {
  const { trips, activeBuses, totalUsers, totalRevenue } = await getOperationalData();

  return (
    <div className="space-y-10 pb-20 w-full max-w-full overflow-hidden animate-in fade-in duration-500">
      
      {/* HEADER - APENAS TÍTULO [cite: 2026-02-04] */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-2 text-blue-600">
          <TrendingUp size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Painel de Controle</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
          Visão <span className="text-blue-600">Geral</span>
        </h1>
      </div>

      {/* KPIs DINÂMICOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Clientes" value={totalUsers.toString()} icon={<Users size={20} />} color="bg-blue-600" trend="Passageiros" />
        <StatCard 
          label="Receita em Rota" 
          value={`${totalRevenue.toLocaleString('pt-MZ')} MT`} 
          icon={<Wallet size={20} />} 
          color="bg-indigo-600" 
          trend="Valor Bruto" 
        />
        <StatCard label="Frota Operacional" value={activeBuses.toString()} icon={<Bus size={20} />} color="bg-emerald-600" trend="Unidades" />
      </div>

      {/* ÁREA DE GESTÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* INFO STATUS */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm h-fit">
          <h3 className="text-xs font-black uppercase text-slate-900 mb-6 flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" /> Status do Sistema
          </h3>
          <p className="text-[10px] text-slate-400 font-medium mb-6 uppercase leading-relaxed">
            As métricas refletem os dados em tempo real. O uso de componentes limpos ajuda na responsividade mobile. [cite: 2026-02-04]
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">TPMOZ v1.0</span>
          </div>
        </div>

        {/* LISTAGEM DE ATIVIDADE */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Atividade em Rota</h2>
            <span className="text-[9px] font-bold text-blue-600 uppercase flex items-center gap-1">Próximas Partidas</span>
          </div>
          <div className="p-6 space-y-4">
            {trips.length > 0 ? trips.map((trip: any) => (
              <div key={trip.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Clock size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 uppercase">{trip.origin} → {trip.destination}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">
                      {Number(trip.price).toFixed(2)} MT • {trip.bus?.plate || 'A definir'}
                    </p>
                  </div>
                </div>
                <StatusBadge status={trip.status} />
              </div>
            )) : (
              <div className="py-12 text-center text-[10px] font-black text-slate-300 uppercase italic">
                Sem viagens programadas
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTES ---

function StatCard({ label, value, icon, color, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between transition-all">
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase">{trend}</span>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${color}`}>
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    AVAILABLE: "bg-emerald-50 text-emerald-600 border-emerald-100",
    ON_ROAD: "bg-blue-50 text-blue-600 border-blue-100",
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase border ${styles[status] || "bg-slate-50 text-slate-400"}`}>
      {status === 'AVAILABLE' ? 'Disponível' : status}
    </span>
  );
}