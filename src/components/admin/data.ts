import React from "react";
import { Bus, Users, Fuel, Map } from "lucide-react";

// --- INTERFACES ---
export interface FleetKPIProps {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  icon: React.ReactNode;
}

export interface LiveTripProps {
  bus: string;
  route: string;
  driver: string;
  status: string;
  load: string;
  isWarning?: boolean;
}

export type Variant = "info" | "warning" | "critical";

export interface MaintenanceItemProps {
  bus: string;
  issue: string;
  days: string;
  variant?: Variant;
}

// --- DADOS ESTÁTICOS ---
export const fleetKPIs: FleetKPIProps[] = [
  { label: "Receita Bruta Hoje", value: "85.400 MT", trend: "+5%", up: true, icon: React.createElement(Fuel, { size: 20 }) },
  { label: "Autocarros em Rota", value: "12 / 15", trend: "3 Parados", up: false, icon: React.createElement(Bus, { size: 20 }) },
  { label: "Passageiros Hoje", value: "412", trend: "+12%", up: true, icon: React.createElement(Users, { size: 20 }) },
  { label: "Ocupação Média", value: "92%", trend: "Excelente", up: true, icon: React.createElement(Map, { size: 20 }) },
];

export const liveTrips: LiveTripProps[] = [
  { bus: "AAB-202-MC", route: "Maputo ↔ Beira", driver: "J. Muthemba", status: "Em Embarque", load: "42/50" },
  { bus: "MC-01-99-MP", route: "Maputo ↔ Xai-Xai", driver: "A. Sitoe", status: "Em Rota", load: "50/50" },
  { bus: "AFG-505-MC", route: "Beira ↔ Tete", driver: "C. Langa", status: "Atrasado", load: "12/50", isWarning: true },
];

export const maintenanceItems: MaintenanceItemProps[] = [
  { bus: "ABX-101-MC", issue: "Troca de Óleo", days: "Faltam 2 dias", variant: "warning" },
  { bus: "MM-442-MP", issue: "Pneus Desgastados", days: "Urgente", variant: "critical" },
];