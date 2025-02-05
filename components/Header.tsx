'use client'
import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useYearTagStore, useProjectTagStore, usePeopleTagStore } from 'app/store'

const Header = () => {
  const pathName = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10)
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  let headerClass = `w-full fixed top-0 left-0 transition-all z-70 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0'
  }

  let menuClass = ''
  if (pathName == '/') {
    menuClass =
      'flex justify-between items-center py-4 px-16 font-bold w-full pb-0 lg:fixed lg:top-[25vw] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:fit-content'
  } else {
    menuClass = 'flex justify-between items-center py-4 px-16 font-bold'
  }

  return (
    <header className={`${headerClass} flex flex-col transition-transform duration-300`}>
      <div className="flex justify-center p-4">
        <Link href={'/'}>
          <Image
            src="/static/images/identity/logo_ver_2.svg"
            width={119.62}
            height={73.71}
            alt="Crane logo"
          />
        </Link>
      </div>

      <div className={menuClass}>
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
      </div>
    </header>
  )
}

export default Header
