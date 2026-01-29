"use client";
import { useState, useEffect } from "react";

export default function POSPage() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [form, setForm] = useState({ phone: "", paymentType: "Dinheiro" });
  const [loading, setLoading] = useState(false);

  // --- NOVOS ESTADOS PARA O BILHETE ---
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastTicket, setLastTicket] = useState<any>(null);

  useEffect(() => {
    fetch("/api/trips").then(res => res.json()).then(data => setTrips(data));
  }, []);

  async function loadOcupiedSeats(tripId: number) {
    const res = await fetch(`/api/tickets?tripId=${tripId}`);
    const data = await res.json();
    setOccupiedSeats(data.map((t: any) => t.seatNumber));
  }

  const handleTripChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const trip = trips.find((t: any) => t.id === Number(e.target.value));
    setSelectedTrip(trip);
    setSelectedSeat(null);
    if (trip) loadOcupiedSeats(trip.id);
  };

  const handlePrint = () => {
    window.print();
  };

  async function handleSell() {
    if (!selectedSeat || !form.phone) return alert("Selecione um lugar e insira o telefone!");

    setLoading(true);
    const res = await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify({
        tripId: selectedTrip.id,
        seatNumber: selectedSeat,
        phone: form.phone,
        paymentType: form.paymentType
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      const ticketData = await res.json();
      
      // Preparamos os dados para o recibo
      setLastTicket({
        ...ticketData,
        trip: selectedTrip 
      });
      setShowReceipt(true); // Abre o modal do bilhete
      
      setSelectedSeat(null);
      setForm({ ...form, phone: "" });
      loadOcupiedSeats(selectedTrip.id);
    } else {
      const err = await res.json();
      alert(err.error);
    }
    setLoading(false);
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen print:p-0 print:bg-white">
      {/* Esconde o painel principal na hora de imprimir */}
      <div className="print:hidden">
        <h1 className="text-3xl font-bold mb-8 text-blue-900 uppercase tracking-tight">🎫 Ponto de Venda (PDV)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SELEÇÃO E CLIENTE */}
          <div className="bg-white p-6 rounded-xl shadow-md border space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Detalhes da Venda</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Selecionar Viagem</label>
              <select className="w-full p-3 border rounded-lg bg-gray-50" onChange={handleTripChange}>
                <option value="">Escolha uma rota disponível...</option>
                {trips.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.origin} → {t.destination} ({new Date(t.departure).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            {selectedTrip && (
              <div className="space-y-4 pt-4 border-t animate-in fade-in">
                <div className="flex justify-between">
                  <span>Preço:</span>
                  <span className="font-bold text-green-600">{Number(selectedTrip.price).toFixed(2)} MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Autocarro:</span>
                  <span className="font-medium">{selectedTrip.bus.plate} ({selectedTrip.bus.capacity} lug.)</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Telefone do Passageiro</label>
                  <input 
                    type="text" className="w-full p-3 border rounded-lg" placeholder="84/85/82..." 
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pagamento</label>
                  <select className="w-full p-3 border rounded-lg" value={form.paymentType} onChange={e => setForm({...form, paymentType: e.target.value})}>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="E-Mola">E-Mola</option>
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">Assento Selecionado: <span className="font-bold text-lg">{selectedSeat || "Nenhum"}</span></p>
                </div>

                <button 
                  onClick={handleSell}
                  disabled={loading || !selectedSeat}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 transition"
                >
                  {loading ? "Processando..." : "Confirmar e Imprimir"}
                </button>
              </div>
            )}
          </div>

          {/* MAPA DE LUGARES */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-6 flex justify-between items-center">
              Escolha o Assento
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-200 rounded"></div> Livre</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded"></div> Ocupado</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded"></div> Selecionado</span>
              </div>
            </h2>

            {!selectedTrip ? (
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl text-gray-400">
                Selecione uma viagem para ver os lugares
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {Array.from({ length: selectedTrip.bus.capacity }, (_, i) => i + 1).map(seat => {
                  const isOccupied = occupiedSeats.includes(seat);
                  const isSelected = selectedSeat === seat;

                  return (
                    <button
                      key={seat}
                      disabled={isOccupied}
                      onClick={() => setSelectedSeat(seat)}
                      className={`
                        h-12 rounded-lg font-bold text-sm transition-all
                        ${isOccupied ? 'bg-red-100 text-red-400 cursor-not-allowed border-red-200' : 
                          isSelected ? 'bg-blue-600 text-white shadow-lg scale-110 ring-2 ring-blue-300' : 
                          'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}
                      `}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            )}
            
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center text-xs text-gray-500 italic">
              Frente do Autocarro (Motorista)
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DE RECIBO / BILHETE --- */}
      {showReceipt && lastTicket && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 print:relative print:p-0 print:bg-white">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border-t-8 border-blue-600 print:shadow-none print:border-0 print:max-w-full">
            
            <div className="text-center space-y-1 mb-6">
              <h2 className="text-2xl font-black text-blue-900 uppercase">Transporte Moz</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Recibo de Viagem</p>
            </div>

            <div className="border-y border-dashed border-gray-300 py-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 uppercase font-bold text-[10px]">De:</span>
                <span className="font-bold text-lg">{lastTicket.trip.origin}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 uppercase font-bold text-[10px]">Para:</span>
                <span className="font-bold text-lg">{lastTicket.trip.destination}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 text-[10px] uppercase font-bold">Data/Hora:</span>
                <span className="font-mono font-bold">
                  {new Date(lastTicket.trip.departure).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center mt-2 border border-blue-100">
                <span className="text-blue-800 text-xs font-bold uppercase">Lugar Nº</span>
                <span className="text-3xl font-black text-blue-600">{lastTicket.seatNumber}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Passageiro:</span>
                <span className="font-medium">{lastTicket.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pagamento:</span>
                <span className="font-medium text-gray-700">{lastTicket.paymentType}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="font-bold">TOTAL:</span>
                <span className="font-black text-blue-900">{Number(lastTicket.trip.price).toFixed(2)} MT</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t text-center space-y-4 print:mt-4">
              <p className="text-[9px] text-gray-400 font-mono">
                ID BILHETE: #{lastTicket.id.toString().padStart(6, '0')}<br/>
                Emitido em: {new Date().toLocaleString()}
              </p>
              
              <div className="flex gap-2 print:hidden">
                <button 
                  onClick={handlePrint}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition"
                >
                  Imprimir
                </button>
                <button 
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESTILO PARA IMPRESSÃO TÉRMICA OU A4 */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print\:relative, .print\:relative * { visibility: visible; }
          .print\:relative { 
            position: fixed; 
            left: 0; 
            top: 0; 
            width: 100%; 
            margin: 0; 
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}