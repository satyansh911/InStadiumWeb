import Navbar from "@/components/Navbar";
import PressContent from "./PressContent";

export const metadata = {
  title: "Archival Press",
  description: "Global press coverage and editorial features of our studio's work in Vogue, Harper's Bazaar, and more."
};

export default function PressPage() {
  return (
    <>
      <div className="bg-rose h-16 w-full fixed top-0 z-40"></div>
      <Navbar />
      <PressContent />
    </>
  );
}
