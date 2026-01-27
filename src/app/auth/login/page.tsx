"use client";
import { useState } from "react";
import { authenticate } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const user = authenticate(username, password);

    if (user) {
      // Salva em cookie
      document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${60 * 60 * 24}`;
      // Redireciona para rota do role
      router.push(`/${user.role}`);
    } else {
      setError("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">TransPorto</h1>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">{error}</p>}
        <input 
          type="text" placeholder="Usuário" 
          className="border w-full p-2 mb-4 rounded"
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" placeholder="Senha" 
          className="border w-full p-2 mb-6 rounded"
          onChange={e => setPassword(e.target.value)} 
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
