import "@/styles/index.css";

import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { homePageQuery, settingsQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import type { Metadata, Viewport } from "next";
import { toPlainText, VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { handleError } from "./client-functions";
import { DraftModeToast } from "./DraftModeToast";

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    sanityFetch({ query: settingsQuery, stega: false }),
    sanityFetch({ query: homePageQuery, stega: false }),
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
  const { data } = await sanityFetch({ query: settingsQuery });

  // TODO: Remove this
  // console.log("layout - data", data);

  return (
    <div
      id="page-container"
      className="relative flex flex-col min-h-screen text-off-black-950"
    >
      <span className="square square-1"></span>
      <span className="square square-2"></span>

      <div className="BTB container mx-auto flex-1">
        <div className="mt-10 grow px-4 md:px-16 lg:px-32">
          <Suspense>
            <Navbar data={data} />
          </Suspense>


          <Suspense>{children}</Suspense>

        </div>
      </div>
      <div className="BTB container mx-auto">
        <Footer data={data} />

        <hr />
        <Colours />
      </div>
      <Toaster />

      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
    </div>
  );
}

function Colours() {
  return (
    <div className="grid grid-cols-5 text-center">
      <div className="bg-electric-violet-500">
        <span className="hidden sm:block">
          Electric Violet&nbsp;
          <br />
          electric-violet-500
        </span>
      </div>
      <div className="bg-warm-white-50">
        <span className="hidden sm:block">
          Warm White&nbsp;
          <br />
          warm-white-50
        </span>
      </div>
      <div className="bg-ash-gray-300">
        <span className="hidden sm:block">
          Ash Gray&nbsp;
          <br />
          ash-gray-300
        </span>
      </div>
      <div className="bg-matrix-green-500">
        <span className="hidden sm:block">
          Matrix Green&nbsp;
          <br />
          matrix-green-500
        </span>
      </div>
      <div className="bg-off-black-950 text-ash-gray-300">
        <span className="hidden sm:block">
           Off Black&nbsp;
          <br />
          off-black-950
        </span>
      </div>
    </div>
  );
}
