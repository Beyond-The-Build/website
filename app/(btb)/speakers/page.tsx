import Link from "next/link";

import { PortableText } from "next-sanity";

import { loadSpeakers } from "@/sanity/loader/loadQuery";

import Image from "next/image";

import { urlForImage } from "@/sanity/lib/utils";
import { CgProfile } from "react-icons/cg";

export default async function SpeakersListRoute() {
  const speakers = await loadSpeakers();

  return (
    <main>
      <h1 className="mb-8 text-3xl">
        Beyond the Build {Array.isArray(speakers.data) ? speakers.data.length : 0} Speakers
      </h1>

      {Array.isArray(speakers.data) && speakers.data.length === 0 && <p>No speakers found.</p>}
      <div className="">
        {Array.isArray(speakers.data) && speakers.data.map((speaker, index) => (
          <div
            key={speaker._id}
            className={`md:flex md:gap-4 border-indigo-200 rounded-lg mb-8 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}

            // className="p-4 mb-8 border-2 "
          >
            <div className="w-16 md:w-52">
            {speaker?.photo !== null ? (
              <Image
                className="rounded-full"
                alt={speaker.name}
                width="100"
                height="100"
                src={urlForImage(speaker.photo)
                  ?.height(400)
                  .width(400)
                  .fit("crop")
                  .url() || "/static/logo/Beyond The Build Logo_small.webp"}
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
