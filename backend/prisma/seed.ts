// prisma/seed.ts - Datos Mock
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedAdmin = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      password: hashedAdmin,
      role: 'ADMIN',
    },
  });

  // Client users
  const hashedPass = await bcrypt.hash('client123', 12);
  await prisma.user.createMany({
    data: [
      { email: 'client1@test.com', password: hashedPass, role: 'CLIENT' },
      { email: 'client2@test.com', password: hashedPass, role: 'CLIENT' },
    ],
    skipDuplicates: true,
  });

  // Products mock
  await prisma.product.createMany({
    data: Array.from({ length: 20 }, (_, i) => ({
      name: `Producto ${i + 1} - Camiseta Urban`,
      description: `Camiseta juvenil modelo ${i + 1}`,
      price: 25 + (i % 10),
      stock: 50 - (i % 20),
      category: ['Casual', 'Deportiva', 'Formal'][i % 3],
      imageUrl: `https://images.unsplash.com/photo-${[
        '1523381210434-271e8be1f52b',
        '1556906781-9a412961c28c',
        '1583743814966-8936f5b7be1a',
        '1512436991641-6745cdb1723f',
        '1521572267360-ee0c2909d518'
      ][i % 5]}?auto=format&fit=crop&w=300&h=400&q=80`,
    })),
    skipDuplicates: true,
  });

  // Orders mock (asociadas a users)
  const users = await prisma.user.findMany({ where: { role: 'CLIENT' }, select: { id: true } });
  const products = await prisma.product.findMany({ select: { id: true } });

  for (let i = 0; i < 10; i++) {
    await prisma.order.create({
      data: {
        userId: users[i % users.length].id,
        status: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'][i % 4] as any,
        total: 50 + (i * 10),
        items: {
          create: [
            { productId: products[i % 10].id!, quantity: 1 + (i % 3), price: 25 },
            { productId: products[(i + 5) % 10].id!, quantity: 2, price: 30 },
          ],
        },
      },
    });
  }

  console.log('✅ Seed completado: 1 admin, 2 clients, 20 products, 10 orders.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

