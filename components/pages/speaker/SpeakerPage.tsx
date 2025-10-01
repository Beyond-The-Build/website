import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";

import { CustomPortableText } from "@/components/shared/CustomPortableText";

import ImageBox from "@/components/shared/ImageBox";
import type { SpeakerPayload } from "@/types";
import Link from "next/link";

export interface SpeakerPageProps {
  data: SpeakerPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function SpeakerPage({ data, encodeDataAttribute }: SpeakerPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { name, photo, bio, github, linkedin, bluesky, website, podcasts } =
    data ?? {};

  return (

    
    <div className="md:grid md:grid-cols-12 md:items-start">
    {/* Outer container */}

      {/* Image area (left) */}
      <div className="md:col-span-5">
      <ImageBox
              data-sanity={encodeDataAttribute?.('photo')}
              image={photo}
              alt=""
              height={560}
              width={560}
              classesWrapper="
              hex-img hex-img-lg"
            />
       
      </div>

      {/* Text block (overlaps the image ~30%) */}
      <div
        className="
          relative z-10 mt-6 md:mt-40
          md:col-span-7 md:-ml-[30%] md:pl-10
          sm:ml-0
          sm:mt-0
        "
      >
        <div className="
        rounded-2xl border border-black/10 bg-white/95 shadow-xl backdrop-blur-sm p-6 md:p-10
        ">
          <h1 className="text-3xl md:text-4xl font-semibold">{name}</h1>

          <div className="prose max-w-none mt-4">
            {bio && <CustomPortableText value={bio} />}
          </div>

          {/* Socials (optional) */}
          <div className="mt-6 flex flex-wrap gap-4">
            {linkedin && (
              <a href={linkedin} aria-label="LinkedIn" className="text-slate-600 hover:text-slate-900">
                <FaLinkedin size={28} />
              </a>
            )}
            {github && (
              <a href={github} aria-label="GitHub" className="text-slate-600 hover:text-slate-900">
                <FaGithub size={28} />
              </a>
            )}
            {bluesky && (
              <a href={bluesky} aria-label="Bluesky" className="text-slate-600 hover:text-slate-900">
                <FaBluesky size={28} />
              </a>
            )}
            {website && (
              <a href={website} aria-label="Website" className="text-slate-600 hover:text-slate-900">
                <FaGlobe size={28} />
              </a>
            )}
          </div>
          <div>
            <h2 className="text-3xl">Appears on the following Episodes:</h2>
            <ol>
              {podcasts &&
                podcasts.map((podcast, key) => (
                  <li key={key}>
                    <div className="text-md md:text-lg">
                      <span
                        data-sanity={encodeDataAttribute?.("podcasts.title")}
                      >
                        <Link href={`/podcasts/${podcast.slug}`}>
                          S{podcast.season?.toString().padStart(2, "0")}-E
                          {podcast.episodeNumber
                            ?.toString()
                            .padStart(3, "0")}{" "}
                          {podcast.title}
                        </Link>
                      </span>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>

    </div>
  

  );
}

export default SpeakerPage;
