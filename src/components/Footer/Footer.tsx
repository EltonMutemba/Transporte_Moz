import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* COLUNA 1: LOGO E DESCRIÇÃO */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">T</div>
            <span className="text-xl font-black text-white uppercase italic tracking-tighter">
              TransPorto<span className="text-blue-500">Moz</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            A maior rede de transporte interprovincial de Moçambique. Segurança, conforto e pontualidade em cada quilómetro.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
          </div>
        </div>

        {/* COLUNA 2: NAVEGAÇÃO */}
        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-6">Plataforma</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            <li><FooterLink href="/search">Comprar Bilhete</FooterLink></li>
            <li><FooterLink href="/encomendas">Enviar Encomendas</FooterLink></li>
            <li><FooterLink href="/termos">Termos de Uso</FooterLink></li>
          </ul>
        </div>

        {/* COLUNA 3: SUPORTE */}
        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-6">Suporte</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            <li><FooterLink href="/ajuda">Centro de Ajuda</FooterLink></li>
            <li><FooterLink href="/privacidade">Privacidade</FooterLink></li>
            <li><FooterLink href="/suporte">Contacto Técnico</FooterLink></li>
          </ul>
        </div>

        {/* COLUNA 4: CONTACTO */}
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-6">Contacto</h4>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-blue-500" />
            <span>suporte@transporto.co.mz</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-blue-500" />
            <span>+258 84 000 0000</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-blue-500 font-black">
            <MapPin size={16} />
            <span>Maputo, Moçambique</span>
          </div>
        </div>
      </div>

      {/* RODAPÉ FINAL */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
        <div className="flex items-center gap-2 text-slate-500">
          <ShieldCheck size={14} className="text-green-500" /> Pagamentos 100% Seguros
        </div>
        <p>© {currentYear} TransPortoMoz • Criado por Stélio</p>
      </div>
    </footer>
  );
}

/* COMPONENTES AUXILIARES */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-blue-500 transition-colors">
      {children}
    </Link>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
      {icon}
    </div>
  );
}