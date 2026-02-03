// Este layout agora é apenas um "pass-through"
// Ele não precisa de Sidebar nem de Main, pois o pai já forneceu.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}