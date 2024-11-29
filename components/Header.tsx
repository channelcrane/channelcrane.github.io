import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'

const Header = () => {
  let headerClass = "w-full fixed top-0 left-0"
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0'
  }

  return (
    <header className={headerClass}>
      <div className="flex justify-center p-4">
      <Image src="static/images/logo_ver_2.svg" width={119.62} height={73.71}alt='Crane logo'></Image>
      </div>

      <div className="flex justify-between items-center py-4 px-16 font-bold">
        {/* <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96"> */}
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block text-gray-900 hover:text-black"
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
