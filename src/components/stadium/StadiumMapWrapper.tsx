"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./StadiumMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-plum/5 rounded-3xl animate-pulse flex items-center justify-center">
      <span className="text-plum/30 font-sans text-xs tracking-widest uppercase">Initializing Map...</span>
    </div>
  ),
});

interface StadiumMapWrapperProps {
  lat: number;
  lng: number;
  stadiumName: string;
}

export default function StadiumMapWrapper(props: StadiumMapWrapperProps) {
  return <Map {...props} />;
}
