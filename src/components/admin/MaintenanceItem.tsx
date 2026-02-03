"use client";
import React from "react";

type Variant = "info" | "warning" | "critical";

interface MaintenanceItemProps {
  bus: string;
  issue: string;
  days: string;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  info: "text-amber-600",
  warning: "text-amber-800",
  critical: "text-red-600",
};

export default function MaintenanceItem({ bus, issue, days, variant = "info" }: MaintenanceItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{bus}</p>
        <p className="text-[9px] font-bold text-slate-500 uppercase">{issue}</p>
      </div>
      <p className={`text-[9px] font-black uppercase ${variantClasses[variant]}`}>{days}</p>
    </div>
  );
}
