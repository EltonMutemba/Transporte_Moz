import { PrismaClient, Role } from '@prisma/client' // Importa o Role aqui
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10;
  
  // Define o tipo explicitamente para ajudar o TS
  const users: { 
    name: string; 
    email: string; 
    username: string; 
    password: string; 
    role: Role // Usa o Enum Role aqui
  }[] = [
    { 
      name: 'Stélio Mutemba', 
      email: 'admin@email.com', 
      username: 'admin', 
      password: '123', 
      role: Role.ADMIN // Usa o Enum em vez de string
    },
    { 
      name: 'Neima Pedro', 
      email: 'cliente@email.com', 
      username: 'cliente', 
      password: '123', 
      role: Role.CLIENT // Usa o Enum em vez de string
    },
    { 
      name: 'João Nagi', 
      email: 'owner@email.com', 
      username: 'dono', 
      password: '123', 
      role: Role.OWNER 
    },
    { 
      name: 'Simão Cobrador', 
      email: 'staff@email.com', 
      username: 'cobrador', 
      password: '123', 
      role: Role.STAFF 
    }
  ]

  console.log('🚀 Iniciando Seed: Encriptando e Semeando MySQL...');

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, saltRounds);

    await prisma.user.upsert({
      where: { username: u.username },
      update: {
        password: hashedPassword,
        role: u.role,
        email: u.email
      },
      create: {
        username: u.username,
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
      },
    })
  }
  
  console.log('✅ Base de dados populada com sucesso!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Erro no Seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })