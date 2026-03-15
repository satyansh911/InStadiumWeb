const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkBio() {
  const sachin = await prisma.player.findUnique({
    where: { id: 'sachin' },
    select: { bio: true }
  });
  console.log('Sachin Bio:', sachin?.bio);
  process.exit(0);
}

checkBio();
