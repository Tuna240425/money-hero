// app/components/Header.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavigationItem {
  label: string
  href: string
  analytics: string
}

const navigationItems: NavigationItem[] = [
  { label: '절차 안내', href: '/process', analytics: 'nav_process' },
  { label: '이용 요금', href: '/pricing', analytics: 'nav_pricing' },
  { label: '성공 사례', href: '/cases', analytics: 'nav_cases' },
  { label: '회사·변호사 소개', href: '/about', analytics: 'nav_about' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstFocusableElementRef = useRef<HTMLAnchorElement>(null)
  const lastFocusableElementRef = useRef<HTMLButtonElement>(null)

  // 스크롤 감지(살짝 그림자)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 모바일 외부 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [isMobileMenuOpen])

  // ESC 닫기
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false)
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [])

  // 포커스 트랩
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const nodes = mobileMenuRef.current?.querySelectorAll('a, button') as NodeListOf<HTMLElement>
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onTab)
    return () => document.removeEventListener('keydown', onTab)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen && firstFocusableElementRef.current) firstFocusableElementRef.current.focus()
  }, [isMobileMenuOpen])

  // 바디 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* 네비게이션 바: 색상 CSS 변수 적용 */}
      <header
        className={`sticky top-0 z-40 border-b transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}
        style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-fg)', borderColor: 'var(--nav-border)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* 로고 (라이트/다크 자동 스왑) */}
            <Link href="/" aria-label="홈으로" className="flex items-center gap-2" data-analytics="nav_logo">
              {/* 라이트 모드용: 투명배경 + 검정 로고 */}
              <Image
                className="block h-8 w-auto md:h-9 light-logo"
                src="/logo-transparent.png"
                alt="MoneyHero 로고 (Light)"
                width={120}
                height={120}
                priority
              />
              {/* 다크 모드용: 어두운 배경 + 노랑 로고 (최초 첨부본) */}
              <Image
                className="hidden h-8 w-auto md:h-9 dark-logo"
                src="/logo.png"
                alt="MoneyHero 로고 (Dark)"
                width={120}
                height={120}
                priority
              />
            </Link>

            {/* 데스크톱 네비게이션 (md↑ 노출) */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors rounded-sm
                    ${isActive(item.href) ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
                  style={{ color: 'var(--nav-fg)' }}
                  data-analytics={item.analytics}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: 'currentColor' }} />
                  )}
                </Link>
              ))}
              <Link
                href="/quote"
                className="px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                style={{ background: 'currentColor', color: 'var(--nav-bg)' }}
                data-analytics="nav_cta"
              >
                즉시 상담/견적
              </Link>
            </nav>

            {/* 모바일 햄버거 (md 미만 노출) */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="메뉴 열기"
              style={{ color: 'var(--nav-fg)' }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* 라이트/다크 로고 토글 (CSS) */}
        <style>{`
          @media (prefers-color-scheme: dark) {
            .light-logo { display: none !important; }
            .dark-logo  { display: block !important; }
          }
        `}</style>
      </header>

      {/* 모바일 오버레이 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ background: 'rgba(0,0,0,.5)' }} aria-hidden="true" />
      )}

      {/* 모바일 드로어 (md 미만) */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-xs z-50 transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-fg)' }}
        aria-label="모바일 네비게이션"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--nav-border)' }}>
            <span className="text-lg font-semibold">메뉴</span>
            <button
              ref={lastFocusableElementRef}
              type="button"
              className="p-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
              style={{ color: 'var(--nav-fg)' }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item, idx) => (
              <Link
                key={item.href}
                ref={idx === 0 ? firstFocusableElementRef : undefined}
                href={item.href}
                className="block px-3 py-3 rounded-md text-base font-medium transition-colors"
                style={{ color: 'var(--nav-fg)' }}
                onClick={() => setIsMobileMenuOpen(false)}
                data-analytics={item.analytics}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t" style={{ borderColor: 'var(--nav-border)' }}>
            <Link
              href="/quote"
              className="block w-full text-center px-4 py-3 rounded-md text-base font-semibold transition-colors"
              style={{ background: 'var(--nav-fg)', color: 'var(--nav-bg)' }}
              onClick={() => setIsMobileMenuOpen(false)}
              data-analytics="nav_cta_mobile"
            >
              즉시 상담/견적
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
