import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await bcrypt.hash('admin123', 10);
  const hashedPassword2 = await bcrypt.hash('admin456', 10);

  const admin1 = await prisma.user.upsert({
    where: { email: 'admin1@gmail.com' },
    update: {
      role: Role.ADMIN,
      password: hashedPassword1,
    },
    create: {
      email: 'admin1@gmail.com',
      password: hashedPassword1,
      role: Role.ADMIN,
    },
  });

  const admin2 = await prisma.user.upsert({
    where: { email: 'admin2@gmail.com' },
    update: {
      role: Role.ADMIN,
      password: hashedPassword2,
    },
    create: {
      email: 'admin2@gmail.com',
      password: hashedPassword2,
      role: Role.ADMIN,
    },
  });

  console.log('Admin users created:', { admin1, admin2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });