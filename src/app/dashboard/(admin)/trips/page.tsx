"use client";
import { useState, useEffect } from "react";

type Bus = { id: number; plate: string; model: string };
type Location = { id: number; name: string };
type Trip = {
  id: number;
  origin: string;
  destination: string;
  departure: string;
  price: number;
  bus: Bus;
};

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ origin: "", destination: "", departure: "", price: "", busId: "" });

  async function fetchData() {
    try {
      const [rTrips, rBuses, rLocs] = await Promise.all([
        fetch("/api/trips"),
        fetch("/api/buses"),
        fetch("/api/locations")
      ]);
      setTrips(await rTrips.json());
      setBuses(await rBuses.json());
      setLocations(await rLocs.json());
      setLoading(false);
    } catch (error) { console.error("Erro ao carregar dados"); }
  }

  useEffect(() => { fetchData(); }, []);

  async function handleAddCity() {
    if (!newCity.trim()) return;
    const res = await fetch("/api/locations", {
      method: "POST",
      body: JSON.stringify({ name: newCity }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      setNewCity("");
      fetchData();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.origin === form.destination) return alert("Origem e Destino não podem ser iguais!");

    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ origin: "", destination: "", departure: "", price: "", busId: "" });
      fetchData();
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Eliminar esta viagem?")) return;
    await fetch("/api/trips", { method: "DELETE", body: JSON.stringify({ id }) });
    fetchData();
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">📅 Gestão de Viagens</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1 space-y-6">
          {/* CADASTRO DE CIDADES */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-sm font-bold mb-2 text-gray-600 uppercase">Aumentar Destinos</h2>
            <div className="flex gap-2">
              <input 
                className="flex-1 p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Beira"
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
              />
              <button onClick={handleAddCity} className="bg-gray-800 text-white px-4 rounded-lg font-bold">+</button>
            </div>
          </div>

          {/* FORMULÁRIO DE VIAGEM */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Nova Viagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Origem</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.origin}
                  onChange={e => setForm({...form, origin: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Destino</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.destination}
                  onChange={e => setForm({...form, destination: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Partida</label>
                <input type="datetime-local" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={form.departure} onChange={e => setForm({...form, departure: e.target.value})} required />
              </div>
              <div>
                <label className="text-sm font-medium">Preço (MT)</label>
                <input type="number" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
              </div>
              <div>
                <label className="text-sm font-medium">Autocarro</label>
                <select className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={form.busId} onChange={e => setForm({...form, busId: e.target.value})} required>
                  <option value="">Selecione...</option>
                  {buses.map(bus => <option key={bus.id} value={bus.id}>{bus.plate} - {bus.model}</option>)}
                </select>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">Agendar Viagem</button>
            </form>
          </div>
        </div>

        {/* TABELA */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Horários Agendados</h2>
          {loading ? <p>Carregando...</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                    <th className="p-4 border-b">Rota</th>
                    <th className="p-4 border-b">Data e Hora</th>
                    <th className="p-4 border-b">Autocarro</th>
                    <th className="p-4 border-b">Preço</th>
                    <th className="p-4 border-b text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {trips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-semibold">{trip.origin} <span className="text-blue-500">→</span> {trip.destination}</td>
                      <td className="p-4 text-gray-600">{new Date(trip.departure).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' })}</td>
                      <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">{trip.bus?.plate}</span></td>
                      <td className="p-4 font-bold text-green-700">{Number(trip.price).toFixed(2)} MT</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(trip.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}