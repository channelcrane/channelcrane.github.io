import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PeopleListLayout from '@/layouts/PeopleListLayout'

export async function generateMetadata(): Promise<Metadata> {
  const type = 'people'
  return genPageMetadata({
    title: type,
    description: `${siteMetadata.title} ${type} content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/dtype/${type}/feed.xml`,
      },
    },
  })
}

export default async function PeoplePage() {
  const type = 'people'
  const title = type[0].toUpperCase() + type.slice(1) // "People"로 설정
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.dtype === type)) // type이 "people"인 게시글만 필터링
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <PeopleListLayout posts={filteredPosts} title={title} />
}
