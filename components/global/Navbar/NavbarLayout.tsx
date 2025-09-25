import Link from "next/link";

import { resolveHref } from "@/sanity/lib/utils";
import type { MenuItem, SettingsPayload } from "@/types";
import Image from "next/image";
import { RiMenuFill } from "react-icons/ri";

interface NavbarProps {
  data: SettingsPayload;
}
export default function Navbar(props: NavbarProps) {
  const { data } = props;
  const menuItems = data?.menuItems || ([] as MenuItem[]);
  return (
    <header className="BTB container mx-auto pt-10">
      <nav className="flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <Link href="/" className="flex text-lg font-semibold">
            <Image
              src="/static/logo/hero-icon-white.svg"
              alt="Beyond The Build - svg"
              width={20}
              height={20}
              className="bg-matrix-green-400 padding-2 hex-img mr-5"
            />
            <div className="mt-3 text-5xl">Beyond The Build</div>
          </Link>
        </div>
        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <RiMenuFill className="inline" />
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">
              {menuItems &&
                menuItems.map((menuItem, key) => {
                  // destructring vlaur of menuItem
                  const { _type, title, url } = menuItem;
                  let { slug } = menuItem;
                  if (_type === "sitelinks") {
                    slug = url;
                  }

                  const href = resolveHref(_type, slug);
                  if (!href) {
                    return null;
                  }
                  return (
                    <li key={key} className="py-2 lg:py-0 ">
                      <Link
                        className={`text-lg hover:text-black md:text-xl ${
                          menuItem?._type === "home"
                            ? "font-extrabold text-off-black-950"
                            : ""
                        }`}
                        href={href}
                      >
                        {menuItem?._type !== "home" && title}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}
