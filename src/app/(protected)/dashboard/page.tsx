import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export default async function DashboardEntryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) redirect("/login");

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const userRole = (payload.role as string || "client").toLowerCase();

    const routes: Record<string, string> = {
      admin: "/dashboard/admin",
      owner: "/dashboard/owner",
      staff: "/dashboard/staff",
      client: "/dashboard/client/viagens",
    };

    const target = routes[userRole] || "/dashboard/client/viagens";
    
    // Redirecionamento de SERVIDOR: Muito mais rápido e seguro
    redirect(target);
    
  } catch (error) {
    redirect("/login");
  }
  
  // Este retorno nunca será visto, mas o Next.js exige um componente
  return null;
}