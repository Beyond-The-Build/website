import "@/styles/index.css";

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { toPlainText } from "next-sanity";
import { Suspense } from "react";

import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";

import { HeroComponent } from "@/components/shared/Hero";
import { StatsComponent } from "@/components/shared/Stats";
import { FeaturesComponent } from "@/components/shared/Features";
import { PlansComponent } from "@/components/shared/Plans";
import { FooterLayout } from "@/components/shared/FooterLayout";

import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { loadHomePage, loadSettings } from "@/sanity/loader/loadQuery";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/LiveVisualEditing"),
);

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ]);

  const ogImage = urlForOpenGraphImage(settings?.ogImage);
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || "Personal website",
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div id="page-container" className="relative">
          <span className="square square-1"></span>
          <span className="square square-2"></span>

          <div className="container">
            <header className="py-4">

              <Suspense>
                <Navbar />
              </Suspense>
            </header>
            <div className="row py-lg-5">
              <div className="col-lg-6 py-5 text-center text-lg-left">
                <Suspense>{children}</Suspense>
              </div>
            </div>
          {/* <div className="container mx-auto">
            <div className="mt-10 grow px-4 md:px-16 lg:px-32">

            </div>

            <hr />
            <HeroComponent />
          <StatsComponent />
          <FeaturesComponent />
          <PlansComponent />
          <FooterLayout />

          </div> */}
          </div>
            <Suspense>
              <Footer />
            </Suspense>
            {(await draftMode()).isEnabled && <LiveVisualEditing />}
        </div>

    </>
  );
}
