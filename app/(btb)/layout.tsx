import "@/styles/index.css";

import type { Metadata, Viewport } from "next";
import { toPlainText } from "next-sanity";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";

import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { loadHomePage, loadSettings } from "@/sanity/loader/loadQuery";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/LiveVisualEditing")
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
  children: React.ReactNode;
}) {
  return (
    <div
      id="page-container"
      className="relative flex flex-col min-h-screen text-eerie-black-950"
    >
      <span className="square square-1"></span>
      <span className="square square-2"></span>

      <div className="BTB container mx-auto flex-1">
        <div className="mt-10 grow px-4 md:px-16 lg:px-32">
          <Suspense>
            <Navbar />
          </Suspense>

          <Suspense>{children}</Suspense>
        </div>
      </div>
      <div className="BTB container mx-auto">
        <Suspense>
          <Footer />
        </Suspense>
        <hr />
        <Colours />
      </div>
      {(await draftMode()).isEnabled && <LiveVisualEditing />}
    </div>
  );
}

function Colours() {
  return (
    <div className="grid grid-cols-5 text-center">
      <div className="bg-royal-purple-800">
        <span className="hidden sm:block">
          Royal Purple&nbsp;
          <br />
          royal-purple-800
        </span>
      </div>
      <div className="bg-beige-50">
        <span className="hidden sm:block">
          Beige&nbsp;
          <br />
          beige-50
        </span>
      </div>
      <div className="bg-ash-gray-300">
        <span className="hidden sm:block">
          Ash Gray&nbsp;
          <br />
          ash-gray-300
        </span>
      </div>
      <div className="bg-sea-green-500">
        <span className="hidden sm:block">
          Sea Green&nbsp;
          <br />
          sea-green-500
        </span>
      </div>
      <div className="bg-eerie-black-950 text-ash-gray-300">
        <span className="hidden sm:block">
          Eerie Black&nbsp;
          <br />
          eerie-black-950
        </span>
      </div>
    </div>
  );
}
