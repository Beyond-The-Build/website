import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { Header } from '@/components/shared/Header'
import type { PodcastPayload } from '@/types'

export interface PodcastPageProps {
  data: PodcastPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function PodcastPage({ data, encodeDataAttribute }: PodcastPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    coverImage,
    description,

    overview,
    speakers,
    tags,
    title,
  } = data ?? {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}

        <Header title={title} description={overview} />

        <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <h3>Speakers</h3>
          <ol>
            {speakers &&
              speakers.map((speaker, key) => (
                <li key={key}>
                  <div className="text-md md:text-lg">
                    <span data-sanity={encodeDataAttribute?.('speakers.name')}>
                      {speaker.name}
                    </span>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default PodcastPage
