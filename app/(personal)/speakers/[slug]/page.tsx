import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { toPlainText } from "next-sanity";

import { SpeakerPage } from "@/components/pages/speaker/SpeakerPage";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadSpeakerBySlug } from "@/sanity/loader/loadQuery";
const SpeakerPreview = dynamic(
  () => import("@/components/pages/speaker/SpeakerPreview"),
);

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: speaker } = await loadSpeakerBySlug(params.slug);
  // const ogImage = urlForOpenGraphImage(podcast?.coverImage)

  return {
    title: speaker?.name,
    description: speaker?.bio
      ? toPlainText(speaker.bio)
      : (await parent).description,
    // openGraph: ogImage
    //   ? {
    //       images: [ogImage, ...((await parent).openGraph?.images || [])],
    //     }
    //   : {},
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("speaker");
}

export default async function SpeakerSlugRoute(props: Props) {
  const params = await props.params;
  const initial = await loadSpeakerBySlug(params.slug);
  // console.log(`page.tsx for speakers - ${JSON.stringify(initial, null, 2)}`)

  if ((await draftMode()).isEnabled) {
    return <SpeakerPreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <SpeakerPage data={initial.data} />;
}
