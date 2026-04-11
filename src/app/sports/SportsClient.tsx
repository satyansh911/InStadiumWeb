"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Users, Trophy, ExternalLink } from "lucide-react";
import Rulebook from "@/components/stadium/Rulebook";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { motion, AnimatePresence } from "framer-motion";

const SPORTS_DATA: Record<string, { description: string, rulebook: any[], fullVideoGuide?: { url: string; channelName: string } }> = {
  Cricket: {
    description: "Known as the 'Gentleman's Game', cricket is a multi-format sport with a rich heritage in India. From the traditional Test matches to the high-octane T20 IPL, it's more than just a sport; it's an emotion.",
    rulebook: [
      { 
        title: "The Pitch", 
        content: "A central 22-yard strip where the main action happens. It's carefully curated to influence the ball's movement—some favor fast bowlers with bounce, while others assist spinners as the match progresses.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775395348/The_Pitch_wlpzie.mp4"
      },
      { 
        title: "The Over", 
        content: "A set of six legal deliveries bowled by a single player from one end of the pitch. After an over, the bowling end changes, and a different player takes over, ensuring a strategic rotation of pace and guile.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775395338/The_Over_mfjbuh.mp4"
      },
      { 
        title: "Wickets", 
        content: "The primary objective for bowlers. There are 10 ways to get a batsman out, including being bowled (hitting the stumps), caught, Leg Before Wicket (LBW), or run out while trying to complete a run.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775395337/Wickets_y5ts27.mp4"
      },
      { 
        title: "Scoring Runs", 
        content: "Batsmen score runs by hitting the ball and running between the wickets. Hitting the ball to the boundary scores 4 runs, while clearing the rope on the full earns a maximum of 6 runs.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775395328/Scoring_Runs_l4pi8a.mp4"
      }
    ],
    fullVideoGuide: {
      url: "https://www.youtube.com/watch?v=VwII4y5vpyU",
      channelName: "wikiHow"
    }
  },
  Football: {
    description: "The world's most popular sport, football is a game of skill, strategy, and endurance. In India, it's witnessing a massive resurgence with the Indian Super League and a growing grassroots movement.",
    rulebook: [
      { 
        title: "The Goal", 
        content: "The main objective is to drive the ball into the opponent's net. A goal is scored when the entire ball crosses the goal line between the posts and under the crossbar.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775415708/The_Goal_il3bys.mp4"
      },
      { 
        title: "Fouls & Cards", 
        content: "Physical contact is regulated. Reckless play or unsporting behavior results in a Yellow Card (warning) or a Red Card (ejection). Professional fouls can lead to direct free kicks or penalties.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775415693/Fouls_iwp0sr.mp4"
      },
      { 
        title: "Offside Rule", 
        content: "A strategic rule preventing 'goal-hanging'. An attacking player must have at least two opponents (usually the keeper and one defender) between them and the goal line when the ball is played to them.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775415695/Offside_Rule_lede0e.mp4"
      },
      { 
        title: "Corner Kicks", 
        content: "Awarded when the defending team is the last to touch the ball before it crosses their own goal line (excluding goals). It's a prime opportunity for set-piece specialists to create scoring chances.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775415696/Corner_Kicks_mxxpx4.mp4"
      }
    ],
    fullVideoGuide: {
      url: "https://www.youtube.com/watch?v=qknP-E-vPQ4",
      channelName: "wikiHow"
    }
  },
  Kabaddi: {
    description: "An ancient Indian contact sport that requires agility, lung capacity, and immense strength. It's a thrilling 40-minute battle where individual brilliance meets collective defensive strategy.",
    rulebook: [
      { 
        title: "The Raid", 
        content: "An individual attacker (Raider) enters the opponent's half, chanting 'Kabaddi' without breaking their breath. They must touch at least one defender and return to their own half safely.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775828648/The_Raid_ppgzbh.mp4"
      },
      { 
        title: "Touch & Tag", 
        content: "Points are scored for every defender the raider touches before returning. Defenders are 'out' and must leave the mat until a teammate scores a point to revive them.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775828647/Touch_Tag_xlwhzh.mp4"
      },
      { 
        title: "The Tackle", 
        content: "Defenders (Antis) work together to trap the raider and prevent them from reaching the midline. A successful tackle earns the defending team a point and revives one of their own players.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775828648/The_Tackle_cooni7.mp4"
      },
      { 
        title: "Bonus Point", 
        content: "A raider can earn an extra point by crossing the 'Bonus Line' when there are 6 or 7 defenders active on the mat, even if they don't touch any opponent.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775828646/Bonus_Point_buabw1.mp4"
      }
    ],
    fullVideoGuide: {
      url: "https://youtu.be/ybdGREjvluU",
      channelName: "wikiHow"
    }
  },
  Badminton: {
    description: "A fast-paced racket sport requiring lightning-fast reflexes and delicate touch. India has emerged as a global superpower in badminton, with numerous Olympic and World Championship medals.",
    rulebook: [
      { 
        title: "The Serve", 
        content: "Must be hit underhand and diagonally into the opponent's service court. In professional play, the shuttle must be hit from below the server's waist height.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887071/The_Serve_gcwufh.mp4"
      },
      { 
        title: "Rally Scoring", 
        content: "A point is won on every serve, regardless of who is serving. Matches are usually best of three games, with each game played to 21 points.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887070/Rally_Scoring_anf646.mp4"
      },
      { 
        title: "Let", 
        content: "A call made by the umpire to halt play when an unforeseen accident or distraction occurs. The point is replayed.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887072/Let_kuljld.mp4"
      },
      { 
        title: "Faults", 
        content: "Includes the shuttle landing outside boundaries, failing to pass over the net, or touching the net with the racket or body.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887070/Faults_fmxiam.mp4"
      }
    ],
    fullVideoGuide: {
      url: "https://youtu.be/tAS7rOKtpgQ",
      channelName: "Mr. Animate"
    }
  },
  Tennis: {
    description: "The epitome of individual sporting excellence played on various surfaces. From clay courts to grass, tennis in India has a legacy of producing world-class doubles specialists.",
    rulebook: [
      { 
        title: "Game/Set/Match", 
        content: "The scoring hierarchy. Four points win a game (15, 30, 40, Game), six games win a set, and two or three sets win the match. 'Deuce' occurs at 40-40, requiring a two-point lead.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887287/GameSetMatch_cu7iir.mp4"
      },
      { 
        title: "The Serve", 
        content: "Starting the point from behind the baseline. If it hits the net but lands in the correct service box, it's a 'Let' (replay). Missing twice results in a Double Fault and loss of the point.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887285/The_Serve_mq2jda.mp4"
      },
      { 
        title: "The Deuce", 
        content: "A Tie at 40-all. A player must win two consecutive points (Advantage and then Game Point) to win the game. This creates the most high-pressure moments in the sport.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887286/Deuce_s3ab9y.mp4"
      },
      { 
        title: "Baseline Play", 
        content: "The strategic exchange of groundstrokes from the back of the court. Players use topspin, slice, and varying depths to outmaneuver opponents and create winning opportunities.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775887285/Baseline_Play_vjange.mp4"
      }
    ],
    fullVideoGuide: {
      url: "https://youtu.be/zcagGHQhcMI",
      channelName: "wikiHow"
    }
  },
  Hockey: {
    description: "India's national glory sport with a legendary history of 8 Olympic Gold medals. Modern field hockey is a high-intensity game played on synthetic turf at breakneck speeds.",
    rulebook: [
      { 
        title: "Penalty Corner", 
        content: "Awarded for defensive fouls inside the circle. The ball is pushed from the backline to attackers at the top of the circle.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775888147/Penalty_Corner_qursvq.mp4"
      },
      { 
        title: "The Cards", 
        content: "Green (2 min suspension), Yellow (5-10 min suspension), and Red (Permanent exclusion) are used for discipline.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775888143/The_Cards_gvz9id.mp4"
      },
      { 
        title: "No-Feet Rule", 
        content: "Players (except goalkeepers inside the circle) are not allowed to use their feet or any other part of their body to play the ball.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775888161/No_Feet_Rule_getc6d.mp4"
      },
      { 
        title: "Dangerous Play", 
        content: "Includes lifting the ball into an opponent, high-sticking, or any action that threatens player safety.",
        videoUrl: "https://res.cloudinary.com/daud2uqqf/video/upload/v1775888142/Dangerous_Play_xw8lqt.mp4"
      }
    ],
    fullVideoGuide: {
      url: "https://youtu.be/KUnLgiX44BQ",
      channelName: "wikiHow"
    }
  }
};

