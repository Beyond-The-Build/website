// @ts-nocheck
import Link from 'next/link'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'

import { loadSpeakers } from '@/sanity/loader/loadQuery'
import { SpeakerPayload } from '@/types'

export default async function SpeakersListRoute() {
  const speakers = await loadSpeakers()

  return (
    <main>
      <h1>Beyond the Build {speakers.data?.length} Speakers</h1>

      {speakers.length === 0 && <p>No speakers found.</p>}

      {speakers.data?.map((speaker) => (
        <div
          key={speaker._id}
          className="p-4 mb-8 border-2 border-indigo-200 rounded-lg"
        >
          {speaker?.bio !== null ? (
            <Link href={`/speakers/${speaker.slug}`}>{speaker.name}</Link>
          ) : (
            <p>{speaker.name}</p>
          )}
          <PortableText value={speaker.shortbio} />
        </div>
      ))}
    </main>
  )
}
