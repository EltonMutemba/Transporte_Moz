"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Facebook
} from "lucide-react";

type LoginMethod = "phone" | "email";

interface LoginFormState {
  phone: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<LoginFormState>({
    phone: "",
    email: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginMethod === "email" ? form.email : form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha na autenticação.");
      }

      // ✅ 1. Guarda o role para persistência no cliente
      localStorage.setItem("user-role", data.role);

      // ✅ 2. REDIRECIONAMENTO MULTI-CARGO (O GPS do TransPortoMoz)
      const role = data.role?.toUpperCase();
      
      
      switch (role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "OWNER":
          router.push("/dashboard/owner");
          break;
        case "STAFF":
          router.push("/dashboard/staff");
          break;
        case "CLIENT":
          router.push("/dashboard/client/viagens");
          break;
        default:
          // 🛑 BLOQUEIO TOTAL: Cargo desconhecido não entra no sistema
          setError("Erro Crítico: Cargo de utilizador não reconhecido. Contacte o suporte.");
          setIsLoading(false);
          return; // Para a execução aqui
      }
      
      router.refresh(); 
      
    } catch (err: any) {
      setError(err.message || "Erro ao conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* LADO VISUAL */}
      <div className="hidden lg:flex bg-slate-950 p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20">T</div>
            <span className="text-2xl font-black text-white tracking-tight">
              TransPorto<span className="text-blue-500">Moz</span>
            </span>
          </Link>
          <h2 className="text-5xl font-black text-white italic leading-tight tracking-tighter">
            A TUA VIAGEM,<br />
            <span className="text-blue-500 underline decoration-white/10">BEM GESTIONADA.</span>
          </h2>
        </div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* FORMULÁRIO */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Entrar na Conta</h1>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Introduza as suas credenciais do MySQL</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <MethodButton active={loginMethod === "phone"} onClick={() => setLoginMethod("phone")} icon={<Smartphone className="w-4 h-4" />} label="Telemóvel" />
            <MethodButton active={loginMethod === "email"} onClick={() => setLoginMethod("email")} icon={<Mail className="w-4 h-4" />} label="E-mail / User" />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginMethod === "phone" ? (
              <AuthInput name="phone" label="Número de Telemóvel" placeholder="84xxxxxxx" icon={<Phone className="w-4 h-4" />} value={form.phone} onChange={handleChange} />
            ) : (
              <AuthInput name="email" label="Utilizador ou E-mail" placeholder="admin ou admin@transporte.co.mz" icon={<Mail className="w-4 h-4" />} value={form.email} onChange={handleChange} />
            )}

            <AuthInput name="password" label="Palavra-passe" placeholder="••••••••" type="password" icon={<Lock className="w-4 h-4" />} value={form.password} onChange={handleChange} />

            {error && <p className="text-red-600 text-xs font-bold text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

            <Button disabled={isLoading} className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-[11px] tracking-[0.3em] uppercase shadow-xl transition-all disabled:opacity-50">
              {isLoading ? "A PROCESSAR..." : "Entrar Agora"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

function MethodButton({ active, onClick, icon, label }: any) {
  return (
    <button type="button" onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
      {icon} {label}
    </button>
  );
}

function AuthInput({ label, icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input {...props} required className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-[15px] font-semibold focus:border-blue-600 focus:outline-none transition-all" />
      </div>
    </div>
  );
}