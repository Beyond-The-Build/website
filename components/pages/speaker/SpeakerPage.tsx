import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { IconContext } from "react-icons";

import { CustomPortableText } from "@/components/shared/CustomPortableText";

import type { SpeakerPayload } from "@/types";
import ImageBox from "@/components/shared/ImageBox";

export interface SpeakerPageProps {
  data: SpeakerPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function SpeakerPage({ data, encodeDataAttribute }: SpeakerPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { name, photo, bio, shortbio, github, linkedin, bluesky, website } =
    data ?? {};

  return (
    <div>
      <div
        className="
      max-w
      flex flex-row items-start bg-white border border-gray-200 rounded-lg shadow-sm 
      md:flex-row 
      
      "
      >
        {photo && (
          <ImageBox
            data-sanity={encodeDataAttribute?.("photo")}
            image={photo}
            // @TODO add alt field in schema
            alt=""
            height={560}
            width={450}
            classesWrapper="
            object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg
            md:basis-2/5
            items-start
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
        </div>
      </div>
    </div>
  );
}

export default SpeakerPage;
