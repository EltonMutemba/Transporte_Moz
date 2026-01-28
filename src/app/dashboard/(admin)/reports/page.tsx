"use client";
import { useState, useEffect, useCallback } from "react";

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para os filtros (Padrão: Hoje)
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/sales?start=${startDate}&end=${endDate}`);
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Erro ao carregar relatório");
    }
    setLoading(false);
  }, [startDate, endDate]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  if (loading && !data) return <div className="p-8 text-center font-bold text-blue-900">Gerando Relatórios...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">📊 Painel Financeiro</h1>
        
        {/* FILTROS DE DATA */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl shadow-sm border">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 ml-1">Início</span>
            <input 
              type="date" 
              className="p-1 text-sm border-none outline-none focus:ring-0" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 ml-1">Fim</span>
            <input 
              type="date" 
              className="p-1 text-sm border-none outline-none focus:ring-0" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
          <button 
            onClick={fetchReport}
            className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            🔄
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse shadow-lg">
          Atualizando dados...
        </div>
      )}

      {/* CARTÕES DE RESUMO (O código anterior mantém-se aqui) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Receita no Período</p>
          <p className="text-3xl font-black text-gray-800">{data?.totalRevenue?.toFixed(2) || "0.00"} MT</p>
        </div>
        {/* ... Outros cartões ... */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Bilhetes Vendidos</p>
          <p className="text-3xl font-black text-gray-800">{data?.totalSales || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Ticket Médio</p>
          <p className="text-3xl font-black text-gray-800">
            {data?.totalSales > 0 ? (data.totalRevenue / data.totalSales).toFixed(2) : "0.00"} MT
          </p>
        </div>
      </div>

      {/* TABELA E ESTATÍSTICAS (O código anterior mantém-se aqui) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <span className="font-bold text-gray-700">Histórico do Período</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 font-mono">
              {data?.tickets?.length} registos encontrados
            </span>
          </div>
          <table className="w-full text-left">
            {/* ... Tabela anterior ... */}
            <tbody className="divide-y text-sm">
              {data?.tickets?.map((t: any) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-600">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-bold">{t.trip.origin} → {t.trip.destination}</td>
                  <td className="p-4">Lugar {t.seatNumber}</td>
                  <td className="p-4 font-black">{Number(t.trip.price).toFixed(2)} MT</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.tickets?.length === 0 && (
            <div className="p-20 text-center text-gray-400 italic">Nenhuma venda registada neste intervalo.</div>
          )}
        </div>
        
        {/* ... Lado direito com estatísticas de pagamento ... */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit">
           <h2 className="text-lg font-bold mb-4 text-gray-700">Métodos de Pagamento</h2>
           {data?.paymentStats?.map((stat: any) => (
              <div key={stat.paymentType} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                <span className="font-medium">{stat.paymentType}</span>
                <span className="font-bold">{stat._count.id}</span>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}