"use client"
import { useProjectTagStore, useYearTagStore, usePeopleTagStore } from 'app/store'
import Link from 'next/link'

interface TagListProps {
    tags: string[]
  }

  
function TagList({tags}:TagListProps) {
    return <>
    {tags.map((src, idx) => (
        <Link
        key={idx}
        href={'/archive'}
        className="block text-gray-900 hover:text-black hover:underline"
        onClick={()=>{
          useYearTagStore.getState().resetTags();
          useProjectTagStore.getState().clearTags();
          usePeopleTagStore.getState().clearTags();
          useProjectTagStore.getState().addTag(src.toLowerCase());
          console.log(useProjectTagStore.getState().selectedTags)
        }}
      >
        {idx == 0 ? '' : '/ '} {src}{' '}
      </Link>
    ))}
    </>
}

export default TagList