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
  title: {
    default: "Instadium | Indian Sports Stadium Guide",
    template: "%s | Instadium"
  },
  description: "Explore world-class sports stadiums across India. Scan QR codes for interactive guides or discover stadiums by sports.",
  keywords: ["stadium guide", "indian stadiums", "sports architecture", "cricket stadiums", "football stadiums", "interactive stadium guide", "instadium"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://instadium.app",
    siteName: "Instadium",
    title: "Instadium | Interactive Indian Sports Stadium Guide",
    description: "Your smart companion for exploring sports stadiums in India.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80",
        width: 1200,
        height: 630,
        alt: "Instadium Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Instadium | Indian Sports Stadium Guide",
    description: "Interactive guides and discovery for sports stadiums in India.",
    images: ["https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80"],
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
