// app/layout.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Instagram, Package, Search } from "lucide-react"; // Importei Package

// ... (metadata permanece igual)

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* TOP BAR (Igual) */}
      <div className="bg-blue-900 text-white py-2 px-6 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +258 84 000 0000</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> suporte@transporto.co.mz</span>
          </div>
          <div className="flex gap-4 font-bold uppercase tracking-tighter">
            <span>Maputo • Beira • Nampula • Tete</span>
          </div>
        </div>
      </div>

      {/* HEADER ATUALIZADO */}
      <header className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">T</div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              TransPorto<span className="text-blue-600">Moz</span>
            </span>
          </Link>

          {/* MENU DE NAVEGAÇÃO */}
          <nav className="hidden lg:flex gap-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600 transition">Início</Link>
            
            {/* ENCOMENDAS COM DESTAQUE */}
            <Link href="/encomendas" className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition group">
              <Package className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              Encomendas
            </Link>
            
            <Link href="/search" className="hover:text-blue-600 transition">Comprar Bilhete</Link>
            <Link href="/sobre" className="hover:text-blue-600 transition">A Empresa</Link>
            <Link href="/suporte" className="hover:text-blue-600 transition">Suporte</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-xs font-black text-slate-700 hover:text-blue-600 transition uppercase tracking-widest">
              Entrar
            </Link>
            <Link href="/search">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 h-12 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all active:scale-95">
                Reservar Agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      {/* FOOTER (Permanece igual ao teu código anterior) */}
    </div>
  );
}