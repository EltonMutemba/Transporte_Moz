"use client";
import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/shared/AuthGuard";

// 1. O tipo agora inclui ID numérico
type User = { id: number; username: string; role: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [editing, setEditing] = useState<User | null>(null);

  // Carregar usuários
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const text = await res.text();
      if (text) setUsers(JSON.parse(text));
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Limpar formulário
  const resetForm = () => {
    setEditing(null);
    setUsername("");
    setPassword("");
    setRole("cliente");
  };

  // Salvar (POST ou PUT usando ID)
  const handleSave = async () => {
    if (!username || (!editing && !password)) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    const method = editing ? "PUT" : "POST";
    const body = JSON.stringify({ 
      id: editing?.id, // Envia o ID invisível se estiver a editar
      username, 
      password, 
      role 
    });

    try {
      const res = await fetch("/api/users", { 
        method, 
        headers: { "Content-Type": "application/json" }, 
        body 
      });

      if (res.ok) {
        alert(editing ? "Utilizador atualizado!" : "Criado com sucesso!");
        resetForm();
        fetchUsers();
      } else {
        alert("Erro na operação (O nome pode já existir)");
      }
    } catch (error) {
      alert("Erro de conexão");
    }
  };

  const handleEdit = (user: User) => {
    setEditing(user);
    setUsername(user.username);
    setPassword(""); 
    setRole(user.role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja mesmo remover este utilizador?")) return;
    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Deleta pelo ID
      });
      fetchUsers();
    } catch (error) {
      alert("Erro ao eliminar");
    }
  };

  return (
    <AuthGuard allowedRoles={["admin", "dono"]}>
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Gestão de Usuários</h1>
        </header>

        {/* Formulário */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {editing ? `✏️ Editando: ${editing.username}` : "➕ Novo Usuário"}
            </h2>
            {editing && (
              <button onClick={resetForm} className="text-sm text-red-600 hover:underline">
                Cancelar e Criar Novo
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Nome de usuário"
              value={username}
              onChange={e => setUsername(e.target.value)} // CAMPO LIBERADO
            />
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={editing ? "Nova senha (opcional)" : "Senha"}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none"
            >
              <option value="admin">Admin</option>
              <option value="dono">Dono</option>
              <option value="cobrador">Cobrador</option>
              <option value="cliente">Cliente</option>
            </select>
            <button 
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${editing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`} 
              onClick={handleSave}
            >
              {editing ? "Salvar Alterações" : "Criar Usuário"}
            </button>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-gray-600 uppercase text-xs font-bold">
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Cargo</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{u.username}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button onClick={() => handleEdit(u)} className="text-amber-600 hover:text-amber-800 font-bold">Editar</button>
                    <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:text-red-800 font-bold">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthGuard>
  );
}