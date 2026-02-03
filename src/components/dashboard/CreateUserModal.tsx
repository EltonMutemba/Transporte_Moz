"use client";

import React, { useState } from "react";
import { X, Save, ShieldCheck } from "lucide-react";
import { createUser } from "@/app/(protected)/dashboard/admin/users/actions";

export function CreateUserModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header do Modal */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Novo <span className="text-blue-600">Utilizador</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Definir acesso e credenciais</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form action={async (formData) => {
          await createUser(formData);
          onClose();
        }} className="p-8 space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
              <input name="name" required className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all" placeholder="Ex: Helton Stélio" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                <input name="email" type="email" required className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-600/5 transition-all" placeholder="helton@tpmoz.com" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contacto</label>
                <input name="phone" required className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-600/5 transition-all" placeholder="+258..." />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Privilégio de Acesso</label>
              <select name="role" className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none cursor-pointer">
                <option value="CLIENT">CLIENTE (Padrão)</option>
                <option value="STAFF">STAFF (Operacional)</option>
                <option value="OWNER">OWNER (Gestor de Frota)</option>
                <option value="ADMIN">ADMINISTRADOR (Total)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2">
            <ShieldCheck size={18} /> Confirmar Privilégios
          </button>
        </form>
      </div>
    </div>
  );
}