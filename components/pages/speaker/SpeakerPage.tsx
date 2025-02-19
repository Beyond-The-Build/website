import type { EncodeDataAttributeCallback } from '@sanity/react-loader'



import { CustomPortableText } from '@/components/shared/CustomPortableText'

import type { SpeakerPayload } from '@/types'
import ImageBox from '@/components/shared/ImageBox'

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


  } = data ?? {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        <div >
          <h1>Speaker - {name}</h1>
          {/* Description */}
          {photo && (

          <ImageBox
            data-sanity={encodeDataAttribute?.('photo')}
            image={photo}
            // @TODO add alt field in schema
            alt=""
            classesWrapper="relative cover aspect-4/3"
          />
          )}
      {bio && (
        <div>
          <CustomPortableText value={bio} />
        </div>
      )}
      {linkedin && (
        <div>
          <a href={linkedin}>LinkedIn - {linkedin}</a>
        </div>
      )}
      {github && (
        <div>
          <a href={github}>GitHub - {github}</a>
        </div>
      )}
      {bluesky && (
        <div>
          <a href={bluesky}>Bluesky - {bluesky}</a>
        </div>
      )}
      {website && (
        <div>
          <a href={website}>Website - {website}</a>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default SpeakerPage
