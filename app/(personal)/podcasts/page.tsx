// @ts-nocheck
import Link from 'next/link'

import { loadPaginatedPodcast } from '@/sanity/loader/loadQuery'
import { PaginatedPodcastResponse,PodcastPayload } from '@/types'

export default async function PodcastListRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {

  const pageSize = parseInt(process.env.NEXT_PAGE_SIZE || '15')
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1
  const skip = (page - 1) * pageSize

  const { podcasts, podcastCount } = (
    await loadPaginatedPodcast(skip, pageSize)
  ).data as PaginatedPodcastResponse

  return (
    <main>
      <h1>Total Podcasts {podcastCount}</h1>
      {podcastCount === 0 && <p>No podcasts found.</p>}

      {podcasts.map((podcast) => (
        <div key={podcast._id}>
          <Link href={`/podcasts/${podcast.slug}`}>{podcast.title}</Link>
        </div>
      ))}
    </main>
  )
}
