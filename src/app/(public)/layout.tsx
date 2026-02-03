"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Phone, Mail, Package, Globe, User, 
  Menu, X, ChevronRight, LogIn 
} from "lucide-react";
import Footer from "@/components/Footer/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      
      {/* TOP BAR - Escondida em Mobile para focar no conteúdo */}
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

      {/* HEADER PRINCIPAL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          
          {/* LOGO - Ajustado para não quebrar em ecrãs pequenos */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-blue-600/20 shadow-lg group-hover:scale-105 transition-transform">
              T
            </div>
            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">
              TransPorto<span className="text-blue-600">Moz</span>
            </span>
          </Link>

          {/* NAV DESKTOP - Visível apenas em ecrãs grandes (Large) */}
          <nav className="hidden lg:flex gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <NavLink href="/" label="Início" />
            <Link href="/encomendas" className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-all">
              <Package className="w-4 h-4 text-blue-600" />
              Encomendas
            </Link>
            <NavLink href="/search" label="Bilhetes" />
            <NavLink href="/sobre" label="Empresa" />
          </nav>

          {/* BOTÕES DE ACÇÃO */}
          <div className="flex items-center gap-3 md:gap-6">
            <Link href="/login" className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-600 hover:text-blue-600 transition uppercase tracking-widest">
              <User className="w-4 h-4" />
              Entrar
            </Link>
            
            <Link href="/search" className="hidden xs:block">
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-7 h-10 md:h-11 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all shadow-lg shadow-blue-600/20 border-none">
                Reservar
              </Button>
            </Link>

            {/* BOTÃO HAMBÚRGUER - ESSENCIAL PARA RESPONSIVIDADE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 bg-slate-100 rounded-lg text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Abrir Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE OVERLAY - Aparece quando clicas no hambúrguer */}
        {isMenuOpen && (
          <div className="absolute top-[80px] left-0 w-full bg-white border-b border-slate-200 shadow-2xl lg:hidden animate-in slide-in-from-top duration-300 z-40">
            <nav className="flex flex-col p-6 space-y-4">
              <MobileNavLink href="/" label="Início" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/encomendas" label="Encomendas" onClick={() => setIsMenuOpen(false)} icon={<Package size={18} />} />
              <MobileNavLink href="/search" label="Pesquisar Bilhetes" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/sobre" label="Nossa Empresa" onClick={() => setIsMenuOpen(false)} />
              
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-xl text-sm font-bold"
                >
                  <div className="flex items-center gap-2">
                    <LogIn size={18} className="text-blue-600" /> Entrar na Conta
                  </div>
                  <ChevronRight size={16} />
                </Link>
                <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 h-12 rounded-xl font-bold uppercase tracking-widest text-[11px]">
                    Reservar Agora
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

// Componentes Auxiliares para manter o código limpo
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative hover:text-blue-600 transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick, icon }: { href: string; label: string; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center justify-between py-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon} {label}
      </div>
      <ChevronRight size={14} className="text-slate-300" />
    </Link>
  );
}