import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { PodcastPage } from '@/components/pages/podcast/PodcastPage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPodcast } from '@/sanity/loader/loadQuery'
const PodcastPreview = dynamic(
  () => import('@/components/pages/podcast/PodcastPreview'),
)

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params
  const { data: podcast } = await loadPodcast(params.slug)
  const ogImage = urlForOpenGraphImage(podcast?.coverImage)

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
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('podcast')
}

export default async function PodcastSlugRoute(props: Props) {
  const params = await props.params
  const initial = await loadPodcast(params.slug)
  console.log(`page.tsx for podcats - ${JSON.stringify(initial, null, 2)}`)

  if ((await draftMode()).isEnabled) {
    return <PodcastPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <PodcastPage data={initial.data} />
}
