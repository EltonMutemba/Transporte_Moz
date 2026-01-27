import { AuthGuard } from "@/components/AuthGuard"

export default function AdminPage() {
  return (
    <AuthGuard>
      <div className="p-10">
        <h1 className="text-3xl font-bold">Painel de Administração</h1>
        <p className="mt-4 text-gray-600">Bem-vindo, Administrador do sistema.</p>
      </div>
    </AuthGuard>
  )
}
