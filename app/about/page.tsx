'use client'
// app/about/page.tsx
import Footer from "@/app/components/Footer"
import Image from "next/image"
import { useState } from "react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('location')

  return (
    <>
      <main className="bg-white dark:bg-neutral-900">
        {/* Hero Section */}
        <section className="relative h-[72vh] md:h-[84vh] flex items-center overflow-hidden">
          {/* 배경 비디오 */}
          <video
            src="/about-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 w-full">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <div className="max-w-3xl text-white text-center mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-relaxed md:leading-relaxed">
                  당신의 권리를 지키는<br />신뢰받는 법률 파트너
                </h1><br />
                <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
                  머니히어로는 풍부한 경험과 전문성을 바탕으로 <br />빠르고 확실한 채권회수 서비스를 제공합니다.
                </p><br />
                <div className="mt-6 flex gap-3 justify-center">
                  <a
                    href="/quote"
                    className="inline-flex items-center rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-500 transition"
                  >
                    무료 진단 신청
                  </a>
                  <a
                    href="/pricing"
                    className="inline-flex items-center rounded-md border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white hover:text-black transition"
                  >
                    이용 요금 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 본문 섹션 */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-24 md:py-40">
          
          {/* 오시는길 탭 컨텐츠 */}
          <div className="space-y-28 md:space-y-40">
            
            {/* 서울 사무소 */}
            <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-400">서울 사무소</h2>

                <div className="space-y-5 text-gray-800 dark:text-gray-200">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>moneyhero.service@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>서울특별시 송파구 법원로 92, 806호 (문정동, 파트너스1)</p>
                  </div>
                </div>
              </div>

              {/* 카카오 지도를 사진 자리로 이동 */}
              <div className="rounded-lg overflow-hidden shadow">
                <div style={{ width: '100%', height: '360px', position: 'relative' }}>
                  <a 
                    href="https://map.kakao.com/?urlX=526790.9999999984&urlY=1106762.0000000019&itemId=1921486882&q=%EC%9E%84%EC%95%A4%EB%A6%AC%EB%B2%95%EB%A5%A0%EC%82%AC%EB%AC%B4%EC%86%8C&srcid=1921486882&map_type=TYPE_MAP&from=roughmap" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img 
                      className="w-full h-full object-cover object-center" 
                      src="http://t1.daumcdn.net/roughmap/imgmap/51bcbce5909076908c121f5ad9ec8ea93459fc3ef1cbabcd1aa5571ffb248ed0" 
                      alt="임앤리법률사무소 위치"
                      style={{ 
                        transform: 'scale(1.05)', 
                        transformOrigin: 'center',
                        margin: '-2px'
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  )
}