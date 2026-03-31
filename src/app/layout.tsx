import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://instadium.vercel.app"),
  title: {
    default: "InStadium | Indian Sports Stadium Guide",
    template: "%s | InStadium"
  },
  description: "Explore world-class sports stadiums across India. Scan QR codes for interactive guides or discover stadiums by sports.",
  icons: {
    icon: "/Instadiumlogo.png",
    shortcut: "/Instadiumlogo.png",
    apple: "/Instadiumlogo.png",
  },
  keywords: ["stadium guide", "indian stadiums", "sports architecture", "cricket stadiums", "football stadiums", "interactive stadium guide", "instadium"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://instadium.app",
    siteName: "InStadium",
    title: "InStadium | Interactive Indian Sports Stadium Guide",
    description: "Your smart companion for exploring sports stadiums in India.",
    images: [
      {
        url: "/Instadiumlogo.png",
        width: 512,
        height: 512,
        alt: "InStadium"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "InStadium | Indian Sports Stadium Guide",
    description: "Interactive guides and discovery for sports stadiums in India.",
    images: ["/Instadiumlogo.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
