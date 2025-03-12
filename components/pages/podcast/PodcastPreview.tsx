"use client";

import { type QueryResponseInitial } from "@sanity/react-loader";

import { podcastBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PodcastPayload } from "@/types";

import PodcastPage from "./PodcastPage";

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<PodcastPayload | null>
}

export default function PodcastPreview(props: Props) {
  const { params, initial } = props;
  const { data, encodeDataAttribute } = useQuery<PodcastPayload | null>(
    podcastBySlugQuery,
    params,
    { initial },
  );

  return <PodcastPage data={data!} encodeDataAttribute={encodeDataAttribute} />;
}
