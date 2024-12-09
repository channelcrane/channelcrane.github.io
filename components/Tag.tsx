import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

function slugToString(slug) {
  return slug.replace(/-/g, ' ')
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`} className="mr-4 font-bold hover:underline">
      {slugToString(text)}
    </Link>
  )
}

export default Tag
