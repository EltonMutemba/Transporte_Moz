/*D:\Users\steli\Desktop\Transportadoras\transporte-moz\src\app\admin\users\page.tsx*/

"use client";
import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/shared/AuthGuard";

type User = { username: string; role: string };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [editing, setEditing] = useState<User | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    const url = "/api/users";
    const method = editing ? "PUT" : "POST";
    const body = JSON.stringify({ username, password, role });

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body });
    const data = await res.json();
    alert(data.message || data.error);

    setUsername(""); setPassword(""); setRole("cliente"); setEditing(null);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setUsername(user.username);
    setPassword(""); // deixar em branco para nova senha
    setRole(user.role);
    setEditing(user);
  };

  const handleDelete = async (username: string) => {
    if (!confirm(`Deseja remover o usuário "${username}"?`)) return;

    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchUsers();
  };

  return (
    <AuthGuard allowedRoles={["admin", "dono"]}>
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-500">Administre as permissões de acesso ao sistema TransPorto.</p>
        </header>
  
        {/* Formulário Estilizado */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editing ? "✏️ Editar Usuário" : "➕ Adicionar Novo Usuário"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Nome de usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="dono">Dono</option>
              <option value="cobrador">Cobrador</option>
              <option value="cliente">Cliente</option>
            </select>
            <button 
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${editing ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`} 
              onClick={handleSave}
            >
              {editing ? "Atualizar Dados" : "Criar Usuário"}
            </button>
          </div>
        </div>
  
        {/* Tabela Profissional */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-bold">
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Nível de Acesso</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{u.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      u.role === 'admin' ? 'bg-red-100 text-red-700' : 
                      u.role === 'cobrador' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button onClick={() => handleEdit(u)} className="text-amber-600 hover:text-amber-800 font-medium">Editar</button>
                    <button onClick={() => handleDelete(u.username)} className="text-red-600 hover:text-red-800 font-medium">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthGuard>
  )
}