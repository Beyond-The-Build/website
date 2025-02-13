'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { speakerBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { SpeakerPayload } from '@/types'

import SpeakerPage from './SpeakerPage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<SpeakerPayload | null>
}

export default function SpeakerPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<SpeakerPayload | null>(
    speakerBySlugQuery,
    params,
    { initial },
  )

  return <SpeakerPage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
