import type { Metadata, ResolvingMetadata } from "next";
import { toPlainText } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { CustomPortableText } from "@/components/CustomPortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { podcastBySlugQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import type { PodcastPayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import Link from "next/link";

export interface PodcastPageProps {
  data: PodcastPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: podcast } = await sanityFetch({
    query: podcastBySlugQuery,
    params,
    stega: false,
  });

  // const { slug } = props.params;
  // const { data: podcast } = await loadPodcast(slug);
  const ogImage = urlForOpenGraphImage(podcast?.coverImage);

  return {
    title: podcast?.title,
    description: podcast?.overview
      ? toPlainText(podcast.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("podcast");
}

export default async function PodcastSlugRoute({ params }: Props) {
  const { data } = await sanityFetch({ query: podcastBySlugQuery, params });

  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound();
  }
  const { overview, title, speakers, description } = data ?? {};

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Title */}
      {title && (
        <div className="text-4xl">
          {title}
        </div>
      )}
        
        {description && (
          <CustomPortableText
            id={data?._id || null}
            type={data?._type || null}
            path={["description"]}
            value={description}
          />
        )}

        <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <h3>Speakers</h3>
          <ol>
            {speakers &&
              speakers.map((speaker, key) => (
                <li key={key}>
                  <div className="text-md md:text-lg">
                    <Link href={`/speakers/${speaker.slug}`}>
                      {speaker.name}
                    </Link>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
