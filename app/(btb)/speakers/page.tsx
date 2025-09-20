import { sanityFetch } from "@/sanity/lib/live";
import { speakersQuery } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import Image from "next/image";

import { urlForImage } from "@/sanity/lib/utils";
import { CgProfile } from "react-icons/cg";

export default async function SpeakersListRoute() {
  // const speakers = await loadSpeakers();

  const { data: speakers } = await sanityFetch({ query: speakersQuery });

  // console.log(JSON.stringify(speakers, null, 2));

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a project on this slug, and live reload won't work on the 404 route
  if (!speakers?.length && !(await draftMode()).isEnabled) {
    notFound();
  }

  return (
    <main>
      Refactor Speakers
      <h1 className="mb-8 text-3xl">
        Beyond the Build {Array.isArray(speakers) ? speakers.length : 0}{" "}
        Speakers
      </h1>
      {Array.isArray(speakers) && speakers.length === 0 && (
        <p>No speakers found.</p>
      )}
      <div className="">
        {Array.isArray(speakers) &&
          speakers.map((speaker, index) => (
            <div
              key={speaker._id}
              className={`md:flex md:gap-4 border-indigo-200 rounded-lg mb-8 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}

              // className="p-4 mb-8 border-2 "
            >
              <div className="w-16 md:w-52">
                {speaker?.photo !== null ? (
                  <Image
                    className="hex-img"
                    alt={speaker.name}
                    width="100"
                    height="100"
                    src={
                      urlForImage(speaker.photo)
                        ?.height(400)
                        .width(400)
                        .fit("crop")
                        .url() ||
                      "/static/logo/Beyond The Build Logo_small.webp"
                    }
                  />
                ) : (
                  <CgProfile size="74" />
                )}
              </div>
              <div className="">
                {speaker?.bio !== null ? (
                  <Link
                    href={`/speakers/${speaker.slug}`}
                    className="text-2xl text-indigo-900 hover:text-indigo-700"
                  >
                    {speaker.name}
                  </Link>
                ) : (
                  <p>{speaker.name}</p>
                )}
                <PortableText value={speaker.shortbio} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
