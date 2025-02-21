import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
  url?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface PodcastPayload {
  _id: string
  title?: string
  slug: string
  overview?: PortableTextBlock[]
  coverImage?: Image
  tags?: string[]
  description?: PortableTextBlock[]
  speakers?: SpeakerPayload[]
}

export interface SpeakerPayload {
  _type: string
  name?: string
  photo?: Image
  bio?: PortableTextBlock[]
  shortbio?: PortableTextBlock[]
  github?: string
  linkedin?: string
  bluesky?: string
  website?: string
  slug?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

export interface PaginatedPodcastResponse {
  podcasts: PodcastPayload[]
  podcastCount: number
}
