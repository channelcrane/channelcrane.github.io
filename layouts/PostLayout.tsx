import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
// import Image from 'next/image'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PeopleProjectListLayout from '@/layouts/ProjectListLayout'
import { useProjectTagStore, useYearTagStore, usePeopleTagStore } from 'app/store'
import Link from 'next/link'
import TagList from '@/components/TagList'



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

interface ProjectPageWithPeopleProps {
  people: string
}

function ProjectPage({ people }: ProjectPageWithPeopleProps) {
  if (people === '') return <></>
  {
    console.log(people)
  }

  const type = 'project'
  const title = type[0].toUpperCase() + type.slice(1) // "Project"로 설정
  const filteredPosts = allCoreContent(
    // sortPosts(allBlogs.filter((post) => (post.dtype === type)&(post.participants.includes(people)))) // type이 "project"인 게시글만 필터링
    sortPosts(allBlogs.filter((post) => post.participants.includes(people)))
  )

  if (filteredPosts.length === 0) {
    return <></>
  }

  return <PeopleProjectListLayout posts={filteredPosts} title={title} />
}

function PeopleLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, dtype, path, slug, date, title, tags, peopleID, links, credit, imagePaths } =
    content
  const basePath = path.split('/')[0]

  console.log(peopleID)
  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="h-52 w-full"></div>
        <div className="flex flex-col lg:flex-row">
          <div className="no-scrollbar overflow-scroll px-12 pb-4 pl-4 font-bold lg:w-1/2 lg:pb-0 lg:pl-12">
            {title}
            <br />
            {tags}
          </div>
          <div className="no-scrollbar overflow-scroll break-keep pl-4 font-bold lg:w-1/4 lg:pl-12">
            {children}
          </div>
          <div className="no-scrollbar overflow-scroll px-4 text-right font-bold lg:w-1/4">
            {links.length > 0 ? (
              <a href={links[0]} target="_blank">
                site
              </a>
            ) : (
              ''
            )}
          </div>
        </div>

        <ProjectPage people={peopleID}></ProjectPage>
      </article>
    </SectionContainer>
  )
}
ProjectPage.defaultProps = {
  people: '', // people이 undefined일 경우 빈 배열로 기본값 할당
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
          <div className="w-1/4"></div>
          <div className="flex w-full flex-col lg:w-1/2">
            <div className="no-scrollbar w-full overflow-scroll px-12 pb-4 pl-4 font-bold lg:pb-0 lg:pl-12">
              {title}
            </div>
            <div className="no-scrollbar w-full overflow-scroll break-keep pl-4 font-bold lg:pl-12 lg:pt-4">
              {children}
            </div>
          </div>
          <div className="w-1/4"></div>
        </div>
        <div className="h-24"></div>
      </article>
    </SectionContainer>
  )
}

function ProjectLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const {
    filePath,
    cranePositions,
    dtype,
    path,
    cities,
    slug,
    date,
    projectLinks,
    title,
    tags,
    credit,
    imagePaths,
  } = content
  const basePath = path.split('/')[0]

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
                  width={1024}
                  height={1024}
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
          <div className="no-scrollbar prose max-w-none overflow-scroll break-keep p-4 pt-0  font-bold text-black lg:h-body lg:w-1/4">
            {children}
          </div>

          <div className="no-scrollbar overflow-scroll pt-8 font-bold lg:h-body lg:w-1/4 lg:pt-0">
            <div className="p-4 pt-0">{title}</div>
            <div className="p-4">
              City
              <br />
              {cities.map((src, idx) => (
                <span key={idx}>
                  {idx == 0 ? '' : '/ '} {src}{' '}
                </span>
              ))}
            </div>
            <div className="p-4">
              Crane position
              <br />
              {cranePositions.map((src, idx) => (
                <span key={idx}>
                  {idx == 0 ? '' : '/ '} {src}{' '}
                </span>
              ))}
            </div>
            {Object.keys(credit).length !== 0 && (
              <div className="p-4">
                Credits
                <br />
                {Object.entries(credit['Credits']).map(([name, link], idx) => (
                  <span key={idx}>
                    {link !== '' ? (
                      <a href={`${link}`} rel="noopener noreferrer" className="hover:underline">
                        {idx == 0 ? '' : '/ '} {name}{' '}
                      </a>
                    ) : (
                      <span>
                        {idx == 0 ? '' : '/ '} {name}{' '}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
            {Object.keys(projectLinks).length !== 0 && (
              <div className="p-4">
                Links
                <br />
                {Object.entries(projectLinks['Links']).map(([name, link], idx) => (
                  <div key={idx}>
                    {link !== '' ? (
                      <a
                        href={`http://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {' '}
                        {name}{' '}
                      </a>
                    ) : (
                      <span>
                        {idx == 0 ? '' : '/ '} {name}{' '}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="p-4">
              Category
              <br />
              <TagList tags={tags}/>
            </div>
            <div className='h-32'></div>
            {/* <div>
              {credit}
            </div> */}
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, dtype, path, slug, date, title, tags, credit, imagePaths } = content
  const basePath = path.split('/')[0]

  const handleLinkClick = () => {}
  if (dtype === 'people') return PeopleLayout({ content, authorDetails, next, prev, children })
  else if (dtype === 'project')
    return ProjectLayout({ content, authorDetails, next, prev, children })
  else return BlogLayout({ content, authorDetails, next, prev, children })
}
