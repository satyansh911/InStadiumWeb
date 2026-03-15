const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateData() {
  console.log('Starting data update...');
  
  const players = [
    {
      id: 'sachin',
      bio: "Widely regarded as the greatest batsman in the history of cricket, Sachin Tendulkar's career spanned 24 years of absolute dominance. Known as the 'God of Cricket', he redefined batting excellence and carried the hopes of a billion people.\n\nBorn in Mumbai, Sachin's journey began at Shivaji Park under the rigorous tutelage of Ramakant Achrekar. By age 16, he was facing the world's most fearsome bowlers on his international debut against Pakistan. Over the next two decades, he became a symbol of national unity, his centuries often bringing a diverse nation to a standstill. Beyond the runs, it was his humility and relentless work ethic that cemented his legacy as a global sporting icon."
    },
    {
      id: 'sunil-chhetri',
      bio: "The heart and soul of Indian football, Sunil Chhetri is one of the all-time leading international goalscorers. His leadership and commitment have propelled Indian football onto the global stage.\n\nChhetri's story is one of grit and longevity. Starting professionally at Mohun Bagan, he quickly rose to prominence as a clinical finisher. He is the third-highest active international goalscorer, trailing only Lionel Messi and Cristiano Ronaldo—a testament to his world-class consistency. His passionate plea in 2018 for fans to support Indian football at the stadiums became a turning point, revitalizing the sport's popularity across India."
    },
    {
      id: 'manpreet-singh',
      bio: "The dynamic midfield engine and captain who led the Indian Men's Hockey team to a historic Olympic medal after 41 years. Known for his tactical brilliance and relentless energy.\n\nHailing from Mithapur, a village known for its hockey nursery, Manpreet's rise to the captaincy was built on a foundation of discipline and tactical awareness. His leadership during the Tokyo 2020 Olympics was instrumental in ending India's long medal drought in hockey, a moment that reignited the nation's passion for its national sport. His playmaking ability and poise under pressure continue to define Indian hockey's modern era."
    },
    {
      id: 'pv-sindhu',
      bio: "A powerhouse of Indian badminton, PV Sindhu is the first Indian woman to win two Olympic medals. Her aggressive style and unwavering grit have made her a global sporting icon.\n\nSindhu's journey into badminton was inspired by Pullela Gopichand's success, leading her to train under him from a young age. Her breakthrough came at the Rio 2016 Olympics, where her silver medal performance transfixed an entire country. Since then, she has become a consistent threat on the world stage, winning a gold at the 2019 World Championships and a bronze in Tokyo 2020, solidifying her status as one of India's most decorated individual athletes."
    }
  ];

  for (const player of players) {
    console.log(`Updating ${player.id}...`);
    await prisma.player.update({
      where: { id: player.id },
      data: { bio: player.bio }
    });
  }

  console.log('Update complete!');
  process.exit(0);
}

updateData().catch(err => {
  console.error(err);
  process.exit(1);
});
