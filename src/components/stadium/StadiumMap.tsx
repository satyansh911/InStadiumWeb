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

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-rose/10 z-0">
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
            <div className="font-sans">
              <p className="font-bold text-plum">{stadiumName}</p>
              <p className="text-xs text-plum/60">Verified Sports Arena</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
