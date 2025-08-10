// app/components/Footer.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavigationItem {
  label: string
  href: string
  analytics: string
}

const navigationItems: NavigationItem[] = [
  { label: '절차 안내', href: '/process', analytics: 'footer_nav_process' },
  { label: '이용 요금', href: '/pricing', analytics: 'footer_nav_pricing' },
  { label: '성공 사례', href: '/cases', analytics: 'footer_nav_cases' },
  { label: '회사 소개', href: '/about', analytics: 'footer_nav_about' },
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-16 md:py-20 border-t border-border">
      {/* 👉 헤더와 동일한 컨테이너 규격 */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 브랜드 + 소개 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-transparent.png"
                alt="MoneyHero 로고"
                width={36}
                height={36}
                className="h-9 w-auto"
                priority
              />
              <span className="text-xl font-bold">
                Money<span className="text-yellow-400">Hero</span>
              </span>
            </div>
            <p className="text-muted-foreground">
              변호사가 직접 처리하는
              <br />
              신뢰할 수 있는 채권회수 서비스
            </p>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">바로가기</h4>
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-yellow-400 transition-colors"
                  data-analytics={item.analytics}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 로펌 정보 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">로펌 정보</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>대표변호사: 임성호, 이한나</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>변호사 등록번호: 12345</p>
            </div>
          </div>

          {/* 연락처 / 법적 고지 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">연락처</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>전화: 02-3477-9650</p>
              <p>이메일: info@moneyhero.co.kr</p>
              <p>주소: 서울특별시 송파구 법원로92, 806호(문정동, 파트너스1)</p>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-yellow-400">법적 고지</h5>
              <div className="space-y-2 text-muted-foreground">
                <p>본 페이지는 변호사 광고입니다.</p>
                <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
                  개인정보처리방침
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MoneyHero. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
