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
    update: {},
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
        { year: 1974, event: 'Stadium Constructed' },
        { year: 2011, event: 'Hosted ICC World Cup Final' }
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
    update: {},
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
        { year: 2020, event: 'Stadium Inaugurated' },
        { year: 2023, event: 'Hosted ICC World Cup Final' }
      ],
      sportsPlayed: {
        connect: [{ id: 'cricket' }]
      }
    }
  })

  const saltLake = await prisma.stadium.upsert({
    where: { id: 'salt-lake' },
    update: {},
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
        { year: 1984, event: 'Opening Ceremony' },
        { year: 2017, event: 'Hosted FIFA U-17 World Cup Final' }
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
      image: '/images/players/sachintendulkar.jpg',
    },
    create: {
      id: 'sachin',
      name: 'Sachin Tendulkar',
      sport: { connect: { id: 'cricket' } },
      country: 'India',
      image: '/images/players/sachintendulkar.jpg',
      achievements: ['Bharat Ratna', '100 International Centuries'],
      stadiumsPlayed: { connect: [{ id: 'wankhede' }, { id: 'narendra-modi' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'sunil-chhetri' },
    update: {
      image: '/images/players/sunilchhetri.jpg',
    },
    create: {
      id: 'sunil-chhetri',
      name: 'Sunil Chhetri',
      sport: { connect: { id: 'football' } },
      country: 'India',
      image: '/images/players/sunilchhetri.jpg',
      achievements: ['Most goals for India', 'Khel Ratna Award'],
      stadiumsPlayed: { connect: [{ id: 'salt-lake' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'manpreet-singh' },
    update: {
      image: '/images/players/manpreetsingh.jpg',
    },
    create: {
      id: 'manpreet-singh',
      name: 'Manpreet Singh',
      sport: { connect: { id: 'hockey' } },
      country: 'India',
      image: '/images/players/manpreetsingh.jpg',
      achievements: ['Tokyo 2020 Bronze', 'Khel Ratna Award'],
      stadiumsPlayed: { connect: [{ id: 'kalinga' }] }
    }
  })

  await prisma.player.upsert({
    where: { id: 'pv-sindhu' },
    update: {
      image: '/images/players/pvsindhu.jpg',
    },
    create: {
      id: 'pv-sindhu',
      name: 'PV Sindhu',
      sport: { connect: { id: 'badminton' } },
      country: 'India',
      image: '/images/players/pvsindhu.jpg',
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
