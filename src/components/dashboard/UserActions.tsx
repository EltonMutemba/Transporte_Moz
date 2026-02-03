"use client";

import { MoreHorizontal, Trash2, Edit3, X, Save, Shield } from "lucide-react";
import { useState } from "react";
import { deleteUser, updateUser } from "@/app/(protected)/dashboard/admin/users/actions";

export function UserActions({ user }: { user: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-3 bg-white hover:bg-slate-950 hover:text-white rounded-xl transition-all border border-slate-100 relative z-10"
      >
        <MoreHorizontal size={20} />
      </button>

      {/* MENU DE CONTEXTO SIMPLIFICADO */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-2 border-b border-slate-50">
               <button onClick={() => { setIsEditModalOpen(true); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2">
                  <Edit3 size={14} /> Editar Perfil
               </button>
            </div>

            {/* SEGURANÇA: Impede que o Admin apague um Diretor (OWNER) [cite: 2026-01-28] */}
            {user.role !== 'OWNER' && (
              <div className="p-2">
                <button onClick={() => { if(confirm("Apagar conta definitivamente?")) deleteUser(String(user.id)); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-red-600 hover:text-white text-red-600 rounded-lg flex items-center gap-2 transition-all">
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* MODAL DE EDIÇÃO INTEGRADO [cite: 2026-01-28] */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-200">
            <div className="flex justify-between items-center mb-6 text-slate-950">
              <h2 className="font-black uppercase text-sm tracking-tighter">Editar <span className="text-blue-600">Identidade</span></h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form action={async (formData) => {
              await updateUser(String(user.id), formData);
              setIsEditModalOpen(false);
            }} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nome Completo</label>
                <input name="name" defaultValue={user.name} required className="w-full mt-2 bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-950" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Contacto Oficial</label>
                <input name="phone" defaultValue={user.phone} required className="w-full mt-2 bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-950" />
              </div>

              {/* GESTÃO DE PRIVILÉGIOS (Substitui o botão externo) [cite: 2026-01-28] */}
              {user.role !== 'OWNER' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Privilégio no Sistema</label>
                  <div className="relative mt-2">
                    <select 
                      name="role" 
                      defaultValue={user.role}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-950 appearance-none"
                    >
                      <option value="CLIENT">CLIENTE / PASSAGEIRO</option>
                      <option value="STAFF">STAFF / OPERACIONAL</option>
                      <option value="ADMIN">ADMINISTRADOR</option>
                    </select>
                    <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10">
                <Save size={16} /> Gravar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}