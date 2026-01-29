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

/* -------------------- TIPOS -------------------- */
type LoginMethod = "phone" | "email";

interface LoginFormState {
  phone: string;
  email: string;
  password: string;
}

/* -------------------- SIMULAÇÃO DE API -------------------- */
async function fakeAuthRequest(data: LoginFormState, method: LoginMethod) {
  await new Promise((res) => setTimeout(res, 1200));

  if (data.password.length < 6) {
    throw new Error("A palavra-passe deve ter no mínimo 6 caracteres.");
  }

  if (method === "phone" && !/^(82|83|84|85|86|87)\d{7}$/.test(data.phone)) {
    throw new Error("Número de telemóvel inválido para Moçambique.");
  }

  if (method === "email" && !/^\S+@\S+\.\S+$/.test(data.email)) {
    throw new Error("Endereço de e-mail inválido.");
  }

  return { success: true };
}

/* -------------------- COMPONENTE -------------------- */
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
      await fakeAuthRequest(form, loginMethod);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">

      {/* -------------------- LADO VISUAL -------------------- */}
      <div className="hidden lg:flex bg-slate-950 p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20">
              T
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              TransPorto<span className="text-blue-500">Moz</span>
            </span>
          </Link>

          <h2 className="text-5xl font-black text-white italic leading-tight tracking-tighter">
            A TUA VIAGEM,<br />
            <span className="text-blue-500 underline decoration-white/10">
              BEM GESTIONADA.
            </span>
          </h2>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4 text-white/60">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <p className="text-sm font-bold uppercase tracking-widest">
              Acesso Seguro e Encriptado
            </p>
          </div>
        </div>

        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* -------------------- FORMULÁRIO -------------------- */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-10">

          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
              Entrar na Conta
            </h1>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">
              Introduza as suas credenciais
            </p>
          </div>

          {/* MÉTODO */}
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <MethodButton
              active={loginMethod === "phone"}
              onClick={() => setLoginMethod("phone")}
              icon={<Smartphone className="w-4 h-4" />}
              label="Telemóvel"
            />
            <MethodButton
              active={loginMethod === "email"}
              onClick={() => setLoginMethod("email")}
              icon={<Mail className="w-4 h-4" />}
              label="E-mail"
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {loginMethod === "phone" ? (
              <AuthInput
                name="phone"
                label="Número de Telemóvel"
                placeholder="84xxxxxxx"
                icon={<Phone className="w-4 h-4" />}
                value={form.phone}
                onChange={handleChange}
              />
            ) : (
              <AuthInput
                name="email"
                label="Endereço de E-mail"
                placeholder="exemplo@email.com"
                icon={<Mail className="w-4 h-4" />}
                value={form.email}
                onChange={handleChange}
              />
            )}

            <AuthInput
              name="password"
              label="Palavra-passe"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="w-4 h-4" />}
              value={form.password}
              onChange={handleChange}
            />

            {error && (
              <p className="text-red-600 text-sm font-bold text-center">
                {error}
              </p>
            )}

            <Button
              disabled={isLoading}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-[11px] tracking-[0.3em] uppercase shadow-xl shadow-blue-200"
            >
              {isLoading ? "Autenticando..." : "Entrar"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <button className="w-full h-14 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
            <Facebook className="w-5 h-5 text-blue-600 fill-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Entrar com Facebook
            </span>
          </button>

          <p className="text-center text-sm text-slate-500">
            Não tem conta?
            <Link
              href="/register"
              className="text-blue-600 font-black uppercase tracking-widest ml-1 hover:underline"
            >
              Registar Agora
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

/* -------------------- COMPONENTES AUXILIARES -------------------- */

function MethodButton({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
      ${active ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
    >
      {icon} {label}
    </button>
  );
}

function AuthInput({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  value,
  onChange
}: {
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <input
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          aria-label={label}
          className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-[15px] font-semibold focus:border-blue-600 focus:outline-none focus:bg-white transition-all"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
