import { SpeakerPage } from "@/components/pages/speaker/SpeakerPage";
import { sanityFetch } from "@/sanity/lib/live";
import { speakerBySlugQuery } from "@/sanity/lib/queries";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import type { Metadata, ResolvingMetadata } from "next";
import { toPlainText } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  // const { data: speaker } = await loadSpeakerBySlug(params.slug);
  const { data: speaker } = await sanityFetch({
    query: speakerBySlugQuery,
    params,
    stega: false,
  });

  return {
    title: speaker?.name,
    description: speaker?.bio
      ? toPlainText(speaker.bio)
      : (await parent).description,
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("speaker");
}

export default async function SpeakerSlugRoute(props: Props) {
  const params = await props.params;
  // const initial = await loadSpeakerBySlug(params.slug);
  const { data: speaker } = await sanityFetch({
    query: speakerBySlugQuery,
    params,
    stega: false,
  });

  if (!speaker?._id && !(await draftMode()).isEnabled) {
    notFound();
  }

  return <SpeakerPage data={speaker} />;
}
