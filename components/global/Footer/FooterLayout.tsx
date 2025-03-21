import type { PortableTextBlock } from "next-sanity";

import { CustomPortableText } from "@/components//shared/CustomPortableText";
import type { SettingsPayload } from "@/types";

interface FooterProps {
  data: SettingsPayload;
}
export default function Footer(props: FooterProps) {
  const { data } = props;
  const footer = data?.footer || ([] as PortableTextBlock[]);
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <span className="square square-flipped square-1"></span>
      <span className="square square-flipped square-2"></span>
      <footer className="bottom-0 w-full py-12 text-center md:py-20">
        {footer && (
          <CustomPortableText
            paragraphClasses="text-md md:text-xl"
            value={footer}
          />
        )}
      </footer>
    </div>
  );
}
