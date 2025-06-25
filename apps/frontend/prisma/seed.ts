import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  'child, 2 to 5 years',
  'child, 6 to 10 years',
  'high-school',
  'adult',
  'physical disability',
  'neurological disability',
  'get diagnosis',
  'teacher',
];

async function main() {
  for (const title of categories) {
    await prisma.category.upsert({
      where: { title },
      update: {},
      create: { title },
    });
  }
  console.log('Seeded categories');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
