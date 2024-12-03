/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import Image from 'next/image'
interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

function formatDateRange(startDate, endDate) {
  // Date 객체로 변환
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 시작 날짜 형식: "YYYY. MM. DD"
  const startFormatted = `${start.getFullYear()}. ${String(start.getMonth() + 1).padStart(2, '0')}. ${String(start.getDate()).padStart(2, '0')}`;

  // 끝 날짜 형식: "MM.DD" 또는 "MM.DD.YYYY"
  const endFormatted =
    start.getFullYear() === end.getFullYear()
      ? `${String(end.getMonth() + 1).padStart(2, '0')}.${String(end.getDate()).padStart(2, '0')}`
      : `${String(end.getMonth() + 1).padStart(2, '0')}.${String(end.getDate()).padStart(2, '0')}.${end.getFullYear()}`;

  return `${startFormatted}. - ${endFormatted}.`;
}

export default function ProjectListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className='pb-32'>
        <div className="w-full pb-6 pt-6 h-52 ">
        </div>
        <div className="flex sm:space-x-24 px-12">
            <ul className='w-full'>
              {displayPosts.map((post) => {
                const { path, date, title, dtype, summary, tags, cities, start, finish, imagePaths } = post
                
                if (dtype != 'project') return null

                return (
                  <li key={path} className="w-full lg:h-60 flex flex-col lg:flex-row lg:space-y-0 pb-20">
                      <div className="relative h-52 lg:w-1/2 lg:h-52 bg-red-200 px-12 py-4">
                        <Link href={`/${path}`}>
                        <Image
                          src={imagePaths[0] ||  '/static/images/sparrowhawk-avatar.jpg'}
                          alt="Example Image"
                          layout="fill" // 부모를 채우는 레이아웃
                          objectFit="cover" // 이미지를 채우는 방식 (cover, contain 등)
                        /></Link>
                      </div>
                      <div className="lg:w-1/4 lg:px-12">
                          <div className="font-bold tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </div>
                          <div className='font-bold'>
                            {formatDateRange(date, date)}
                          </div>
                          <div className="flex flex-wrap lg:pt-4">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                          <div className="flex flex-wrap">
                            {cities?.map((city) => <Tag key={city} text={city} />)}
                          </div>
                        

                      </div>
                      <div className="pt-4 lg:pt-0 lg:w-1/4 lg:px-12 font-bold tracking-tight max-w-none">
                          {summary}
                        </div>
                  </li>
                )
              })}

            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
            
          </div>
        </div>
    </>
  )
}
