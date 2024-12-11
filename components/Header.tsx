'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useYearTagStore, useProjectTagStore, usePeopleTagStore } from 'app/store'

const Header = () => {
  const pathName = usePathname()
  let headerClass = 'w-full fixed top-0 left-0 transition-all z-70'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0'
  }

  let menuClass = ''
  if (pathName == '/')
    menuClass =
      'flex justify-between items-center py-4 px-16 font-bold  w-full pb-0 lg:fixed lg:top-[47%] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:fit-content'
  else menuClass = 'flex justify-between items-center py-4 px-16 font-bold'

  return (
    <header className={headerClass}>
      <div className="flex justify-center p-4">
        <Link href={'/'}>
          <Image
            src="/static/images/identity/logo_ver_2.svg"
            width={119.62}
            height={73.71}
            alt="Crane logo"
          ></Image>
        </Link>
      </div>

      <div className={menuClass}>
        {/* <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96"> */}
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="block text-gray-900 hover:text-black hover:underline"
              onClick={() => {
                useYearTagStore.getState().resetTags()
                useProjectTagStore.getState().resetTags()
                usePeopleTagStore.getState().resetTags()
              }}
            >
              {link.title}
            </Link>
          ))}
        {/* </div> */}
        {/* <MobileNav /> */}
      </div>
    </header>
  )
}

export default Header
