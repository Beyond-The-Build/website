import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import type { PodcastPayload } from "@/types";
import Link from "next/link";

export interface PodcastPageProps {
  data: PodcastPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function PodcastPage({ data, encodeDataAttribute }: PodcastPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview, speakers, description, title } = data ?? {};

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}

        <Header title={title} description={overview} />
        {description && <CustomPortableText value={description} />}

        <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <h3>Speakers</h3>
          <ol>
            {speakers &&
              speakers.map((speaker, key) => (
                <li key={key}>
                  <div className="text-md md:text-lg">
                    <span data-sanity={encodeDataAttribute?.("speakers.name")}>
                      <Link href={`/speakers/${speaker.slug}`}>
                        {speaker.name}
                      </Link>
                    </span>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default PodcastPage;
