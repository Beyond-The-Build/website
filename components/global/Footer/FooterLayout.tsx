import type { PortableTextBlock } from "next-sanity";

import { CustomPortableText } from "@/components//shared/CustomPortableText";
import type { SettingsPayload } from "@/types";

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props;
  const footer = data?.footer || ([] as PortableTextBlock[]);
  return (
    <div className="relative overflow-hidden">

    <span className="square square-flipped square-1"></span>
    <span className="square square-flipped square-2"></span>
    <footer className="relative">
       <div className="container container-footer text-center">
            {footer && (
              <CustomPortableText
                paragraphClasses="text-md md:text-xl"
                value={footer}
              />
            )}
            <a href="javascript:void(0)" className="btn btn-primary rounded-pill shadow-lg py-3 px-4 px-md-5 m-1">
                <i className="fa fa-thumbs-up text-white-90 mr-1"></i> Beyond the Build on Discord
            </a>
            <p className="my-2">
                Crafted with <i className="fa fa-heart text-danger"></i> 
                by 
                <a className="text-primary font-weight-600" href="https://pixelcave.com/">pixelcave</a>
            </p>
        </div>
      
    </footer>
    </div>
  );
}
