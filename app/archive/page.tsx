import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArchiveListLayout from '@/layouts/ArchiveListLayout'


export async function generateMetadata(): Promise<Metadata> {
  const type = 'project'
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

export default async function ArchivePage() {
  const type = 'project'
  const title = type[0].toUpperCase() + type.slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => true))
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <ArchiveListLayout posts={filteredPosts} title={title} />
}
