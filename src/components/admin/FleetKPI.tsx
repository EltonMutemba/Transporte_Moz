"use client";
import React from "react";

interface FleetKPIProps {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  icon: React.ReactNode;
}

export default function FleetKPI({ label, value, trend, up, icon }: FleetKPIProps) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
      <div className="flex justify-between items-center mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all italic">
          {icon}
        </div>
        <span className={`text-[9px] font-black px-3 py-1 rounded-full ${up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter">{value}</h2>
    </div>
  );
}
