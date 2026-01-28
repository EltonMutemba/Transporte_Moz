import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Definimos o número de "rounds" para a encriptação (10 é o padrão seguro)
  const saltRounds = 10;
  
  const users = [
    { username: 'admin', password: '123', role: 'admin' },
    { username: 'dono', password: '123', role: 'owner' },
    { username: 'cobrador', password: '123', role: 'staff' },
    { username: 'cliente', password: '123', role: 'client' },
  ]

  console.log('Encripando senhas e semeando base de dados...')

  for (const u of users) {
    // Encriptamos a senha antes de enviar para o MySQL
    const hashedPassword = await bcrypt.hash(u.password, saltRounds);

    await prisma.user.upsert({
      where: { username: u.username },
      update: {
        password: hashedPassword, // Atualiza para a versão segura se já existir
        role: u.role
      },
      create: {
        username: u.username,
        password: hashedPassword,
        role: u.role
      },
    })
  }
  
  console.log('✅ Utilizadores criados com senhas seguras (Bcrypt)!')
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })