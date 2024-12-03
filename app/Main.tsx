import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y">
        <div className="flex items-center justify-center min-h-screen">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <Image 
              src="/static/images/home/Crane_landing_images.jpg" 
              width={1249 * 0.7} 
              height={703 * 0.7} 
              alt="main" 
            />
          </div>
      </div>
      </div>
    </>
  )
}
