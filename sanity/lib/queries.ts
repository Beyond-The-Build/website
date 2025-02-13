import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    showcasePodcasts[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const paginatedPodcastQuery = groq`
{
  "podcastCount": count(*[_type == "podcast"]),
  "podcasts": *[_type == "podcast"] | order(_id) [$skip...$pageSize] {
    _id,
    "slug": slug.current,
    title,
    overview,
    coverImage,
    tags,
    description,
    speakers
  },
}
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const podcastBySlugQuery = groq`
  *[_type == "podcast" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    coverImage,
    client,
    tags,
    description,
    speakers[]-> {
      _id,
      name,
      role,
      image,
      bio,
      "slug": slug.current
    }
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      url,
      title
    },
    ogImage,
  }
`
export const speakersQuery = groq`
  *[_type == "speaker"] {
    _id,
    name,
    photo,
    bio,
    github,
    linkedin,
    bluesky,
    website,
  }
`
export const speakersBySlugQuery = groq`
  *[_type == "speaker" && slug.current == $slug][0] {
    _id,
    name,
    photo,
    bio,
    github,
    linkedin,
    bluesky,
    "slug": slug.current,
    website,
  }
`
