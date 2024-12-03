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
import { useState } from 'react';

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

export default function ArchiveListLayout({
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

  const [openYear, setOpenYear] = useState(false);
  const [openProjectTag, setOpenProjectTag] = useState(false);
  const [openPeopleTag, setOpenPeopleTag] = useState(false);



  return (
    <>
      <div className='pb-32'>
        <div className="w-full pb-6 pt-6 h-40">
        </div>
        <div className="flex gap-4 pb-10 font-bold tracking-tight px-10">
      {/* YEAR Dropdown */}
      <div
        className="relative p-4 pl-0 hover:underline"
        onMouseEnter={() => setOpenYear(true)}
        onMouseLeave={() => setOpenYear(false)}
      >
        YEAR
        {openYear && (
          <div className="absolute left-0 mt-2 w-40 bg-white shadow-around">
            <div className="p-2">
              <label className="flex items-center">
                <input type="checkbox" name="year" value="2020" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2020
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="year" value="2021" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2021
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="year" value="2022" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2022
              </label>
            </div>
          </div>
        )}
      </div>

      {/* PROJECT TAG Dropdown */}
      <div
        className="relative p-4 pl-0 hover:underline"
        onMouseEnter={() => setOpenProjectTag(true)}
        onMouseLeave={() => setOpenProjectTag(false)}
      >
        PROJECT TAG
        {openProjectTag && (
          <div className="absolute left-0 mt-2 w-40 bg-white shadow-around">
            <div className="p-2">
              <label className="flex items-center">
                <input type="checkbox" name="year" value="2020" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2020
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="year" value="2021" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2021
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="year" value="2022" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2022
              </label>
            </div>
          </div>
        )}
      </div>

      {/* PEOPLE TAG Dropdown */}
      <div
        className="relative p-4 pl-0 hover:underline"
        onMouseEnter={() => setOpenPeopleTag(true)}
        onMouseLeave={() => setOpenPeopleTag(false)}
      >
        PEOPLE TAG
        {openPeopleTag && (
          <div className="absolute left-0 mt-2 w-40 bg-white shadow-around">
            <div className="p-2">
              <label className="flex items-center">
                <input type="checkbox" name="year-2020" value="2020" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2020
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="year-2021" value="2021" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2021
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="year-2022" value="2022" className="peer invisible w-0" defaultChecked/>
                <span className="peer-checked:bg-black peer-checked:rounded-full peer-checked:w-5 peer-checked:h-5 w-5 h-5 border-5 border-black rounded-full scale-35"></span>
                2022
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
        <div className="flex sm:space-x-24 px-10">
          {/* <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div> */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-28 gap-y-4 justify-content-between">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, start, finish, cities } = post
                return (
                  <div key={path} className=" aspect-[1/1] border-0.5 border-black px-3 py-2">
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
                )
              })}
            
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}