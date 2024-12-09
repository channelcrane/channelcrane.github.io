import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const imageScale = 0.7
  return (
    <>
      <div className="divide-y">
        <div className="flex min-h-screen items-center justify-center">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5 ">
            <Image
              className="opacity-55 hover:opacity-100"
              src="/static/images/home/Crane_landing_images.jpg"
              width={1249 * imageScale}
              height={703 * imageScale}
              alt="main"
            />
          </div>
        </div>
      </div>
    </>
  )
}
