import type { EncodeDataAttributeCallback } from '@sanity/react-loader'



import { CustomPortableText } from '@/components/shared/CustomPortableText'

import type { SpeakerPayload } from '@/types'

export interface SpeakerPageProps {
  data: SpeakerPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function SpeakerPage({ data, encodeDataAttribute }: SpeakerPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    name,
    photo,
    bio,
    github,
    linkedin,
    bluesky,
    website,
    slug,

  } = data ?? {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        <div >
          <h1>Speaker - {name}</h1>
          {/* Description */}
      {bio && (
        <div>
          <CustomPortableText value={bio} />
        </div>
      )}
         
        </div>
      </div>
    </div>
  )
}

export default SpeakerPage
