'use client'
// app/about/page.tsx
import Footer from "@/app/components/Footer"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
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
                </h1>
                <br />
                <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
                  머니히어로는 풍부한 경험과 전문성을 바탕으로 <br />빠르고 확실한 채권회수 서비스를 제공합니다.
                </p>
                <br />

                {/* CTA 버튼들 */}
                <div className="mt-6 flex gap-3 justify-center">
                  <Link
                    href="/process#quote"
                    className="inline-flex items-center rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-500 transition"
                  >
                    무료 진단 신청
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center rounded-md border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white hover:text-black transition"
                  >
                    이용 요금 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 본문 섹션 */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-24 md:py-40">
          {/* 오시는길 컨텐츠 */}
          <div className="space-y-28 md:space-y-40">
            {/* 섹션 제목 */}
            <div className="text-center mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">오시는길</h2>
            </div>

            {/* 서울 사무소 */}
            <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-400">서울 사무소</h3>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.963190388944!2d127.11623188885493!3d37.48519500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca51cffdc1a6f%3A0x92d08d0e4d9fe653!2z7ZqM7IKs!5e0!3m2!1sko!2skr!4v1754888638338!5m2!1sko!2skr"
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Divider */}
            <div className="my-20 md:my-32 border-t border-gray-200 dark:border-gray-700" />

            {/* 제주 사무소 */}
            <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-400">제주 사무소</h3>
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
        </section>
      </main>

      <Footer />
    </>
  )
}
