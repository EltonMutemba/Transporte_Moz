/* D:\Users\steli\Desktop\Transportadoras\transporte-moz\src\app\cobrador\page.tsx */
"use client";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useState } from "react";

export default function CobradorPage() {
  const [viagemAtiva, setViagemAtiva] = useState(true);

  return (
    <AuthGuard allowedRoles={["cobrador", "admin"]}>
      <div className="min-h-screen bg-slate-50 p-4 pb-20">
        {/* Header com Identificação */}
        <header className="bg-white p-4 rounded-xl shadow-sm mb-6 border-l-4 border-orange-500">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Cobrador Ativo</p>
          <h1 className="text-xl font-bold text-slate-900">Mateus José</h1>
          <p className="text-sm text-slate-600">Autocarro 12 | ABC-123-MC</p>
        </header>

        {/* Status da Viagem */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-6 text-center">
          <p className="text-blue-100 text-sm mb-1">Rota Atual</p>
          <h2 className="text-2xl font-black mb-4">Maputo → Beira</h2>
          <div className="flex justify-around bg-blue-700 bg-opacity-50 py-3 rounded-xl">
            <div>
              <p className="text-xs text-blue-200">Ocupação</p>
              <p className="text-xl font-bold">42 / 50</p>
            </div>
            <div className="border-l border-blue-500"></div>
            <div>
              <p className="text-xs text-blue-200">Dinheiro (Cash)</p>
              <p className="text-xl font-bold">8.400 MT</p>
            </div>
          </div>
        </div>

        {/* Ações Principais (Botões Grandes) */}
        <div className="grid grid-cols-1 gap-4">
          <button className="bg-white border-2 border-slate-200 p-6 rounded-2xl flex items-center justify-between hover:border-orange-500 transition-all active:scale-95">
            <div className="text-left">
              <p className="text-lg font-bold text-slate-800">Validar Bilhete</p>
              <p className="text-sm text-slate-500">Escanear QR Code ou Código</p>
            </div>
            <span className="text-2xl">📷</span>
          </button>

          <button className="bg-white border-2 border-slate-200 p-6 rounded-2xl flex items-center justify-between hover:border-orange-500 transition-all active:scale-95">
            <div className="text-left">
              <p className="text-lg font-bold text-slate-800">Venda Direta</p>
              <p className="text-sm text-slate-500">Receber em Dinheiro/Cash</p>
            </div>
            <span className="text-2xl">💵</span>
          </button>

          <button className="bg-white border-2 border-slate-200 p-6 rounded-2xl flex items-center justify-between hover:border-orange-500 transition-all active:scale-95">
            <div className="text-left">
              <p className="text-lg font-bold text-slate-800">Nova Encomenda</p>
              <p className="text-sm text-slate-500">Registar carga no porão</p>
            </div>
            <span className="text-2xl">📦</span>
          </button>
        </div>

        {/* Lista Rápida de Passageiros */}
        <div className="mt-8">
          <h3 className="font-bold text-slate-800 mb-4 px-2">Últimos Embarques</h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-bold text-slate-900">Assento {24 + i}</p>
                  <p className="text-xs text-slate-500">Validado às 07:1{i}</p>
                </div>
                <span className="text-emerald-500 font-bold text-sm">✓ Pago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}