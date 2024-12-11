'use client'
import { useProjectTagStore, useYearTagStore, usePeopleTagStore } from 'app/store'
import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

function slugToString(slug) {
  return slug.replace(/-/g, ' ')
}

export const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/archive`}
      className="mr-4 font-bold hover:underline"
      onClick={() => {
        useYearTagStore.getState().resetTags()
        useProjectTagStore.getState().clearTags()
        usePeopleTagStore.getState().clearTags()

        useProjectTagStore.getState().addTag(text.toLowerCase())
      }}
    >
      {slugToString(text)}
    </Link>
  )
}

export const NonlinkTag = ({ text }: Props) => {
  return <span className="mr-4 font-bold">{slugToString(text)}</span>
}
