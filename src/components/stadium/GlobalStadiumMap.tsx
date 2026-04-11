"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { OSM_CONFIG } from "@/lib/maps";
import Link from "next/link";
import { MapPin } from "lucide-react";

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
    const fixLeafletIcon = async () => {
      const L = (await import("leaflet")).default;
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    };

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
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-rose/10 z-10 bg-blush/10">
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
                <div className="flex flex-col gap-2 mt-4">
                  <Link 
                    href={`/stadium/${stadium.id}`}
                    className="w-full py-2 bg-rose text-blush text-center text-[9px] uppercase tracking-[0.2em] rounded-md hover:bg-plum transition-colors duration-300"
                  >
                    Explore Venue
                  </Link>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${stadium.latitude},${stadium.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-plum/5 text-rose text-center text-[9px] uppercase tracking-[0.2em] rounded-md hover:bg-rose/10 transition-colors duration-300 border border-rose/5"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
