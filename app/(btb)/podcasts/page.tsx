import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { paginatedPodcastQuery } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export default async function PodcastListRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const pageSize = parseInt(process.env.NEXT_PAGE_SIZE || "15");
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page, 10)
    : 1;
  const skip = (page - 1) * pageSize;

  const { data } = await sanityFetch({
    query: paginatedPodcastQuery,
    params: {
      skip: Math.floor(skip),
      limit: Math.floor(skip + pageSize), // Calculate the end of the range
    },
  });

  const podcasts = data?.podcasts || [];
  const podcastCount = data?.podcastCount || 0;

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!podcastCount && !(await draftMode()).isEnabled) {
    notFound();
  }

  return (
        <div>
      <div className="mb-14">
      <h1 className="text-4xl mb-10">Total Podcasts {podcastCount}</h1>
      {podcastCount === 0 && <p>No podcasts found.</p>}

      {podcasts.map((podcast) => (
        <div key={podcast._id}>
          <Link
            href={`/podcasts/${podcast.slug}`}
            className="hover:underline hover:primary"
          >
            S{podcast.season?.toString().padStart(2, "0")}-E
            {podcast.episodeNumber?.toString().padStart(3, "0")} {podcast.title}
          </Link>
        </div>
      ))}
      </div>
      </div>




  );
}
