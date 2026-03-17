import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Create Sports
  const cricket = await prisma.sport.upsert({
    where: { id: 'cricket' },
    update: {},
    create: {
      id: 'cricket',
      name: 'Cricket',
      description: 'The most popular sport in India, played in iconic stadiums across the country.',
      icon: 'Trophy'
    }
  })

  const football = await prisma.sport.upsert({
    where: { id: 'football' },
    update: {},
    create: {
      id: 'football',
      name: 'Football',
      description: 'Widely followed sport with a massive fan base in states like West Bengal and Kerala.',
      icon: 'Activity'
    }
  })

  const kabaddi = await prisma.sport.upsert({
    where: { id: 'kabaddi' },
    update: {},
    create: {
      id: 'kabaddi',
      name: 'Kabaddi',
      description: 'An ancient Indian contact sport that has gained massive popularity through the Pro Kabaddi League.',
      icon: 'Shield'
    }
  })

  const badminton = await prisma.sport.upsert({
    where: { id: 'badminton' },
    update: {},
    create: {
      id: "badminton",
      name: "Badminton",
      description: "Lightning reflexes and elegant athleticism on the court.",
      icon: "Star"
    }
  })

  const tennis = await prisma.sport.upsert({
    where: { id: 'tennis' },
    update: {},
    create: {
      id: "tennis",
      name: "Tennis",
      description: "A legacy of doubles dominance and individual gritty battles.",
      icon: "Target"
    }
  })

  const hockey = await prisma.sport.upsert({
    where: { id: 'hockey' },
    update: {},
    create: {
      id: "hockey",
      name: "Hockey",
      description: "The golden legacy of Indian wizardry on the turf.",
      icon: "Award"
    }
  })

  // 2. Create Stadiums
  const wankhede = await prisma.stadium.upsert({
    where: { id: 'wankhede' },
    update: {
      historyTimeline: [
        { 
          year: 1974, 
          title: "The Birth of a Sanctuary",
          event: "Wankhede Stadium was constructed in a record 6 months, replacing the Brabourne Stadium as the primary venue.",
          type: "milestone"
        },
        { 
          year: 1987, 
          title: "World Cup Semi-Final",
          event: "Hosted the high-voltage semi-final between India and England.",
          type: "match"
        },
        { 
          year: 2011, 
          title: "World Cup Glory",
          event: "The iconic MS Dhoni finish. India lifted the World Cup after 28 years on home soil.",
          videoUrl: "https://www.youtube.com/watch?v=R0alThHNb0Y",
          thumbnail: "https://img.youtube.com/vi/R0alThHNb0Y/hqdefault.jpg",
          type: "match"
        },
        { 
          year: 2013, 
          title: "Sachin's Farewell",
          event: "The Master Blaster, Sachin Tendulkar, played his final international innings, leaving a nation in tears.",
          videoUrl: "https://www.youtube.com/watch?v=id9_Lh5tNNk",
          thumbnail: "https://img.youtube.com/vi/id9_Lh5tNNk/hqdefault.jpg",
          type: "milestone"
        },
        {
          year: 2023,
          title: "Kohli's 50th Century",
          event: "Virat Kohli broke Sachin's record for most ODI centuries during the World Cup semi-final.",
          videoUrl: "https://www.youtube.com/shorts/2ejZZf2_tdM",
          thumbnail: "https://img.youtube.com/vi/2ejZZf2_tdM/hqdefault.jpg",
          type: "match"
        }
      ],
    },
    create: {
      id: 'wankhede',
      name: 'Wankhede Stadium',
      city: 'Mumbai',
      state: 'Maharashtra',
      capacity: 33000,
      builtYear: 1974,
      description: 'The Wankhede Stadium is an international cricket stadium in Mumbai, India. It hosted the 2011 Cricket World Cup Final.',
      latitude: 18.9389,
      longitude: 72.8258,
      galleryImages: [
        { url: '/images/stadiums/wankhedestadium.jpg', caption: 'Stadium View' },
        { url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80', caption: 'Crowd during match' }
      ],
      historyTimeline: [
        { 
          year: 1974, 
          title: "The Birth of a Sanctuary",
          event: "Wankhede Stadium was constructed in a record 6 months, replacing the Brabourne Stadium as the primary venue.",
          type: "milestone"
        },
        { 
          year: 1987, 
          title: "World Cup Semi-Final",
          event: "Hosted the high-voltage semi-final between India and England.",
          type: "match"
        },
        { 
          year: 2011, 
          title: "World Cup Glory",
          event: "The iconic MS Dhoni finish. India lifted the World Cup after 28 years on home soil.",
          videoUrl: "https://www.youtube.com/watch?v=R0alThHNb0Y",
          thumbnail: "https://img.youtube.com/vi/R0alThHNb0Y/hqdefault.jpg",
          type: "match"
        },
        { 
          year: 2013, 
          title: "Sachin's Farewell",
          event: "The Master Blaster, Sachin Tendulkar, played his final international innings, leaving a nation in tears.",
          videoUrl: "https://www.youtube.com/watch?v=id9_Lh5tNNk",
          thumbnail: "https://img.youtube.com/vi/id9_Lh5tNNk/hqdefault.jpg",
          type: "milestone"
        },
        {
          year: 2023,
          title: "Kohli's 50th Century",
          event: "Virat Kohli broke Sachin's record for most ODI centuries during the World Cup semi-final.",
          videoUrl: "https://www.youtube.com/shorts/2ejZZf2_tdM",
          thumbnail: "https://img.youtube.com/vi/2ejZZf2_tdM/hqdefault.jpg",
          type: "match"
        }
      ],
      upcomingMatches: [
        { teams: 'MI vs CSK', date: '2026-04-10', type: 'IPL' }
      ],
      sportsPlayed: {
        connect: [{ id: 'cricket' }]
      }
    }
  })

  const narendraModi = await prisma.stadium.upsert({
    where: { id: 'narendra-modi' },
    update: {
      historyTimeline: [
        { 
          year: 2020, 
          title: "Inauguration",
          event: "The massive reconstruction was completed, making it the largest cricket stadium in the world.",
          type: "milestone"
        },
        { 
          year: 2022, 
          title: "IPL Grand Finale",
          event: "Hosted its first IPL Final with a record crowd of over 100,000 people.",
          videoUrl: "https://www.youtube.com/watch?v=VEcmXpIEN2Y",
          type: "match"
        },
        { 
          year: 2023, 
          title: "World Cup Final",
          event: "The grand finale of the ICC Men's Cricket World Cup 2023 between India and Australia.",
          videoUrl: "https://www.youtube.com/shorts/OBEgDfJXP24",
          type: "match"
        }
      ],
    },
    create: {
      id: 'narendra-modi',
      name: 'Narendra Modi Stadium',
      city: 'Ahmedabad',
      state: 'Gujarat',
      capacity: 132000,
      builtYear: 2020,
      description: 'The largest stadium in the world by capacity, hosting major international cricket matches and IPL events.',
      latitude: 23.0919,
      longitude: 72.5975,
      galleryImages: [
        { url: '/images/stadiums/narendramodistadium.jpg', caption: 'Panoramic view' }
      ],
      historyTimeline: [
        { 
          year: 2020, 
          title: "Inauguration",
          event: "The massive reconstruction was completed, making it the largest cricket stadium in the world.",
          type: "milestone"
        },
        { 
          year: 2022, 
          title: "IPL Grand Finale",
          event: "Hosted its first IPL Final with a record crowd of over 100,000 people.",
          videoUrl: "https://www.youtube.com/watch?v=VEcmXpIEN2Y",
          type: "match"
        },
        { 
          year: 2023, 
          title: "World Cup Final",
          event: "The grand finale of the ICC Men's Cricket World Cup 2023 between India and Australia.",
          videoUrl: "https://www.youtube.com/shorts/OBEgDfJXP24",
          type: "match"
        }
      ],
      sportsPlayed: {
        connect: [{ id: 'cricket' }]
      }
    }
  })

  const saltLake = await prisma.stadium.upsert({
    where: { id: 'salt-lake' },
    update: {
      historyTimeline: [
        { 
          year: 1984, 
          title: "The Opening",
          event: "The stadium was inaugurated, providing India with a world-class multi-sport venue.",
          type: "milestone"
        },
        { 
          year: 2011, 
          title: "Lionel Messi in Kolkata",
          event: "The legendary Lionel Messi led Argentina against Venezuela in a historic friendly match.",
          videoUrl: "https://www.youtube.com/watch?v=QzuTXIRUcbw",
          thumbnail: "https://img.youtube.com/vi/QzuTXIRUcbw/hqdefault.jpg",
          type: "match"
        },
        { 
          year: 2017, 
          title: "FIFA U-17 World Cup Final",
          event: "Hosted the final between England and Spain, setting attendance records for a youth tournament.",
          videoUrl: "https://www.youtube.com/watch?v=sRxsW91x0Rg",
          thumbnail: "https://img.youtube.com/vi/sRxsW91x0Rg/hqdefault.jpg",
          type: "match"
        }
      ],
    },
    create: {
      id: 'salt-lake',
      name: 'Salt Lake Stadium',
      city: 'Kolkata',
      state: 'West Bengal',
      capacity: 85000,
      builtYear: 1984,
      description: 'Vivekananda Yuba Bharati Krirangan, commonly known as Salt Lake Stadium, is one of the largest stadiums in India for football.',
      latitude: 22.5694,
      longitude: 88.4092,
      galleryImages: [
        { url: '/images/stadiums/saltlakestadium.jpg', caption: 'Football Pitch' }
      ],
      historyTimeline: [
        {
          year: 1984,
          title: 'The Opening',
          event: 'The stadium was inaugurated, providing India with a world-class multi-sport venue.',
          type: 'milestone'
        },
        {
          year: 2011,
          title: 'Lionel Messi in Kolkata',
          event: 'The legendary Lionel Messi led Argentina against Venezuela in a historic friendly match.',
          videoUrl: 'https://www.youtube.com/watch?v=QzuTXIRUcbw',
          thumbnail: 'https://img.youtube.com/vi/QzuTXIRUcbw/hqdefault.jpg',
          type: 'match'
        },
        {
          year: 2017,
          title: 'FIFA U-17 World Cup Final',
          event: 'Hosted the final between England and Spain, setting attendance records for a youth tournament.',
          videoUrl: 'https://www.youtube.com/watch?v=sRxsW91x0Rg',
          thumbnail: 'https://img.youtube.com/vi/sRxsW91x0Rg/hqdefault.jpg',
          type: 'match'
        }
      ],
      sportsPlayed: {
        connect: [{ id: 'football' }]
      }
    }
  })

  const kalinga = await prisma.stadium.upsert({
    where: { id: 'kalinga' },
    update: {},
    create: {
      id: 'kalinga',
      name: 'Kalinga Stadium',
      city: 'Bhubaneswar',
      state: 'Odisha',
      capacity: 16000,
      builtYear: 1978,
      description: "A world-class hockey stadium that hosted the Men's Hockey World Cup twice.",
      galleryImages: [
        { url: '/images/stadiums/kalingastadium.jpg', caption: 'Stadium View' }
      ],
      sportsPlayed: {
        connect: [{ id: 'hockey' }]
      }
    }
  })

  const prakashPadukone = await prisma.stadium.upsert({
    where: { id: 'prakash-padukone' },
    update: {},
    create: {
      id: 'prakash-padukone',
      name: 'Prakash Padukone Badminton Academy',
      city: 'Bangalore',
      state: 'Karnataka',
      capacity: 2000,
      builtYear: 1994,
      description: "A premier training center and venue for national badminton tournaments.",
      galleryImages: [
        { url: '/images/stadiums/prakashpadukonebadmintonacademy.jpg', caption: 'Academy View' }
      ],
      sportsPlayed: {
        connect: [{ id: 'badminton' }]
      }
    }
  })

  const rkKhanna = await prisma.stadium.upsert({
    where: { id: 'rk-khanna' },
    update: {},
    create: {
      id: 'rk-khanna',
      name: 'R.K. Khanna Tennis Stadium',
      city: 'New Delhi',
      state: 'Delhi',
      capacity: 5014,
      builtYear: 1982,
      description: "The premier tennis venue in India, having hosted numerous Davis Cup ties.",
      galleryImages: [
        { url: '/images/stadiums/rkkhannastadium.jpg', caption: 'Stadium View' }
      ],
      sportsPlayed: {
        connect: [{ id: 'tennis' }]
      }
    }
  })

  // 3. Create Players
  await prisma.player.upsert({
    where: { id: 'sachin' },
    update: {
      bio: "Widely regarded as the greatest batsman in the history of cricket, Sachin Tendulkar's career spanned 24 years of absolute dominance. Known as the 'God of Cricket', he redefined batting excellence and carried the hopes of a billion people.\n\nBorn in Mumbai, Sachin's journey began at Shivaji Park under the rigorous tutelage of Ramakant Achrekar. By age 16, he was facing the world's most fearsome bowlers on his international debut against Pakistan. Over the next two decades, he became a symbol of national unity, his centuries often bringing a diverse nation to a standstill. Beyond the runs, it was his humility and relentless work ethic that cemented his legacy as a global sporting icon.",
      careerTimeline: [
        { year: 1989, event: 'International Debut against Pakistan as a 16-year-old prodigy.' },
        { year: 1998, event: 'The "Desert Storm" innings against Australia in Sharjah.' },
        { year: 2011, event: 'Fulfilled a lifelong dream by winning the ICC Cricket World Cup at his home ground, Wankhede Stadium.' },
        { year: 2012, event: 'Became the first and only cricketer to score 100 international centuries.' },
        { year: 2013, event: 'Retired from all forms of cricket at Wankhede Stadium, ending an era.' }
      ],
      stats: [
        { label: 'International Runs', value: '34,357' },
        { label: 'Total Centuries', value: '100' },
        { label: 'World Cup Title', value: '1' }
      ]
    },
    create: {
      id: 'sachin',
      name: 'Sachin Tendulkar',
      sport: { connect: { id: 'cricket' } },
      country: 'India',
      image: '/images/players/sachintendulkar.jpg',
      bio: "Widely regarded as the greatest batsman in the history of cricket, Sachin Tendulkar's career spanned 24 years of absolute dominance. Known as the 'God of Cricket', he redefined batting excellence and carried the hopes of a billion people.\n\nBorn in Mumbai, Sachin's journey began at Shivaji Park under the rigorous tutelage of Ramakant Achrekar. By age 16, he was facing the world's most fearsome bowlers on his international debut against Pakistan. Over the next two decades, he became a symbol of national unity, his centuries often bringing a diverse nation to a standstill. Beyond the runs, it was his humility and relentless work ethic that cemented his legacy as a global sporting icon.",
      careerTimeline: [
        { year: 1989, event: 'International Debut against Pakistan as a 16-year-old prodigy.' },
        { year: 1998, event: 'The "Desert Storm" innings against Australia in Sharjah.' },
        { year: 2011, event: 'Fulfilled a lifelong dream by winning the ICC Cricket World Cup at his home ground, Wankhede Stadium.' },
        { year: 2012, event: 'Became the first and only cricketer to score 100 international centuries.' },
        { year: 2013, event: 'Retired from all forms of cricket at Wankhede Stadium, ending an era.' }
      ],
      stats: [
        { label: 'International Runs', value: '34,357' },
        { label: 'Total Centuries', value: '100' },
        { label: 'World Cup Title', value: '1' }
      ],
      achievements: ['Bharat Ratna', '100 International Centuries'],
      stadiumsPlayed: { connect: [{ id: 'wankhede' }, { id: 'narendra-modi' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'sunil-chhetri' },
    update: {
      bio: "The heart and soul of Indian football, Sunil Chhetri is one of the all-time leading international goalscorers. His leadership and commitment have propelled Indian football onto the global stage.\n\nChhetri's story is one of grit and longevity. Starting professionally at Mohun Bagan, he quickly rose to prominence as a clinical finisher. He is the third-highest active international goalscorer, trailing only Lionel Messi and Cristiano Ronaldo—a testament to his world-class consistency. His passionate plea in 2018 for fans to support Indian football at the stadiums became a turning point, revitalizing the sport's popularity across India.",
      careerTimeline: [
        { year: 2005, event: 'International Debut against Pakistan, scoring his first goal.' },
        { year: 2008, event: 'Hattrick in the AFC Challenge Cup final to help India qualify for Asia Cup.' },
        { year: 2018, event: 'Earned his 100th international cap and called upon fans to fill the stadiums.' },
        { year: 2021, event: 'Overtook legends in the international goalscoring charts.' },
        { year: 2024, event: 'Announced retirement from international football, leaving a massive legacy.' }
      ],
      stats: [
        { label: 'International Goals', value: '94' },
        { label: 'Appearances', value: '151' },
        { label: 'Khel Ratna', value: '1' }
      ]
    },
    create: {
      id: 'sunil-chhetri',
      name: 'Sunil Chhetri',
      sport: { connect: { id: 'football' } },
      country: 'India',
      image: '/images/players/sunilchhetri.jpg',
      bio: "The heart and soul of Indian football, Sunil Chhetri is one of the all-time leading international goalscorers. His leadership and commitment have propelled Indian football onto the global stage.\n\nChhetri's story is one of grit and longevity. Starting professionally at Mohun Bagan, he quickly rose to prominence as a clinical finisher. He is the third-highest active international goalscorer, trailing only Lionel Messi and Cristiano Ronaldo—a testament to his world-class consistency. His passionate plea in 2018 for fans to support Indian football at the stadiums became a turning point, revitalizing the sport's popularity across India.",
      careerTimeline: [
        { year: 2005, event: 'International Debut against Pakistan, scoring his first goal.' },
        { year: 2008, event: 'Hattrick in the AFC Challenge Cup final to help India qualify for Asia Cup.' },
        { year: 2018, event: 'Earned his 100th international cap and called upon fans to fill the stadiums.' },
        { year: 2021, event: 'Overtook legends in the international goalscoring charts.' },
        { year: 2024, event: 'Announced retirement from international football, leaving a massive legacy.' }
      ],
      stats: [
        { label: 'International Goals', value: '94' },
        { label: 'Appearances', value: '151' },
        { label: 'Khel Ratna', value: '1' }
      ],
      achievements: ['Most goals for India', 'Khel Ratna Award'],
      stadiumsPlayed: { connect: [{ id: 'salt-lake' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'manpreet-singh' },
    update: {
      bio: "The dynamic midfield engine and captain who led the Indian Men's Hockey team to a historic Olympic medal after 41 years. Known for his tactical brilliance and relentless energy.\n\nHailing from Mithapur, a village known for its hockey nursery, Manpreet's rise to the captaincy was built on a foundation of discipline and tactical awareness. His leadership during the Tokyo 2020 Olympics was instrumental in ending India's long medal drought in hockey, a moment that reignited the nation's passion for its national sport. His playmaking ability and poise under pressure continue to define Indian hockey's modern era.",
      careerTimeline: [
        { year: 2011, event: 'Senior international debut for India.' },
        { year: 2013, event: 'Part of the team that won Silver at the Asia Cup.' },
        { year: 2019, event: 'Named FIH Men’s Player of the Year, a first for an Indian.' },
        { year: 2021, event: 'Captained India to the historic Bronze Medal at the Tokyo 2020 Olympics.' },
        { year: 2022, event: 'Received the Major Dhyan Chand Khel Ratna Award.' }
      ],
      stats: [
        { label: 'International Caps', value: '300+' },
        { label: 'Olympic Medals', value: '1' },
        { label: 'FIH Best Player', value: '1' }
      ]
    },
    create: {
      id: 'manpreet-singh',
      name: 'Manpreet Singh',
      sport: { connect: { id: 'hockey' } },
      country: 'India',
      image: '/images/players/manpreetsingh.jpg',
      bio: "The dynamic midfield engine and captain who led the Indian Men's Hockey team to a historic Olympic medal after 41 years. Known for his tactical brilliance and relentless energy.\n\nHailing from Mithapur, a village known for its hockey nursery, Manpreet's rise to the captaincy was built on a foundation of discipline and tactical awareness. His leadership during the Tokyo 2020 Olympics was instrumental in ending India's long medal drought in hockey, a moment that reignited the nation's passion for its national sport. His playmaking ability and poise under pressure continue to define Indian hockey's modern era.",
      careerTimeline: [
        { year: 2011, event: 'Senior international debut for India.' },
        { year: 2013, event: 'Part of the team that won Silver at the Asia Cup.' },
        { year: 2019, event: 'Named FIH Men’s Player of the Year, a first for an Indian.' },
        { year: 2021, event: 'Captained India to the historic Bronze Medal at the Tokyo 2020 Olympics.' },
        { year: 2022, event: 'Received the Major Dhyan Chand Khel Ratna Award.' }
      ],
      stats: [
        { label: 'International Caps', value: '300+' },
        { label: 'Olympic Medals', value: '1' },
        { label: 'FIH Best Player', value: '1' }
      ],
      achievements: ['Tokyo 2020 Bronze', 'Khel Ratna Award'],
      stadiumsPlayed: { connect: [{ id: 'kalinga' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'pv-sindhu' },
    update: {
      bio: "A powerhouse of Indian badminton, PV Sindhu is the first Indian woman to win two Olympic medals. Her aggressive style and unwavering grit have made her a global sporting icon.\n\nSindhu's journey into badminton was inspired by Pullela Gopichand's success, leading her to train under him from a young age. Her breakthrough came at the Rio 2016 Olympics, where her silver medal performance transfixed an entire country. Since then, she has become a consistent threat on the world stage, winning a gold at the 2019 World Championships and a bronze in Tokyo 2020, solidifying her status as one of India's most decorated individual athletes.",
      careerTimeline: [
        { year: 2013, event: 'Won her first World Championship medal (Bronze) in Guangzhou.' },
        { year: 2016, event: 'Became the first Indian woman to win an Olympic Silver medal at Rio.' },
        { year: 2019, event: 'Became the first Indian to win Gold at the BWF World Championships.' },
        { year: 2021, event: 'Won Bronze at the Tokyo Olympics, her second consecutive Olympic medal.' },
        { year: 2022, event: 'Won Gold at the Commonwealth Games in Birmingham.' }
      ],
      stats: [
        { label: 'Olympic Medals', value: '2' },
        { label: 'World Titles', value: '1' },
        { label: 'World Medals', value: '5' }
      ]
    },
    create: {
      id: 'pv-sindhu',
      name: 'PV Sindhu',
      sport: { connect: { id: 'badminton' } },
      country: 'India',
      image: '/images/players/pvsindhu.jpg',
      bio: "A powerhouse of Indian badminton, PV Sindhu is the first Indian woman to win two Olympic medals. Her aggressive style and unwavering grit have made her a global sporting icon.\n\nSindhu's journey into badminton was inspired by Pullela Gopichand's success, leading her to train under him from a young age. Her breakthrough came at the Rio 2016 Olympics, where her silver medal performance transfixed an entire country. Since then, she has become a consistent threat on the world stage, winning a gold at the 2019 World Championships and a bronze in Tokyo 2020, solidifying her status as one of India's most decorated individual athletes.",
      careerTimeline: [
        { year: 2013, event: 'Won her first World Championship medal (Bronze) in Guangzhou.' },
        { year: 2016, event: 'Became the first Indian woman to win an Olympic Silver medal at Rio.' },
        { year: 2019, event: 'Became the first Indian to win Gold at the BWF World Championships.' },
        { year: 2021, event: 'Won Bronze at the Tokyo Olympics, her second consecutive Olympic medal.' },
        { year: 2022, event: 'Won Gold at the Commonwealth Games in Birmingham.' }
      ],
      stats: [
        { label: 'Olympic Medals', value: '2' },
        { label: 'World Titles', value: '1' },
        { label: 'World Medals', value: '5' }
      ],
      achievements: ['Olympic Silver & Bronze', 'World Champion 2019'],
      stadiumsPlayed: { connect: [{ id: 'prakash-padukone' }] }
    }
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
