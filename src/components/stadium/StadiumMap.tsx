"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Navigation, ExternalLink } from "lucide-react";
import { OSM_CONFIG } from "@/lib/maps";

// Fix for default marker icon not appearing in Leaflet with Next.js
const fixLeafletIcon = () => {
  if (typeof window !== "undefined") {
    const L = require("leaflet");
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }
};

interface StadiumMapProps {
  lat: number;
  lng: number;
  stadiumName: string;
}

export default function StadiumMap({ lat, lng, stadiumName }: StadiumMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-full h-[400px] bg-plum/5 rounded-3xl animate-pulse flex items-center justify-center">
      <span className="text-plum/30 font-sans text-xs tracking-widest uppercase">Initializing Map...</span>
    </div>
  );

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="relative group w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-rose/10 z-10 transition-all duration-700">
      {/* Floating Directions Button */}
      <div className="absolute top-6 right-6 z-[1000] pointer-events-auto">
        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-rose text-blush rounded-xl font-sans text-[10px] tracking-[0.2em] uppercase font-bold shadow-2xl shadow-rose/40 hover:bg-plum hover:scale-105 transition-all duration-500 backdrop-blur-sm"
        >
          <Navigation size={14} className="fill-blush/20" />
          Get Directions
        </a>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution={OSM_CONFIG.attribution}
          url={OSM_CONFIG.tileUrl}
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="p-3 min-w-[200px]">
              <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-rose font-bold block mb-2">Location Verified</span>
              <p className="font-sans text-sm font-bold text-plum mb-3 leading-tight">{stadiumName}</p>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-plum/5 hover:bg-rose/10 text-rose font-sans text-[9px] tracking-widest uppercase font-bold rounded-lg transition-colors border border-rose/10"
              >
                <ExternalLink size={12} />
                Open in Maps
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
