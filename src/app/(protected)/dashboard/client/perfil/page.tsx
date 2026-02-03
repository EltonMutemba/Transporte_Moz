import { Suspense } from "react";
import { userService } from "@/domains/users/user.service";
import ProfileClientContent from "./ProfileClientContent";

/**
 * METADATA: Define o título da página na aba do navegador.
 */
export const metadata = {
  title: "Perfil | TPMOZ",
};

/**
 * SKELETON: Exibido enquanto os dados do utilizador estão a ser carregados.
 * Segue o estilo industrial/brutalista.
 */
export function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-10">
      <div className="h-12 md:h-20 w-3/4 md:w-1/2 bg-slate-100 animate-pulse border-b-2 border-slate-200" />
      <div className="h-[350px] md:h-[450px] w-full bg-slate-50 animate-pulse border-2 border-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

/**
 * PAGE COMPONENT (Server Side)
 */
export default async function PerfilPage() {
  const user = await userService.getUserById(1);

  if (!user) {
    return (
      <main className="p-4 md:p-10 min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-xl w-full p-6 md:p-12 border-4 border-double border-slate-200 text-center">
          <h2 className="text-xl md:text-2xl font-black uppercase text-slate-300 italic tracking-tighter">
            User_Not_Found
          </h2>
          <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-4 leading-relaxed">
            O registo #0001 não foi localizado no sistema central.<br className="hidden md:block" />
            Verifique a base de dados via Prisma Studio.
          </p>
          <div className="mt-6 md:mt-8">
             <span className="text-[8px] md:text-[9px] bg-slate-100 px-3 py-1.5 md:px-4 md:py-2 font-black uppercase text-slate-500 border border-slate-200">
               Status: 404_Null_Reference
             </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-10 min-h-screen bg-white">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileClientContent user={user} />
      </Suspense>
    </main>
  );
}