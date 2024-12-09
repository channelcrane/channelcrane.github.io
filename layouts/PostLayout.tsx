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
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PeopleProjectListLayout from '@/layouts/ProjectListLayout'
import { useProjectTagStore, useYearTagStore, usePeopleTagStore } from 'app/store'

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

function ProjectPage() {
  const type = 'project'
  const title = type[0].toUpperCase() + type.slice(1) // "Project"로 설정
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.dtype === type)) // type이 "project"인 게시글만 필터링
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <PeopleProjectListLayout posts={filteredPosts} title={title} />
}

function PeopleLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, dtype, path, slug, date, title, tags, credit, imagePaths } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="h-52 w-full"></div>
        <div className="flex flex-col lg:flex-row">
          <div className="no-scrollbar overflow-scroll pl-4 pb-4 lg:pb-0 lg:pl-12 px-12 font-bold lg:w-1/2">
            {title}
            <br />
            {tags}
          </div>
          <div className="no-scrollbar overflow-scroll pl-4 lg:pl-12 font-bold lg:w-1/4 break-keep">{children}</div>
          {/* <div className="no-scrollbar overflow-scroll px-4 text-right font-bold lg:w-1/4">
            site
          </div> */}
        </div>

        <ProjectPage></ProjectPage>
      </article>
    </SectionContainer>
  )
}

function BlogLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, dtype, path, slug, date, title, tags, credit, imagePaths } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="h-52 w-full"></div>
        <div className="flex flex-col lg:flex-row">
          <div className='w-1/4'></div>
          <div className='w-full lg:w-1/2 flex flex-col'>
            <div className="no-scrollbar overflow-scroll pl-4 pb-4 lg:pb-0 lg:pl-12 px-12 font-bold w-full">
              {title}
            </div>
            <div className="no-scrollbar overflow-scroll pl-4 lg:pl-12 font-bold w-full break-keep lg:pt-4">
            {children}
            </div>
          </div>
          <div className='w-1/4'></div>
        </div>
        <div className='h-24'></div>
      </article>
    </SectionContainer>
  )
}



export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, dtype, path, slug, date, title, tags, credit, imagePaths } = content
  const basePath = path.split('/')[0]

  const handleLinkClick = () => {}
  if (dtype === 'people') return PeopleLayout({ content, authorDetails, next, prev, children })
  if (dtype === 'other') return BlogLayout({ content, authorDetails, next, prev, children })


  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="h-52 w-full"></div>
        <div className="flex flex-col lg:flex-row">
          <div className="no-scrollbar overflow-scroll lg:h-body lg:w-1/2">
            {imagePaths.map((src, index) => (
              <div key={index} className="relative h-auto w-full">
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
                    paddingBottom: '1rem',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="no-scrollbar prose max-w-none overflow-scroll p-4 pt-0 font-bold  text-black lg:h-body lg:w-1/4 break-keep">
            {children}
          </div>
          <div className="no-scrollbar overflow-scroll pt-8 font-bold lg:h-body lg:w-1/4 lg:pt-0">
            <div className="p-4 pt-0">{title}</div>
            <div className="p-4">
              Crane position
              <br />
              Producer / Project Manager / Tech Coordinator / Coordinator
            </div>
            <div className="p-4">
              Credits
              <br />
              Artist LEE YONA / Art Director KIM SUNJEONG / Exhibition Manager CHO HEEYEON /
              Exhibition Assistant YOO SEUNGAH
            </div>
            <div className="p-4">
              Link
              <br />
              Https://www.instagram.com
            </div>
            <div className="p-4">
              Tag
              <br />
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
