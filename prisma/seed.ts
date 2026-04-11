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
      galleryImages: [
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/wankhedestadium_xkzgep.jpg', caption: 'Stadium View' },
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
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/wankhedestadium_xkzgep.jpg', caption: 'Stadium View' },
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
      galleryImages: [
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/narendramodistadium_uqsxbv.jpg', caption: 'Panoramic view' }
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
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/narendramodistadium_uqsxbv.jpg', caption: 'Panoramic view' }
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
      galleryImages: [
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/saltlakestadium_qpfmni.jpg', caption: 'Football Pitch' }
      ],
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
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/saltlakestadium_qpfmni.jpg', caption: 'Football Pitch' }
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
    update: {
      description: "A world-class hockey venue in Bhubaneswar that helped define India's modern hockey resurgence.",
      latitude: 20.2961,
      longitude: 85.8245,
      historyTimeline: [
        {
          year: 1978,
          title: 'Foundation Era',
          event: 'Kalinga Stadium began as a multi-sport venue and later evolved into India\'s hockey capital.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/kalingastadium_hbqkwt.jpg',
          type: 'milestone'
        },
        {
          year: 2018,
          title: 'Hockey World Cup Host',
          event: 'Hosted the Men\'s Hockey World Cup and delivered a world-class fan atmosphere.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/kalingastadium_hbqkwt.jpg',
          type: 'match'
        },
        {
          year: 2023,
          title: 'World Cup Returns',
          event: 'Again hosted major Hockey World Cup fixtures, strengthening its status as a global hockey venue.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/kalingastadium_hbqkwt.jpg',
          type: 'match'
        }
      ],
      tournaments: [
        { name: 'Men\'s Hockey World Cup', year: 2018, winner: 'Belgium' },
        { name: 'Men\'s Hockey World Cup', year: 2023, winner: 'Germany' }
      ],
      upcomingMatches: [
        { teams: 'India vs Australia', date: '2026-06-14', tournament: 'FIH Pro League' },
        { teams: 'Odisha Warriors vs Bengaluru Blades', date: '2026-09-02', tournament: 'Hockey India League' }
      ]
    },
    create: {
      id: 'kalinga',
      name: 'Kalinga Stadium',
      city: 'Bhubaneswar',
      state: 'Odisha',
      capacity: 16000,
      builtYear: 1978,
      description: "A world-class hockey venue in Bhubaneswar that helped define India's modern hockey resurgence.",
      latitude: 20.2961,
      longitude: 85.8245,
      galleryImages: [
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/kalingastadium_hbqkwt.jpg', caption: 'Stadium View' }
      ],
      historyTimeline: [
        {
          year: 1978,
          title: 'Foundation Era',
          event: 'Kalinga Stadium began as a multi-sport venue and later evolved into India\'s hockey capital.',
          thumbnail: '/images/stadiums/kalingastadium.jpg',
          type: 'milestone'
        },
        {
          year: 2018,
          title: 'Hockey World Cup Host',
          event: 'Hosted the Men\'s Hockey World Cup and delivered a world-class fan atmosphere.',
          thumbnail: '/images/stadiums/kalingastadium.jpg',
          type: 'match'
        },
        {
          year: 2023,
          title: 'World Cup Returns',
          event: 'Again hosted major Hockey World Cup fixtures, strengthening its status as a global hockey venue.',
          thumbnail: '/images/stadiums/kalingastadium.jpg',
          type: 'match'
        }
      ],
      tournaments: [
        { name: 'Men\'s Hockey World Cup', year: 2018, winner: 'Belgium' },
        { name: 'Men\'s Hockey World Cup', year: 2023, winner: 'Germany' }
      ],
      upcomingMatches: [
        { teams: 'India vs Australia', date: '2026-06-14', tournament: 'FIH Pro League' },
        { teams: 'Odisha Warriors vs Bengaluru Blades', date: '2026-09-02', tournament: 'Hockey India League' }
      ],
      sportsPlayed: {
        connect: [{ id: 'hockey' }]
      }
    }
  })

  const prakashPadukone = await prisma.stadium.upsert({
    where: { id: 'prakash-padukone' },
    update: {
      description: 'A premier high-performance badminton academy that has produced and hosted elite Indian badminton talent.',
      latitude: 13.0086,
      longitude: 77.5931,
      historyTimeline: [
        {
          year: 1994,
          title: 'Academy Established',
          event: 'Prakash Padukone Badminton Academy was founded to build India\'s next generation of champions.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/prakashpadukonebadmintonacademy_nxwqal.jpg',
          type: 'milestone'
        },
        {
          year: 2010,
          title: 'National Elite Hub',
          event: 'Became a major training base for top shuttlers competing at global events.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/prakashpadukonebadmintonacademy_nxwqal.jpg',
          type: 'milestone'
        },
        {
          year: 2022,
          title: 'Premier Domestic Events',
          event: 'Hosted high-intensity national circuit matches featuring rising Indian stars.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/prakashpadukonebadmintonacademy_nxwqal.jpg',
          type: 'match'
        }
      ],
      tournaments: [
        { name: 'Senior National Ranking Series', year: 2022, winner: 'Multiple Champions' },
        { name: 'Junior National Camp Showcase', year: 2024, winner: 'Academy Prospects' }
      ],
      upcomingMatches: [
        { teams: 'Karnataka Smashers vs Hyderabad Racquets', date: '2026-07-08', tournament: 'Indian Badminton League' },
        { teams: 'Elite Training Exhibition', date: '2026-08-19', tournament: 'PPBA Invitational' }
      ]
    },
    create: {
      id: 'prakash-padukone',
      name: 'Prakash Padukone Badminton Academy',
      city: 'Bangalore',
      state: 'Karnataka',
      capacity: 2000,
      builtYear: 1994,
      description: 'A premier high-performance badminton academy that has produced and hosted elite Indian badminton talent.',
      latitude: 13.0086,
      longitude: 77.5931,
      galleryImages: [
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/prakashpadukonebadmintonacademy_nxwqal.jpg', caption: 'Academy View' }
      ],
      historyTimeline: [
        {
          year: 1994,
          title: 'Academy Established',
          event: 'Prakash Padukone Badminton Academy was founded to build India\'s next generation of champions.',
          thumbnail: '/images/stadiums/prakashpadukonebadmintonacademy.jpg',
          type: 'milestone'
        },
        {
          year: 2010,
          title: 'National Elite Hub',
          event: 'Became a major training base for top shuttlers competing at global events.',
          thumbnail: '/images/stadiums/prakashpadukonebadmintonacademy.jpg',
          type: 'milestone'
        },
        {
          year: 2022,
          title: 'Premier Domestic Events',
          event: 'Hosted high-intensity national circuit matches featuring rising Indian stars.',
          thumbnail: '/images/stadiums/prakashpadukonebadmintonacademy.jpg',
          type: 'match'
        }
      ],
      tournaments: [
        { name: 'Senior National Ranking Series', year: 2022, winner: 'Multiple Champions' },
        { name: 'Junior National Camp Showcase', year: 2024, winner: 'Academy Prospects' }
      ],
      upcomingMatches: [
        { teams: 'Karnataka Smashers vs Hyderabad Racquets', date: '2026-07-08', tournament: 'Indian Badminton League' },
        { teams: 'Elite Training Exhibition', date: '2026-08-19', tournament: 'PPBA Invitational' }
      ],
      sportsPlayed: {
        connect: [{ id: 'badminton' }]
      }
    }
  })

  const rkKhanna = await prisma.stadium.upsert({
    where: { id: 'rk-khanna' },
    update: {
      description: 'India\'s premier tennis venue in New Delhi, known for Davis Cup ties and major ATP/WTA-level competition windows.',
      latitude: 28.5919,
      longitude: 77.2243,
      historyTimeline: [
        {
          year: 1982,
          title: 'National Tennis Landmark',
          event: 'R.K. Khanna Tennis Stadium emerged as a flagship destination for Indian tennis.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/rkkhannastadium_bqhvdr.jpg',
          type: 'milestone'
        },
        {
          year: 2010,
          title: 'Commonwealth Spotlight',
          event: 'Hosted high-profile tennis events during India\'s global sporting calendar.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/rkkhannastadium_bqhvdr.jpg',
          type: 'match'
        },
        {
          year: 2023,
          title: 'Davis Cup Nights',
          event: 'Welcomed packed crowds for national-team tennis ties in a high-pressure atmosphere.',
          thumbnail: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/rkkhannastadium_bqhvdr.jpg',
          type: 'match'
        }
      ],
      tournaments: [
        { name: 'Davis Cup', year: 2023, winner: 'International Tie Rotation' },
        { name: 'Delhi Open', year: 2024, winner: 'Tour Champion' }
      ],
      upcomingMatches: [
        { teams: 'India vs Japan', date: '2026-09-12', tournament: 'Davis Cup' },
        { teams: 'Delhi Aces vs Mumbai Baseliners', date: '2026-10-03', tournament: 'Indian Tennis League' }
      ]
    },
    create: {
      id: 'rk-khanna',
      name: 'R.K. Khanna Tennis Stadium',
      city: 'New Delhi',
      state: 'Delhi',
      capacity: 5014,
      builtYear: 1982,
      description: 'India\'s premier tennis venue in New Delhi, known for Davis Cup ties and major ATP/WTA-level competition windows.',
      latitude: 28.5919,
      longitude: 77.2243,
      galleryImages: [
        { url: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775897505/rkkhannastadium_bqhvdr.jpg', caption: 'Stadium View' }
      ],
      historyTimeline: [
        {
          year: 1982,
          title: 'National Tennis Landmark',
          event: 'R.K. Khanna Tennis Stadium emerged as a flagship destination for Indian tennis.',
          thumbnail: '/images/stadiums/rkkhannastadium.jpg',
          type: 'milestone'
        },
        {
          year: 2010,
          title: 'Commonwealth Spotlight',
          event: 'Hosted high-profile tennis events during India\'s global sporting calendar.',
          thumbnail: '/images/stadiums/rkkhannastadium.jpg',
          type: 'match'
        },
        {
          year: 2023,
          title: 'Davis Cup Nights',
          event: 'Welcomed packed crowds for national-team tennis ties in a high-pressure atmosphere.',
          thumbnail: '/images/stadiums/rkkhannastadium.jpg',
          type: 'match'
        }
      ],
      tournaments: [
        { name: 'Davis Cup', year: 2023, winner: 'International Tie Rotation' },
        { name: 'Delhi Open', year: 2024, winner: 'Tour Champion' }
      ],
      upcomingMatches: [
        { teams: 'India vs Japan', date: '2026-09-12', tournament: 'Davis Cup' },
        { teams: 'Delhi Aces vs Mumbai Baseliners', date: '2026-10-03', tournament: 'Indian Tennis League' }
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
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/sachintendulkar_arvchm.jpg',
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
    where: { id: 'virat' },
    update: {
      bio: "The modern-day titan of cricket, Virat Kohli's fierce competitiveness and technical brilliance have rewritten record books. From leading India to a U-19 World Cup title to becoming the most followed cricketer globally, his journey is a masterclass in dedication.\n\nKnown for his peerless chasing abilities in limited-overs cricket, Kohli brought a new level of fitness and aggression to the Indian team. His transition from a talented youngster to a global superstar was marked by a relentless pursuit of excellence and a passion for the red-ball game that revitalized Test cricket in India. Beyond his hundreds, his legacy lies in the transformation of the Indian team into a fitness-first, high-intensity unit.",
      careerTimeline: [
        { year: 2008, event: 'Led India to victory in the ICC U-19 World Cup.' },
        { year: 2011, event: 'World Cup winner at age 22, playing a crucial role in the final.' },
        { year: 2014, event: 'Took over as Test captain, leading India to historic wins abroad.' },
        { year: 2023, event: 'Overtook Sachin Tendulkar for most ODI hundreds during the World Cup.' }
      ],
      stats: [
        { label: 'International Hundreds', value: '80+' },
        { label: 'ODI Average', value: '58+' },
        { label: 'ICC Awards', value: '10+' }
      ],
      achievements: ['Khel Ratna', 'Padma Shri', 'ODI Cricketer of the Decade']
    },
    create: {
      id: 'virat',
      name: 'Virat Kohli',
      sport: { connect: { id: 'cricket' } },
      country: 'India',
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901628/viratkohli_g7tzsx.png',
      bio: "The modern-day titan of cricket, Virat Kohli's fierce competitiveness and technical brilliance have rewritten record books. From leading India to a U-19 World Cup title to becoming the most followed cricketer globally, his journey is a masterclass in dedication.\n\nKnown for his peerless chasing abilities in limited-overs cricket, Kohli brought a new level of fitness and aggression to the Indian team. His transition from a talented youngster to a global superstar was marked by a relentless pursuit of excellence and a passion for the red-ball game that revitalized Test cricket in India. Beyond his hundreds, his legacy lies in the transformation of the Indian team into a fitness-first, high-intensity unit.",
      careerTimeline: [
        { year: 2008, event: 'Led India to victory in the ICC U-19 World Cup.' },
        { year: 2011, event: 'World Cup winner at age 22, playing a crucial role in the final.' },
        { year: 2014, event: 'Took over as Test captain, leading India to historic wins abroad.' },
        { year: 2023, event: 'Overtook Sachin Tendulkar for most ODI hundreds during the World Cup.' }
      ],
      stats: [
        { label: 'International Hundreds', value: '80+' },
        { label: 'ODI Average', value: '58+' },
        { label: 'ICC Awards', value: '10+' }
      ],
      achievements: ['Khel Ratna', 'Padma Shri', 'ODI Cricketer of the Decade'],
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
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901628/sunilchhetri_ezdhww.jpg',
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
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/manpreetsingh_modxsl.jpg',
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
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/pvsindhu_tkgxro.jpg',
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

  await prisma.player.upsert({
    where: { id: 'saina' },
    update: {
      bio: "The trailblazer who put Indian badminton on the Olympic podium, Saina Nehwal's historic bronze at London 2012 was a watershed moment for Indian sports. Her grit and mental strength made her a former World No. 1.\n\nSaina's career is marked by numerous 'firsts' for India—the first to win an Olympic medal in badminton, the first to win the BWF World Junior Championships, and the first to reach the finals of the BWF World Championships. Her success at the highest level, including over 20 international titles, paved the way for the current golden era of Indian badminton. She remains a symbol of determination and excellence.",
      careerTimeline: [
        { year: 2008, event: 'First Indian to win the World Junior Badminton Championships.' },
        { year: 2010, event: 'Won Gold at the Commonwealth Games in Delhi.' },
        { year: 2012, event: 'Won the historic Bronze medal at the London Olympics.' },
        { year: 2015, event: 'Ranked World No. 1 in women\'s singles by BWF.' }
      ],
      stats: [
        { label: 'Olympic Medals', value: '1' },
        { label: 'BWF Titles', value: '24' },
        { label: 'World Ranking', value: 'Former No. 1' }
      ],
      achievements: ['Olympic Bronze 2012', 'Former World No. 1', 'Khel Ratna Award']
    },
    create: {
      id: 'saina',
      name: 'Saina Nehwal',
      sport: { connect: { id: 'badminton' } },
      country: 'India',
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775902127/sainanehwal_tkywz1.jpg',
      bio: "The trailblazer who put Indian badminton on the Olympic podium, Saina Nehwal's historic bronze at London 2012 was a watershed moment for Indian sports. Her grit and mental strength made her a former World No. 1.\n\nSaina's career is marked by numerous 'firsts' for India—the first to win an Olympic medal in badminton, the first to win the BWF World Junior Championships, and the first to reach the finals of the BWF World Championships. Her success at the highest level, including over 20 international titles, paved the way for the current golden era of Indian badminton. She remains a symbol of determination and excellence.",
      careerTimeline: [
        { year: 2008, event: 'First Indian to win the World Junior Badminton Championships.' },
        { year: 2010, event: 'Won Gold at the Commonwealth Games in Delhi.' },
        { year: 2012, event: 'Won the historic Bronze medal at the London Olympics.' },
        { year: 2015, event: 'Ranked World No. 1 in women\'s singles by BWF.' }
      ],
      stats: [
        { label: 'Olympic Medals', value: '1' },
        { label: 'BWF Titles', value: '24' },
        { label: 'World Ranking', value: 'Former No. 1' }
      ],
      achievements: ['Olympic Bronze 2012', 'Former World No. 1', 'Khel Ratna Award'],
      stadiumsPlayed: { connect: [{ id: 'prakash-padukone' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'leander' },
    update: {
      bio: "An absolute legend of world tennis, Leander Paes' longevity and success in doubles are unparalleled. His Olympic bronze in 1996 ended India's 44-year wait for an individual Olympic medal.\n\nWith 18 Grand Slam titles in men's doubles and mixed doubles, Paes is one of the most successful doubles players ever. His 'Indian Express' partnership with Mahesh Bhupathi remains one of the most iconic duos in tennis history. Known for his incredible net play and chest-bumps, his passion for representing India in the Davis Cup for over three decades defines his sporting spirit.",
      careerTimeline: [
        { year: 1996, event: 'Won the Olympic Bronze medal in Atlanta in singles.' },
        { year: 1999, event: 'Reached the finals of all four Grand Slams in doubles with Bhupathi.' },
        { year: 2016, event: 'Competed in his record 7th consecutive Olympic Games.' }
      ],
      stats: [
        { label: 'Grand Slams', value: '18' },
        { label: 'Olympic Games', value: '7' },
        { label: 'Davis Cup Wins', value: 'Prev. Record Holder' }
      ],
      achievements: ['Olympic Bronze 1996', '18 Grand Slam Titles', 'Padma Bhushan']
    },
    create: {
      id: 'leander',
      name: 'Leander Paes',
      sport: { connect: { id: 'tennis' } },
      country: 'India',
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/leanderpaes_d3dpjp.png',
      bio: "An absolute legend of world tennis, Leander Paes' longevity and success in doubles are unparalleled. His Olympic bronze in 1996 ended India's 44-year wait for an individual Olympic medal.\n\nWith 18 Grand Slam titles in men's doubles and mixed doubles, Paes is one of the most successful doubles players ever. His 'Indian Express' partnership with Mahesh Bhupathi remains one of the most iconic duos in tennis history. Known for his incredible net play and chest-bumps, his passion for representing India in the Davis Cup for over three decades defines his sporting spirit.",
      careerTimeline: [
        { year: 1996, event: 'Won the Olympic Bronze medal in Atlanta in singles.' },
        { year: 1999, event: 'Reached the finals of all four Grand Slams in doubles with Bhupathi.' },
        { year: 2016, event: 'Competed in his record 7th consecutive Olympic Games.' }
      ],
      stats: [
        { label: 'Grand Slams', value: '18' },
        { label: 'Olympic Games', value: '7' },
        { label: 'Davis Cup Wins', value: 'Prev. Record Holder' }
      ],
      achievements: ['Olympic Bronze 1996', '18 Grand Slam Titles', 'Padma Bhushan'],
      stadiumsPlayed: { connect: [{ id: 'rk-khanna' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'gavaskar' },
    update: {
      bio: "The 'Little Master' who taught India how to compete against the world's most fearsome fast bowlers without a helmet. Sunil Gavaskar's technique and courage set the foundation for Indian cricket's global dominance.\n\nHis debut series in the West Indies in 1971, where he scored 774 runs, remains the stuff of legend. Gavaskar was the first player to reach 10,000 runs in Test cricket and held the record for the most centuries for decades. His discipline at the crease and his ability to leave the ball made him the ultimate opening batsman, inspiring a generation of cricketers, including Sachin Tendulkar.",
      careerTimeline: [
        { year: 1971, event: 'Sensational debut series in West Indies with 774 runs.' },
        { year: 1983, event: 'Member of the historic World Cup winning squad.' },
        { year: 1987, event: 'First cricketer to score 10,000 Test runs.' }
      ],
      stats: [
        { label: 'Test Runs', value: '10,122' },
        { label: 'Test Centuries', value: '34' },
        { label: 'Test Average', value: '51.12' }
      ],
      achievements: ['Padma Bhushan', 'First to 10k Test Runs', 'World Cup 1983']
    },
    create: {
      id: 'gavaskar',
      name: 'Sunil Gavaskar',
      sport: { connect: { id: 'cricket' } },
      country: 'India',
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/sunilgavaskar_oqig8j.jpg',
      bio: "The 'Little Master' who taught India how to compete against the world's most fearsome fast bowlers without a helmet. Sunil Gavaskar's technique and courage set the foundation for Indian cricket's global dominance.\n\nHis debut series in the West Indies in 1971, where he scored 774 runs, remains the stuff of legend. Gavaskar was the first player to reach 10,000 runs in Test cricket and held the record for the most centuries for decades. His discipline at the crease and his ability to leave the ball made him the ultimate opening batsman, inspiring a generation of cricketers, including Sachin Tendulkar.",
      careerTimeline: [
        { year: 1971, event: 'Sensational debut series in West Indies with 774 runs.' },
        { year: 1983, event: 'Member of the historic World Cup winning squad.' },
        { year: 1987, event: 'First cricketer to score 10,000 Test runs.' }
      ],
      stats: [
        { label: 'Test Runs', value: '10,122' },
        { label: 'Test Centuries', value: '34' },
        { label: 'Test Average', value: '51.12' }
      ],
      achievements: ['Padma Bhushan', 'First to 10k Test Runs', 'World Cup 1983'],
      stadiumsPlayed: { connect: [{ id: 'wankhede' }, { id: 'narendra-modi' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'dravid' },
    update: {
      bio: "Known as 'The Wall', Rahul Dravid's technical perfection and immense concentration made him one of the greatest Test batsmen. His selfless commitment to the team, whether as a keeper/batsman or captain, defines his legacy.\n\nDravid's ability to weather the storm in challenging conditions abroad earned him the respect of teammates and opponents alike. His partnerships with VVS Laxman and Sachin Tendulkar are legendary. After retirement, his contribution as a coach brought India the 2024 T20 World Cup, proving that his tactical mind and mentorship are as valuable as his batting.",
      careerTimeline: [
        { year: 1996, event: 'Stunning Test debut at Lord\'s, scoring 95.' },
        { year: 2001, event: 'The historic 180 in the 376-run partnership with Laxman at Eden Gardens.' },
        { year: 2004, event: 'Named ICC Player of the Year after a phenomenal run.' }
      ],
      stats: [
        { label: 'International Runs', value: '24,000+' },
        { label: 'Test Centuries', value: '36' },
        { label: 'Catches (Test)', value: '210' }
      ],
      achievements: ['Padma Vibhushan', 'ICC Hall of Fame', 'T20 WC Winning Coach']
    },
    create: {
      id: 'dravid',
      name: 'Rahul Dravid',
      sport: { connect: { id: 'cricket' } },
      country: 'India',
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/rahuldravid_gdz7fe.jpg',
      bio: "Known as 'The Wall', Rahul Dravid's technical perfection and immense concentration made him one of the greatest Test batsmen. His selfless commitment to the team, whether as a keeper/batsman or captain, defines his legacy.\n\nDravid's ability to weather the storm in challenging conditions abroad earned him the respect of teammates and opponents alike. His partnerships with VVS Laxman and Sachin Tendulkar are legendary. After retirement, his contribution as a coach brought India the 2024 T20 World Cup, proving that his tactical mind and mentorship are as valuable as his batting.",
      careerTimeline: [
        { year: 1996, event: 'Stunning Test debut at Lord\'s, scoring 95.' },
        { year: 2001, event: 'The historic 180 in the 376-run partnership with Laxman at Eden Gardens.' },
        { year: 2004, event: 'Named ICC Player of the Year after a phenomenal run.' }
      ],
      stats: [
        { label: 'International Runs', value: '24,000+' },
        { label: 'Test Centuries', value: '36' },
        { label: 'Catches (Test)', value: '210' }
      ],
      achievements: ['Padma Vibhushan', 'ICC Hall of Fame', 'T20 WC Winning Coach'],
      stadiumsPlayed: { connect: [{ id: 'wankhede' }, { id: 'narendra-modi' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'hardik' },
    update: {
      bio: "A true modern-day all-rounder, Hardik Pandya's explosive batting and effective pace bowling make him a vital asset in white-ball cricket. His ability to finish games and pick crucial wickets has made him a fan favorite.\n\nHardik's rise from a humble background to IPL stardom with Mumbai Indians is an inspiring tale of talent and hard work. He has evolved into a leader, captaining Gujarat Titans to an IPL title in their debut season. His match-winning performances in high-pressure ICC events have solidified his status as one of India's premier match-winners.",
      careerTimeline: [
        { year: 2015, event: 'Breakthrough IPL season with Mumbai Indians.' },
        { year: 2022, event: 'Captained Gujarat Titans to the IPL title in their first year.' },
        { year: 2024, event: 'Played a decisive role in India\'s T20 World Cup triumph.' }
      ],
      stats: [
        { label: 'IPL Titles', value: '5' },
        { label: 'T20I Strike Rate', value: '140+' },
        { label: 'International Caps', value: '200+' }
      ],
      achievements: ['T20 World Cup Winner', 'IPL Winning Captain']
    },
    create: {
      id: 'hardik',
      name: 'Hardik Pandya',
      sport: { connect: { id: 'cricket' } },
      country: 'India',
      image: 'https://res.cloudinary.com/daud2uqqf/image/upload/v1775901627/hardikpandya_qe9qmy.jpg',
      bio: "A true modern-day all-rounder, Hardik Pandya's explosive batting and effective pace bowling make him a vital asset in white-ball cricket. His ability to finish games and pick crucial wickets has made him a fan favorite.\n\nHardik's rise from a humble background to IPL stardom with Mumbai Indians is an inspiring tale of talent and hard work. He has evolved into a leader, captaining Gujarat Titans to an IPL title in their debut season. His match-winning performances in high-pressure ICC events have solidified his status as one of India's premier match-winners.",
      careerTimeline: [
        { year: 2015, event: 'Breakthrough IPL season with Mumbai Indians.' },
        { year: 2022, event: 'Captained Gujarat Titans to the IPL title in their first year.' },
        { year: 2024, event: 'Played a decisive role in India\'s T20 World Cup triumph.' }
      ],
      stats: [
        { label: 'IPL Titles', value: '5' },
        { label: 'T20I Strike Rate', value: '140+' },
        { label: 'International Caps', value: '200+' }
      ],
      achievements: ['T20 World Cup Winner', 'IPL Winning Captain'],
      stadiumsPlayed: { connect: [{ id: 'wankhede' }, { id: 'narendra-modi' }] }
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
