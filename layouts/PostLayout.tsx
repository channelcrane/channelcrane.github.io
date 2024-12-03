import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
// import Image from 'next/image'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, dtype, path, slug, date, title, tags, credit, imagePaths } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className='h-52 w-full'></div>
        <div className="flex flex-col lg:flex-row">
              <div className='lg:h-body lg:w-1/2 overflow-scroll no-scrollbar'>
                {imagePaths.map((src, index) => (
                    <div key={index} className="relative w-full h-auto">
                      <Image
                        src={src}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: 'auto',
                          padding: '0rem 1rem',
                          paddingBottom: '1rem'
                        }}
                      />
                    </div>
                  ))}
              </div>
              <div className="lg:h-body overflow-scroll prose max-w-none p-4 text-black lg:w-1/4  font-bold pt-0 no-scrollbar">{children}</div>
              <div className='pt-8 lg:pt-0 lg:h-body overflow-scroll lg:w-1/4 font-bold no-scrollbar'>
                <div className='p-4 pt-0'>
                  {title}
                </div>
                <div className='p-4'>
                  Crane position<br/>
                  Producer / Project Manager / Tech Coordinator / Coordinator
                </div>
                <div className='p-4'>
                  Credits<br/>
                  Artist LEE YONA / Art Director KIM SUNJEONG / Exhibition Manager CHO HEEYEON / Exhibition Assistant YOO SEUNGAH
                </div>
                <div className='p-4'>
                  Link<br/>
                  Https://www.instagram.com
                </div>
                <div className='p-4'>
                  Tag<br/>
                  Installation
                </div>
                {/* <div>
                  {credit}
                </div> */}
              </div>
              
        </div>
      </article>
    </SectionContainer>
  )
}
