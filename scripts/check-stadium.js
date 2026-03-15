const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const stadium = await prisma.stadium.findUnique({
      where: { id: 'wankhede' },
    });
    console.log('STADIUM DATA:');
    console.log(JSON.stringify(stadium, null, 2));
  } catch (error) {
    console.error('ERROR:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
