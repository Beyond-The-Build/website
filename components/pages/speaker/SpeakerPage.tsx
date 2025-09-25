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
    <div>
      <div className="mb-14">
        {photo && (
          <ImageBox
            data-sanity={encodeDataAttribute?.("photo")}
            image={photo}
            // @TODO add alt field in schema
            alt=""
            height={560}
            width={560}
            classesWrapper="
            hex-img hex-img-lg
            "
          />
        )}

        {/* <img className="" src="/docs/images/blog/image-4.jpg" alt="" /> */}
        <div className="flex flex-col justify-between p-4 leading-normal md:basis-3/5">
          <h1 className="text-4xl">{name}</h1>

          {bio && <CustomPortableText value={bio} />}
          <div className="flex flex-row space-x-4">
            {linkedin && (
              <div>
                <a href={linkedin} title={linkedin}>
                  <FaLinkedin size={74} />
                </a>
              </div>
            )}
            {github && (
              <div>
                <a href={github} title={github}>
                  <FaGithub size={74} />
                </a>
              </div>
            )}
            {bluesky && (
              <div>
                <a href={bluesky} title={bluesky}>
                  <FaBluesky size={74} />
                </a>
              </div>
            )}
            {website && (
              <div>
                <a href={website} title={website}>
                  <FaGlobe size={74} />
                </a>
              </div>
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
