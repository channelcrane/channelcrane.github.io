import Image from 'next/image'

export default function Home({ posts }) {
  const imageScale = 0.7
  return (
    <>
      <div className="divide-y">
        <div className="flex min-h-screen items-center justify-center">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5 ">
            <Image
              className="hover:opacity-100 lg:opacity-35"
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
