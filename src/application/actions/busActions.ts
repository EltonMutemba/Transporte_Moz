"use server";

import { prisma as db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * CRIA UM NOVO VEÍCULO
 * Inclui validação de matrícula moçambicana e sanitização de dados.
 */
export async function createBus(formData: FormData) {
  const plate = (formData.get("plate") as string).toUpperCase().trim();
  const model = (formData.get("model") as string).trim();
  const capacity = parseInt(formData.get("capacity") as string);

  // 1. Validação de Matrícula (Padrão: ABC-123-MC ou MM-123-MP)
  const plateRegex = /^[A-Z]{2,3}-\d{3}-[A-Z]{2}$/;
  if (!plateRegex.test(plate)) {
    return { 
      success: false, 
      error: "Formato de matrícula inválido. Use o padrão moçambicano (Ex: AFG-202-MC)." 
    };
  }

  // 2. Validação de Capacidade
  if (isNaN(capacity) || capacity <= 0) {
    return { success: false, error: "A capacidade deve ser um número superior a zero." };
  }

  try {
    await db.bus.create({
      data: { 
        plate, 
        model, 
        capacity 
      },
    });

    revalidatePath("/dashboard/admin/buses");
    return { success: true };
  } catch (error: any) {
    // Erro P2002 do Prisma indica valor duplicado (Unique constraint) [cite: 2026-01-28]
    if (error.code === 'P2002') {
      return { success: false, error: "Esta matrícula já se encontra registada no sistema." };
    }
    return { success: false, error: "Erro técnico ao registar o veículo." };
  }
}

/**
 * ELIMINA UM VEÍCULO
 * Verifica integridade referencial antes de apagar para evitar erros de base de dados.
 */
export async function deleteBus(busId: number) {
  try {
    // 1. Garantir que o ID é um número (Prisma requirement)
    const id = Number(busId);
    if (isNaN(id)) return { success: false, error: "ID de veículo inválido." };

    // 2. Verificar se existem viagens associadas (Integridade Referencial)
    const busWithTrips = await db.bus.findUnique({
      where: { id },
      include: { 
        _count: { 
          select: { trips: true } 
        } 
      }
    });

    if (!busWithTrips) {
      return { success: false, error: "Veículo não encontrado." };
    }

    if (busWithTrips._count.trips > 0) {
      return { 
        success: false, 
        error: `Segurança: O veículo ${busWithTrips.plate} tem ${busWithTrips._count.trips} viagens no histórico e não pode ser apagado.` 
      };
    }

    // 3. Executar a eliminação física
    await db.bus.delete({
      where: { id }
    });

    // 4. Atualizar a cache da página de frotas
    revalidatePath("/dashboard/admin/buses");
    return { success: true };

  } catch (error) {
    console.error("DELETE_BUS_ERROR:", error);
    return { success: false, error: "Falha ao eliminar. Verifique a conexão com a base de dados." };
  }
}