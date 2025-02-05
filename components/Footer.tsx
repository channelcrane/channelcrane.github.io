'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <footer
      className={`fixed bottom-0 left-0 z-80 w-screen bg-white py-4 pt-0 text-center font-bold tracking-tight text-black transition-all duration-700 ease-in-out 
        ${isExpanded ? 'max-h-[500px] overflow-scroll shadow-up' : 'max-h-[80px]'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-[80px] pt-0 text-center">
        <Image
          className="inline-block cursor-pointer"
          src={'/static/images/identity/logo_symbol.svg'}
          width={63.2}
          height={44.18}
          alt="Symbol of Crane"
          onClick={toggleExpand}
        />
      </div>

      {
        <div className={`flex flex-wrap`}>
          <div className="w-full space-y-4 p-4 pt-0 text-left md:w-1/2">
            <p>
              Channel Crane presents culture/arts projects produced with Crane along with the
              stories and the people behind them. Channel Crane primarily uses Korean as its main
              language, with other languages included depending on the project.
            </p>
            <p>
              채널 크레인(Channel Crane)은 크레인과 함께 생산한 여러 문화/예술 프로젝트와 프로젝트가
              만들어낸 이야기들, 그리고 프로젝트를 만든 사람들을 소개합니다. 채널 크레인은 한국어를
              주언어로 사용하며, 프로젝트에 따라 다른 언어들을 병기합니다.
            </p>
          </div>

          <div className="w-full space-y-4 p-4 pt-0 text-left md:w-1/4">
            <p>
              © 2024 Crane. The copyright of the content in Channel Crane belongs to the respective
              creators, authors, and Crane. Unauthorized use without written consent from the
              creators and Crane is strictly prohibited. (Source: Channel Crane)
            </p>
            <p>
              © 2024 크레인. 채널 크레인(Channel Crane)에 수록된 콘텐츠에 대한 저작권은 해당 작가,
              저자, 그리고 크레인에 있으며, 저작자와 크레인의 서면 동의 없이 무단으로 사용할 수
              없습니다. (출처: 채널 크레인)
            </p>
          </div>

          <div className="w-full space-y-4 p-4 pt-0 text-left md:w-1/4">
            <p>
              Publish CHANNEL CRANE / Curation·Edit CHANNEL CRANE / Website Design KIM HYUNG JUN /
              Website Developer KIM HYUN CHUL <br /> Support KOREA ART MANAGEMENT SERVICE, ART KOREA
              LAB
            </p>
            <p>
              발행 CHANNAL CRANE / 기획·편집 채널 크레인 / 웹사이트 디자인 김형준 / 웹사이트 개발
              김현철 <br /> 지원: 예술경영센터, 아트코리아랩
            </p>
          </div>
        </div>
      }
    </footer>
  )
}
