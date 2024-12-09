import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const CityTag = ({ text }: Props) => {
  return (
    <Link href={`/city/${slug(text)}`} className="mr-4 font-bold hover:underline">
      {text.split(' ').join('-')}
    </Link>
  )
}

export default CityTag
