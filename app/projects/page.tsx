import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectListLayout from '@/layouts/ProjectListLayout'

export async function generateMetadata(): Promise<Metadata> {
  const type = 'project'
  return genPageMetadata({
    title: 'Projects',
    description: `${siteMetadata.title} ${type} content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/dtype/${type}/feed.xml`,
      },
    },
  })
}

export default async function ProjectPage() {
  const type = 'project'
  const title = type[0].toUpperCase() + type.slice(1) // "Project"로 설정
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.dtype === type)) // type이 "project"인 게시글만 필터링
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <ProjectListLayout posts={filteredPosts} title={title} />
}
