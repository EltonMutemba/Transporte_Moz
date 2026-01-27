/* D:\Users\steli\Desktop\Transportadoras\transporte-moz\src\app\admin\page.tsx */
import { KPICard } from "@/components/dashboard/KPICard";

export default function AdminPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Painel Administrativo — TransPorto
      </h1>

      {/* Seus KPICards originais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KPICard title="Receita Hoje" value="1.250 MT" subtitle="+12% vs ontem" />
        <KPICard title="Total do Mês" value="32.400 MT" />
        <KPICard title="Viagens Ativas" value="18" />
        <KPICard title="Cobradores Online" value="5" />
      </div>

      {/* Nova Tabela de Monitoramento de Viagens */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="text-lg font-bold text-gray-800">Status da Frota em Tempo Real</h3>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Live</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Autocarro / Matrícula</th>
                <th className="px-6 py-4">Rota Atual</th>
                <th className="px-6 py-4 text-center">Ocupação</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              <tr className="hover:bg-gray-50 transition-colors bg-white">
                <td className="px-6 py-4 font-semibold text-gray-900">Autocarro 12 (ABC-123-MC)</td>
                <td className="px-6 py-4 text-gray-600">Maputo → Xai-Xai</td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-blue-700">42 / 50</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
                    Em Viagem
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:underline font-medium">Ver Detalhes</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors bg-white">
                <td className="px-6 py-4 font-semibold text-gray-900">Autocarro 07 (AAB-001-MC)</td>
                <td className="px-6 py-4 text-gray-400 italic">Aguardando escala...</td>
                <td className="px-6 py-4 text-center text-gray-400">-</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase">
                    Disponível
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:underline font-medium">Escalar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}