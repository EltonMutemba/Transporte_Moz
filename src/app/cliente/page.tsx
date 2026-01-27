/* D:\Users\steli\Desktop\Transportadoras\transporte-moz\src\app\cliente\page.tsx */
"use client";
import { useState } from "react";
import { SeatMap } from "@/components/cliente/SeatMap"; // Integrando o mapa que criamos

export default function ClientePage() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  
  // Estados para controlar a exibição das novas partes
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar de Cliente */}
      <nav className="bg-blue-700 p-4 text-white shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter italic">TransPorto</h1>
          <button className="text-sm font-medium bg-blue-800 px-4 py-2 rounded-lg">Meus Bilhetes</button>
        </div>
      </nav>

      {/* Hero / Busca */}
      <header className="bg-blue-600 pb-20 pt-10 px-4">
        <div className="max-w-2xl mx-auto text-center text-white mb-10">
          <h2 className="text-3xl font-bold mb-2">Para onde queres viajar?</h2>
          <p className="text-blue-100 italic">Reserva o teu bilhete em segundos e paga com M-Pesa.</p>
        </div>
      </header>

      {/* Formulário de Reserva - APENAS EXIBE SE NÃO ESTIVER NO PAGAMENTO */}
      {!mostrarPagamento && (
        <div className="max-w-2xl mx-auto -mt-16 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Origem</label>
                <select 
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                >
                  <option value="">Selecione a cidade</option>
                  <option>Maputo</option>
                  <option>Xai-Xai</option>
                  <option>Maxixe</option>
                  <option>Beira</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Destino</label>
                <select 
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                >
                  <option value="">Para onde vais?</option>
                  <option>Inhambane</option>
                  <option>Vilankulo</option>
                  <option>Tete</option>
                  <option>Nampula</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Data de Partida</label>
              <input type="date" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>

            <button 
              onClick={() => setMostrarMapa(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Procurar Viagens Disponíveis
            </button>
          </div>

          {/* PARTE DE ESCOLHA DE ASSENTO (Aparece após clicar em Procurar) */}
          {mostrarMapa && (
            <div className="mt-10 p-6 bg-white rounded-2xl shadow-xl border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <h3 className="text-center font-bold text-slate-700 mb-6">Escolha o seu assento no autocarro:</h3>
              <SeatMap 
                capacity={40} 
                occupiedSeats={[1, 2, 10, 15]} 
                onSelect={(seat) => setSelectedSeat(seat)} 
              />
              
              {selectedSeat && (
                <div className="mt-8 flex flex-col gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center">
                    <span className="font-medium text-blue-900">Lugar Selecionado:</span>
                    <span className="text-2xl font-black text-blue-700">{selectedSeat}</span>
                  </div>
                  <button 
                    onClick={() => setMostrarPagamento(true)}
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-700"
                  >
                    Confirmar e Ir para Pagamento
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Info Extra: Encomendas */}
          <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-blue-900">Enviar Encomendas?</h4>
              <p className="text-sm text-blue-700">Temos espaço no porão para a tua carga.</p>
            </div>
            <span className="text-3xl">📦</span>
          </div>
        </div>
      )}

      {/* TELA DE PAGAMENTO M-PESA (Substitui tudo quando confirmado) */}
      {mostrarPagamento && (
        <div className="max-w-md mx-auto mt-10 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-red-600 text-center">
            <h2 className="text-2xl font-black text-red-600 mb-4 font-sans">M-Pesa</h2>
            <p className="text-slate-600 mb-6 font-medium">Lugar {selectedSeat} reservado! Insira o número M-Pesa para pagar 500 MT.</p>
            <input 
              type="number" 
              placeholder="84 / 85..." 
              className="w-full text-center text-2xl p-4 border-2 border-slate-200 rounded-2xl mb-6 outline-none focus:border-red-600"
            />
            <button className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg">
              Pagar Agora
            </button>
            <button 
              onClick={() => setMostrarPagamento(false)}
              className="mt-6 text-slate-400 text-sm hover:underline"
            >
              Cancelar e mudar lugar
            </button>
          </div>
        </div>
      )}

      {/* Destaque M-Pesa */}
      <footer className="mt-20 p-10 text-center">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Parceiro Oficial de Pagamento</p>
        <div className="mt-2 flex justify-center gap-4 opacity-50 grayscale">
          <span className="font-black text-xl text-red-600">M-Pesa</span>
        </div>
      </footer>
    </div>
  );
}