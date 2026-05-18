import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Outfit, Quicksand, Anton } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const bebasNeue = localFont({
  src: "./fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  display: "swap",
});

const jakArta = localFont({
  src: "./fonts/JAK_ARTA.otf",
  variable: "--font-jak-arta",
  display: "swap",
});

const aerosol = localFont({
  src: "./fonts/Aerosol.ttf",
  variable: "--font-aerosol",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Murilo Freitas",
  description:
    "Portfolio of Murilo Freitas. A scrollytelling experience showcasing creative development, precision engineering, and digital craftsmanship.",
  keywords: ["Murilo Freitas", "creative developer", "portfolio", "scrollytelling"],
  openGraph: {
    title: "Murilo Freitas",
    description: "A scrollytelling portfolio experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakArta.variable} ${outfit.variable} ${quicksand.variable} ${bebasNeue.variable} ${aerosol.variable} ${anton.variable}`}>
      <body className="font-body antialiased">
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/gh/cmiscm/leonsans@master/dist/leon.js" strategy="beforeInteractive" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
