// app/components/Footer.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { label: '절차 안내', href: '/process', analytics: 'footer_nav_process' },
  { label: '이용 요금', href: '/pricing', analytics: 'footer_nav_pricing' },
  { label: '성공 사례', href: '/cases', analytics: 'footer_nav_cases' },
  { label: '회사 소개', href: '/about', analytics: 'footer_nav_about' },
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* 로고 + 브랜드명 */}
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/logo-transparent.png"
            alt="MoneyHero 로고"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="text-2xl font-bold">
            Money<span className="text-yellow-400">Hero</span>
          </span>
        </div>

        {/* 4섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* 사업자 정보 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">사업자 정보</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>대표변호사: 이한나</p>
              <p>사업자등록번호: 654-39-00409</p>
              <p>임앤리 법률사무소 (머니히어로)</p>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">연락처</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
<<<<<<< HEAD
              <p>이메일: moneyhero.service@gmail.com </p>
=======
              <p>이메일: moneyhero.service@gmail.com</p>
>>>>>>> 847db43c76723a5ffe81c6a66d3b712d4060a6bb
              <p>주소: 서울특별시 송파구 법원로92, 806호(문정동, 파트너스1)</p>
            </div>
          </div>

          {/* 법적 고지 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">법적 고지</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">본 페이지는 변호사 광고입니다.</p>
              <Link
                href="/privacy"
                className="hover:text-yellow-400 transition-colors underline-offset-4 hover:underline"
                data-analytics="footer_privacy"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>

          
          {/* 바로가기 */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">바로가기</h4>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
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
        </div>

        <div className="border-t border-border mt-10 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} MoneyHero. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
