import Link from "next/link";

import { loadPaginatedPodcast } from "@/sanity/loader/loadQuery";
import { PaginatedPodcastResponse } from "@/types";

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

  const { podcasts, podcastCount } = (
    await loadPaginatedPodcast(skip, pageSize)
  ).data as PaginatedPodcastResponse;

  return (
    <main className="container">
      <h1 className="text-4xl">Total Podcasts {podcastCount}</h1>
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
    </main>
  );
}
