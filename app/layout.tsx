import "./globals.css";

import { HeroComponent } from "@/components/shared/Hero";
import { StatsComponent } from "@/components/shared/Stats";
import { FeaturesComponent } from "@/components/shared/Features";
import { PlansComponent } from "@/components/shared/Plans";
import { FooterLayout } from "@/components/shared/FooterLayout";
import { IBM_Plex_Mono, Inter, PT_Serif, Nunito_Sans } from "next/font/google";

const serif = PT_Serif({
  variable: "--font-serif",
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["400", "700"],
});
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
});
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});
const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable} ${nunito.variable}`}
    >
      <head>
        {/* TODO: remove bootstrap and fontawesome */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.1/css/all.css" crossOrigin="anonymous" />
      </head>
      <body>
        <div id="page-container" className="position-relative">
          <span className="square square-1"></span>
          <span className="square square-2"></span>

          <HeroComponent />
          <StatsComponent />
          <FeaturesComponent />
          <PlansComponent />
          <FooterLayout />
        </div>
        <hr />
        {children}
      </body>
    </html>
  );
}
