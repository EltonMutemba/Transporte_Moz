"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Lock, ArrowRight, Smartphone, Truck, UserPlus, ShieldCheck, ChevronLeft 
} from "lucide-react";
import { loginUser } from "@/application/actions/loginUser";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // CORREÇÃO: Removido o async/await da função externa para não travar o fluxo do Next.js
  function handleSubmit(formData: FormData) {
    setError("");
    
    startTransition(async () => {
      // Deixamos a Action correr. Se ela redirecionar, o Next.js assume o controlo.
      // Se ela devolver um objeto de erro, nós capturamos.
      const result = await loginUser(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-blue-100">
      
      {/* Botão de Voltar Flutuante - Responsividade Mobile */}
      <Link 
        href="/" 
        className="lg:hidden absolute top-6 left-6 z-50 flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-blue-600 transition-colors bg-white/80 backdrop-blur-md p-2 rounded-lg border border-slate-100 shadow-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Início
      </Link>

      {/* Coluna Esquerda - Visual Executivo (Oculta em Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 p-16 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-24 group w-fit">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              TransPorto<span className="text-blue-500">Moz</span>
            </span>
          </Link>
          
          <h2 className="text-6xl font-bold leading-[1.1] tracking-tight mb-8">
            Conectando <br />
            <span className="text-blue-500 font-medium italic">Moçambique</span> <br />
            ao futuro.
          </h2>
          <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
            Aceda à plataforma de gestão de frotas e bilhética mais avançada do mercado nacional.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-slate-500 text-sm font-medium">
          <ShieldCheck className="text-emerald-500 w-5 h-5" />
          Sistema de Autenticação Encriptado
        </div>
      </div>

      {/* Coluna Direita - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-slate-50/30">
        <div className="w-full max-w-sm">
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Entrar</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Bem-vindo de volta ao seu painel.</p>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Telefone ou Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Smartphone className="w-4 h-4" />
                </div>
                <input 
                  name="login" 
                  type="text" 
                  required 
                  placeholder="84xxxxxxx ou email@com" 
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Palavra-passe</label>
                <Link href="#" className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase">Esqueceu?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" 
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-1 h-4 bg-red-500 rounded-full" />
                {error}
              </div>
            )}

            <Button 
              type="submit"
              disabled={isPending} 
              className="w-full h-14 bg-slate-950 hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-all shadow-xl shadow-slate-200 border-none group"
            >
              {isPending ? "A verificar..." : "Entrar no Sistema"} 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="text-center pt-8 border-t border-slate-100 mt-8">
              <p className="text-sm text-slate-500 font-medium">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-blue-600 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                  Criar conta <UserPlus className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}