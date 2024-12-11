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

import yearData from 'app/year-data.json'
import projectTagData from 'app/project-tag-data.json'
import peopleTagData from 'app/people-tag-data.json'

import { useState } from 'react'
import React from 'react'
import { useProjectTagStore, useYearTagStore, usePeopleTagStore } from 'app/store'

function slugToString(slug) {
  return slug.replace(/-/g, ' ')
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

function hasIntersection(array1, array2) {
  const slugifiedArray1 = array1.map(slugify)
  const slugifiedArray2 = array2.map(slugify)

  return slugifiedArray1.some((item) => slugifiedArray2.includes(item))
}

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
  const start = new Date(startDate)
  const end = new Date(endDate)

  // 시작 날짜 형식: "YYYY. MM. DD"
  const startFormatted = `${start.getFullYear()}. ${String(start.getMonth() + 1).padStart(2, '0')}. ${String(start.getDate()).padStart(2, '0')}`

  // 끝 날짜 형식: "MM.DD" 또는 "MM.DD.YYYY"
  const endFormatted =
    start.getFullYear() === end.getFullYear()
      ? `${String(end.getMonth() + 1).padStart(2, '0')}.${String(end.getDate()).padStart(2, '0')}`
      : `${String(end.getMonth() + 1).padStart(2, '0')}.${String(end.getDate()).padStart(2, '0')}.${end.getFullYear()}`

  return `${startFormatted}. - ${endFormatted}.`
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

const YearTagCheckboxes: React.FC = () => {
  const yearTags = Object.keys(yearData)
  const { selectedTags, toggleTag } = useYearTagStore()

  return (
    <div>
      {yearTags.map((tag) => (
        <label key={tag} className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            name={`tag-${tag}`}
            value={tag}
            className="peer invisible w-0"
            onChange={() => toggleTag(tag)}
            checked={selectedTags.includes(tag)}
          />
          <span className="h-5 w-5 scale-35 rounded-full border-4 border-black peer-checked:h-5 peer-checked:w-5 peer-checked:rounded-full peer-checked:bg-black"></span>
          {tag}
        </label>
      ))}
    </div>
  )
}

const ProjectTagCheckboxes: React.FC = () => {
  const projectsTags = Object.keys(projectTagData)
  const { selectedTags, toggleTag } = useProjectTagStore()

  return (
    <div>
      {projectsTags.map((tag) => (
        <label key={tag} className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            name={`tag-${tag}`}
            value={tag}
            className="peer invisible w-0"
            onChange={() => toggleTag(tag)}
            checked={selectedTags.includes(tag)}
          />
          <span className="h-5 w-5 scale-35 rounded-full border-4 border-black peer-checked:h-5 peer-checked:w-5 peer-checked:rounded-full peer-checked:bg-black"></span>
          {slugToString(tag)}
        </label>
      ))}
    </div>
  )
}

const PeopleTagCheckboxes: React.FC = () => {
  const peopleTags = Object.keys(peopleTagData)
  const { selectedTags, toggleTag } = usePeopleTagStore()

  return (
    <div>
      {peopleTags.map((tag) => (
        <label key={tag} className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            name={`tag-${tag}`}
            value={tag}
            className="peer invisible w-0"
            onChange={() => toggleTag(tag)}
            checked={selectedTags.includes(tag)}
          />
          <span className="h-5 w-5 scale-35 rounded-full border-4 border-black peer-checked:h-5 peer-checked:w-5 peer-checked:rounded-full peer-checked:bg-black"></span>
          {slugToString(tag)}
        </label>
      ))}
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
  // const tagCounts = tagData as Record<string, number>
  // const tagKeys = Object.keys(tagCounts)
  // const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const [opentag, setOpentag] = useState(false)
  const [openProjectTag, setOpenProjectTag] = useState(false)
  const [openPeopleTag, setOpenPeopleTag] = useState(false)

  const { selectedAll: allProject, selectedTags: selectedProject } = useProjectTagStore()
  const { selectedAll: allPeople, selectedTags: selectedPeople } = usePeopleTagStore()
  const { selectedAll: allYear, selectedTags: selectedYear } = useYearTagStore()

  return (
    <>
      <div className="pb-32">
        <div className="h-40 w-full pb-6 pt-6"></div>
        <div className="flex gap-4 px-10 pb-10 font-bold tracking-tight">
          {/* tag Dropdown */}
          <div
            className="relative p-4 pl-0 hover:underline"
            onMouseEnter={() => setOpentag(true)}
            onMouseLeave={() => setOpentag(false)}
          >
            <a
              role="button"
              tabIndex={0}
              onClick={() => setOpentag((prev) => !prev)}
              onKeyDown={(e) => e.key === 'y' && setOpentag((prev) => !prev)}
            >
              YEAR{' '}
            </a>
            {opentag && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-around">
                <div className="p-2">
                  <YearTagCheckboxes />
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
            <a
              role="button"
              tabIndex={0}
              onClick={() => setOpenProjectTag((prev) => !prev)}
              onKeyDown={(e) => e.key === 'p' && setOpenProjectTag((prev) => !prev)}
            >
              {' '}
              PROJECT TAG{' '}
            </a>
            {openProjectTag && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-around">
                <div className="p-2">
                  <ProjectTagCheckboxes />
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
            <a
              role="button"
              tabIndex={0}
              onClick={() => setOpenPeopleTag((prev) => !prev)}
              onKeyDown={(e) => e.key === 'e' && setOpenPeopleTag((prev) => !prev)}
            >
              PEOPLE TAG
            </a>
            {openPeopleTag && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-around">
                <div className="p-2">
                  <PeopleTagCheckboxes />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex px-10 sm:space-x-24">
          <div className="justify-content-between grid w-full grid-cols-1 gap-x-28 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayPosts.map((post) => {
              const { path, date, title, dtype, summary, tags, years, start, finish, cities } = post

              if (dtype == 'other' && !(allProject()&&(allYear()&&allPeople()))) return
              if (dtype == 'people' && !hasIntersection(selectedPeople, tags)) return
              if (dtype == 'project' && !hasIntersection(selectedProject, tags)) return
              if (!hasIntersection(selectedYear, years)) return

              return (
                <div key={path} className=" aspect-[1/1] border-0.5 border-black px-3 py-2">
                  <div className="font-bold tracking-tight">
                    <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                      {title}
                    </Link>
                  </div>
                  {dtype == 'project' && (
                    <div className="font-bold">{formatDateRange(start, finish)}</div>
                  )}
                  <div className="flex flex-wrap">
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
