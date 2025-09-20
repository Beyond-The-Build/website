import type { PortableTextBlock } from "next-sanity";

import { CustomPortableText } from "@/components//shared/CustomPortableText";
import type { SettingsPayload } from "@/types";
import Link from "next/link";
import { FaDiscord, FaHeart } from "react-icons/fa";

interface FooterProps {
  data: SettingsPayload;
}
export default function Footer(props: FooterProps) {
  const { data } = props;
  const footer = data?.footer || ([] as PortableTextBlock[]);
  const discordLink = data?.menuItems?.find((item) => item.title === "Discord");

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <span className="square square-flipped square-1"></span>
      <span className="square square-flipped square-2"></span>
      <footer className="relative bottom-0 w-full py-12 text-center md:py-20">
        <div className="container container-footer text-center">
          {footer && (
            <CustomPortableText
              paragraphClasses="text-md md:text-xl"
              value={footer}
            />
          )}
          {discordLink && (
            <Link
              href={discordLink?.url || "#"}
              className="
              text-white 
              bg-matrix-green-700 
              hover:bg-matrix-green-800 
              focus:outline-none 
              focus:ring-4 
              focus:ring-matrix-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2
              dark:bg-matrix-green-600
              dark:hover:bg-matrix-green-700
              dark:focus:ring-matrix-green-800"
            >
              <FaDiscord className="inline text-white-90 mr-1" /> Join us on
              Discord
            </Link>
          )}
          <p className="my-5">
            Crafted with <FaHeart className="inline text-red-500" /> &nbsp;by
            Beyond The Build
          </p>
        </div>
      </footer>
    </div>
  );
}
