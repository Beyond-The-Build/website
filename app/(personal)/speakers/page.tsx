// @ts-nocheck
import Link from 'next/link'

import { loadSpeakers } from '@/sanity/loader/loadQuery'
import { SpeakerPayload } from '@/types'

export default async function SpeakersListRoute() {
  const speakers = await loadSpeakers()
  console.log(`page.tsx for speakers - ${JSON.stringify(speakers, null, 2)}`)
  return (
    <main>
      <h1>Speakers</h1>
      <h1>Total Speakers {speakers.data?.length}</h1>
      {speakers.length === 0 && <p>No speakers found.</p>}

      {speakers.data?.map((speaker) => (
        <div key={speaker._id}>
          <Link href={`/speakers/${speaker.slug}`}>{speaker.name}</Link>
        </div>
      ))}
    </main>
  )
}
