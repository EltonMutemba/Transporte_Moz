"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Package, Globe, User } from "lucide-react";
import Footer from "@/components/Footer/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // Mudamos o fundo geral para um cinza quase branco (slate-50) para o conteúdo saltar
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      
      {/* TOP BAR - Agora com um azul escuro profundo para dar autoridade */}
      <div className="bg-[#0f172a] text-slate-400 py-2.5 px-6 text-[10px] hidden md:block font-medium tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3 h-3 text-blue-500" /> +258 84 000 0000
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-3 h-3 text-blue-500" /> suporte@transporto.co.mz
            </span>
          </div>
          <div className="flex items-center gap-2 uppercase font-bold text-slate-300/80">
            <Globe className="w-3 h-3 text-blue-500" />
            <span>Maputo • Beira • Nampula • Tete</span>
          </div>
        </div>
      </div>

      {/* HEADER - Branco puro com sombra leve para flutuar sobre o fundo slate-50 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-blue-600/20 shadow-lg group-hover:scale-105 transition-transform">
              T
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">
              TransPorto<span className="text-blue-600">Moz</span>
            </span>
          </Link>

          <nav className="hidden lg:flex gap-10 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <NavLink href="/" label="Início" />
            <Link href="/encomendas" className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-all">
              <Package className="w-4 h-4 text-blue-600" />
              Encomendas
            </Link>
            <NavLink href="/search" label="Bilhetes" />
            <NavLink href="/sobre" label="Empresa" />
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition uppercase tracking-widest">
              <User className="w-4 h-4" />
              Entrar
            </Link>
            
            <Link href="/search">
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-7 h-11 text-[11px] font-bold uppercase tracking-[0.15em] transition-all shadow-lg shadow-blue-600/20 border-none">
                Reservar Agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO - O fundo slate-50/50 faz os elementos brancos dentro do 'children' brilharem */}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative hover:text-blue-600 transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">
      {label}
    </Link>
  );
}