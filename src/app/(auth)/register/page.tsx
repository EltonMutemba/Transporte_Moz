"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  User, Phone, Mail, Lock, ArrowRight, 
  ChevronLeft, ShieldCheck, CheckCircle2 
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    // Validações Rápidas (O Olhar do Treinador)
    if (form.password !== form.confirmPassword) {
      return setError("As palavras-passe não coincidem.");
    }
    if (!/^(82|83|84|85|86|87)\d{7}$/.test(form.phone)) {
      return setError("Use um número de Moçambique válido (ex: 841234567).");
    }

    setIsLoading(true);
    try {
      // Simulação de criação de conta
      await new Promise(res => setTimeout(res, 2000));
      router.push("/login?registered=true");
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      
      {/* LADO INFORMATIVO (REDUZIDO PARA FOCO NO FORM) */}
      <div className="hidden lg:flex lg:w-1/3 bg-blue-600 p-12 flex-col justify-between text-white">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-20">
            <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center font-black text-2xl">T</div>
            <span className="text-2xl font-black tracking-tight">TransPortoMoz</span>
          </Link>
          <h2 className="text-4xl font-black italic leading-tight tracking-tighter mb-6">
            JUNTA-TE À <br />NOSSA REDE.
          </h2>
          <p className="text-blue-100 font-medium text-sm leading-relaxed uppercase tracking-wider">
            Cria a tua conta para gerir bilhetes, encomendas e ganhar pontos em cada viagem.
          </p>
        </div>
        
        <div className="space-y-4">
          <FeatureItem icon={<CheckCircle2 className="w-4 h-4" />} text="Bilhetes Digitais QR" />
          <FeatureItem icon={<CheckCircle2 className="w-4 h-4" />} text="Gestão de Carga Real-time" />
          <FeatureItem icon={<CheckCircle2 className="w-4 h-4" />} text="Pagamentos via M-Pesa" />
        </div>
      </div>

      {/* FORMULÁRIO DE REGISTO */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-xl">
          
          <div className="mb-10">
            <Link href="/login" className="inline-flex items-center text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6 transition-all">
              <ChevronLeft className="w-4 h-4 mr-1" /> Voltar ao Login
            </Link>
            <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Criar Nova Conta</h1>
            <p className="text-slate-500 font-bold text-[12px] uppercase tracking-widest mt-2">Preencha os seus dados oficiais</p>
          </div>

          <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <RegisterInput name="name" label="Nome Completo (Conforme BI)" placeholder="Ex: Stélio Baloi" icon={<User className="w-4 h-4" />} value={form.name} onChange={handleChange} />
            </div>

            <RegisterInput name="phone" label="Telemóvel" placeholder="84xxxxxxx" icon={<Phone className="w-4 h-4" />} value={form.phone} onChange={handleChange} />
            
            <RegisterInput name="email" label="E-mail (Opcional)" placeholder="seu@email.com" icon={<Mail className="w-4 h-4" />} value={form.email} onChange={handleChange} />

            <RegisterInput name="password" label="Palavra-passe" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} value={form.password} onChange={handleChange} />
            
            <RegisterInput name="confirmPassword" label="Confirmar Passe" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} value={form.confirmPassword} onChange={handleChange} />

            {error && (
              <div className="md:col-span-2 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-xs font-black text-center uppercase tracking-widest">
                {error}
              </div>
            )}

            <div className="md:col-span-2 pt-4">
              <Button disabled={isLoading} className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-[13px] tracking-[0.2em] uppercase shadow-xl transition-all">
                {isLoading ? "Criando conta..." : "Finalizar Registo"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <p className="md:col-span-2 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-8 leading-relaxed">
              Ao registar-se, concorda com os nossos <span className="text-blue-600 underline">Termos de Uso</span> e a <span className="text-blue-600 underline">Política de Privacidade</span> da TransPorto Moz.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

/* -------------------- SUB-COMPONENTES -------------------- */

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-blue-100">
      {icon} {text}
    </div>
  );
}

function RegisterInput({ name, label, placeholder, icon, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input 
          name={name} type={type} required value={value} onChange={onChange}
          className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[15px] font-semibold focus:border-blue-600 focus:outline-none focus:bg-white transition-all" 
          placeholder={placeholder} 
        />
      </div>
    </div>
  );
}