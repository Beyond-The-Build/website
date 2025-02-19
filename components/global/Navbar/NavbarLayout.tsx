import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import Image from 'next/image'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <header className="
    flex justify-between
    items-center
    sticky top-0 z-10
    py-4

    backdrop-blur-sm
    ">
     
      {/* // sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 px-4 py-4 backdrop-blur-sm md:px-16 md:py-5 lg:px-32 */}
      {menuItems &&
        menuItems.map((menuItem, key) => {
          // destructring vlaur of menuItem
          let { _type, slug, title, url } = menuItem
          if (_type === 'sitelinks') {
            slug = url
          }

          const href = resolveHref(_type, slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`text-lg hover:text-black md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-black'
                  : 'text-gray-600'
              }`}
              href={href}
            >
              {menuItem?._type === 'home' && (
                <div className="flex-shrink-0 ml-6 cursor-pointer">

                  <Image src="/static/logo/Beyond The Build Logo_small.webp"
                    alt="Beyond The Build"
                    width={50}
                    height={50} />
                </div>
                
              )}
              {menuItem?._type !== 'home' && 
              menuItem.title
              }
            </Link>
          )
        })}
    </header>
  )
}