export default function SportsClient({ initialSports, initialStadiums }: { initialSports: any[], initialStadiums: any[] }) {
  const [selectedSportName, setSelectedSportName] = useState("Cricket");
  const [isChanging, setIsChanging] = useState(false);

  const activeSportData = useMemo(() => SPORTS_DATA[selectedSportName] || SPORTS_DATA["Cricket"], [selectedSportName]);

  const affiliatedStadiums = useMemo(() => {
    return initialStadiums.filter(stadium => 
      stadium.sportsPlayed?.some((s: any) => s.name === selectedSportName)
    );
  }, [selectedSportName, initialStadiums]);

  const handleSportChange = (name: string) => {
    if (name === selectedSportName) return;
    setIsChanging(true);
    setTimeout(() => {
      setSelectedSportName(name);
      setIsChanging(false);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-48 pb-24 px-6 bg-plum overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pinstripe-light" />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-8xl font-light text-blush mb-8 italic">
                  The <span className="not-italic font-normal">Sporting</span> Spirit
                </h1>
                <p className="text-blush/60 font-sans text-[11px] md:text-xs tracking-[0.4em] uppercase leading-loose">
                  Interactive rulebooks and curated guides to India&apos;s most loved disciplines.
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-rose text-7xl md:text-9xl font-light opacity-20 italic">0{Object.keys(SPORTS_DATA).indexOf(selectedSportName) + 1}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sport Selector */}
      <section className="sticky top-[80px] z-40 bg-blush/90 backdrop-blur-md border-y border-rose/10 py-8 px-6 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto flex gap-12 items-center justify-between min-w-max">
          {Object.keys(SPORTS_DATA).map((sport) => (
            <button
              key={sport}
              onClick={() => handleSportChange(sport)}
              className={`group flex flex-col items-center gap-2 transition-all duration-300 ${
                selectedSportName === sport ? "opacity-100" : "opacity-30 hover:opacity-60"
              }`}
            >
              <span className={`font-sans text-[10px] tracking-[0.3em] uppercase font-bold ${selectedSportName === sport ? "text-rose" : "text-plum"}`}>
                {sport}
              </span>
              <div className={`h-1 bg-rose transition-all duration-500 rounded-full ${selectedSportName === sport ? "w-full" : "w-0 group-hover:w-4"}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <AnimatePresence mode="wait">
          {!isChanging && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-32"
            >
              {/* Description & Rulebook Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-4 space-y-12">
                   <div className="space-y-6">
                     <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold">Introduction</span>
                     <h2 className="text-4xl md:text-5xl font-light leading-snug">
                       Mastering the game of <span className="italic">{selectedSportName}</span>
                     </h2>
                   </div>
                   <p className="text-plum/70 font-sans text-sm leading-relaxed max-w-lg">
                     {activeSportData.description}
                   </p>
                   <div className="pt-8 flex flex-wrap gap-4">
                      {["Pro League", "Championship", "Interactive Guide"].map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full border border-rose/10 text-[9px] font-sans tracking-widest uppercase text-plum/50">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>

                <div className="lg:col-span-8">
                  <Rulebook 
                    sportName={selectedSportName} 
                    rules={activeSportData.rulebook} 
                    fullVideoGuide={(activeSportData as any).fullVideoGuide}
                  />
                </div>
              </div>

              {/* Affiliated Stadiums Section */}
              <div className="space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-rose/10 pb-12">
                   <div className="space-y-4">
                     <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold">Affiliated</span>
                     <h2 className="text-4xl md:text-6xl font-light">Iconic <span className="italic">Venues</span></h2>
                   </div>
                   <Link 
                     href="/stadiums" 
                     className="group flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors"
                   >
                     Explore All Venues
                     <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>

                {affiliatedStadiums.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {affiliatedStadiums.map((stadium, idx) => (
                      <ScrollReveal key={stadium.id} delay={(idx % 3 + 1) as 1 | 2 | 3}>
                        <Link 
                          href={`/stadium/${stadium.id}`}
                          className="group block relative overflow-hidden rounded-2xl bg-plum aspect-[16/10] shadow-xl"
                        >
                          <Image 
                            src={getOptimizedImageUrl(stadium.image || (stadium as any).galleryImages?.[0]?.url, { width: 800, height: 500, crop: 'fill' })} 
                            alt={stadium.name}
                            fill
                            unoptimized
                            className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75 saturate-[0.8]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin size={10} className="text-rose" />
                              <span className="font-sans text-[9px] tracking-widest uppercase text-blush/60">{stadium.city}</span>
                            </div>
                            <h4 className="text-blush text-xl font-light italic">{stadium.name}</h4>
                          </div>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center border-2 border-dashed border-rose/5 rounded-3xl bg-rose/[0.02]">
                    <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ExternalLink size={24} className="text-rose/30" />
                    </div>
                    <p className="font-sans text-xs tracking-widest text-plum/30 uppercase">No dedicated venues currently listed for {selectedSportName}</p>
                    <Link href="/stadiums" className="mt-8 inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-rose border-b border-rose pb-1">Browse All Venues</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
