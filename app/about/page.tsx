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
          
          {/* 탭 네비게이션 */}
          <div className="flex justify-center mb-20 md:mb-28">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setActiveTab('location')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === 'location'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-yellow-500'
                }`}
              >
                오시는길
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === 'members'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-yellow-500'
                }`}
              >
                구성원 소개
              </button>
            </div>
          </div>

          {/* 오시는길 탭 컨텐츠 */}
          {activeTab === 'location' && (
            <div className="space-y-28 md:space-y-40">
              
              {/* 서울 사무소 */}
              <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-400">서울 사무소</h2>

                  <div className="space-y-5 text-gray-800 dark:text-gray-200">
                    <div>
                      <p className="font-semibold">Call</p>
                      <p>02-3477-9650</p>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>link59605312@gmail.com</p>
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>서울특별시 송파구 법원로 92, 806호 (문정동, 파트너스1)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Image
                    src="/seoul-office.jpg"
                    alt="서울 사무소"
                    width={960}
                    height={640}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* 서울 지도 */}
              <div className="rounded-lg overflow-hidden shadow mt-14 md:mt-20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=..."
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Divider: 은은한 가느다란 구분선 */}
              <div className="my-20 md:my-32 border-t border-gray-200 dark:border-gray-700" />

              {/* 제주 사무소 */}
              <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-400">제주 사무소</h2>

                  <div className="space-y-5 text-gray-800 dark:text-gray-200">
                    <div>
                      <p className="font-semibold">Call</p>
                      <p>02-3477-9650</p>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>lshlawfirm2@gmail.com</p>
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>제주특별자치도 제주시 연신로 411, 3층</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Image
                    src="/jeju-office.jpg"
                    alt="제주 사무소"
                    width={960}
                    height={640}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* 제주 지도 */}
              <div className="rounded-lg overflow-hidden shadow mt-14 md:mt-20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.203448668758!2d126.53243617702014!3d33.49608354688988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350cfcb00ab6ef3b%3A0x2253341e84410b14!2z7KCc7KO87Yq567OE7J6Q7LmY64-EIOygnOyjvOyLnCDsl7DsgrzroZwgNDEx!5e0!3m2!1sko!2skr!4v1754751758364!5m2!1sko!2skr"
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>

            </div>
          )}

          {/* 구성원 소개 탭 컨텐츠 */}
          {activeTab === 'members' && (
            <div className="space-y-20 md:space-y-32">
              
              {/* 대표 변호사 */}
              <div className="text-center space-y-10 md:space-y-14">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">대표 변호사</h2>
                
                {/* 첫 번째 대표 변호사 */}
                <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center max-w-4xl mx-auto mb-20 md:mb-24">
                  <div className="order-2 md:order-1">
                    <div className="text-left space-y-5">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">김법률 변호사</h3>
                      <p className="text-lg text-yellow-600 dark:text-yellow-400 font-semibold">머니히어로 법률사무소 대표</p>
                      
                      <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div>
                          <p className="font-semibold">학력</p>
                          <p>• 서울대학교 법학과 졸업</p>
                          <p>• 사법고시 45기 합격</p>
                        </div>
                        <div>
                          <p className="font-semibold">경력</p>
                          <p>• 서울중앙지방법원 판사 (2년)</p>
                          <p>• 대형 로펌 파트너 변호사 (8년)</p>
                          <p>• 채권회수 전문 변호사 (15년 경력)</p>
                        </div>
                        <div>
                          <p className="font-semibold">전문분야</p>
                          <p>• 채권회수, 민사소송, 강제집행</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="w-[200px] h-[240px] relative">
                      <Image
                        src="/lawyer-profile1.jpg"
                        alt="김법률 변호사"
                        fill
                        className="rounded-lg shadow-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 두 번째 대표 변호사 */}
                <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center max-w-4xl mx-auto">
                  <div className="order-1 md:order-1">
                    <div className="text-left space-y-5">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">이법률 변호사</h3>
                      <p className="text-lg text-yellow-600 dark:text-yellow-400 font-semibold">머니히어로 법률사무소 대표</p>
                      
                      <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div>
                          <p className="font-semibold">학력</p>
                          <p>• 연세대학교 법학과 졸업</p>
                          <p>• 사법고시 46기 합격</p>
                        </div>
                        <div>
                          <p className="font-semibold">경력</p>
                          <p>• 인천지방법원 판사 (3년)</p>
                          <p>• 법무법인 대표 변호사 (10년)</p>
                          <p>• 부동산 전문 변호사 (12년 경력)</p>
                        </div>
                        <div>
                          <p className="font-semibold">전문분야</p>
                          <p>• 부동산 분쟁, 임대차, 경매</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-2 md:order-2 flex justify-center">
                    <div className="w-[200px] h-[240px] relative">
                      <Image
                        src="/lawyer-profile2.jpg"
                        alt="이법률 변호사"
                        fill
                        className="rounded-lg shadow-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider: 은은한 가느다란 구분선 */}
              <div className="my-20 md:my-32 border-t border-gray-200 dark:border-gray-700" />

              {/* 팀 구성원 */}
              <div className="text-center space-y-10 md:space-y-14">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">팀 구성원</h2>
                
                <div className="grid md:grid-cols-3 gap-10 md:gap-16">
                  {/* 구성원 1 */}
                  <div className="text-center space-y-5">
                    <div className="w-[200px] h-[240px] relative mx-auto">
                      <Image
                        src="/member1.jpg"
                        alt="이변호사"
                        fill
                        className="rounded-lg shadow-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">이변호사</h3>
                      <p className="text-yellow-600 dark:text-yellow-400 font-semibold">선임변호사</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">민사소송 전문</p>
                    </div>
                  </div>

                  {/* 구성원 2 */}
                  <div className="text-center space-y-5">
                    <div className="w-[200px] h-[240px] relative mx-auto">
                      <Image
                        src="/member2.jpg"
                        alt="박변호사"
                        fill
                        className="rounded-lg shadow-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">박변호사</h3>
                      <p className="text-yellow-600 dark:text-yellow-400 font-semibold">수임변호사</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">강제집행 전문</p>
                    </div>
                  </div>

                  {/* 구성원 3 */}
                  <div className="text-center space-y-5">
                    <div className="w-[200px] h-[240px] relative mx-auto">
                      <Image
                        src="/member3.jpg"
                        alt="최법무사"
                        fill
                        className="rounded-lg shadow-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">최법무사</h3>
                      <p className="text-yellow-600 dark:text-yellow-400 font-semibold">법무사</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">등기업무 전문</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  )
}
