"use client";

import React from "react";
import Link from "next/link"; // Adicionado para navegação real
import { 
  MessageCircle, Phone, Mail, 
  HelpCircle, Clock, ChevronDown, 
  ExternalLink, ArrowLeft, ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "Como recebo o meu bilhete após pagar?",
    a: "Após a confirmação do pagamento via M-Pesa ou e-Mola, o seu bilhete aparece instantaneamente no ecrã e é enviado para o seu WhatsApp cadastrado. Você também pode baixar o PDF na hora."
  },
  {
    q: "Posso cancelar ou alterar a data da viagem?",
    a: "Sim. Alterações são permitidas com até 24 horas de antecedência. Entre em contacto com o nosso suporte via WhatsApp com o número do seu bilhete em mãos."
  },
  {
    q: "O que acontece se eu perder o autocarro?",
    a: "Infelizmente, bilhetes de viagens perdidas por atraso do passageiro não são reembolsáveis. Recomendamos chegar ao terminal 30 minutos antes da partida."
  },
  {
    q: "Os pagamentos são seguros?",
    a: "Sim. Utilizamos as APIs oficiais do M-Pesa e e-Mola. Nunca pedimos o seu código PIN no nosso site; a confirmação é feita sempre no seu telemóvel."
  }
];

export default function SuportePage() {
  const WHATSAPP_NUMBER = "258840000000"; // ALTERA PARA O TEU NÚMERO REAL
  const SUPPORT_EMAIL = "suporte@transmoz.co.mz";

  return (
    <main className="min-h-screen bg-white">
      {/* BARRA DE NAVEGAÇÃO RÁPIDA */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-900 font-black uppercase italic tracking-tighter hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Voltar ao Início
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-green-500" /> Suporte Oficial TransMoz
          </div>
        </div>
      </nav>

      {/* HEADER DINÂMICO */}
      <section className="bg-slate-950 pt-32 pb-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 radial-gradient" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Como podemos <span className="text-blue-500 text-glow">ajudar?</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Problemas com o pagamento ou dúvidas na reserva? Escolha um canal abaixo. Estamos online para garantir que não perca a sua viagem.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        {/* CARTÕES DE CONTACTO REAIS */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <ContactCard 
            icon={<MessageCircle className="w-8 h-8" />}
            title="WhatsApp"
            description="Atendimento em tempo real para dúvidas e trocas."
            action="Conversar agora"
            link={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Preciso de ajuda com um bilhete.`}
            color="bg-green-500"
            textColor="text-green-600"
          />
          <ContactCard 
            icon={<Phone className="w-8 h-8" />}
            title="Chamada"
            description="Linha direta para emergências e cancelamentos."
            action="Ligar agora"
            link={`tel:+${WHATSAPP_NUMBER}`}
            color="bg-blue-600"
            textColor="text-blue-600"
          />
          <ContactCard 
            icon={<Mail className="w-8 h-8" />}
            title="E-mail"
            description="Questões administrativas ou recibos para empresas."
            action="Enviar e-mail"
            link={`mailto:${SUPPORT_EMAIL}`}
            color="bg-slate-900"
            textColor="text-slate-900"
          />
        </div>

        {/* SECÇÃO DE FAQ MELHORADA */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2">Dúvidas Frequentes</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-slate-50 rounded-[2rem] p-8 border border-slate-200/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                <summary className="flex justify-between items-center cursor-pointer list-none font-black text-slate-800 uppercase text-sm tracking-tight">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-4 h-4 text-blue-600" />
                  </div>
                </summary>
                <div className="mt-6 text-slate-600 font-medium leading-relaxed border-t border-slate-200 pt-6">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CARD FINAL DE HORÁRIO */}
        <div className="bg-blue-600 rounded-[3.5rem] p-12 text-center text-white mb-24 shadow-2xl shadow-blue-500/20">
          <Clock className="w-12 h-12 mx-auto mb-6 opacity-50" />
          <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Central de Atendimento</h3>
          <div className="flex flex-wrap justify-center gap-8 font-black uppercase tracking-widest text-xs">
            <div className="bg-white/10 px-6 py-3 rounded-2xl">Seg - Sex: 07h às 21h</div>
            <div className="bg-white/10 px-6 py-3 rounded-2xl">Sáb - Dom: 08h às 17h</div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactCard({ icon, title, description, action, link, color, textColor }: any) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30 hover:-translate-y-3 transition-all duration-500 group overflow-hidden relative"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] -mr-16 -mt-16 rounded-full`} />
      <div className={`${textColor} mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase text-slate-950 mb-3 tracking-tighter">{title}</h3>
      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{description}</p>
      <div className={`text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 ${textColor}`}>
        {action} <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  );
}