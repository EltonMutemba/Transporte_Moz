"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  User, Phone, Mail, Lock, ArrowRight, ChevronLeft, Truck, ShieldCheck 
} from "lucide-react";
import { registerUser } from "@/application/actions/registerUser";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");

    if (password !== confirm) {
      return setError("As palavras-passe não coincidem.");
    }

    startTransition(async () => {
      const result = await registerUser(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-blue-100">
      
      {/* Lateral Esquerda - Identidade */}
      <div className="hidden lg:flex lg:w-1/3 bg-slate-950 p-16 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(37,99,235,0.15)_0%,transparent_50%)]" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-24 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              TransPorto<span className="text-blue-500">Moz</span>
            </span>
          </Link>
          
          <h2 className="text-5xl font-bold leading-[1.1] tracking-tight mb-8">
            Junte-se à <br />
            <span className="text-blue-500 italic font-medium">maior rede</span> <br />
            logística.
          </h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
            Crie sua conta e tenha acesso imediato à reserva de bilhetes e gestão de encomendas em todo o território nacional.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-slate-400 text-xs font-medium bg-white/5 p-3 rounded-lg border border-white/5">
            <ShieldCheck className="text-emerald-500 w-4 h-4" />
            Dados protegidos por encriptação AES-256
          </div>
        </div>
      </div>

      {/* Área do Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-20 bg-slate-50/30">
        <div className="w-full max-w-2xl">
          <div className="mb-10">
            <Link href="/login" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-6 transition-all group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Voltar ao Login
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Criar nova conta</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Preencha os dados abaixo para começar.</p>
          </div>

          <form action={handleSubmit} className="grid md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="md:col-span-2">
              <RegisterInput name="name" label="Nome Completo" placeholder="Ex: Stélio Mutemba" icon={<User className="w-4 h-4" />} />
            </div>
            <RegisterInput name="phone" label="Telemóvel" placeholder="84xxxxxxx" icon={<Phone className="w-4 h-4" />} />
            <RegisterInput name="email" label="E-mail" placeholder="seu@email.com" icon={<Mail className="w-4 h-4" />} />
            <RegisterInput name="password" label="Palavra-passe" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
            <RegisterInput name="confirmPassword" label="Confirmar Passe" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-3"
              >
                <div className="w-1 h-4 bg-red-500 rounded-full" />
                {error}
              </motion.div>
            )}

            <div className="md:col-span-2 pt-4">
              <Button 
                disabled={isPending} 
                className="w-full h-14 bg-slate-950 hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-all shadow-xl shadow-slate-200 border-none group"
              >
                {isPending ? "A processar registo..." : "Finalizar Registo"} 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-medium">
                Ao registar-se, concorda com os nossos <Link href="#" className="text-blue-600 underline">Termos de Serviço</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function RegisterInput({ name, label, icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          {icon}
        </div>
        <input 
          name={name} 
          required 
          {...props} 
          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300" 
        />
      </div>
    </div>
  );
}