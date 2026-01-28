// app/layout.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";

export const metadata = {
  title: "TransPorto Moz — Plataforma Nacional de Transporte",
  description: "Compre bilhetes rodoviários em Moçambique. Plataforma segura para passageiros e transportadoras.",
  openGraph: {
    title: "TransPorto Moz",
    description: "Bilhetes rodoviários digitais em Moçambique",
    url: "https://transporto.co.mz",
    siteName: "TransPorto Moz",
    locale: "pt_MZ",
    type: "website"
  }
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* TOP BAR */}
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

      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">T</div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              TransPorto<span className="text-blue-600">Moz</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600 transition">Início</Link>
            <Link href="/sobre" className="hover:text-blue-600 transition">A Empresa</Link>
            <Link href="/search" className="hover:text-blue-600 transition">Comprar Bilhete</Link>
            <Link href="/suporte" className="hover:text-blue-600 transition">Suporte</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-700 hover:text-blue-600 transition">
              Entrar
            </Link>
            <Link href="/search">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-6 font-bold shadow-lg shadow-blue-100">
                Reservar Agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sobre */}
          <div className="space-y-4">
            <h3 className="text-white font-black text-xl italic tracking-tighter">TransPorto Moz</h3>
            <p className="text-sm leading-relaxed">
              A maior plataforma de reserva de viagens terrestres em Moçambique. Segurança e conforto na palma da sua mão.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition" />
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Destinos Populares</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition">Maputo → Beira</li>
              <li className="hover:text-white cursor-pointer transition">Nampula → Maputo</li>
              <li className="hover:text-white cursor-pointer transition">Tete → Chimoio</li>
              <li className="hover:text-white cursor-pointer transition">Quelimane → Beira</li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Institucional</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/sobre" className="hover:text-white transition">Quem Somos</Link></li>
              <li><Link href="/termos" className="hover:text-white transition">Termos e Condições</Link></li>
              <li><Link href="/privacidade" className="hover:text-white transition">Privacidade</Link></li>
              <li><Link href="/parceiros" className="hover:text-white transition">Seja um Parceiro</Link></li>
            </ul>
          </div>

          {/* App Mobile */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Brevemente</h4>
            <p className="text-xs mb-4">Baixe o nosso App e viaje com mais facilidade.</p>
            <div className="flex flex-col gap-2">
              <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3 cursor-not-allowed grayscale">
                <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                <span className="text-[10px] font-bold">App Store</span>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3 cursor-not-allowed grayscale">
                <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                <span className="text-[10px] font-bold">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
          <p>© 2026 TransPorto Moz. Todos os direitos reservados.</p>
          <p>Desenvolvido com excelência em Moçambique.</p>
        </div>
      </footer>
    </div>
  );
}
