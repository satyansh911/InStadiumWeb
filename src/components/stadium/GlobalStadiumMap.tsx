"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import with SSR disabled because Leaflet depends on 'window'
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

import { OSM_CONFIG } from "@/lib/maps";
import { useEffect, useState } from "react";
import L from "leaflet";
import Link from "next/link";
import { MapPin } from "lucide-react";

// Fix for default marker icon not appearing in Leaflet with Next.js
const fixLeafletIcon = () => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }
};

interface Stadium {
  id: string;
  name: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  sport?: string;
}

interface GlobalStadiumMapProps {
  stadiums: Stadium[];
}

export default function GlobalStadiumMap({ stadiums }: GlobalStadiumMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setMounted(true);
  }, []);

  // Filter out stadiums without coordinates
  const validStadiums = stadiums.filter(s => s.latitude !== null && s.longitude !== null);

  if (!mounted) return (
    <div className="w-full h-full bg-plum/5 rounded-3xl animate-pulse flex items-center justify-center">
      <div className="text-center">
        <MapPin size={32} className="text-rose/20 mx-auto mb-4 animate-bounce" />
        <span className="text-plum/30 font-sans text-xs tracking-[0.3em] uppercase block">Locating Arenas...</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-rose/10 z-0 bg-blush/10">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution={OSM_CONFIG.attribution}
          url={OSM_CONFIG.tileUrl}
        />
        {validStadiums.map((stadium) => (
          <Marker key={stadium.id} position={[stadium.latitude!, stadium.longitude!]}>
            <Popup className="premium-popup">
              <div className="p-2 min-w-[200px]">
                <span className="font-sans text-[8px] tracking-widest uppercase text-rose font-bold block mb-1">
                  {stadium.sport || 'Elite Arena'}
                </span>
                <p className="font-sans text-sm font-bold text-plum mb-2 leading-tight">
                  {stadium.name}
                </p>
                <p className="text-[10px] text-plum/60 mb-4 flex items-center gap-1 italic">
                  <MapPin size={10} /> {stadium.city}
                </p>
                <Link 
                  href={`/stadium/${stadium.id}`}
                  className="inline-block w-full py-2 bg-rose text-blush text-center text-[9px] uppercase tracking-[0.2em] rounded-md hover:bg-plum transition-colors duration-300"
                >
                  Explore Venue
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
