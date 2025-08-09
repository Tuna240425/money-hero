// app/components/Header.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, MessageCircle, Phone } from 'lucide-react'

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
  const pathname = usePathname()

  // 스크롤 그림자
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 다크/라이트 토글 (전역 관리)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      const isDark = saved === 'dark'
      setDarkMode(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])
  const toggleTheme = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // 모바일 드로어
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClickAway)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickAway)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  // 바디 스크롤 잠금
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}
        style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-fg)', borderColor: 'var(--nav-border)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center h-14 md:h-16">
            {/* 로고 */}
            <Link href="/" aria-label="홈으로" className="flex items-center gap-2" data-analytics="nav_logo">
              {/* 라이트 */}
              <Image
                className="block h-8 w-auto md:h-9 light-logo"
                src="/logo-transparent.png" alt="MoneyHero" width={120} height={120} priority
              />
              {/* 다크 */}
              <Image
                className="hidden h-8 w-auto md:h-9 dark-logo"
                src="/logo.png" alt="MoneyHero" width={120} height={120} priority
              />
            </Link>

            {/* 중앙: 데스크톱 네비 (토글 '왼쪽' 위치) */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 mx-6 lg:mx-10">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-opacity rounded-sm ${
                    isActive(item.href) ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                  }`}
                  style={{ color: 'var(--nav-fg)' }}
                  data-analytics={item.analytics}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: 'currentColor' }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* 우측 컨트롤 */}
            <div className="ml-auto flex items-center gap-2 md:gap-3">
              {/* 다크/라이트 토글 */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="테마 전환"
                className="p-2 rounded-md transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                style={{ color: 'var(--nav-fg)' }}
                data-analytics="nav_theme_toggle"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* CTA들 (데스크톱) */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="#kakao"
                  className="px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                  style={{ borderColor: 'var(--nav-fg)', color: 'var(--nav-fg)' }}
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> 카톡 상담
                  </span>
                </Link>
                <Link
                  href="/quote"
                  className="px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'var(--nav-fg)', color: 'var(--nav-bg)' }}
                  data-analytics="nav_cta"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 무료 진단
                  </span>
                </Link>
              </div>

              {/* 모바일 햄버거 */}
              <button
                type="button"
                className="md:hidden p-2 rounded-md transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="메뉴 열기"
                style={{ color: 'var(--nav-fg)' }}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* 라이트/다크 로고 CSS 스왑 */}
        <style>{`
          @media (prefers-color-scheme: dark) {
            .light-logo { display: none !important; }
            .dark-logo  { display: block !important; }
          }
          :root.dark .light-logo { display: none !important; }
          :root.dark .dark-logo { display: block !important; }
        `}</style>
      </header>

      {/* 모바일 오버레이 */}
      {open && <div className="fixed inset-0 z-50 md:hidden bg-black/50" aria-hidden="true" />}

      {/* 모바일 드로어 */}
      <div
        ref={drawerRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-xs z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-fg)' }}
        aria-label="모바일 네비게이션"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--nav-border)' }}>
            <span className="text-lg font-semibold">메뉴</span>
            <button
              type="button"
              className="p-2 rounded-md transition-colors hover:bg-black/5"
              onClick={() => setOpen(false)}
              aria-label="메뉴 닫기"
              style={{ color: 'var(--nav-fg)' }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-black/5 ${
                  isActive(item.href) ? 'bg-black/5' : ''
                }`}
                style={{ color: 'var(--nav-fg)' }}
                onClick={() => setOpen(false)}
                data-analytics={item.analytics}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t" style={{ borderColor: 'var(--nav-border)' }}>
            <div className="flex gap-2">
              <Link
                href="#kakao"
                className="flex-1 px-4 py-3 text-center rounded-md border font-semibold transition-colors"
                style={{ borderColor: 'var(--nav-fg)', color: 'var(--nav-fg)' }}
                onClick={() => setOpen(false)}
              >
                카톡 상담
              </Link>
              <Link
                href="/quote"
                className="flex-1 px-4 py-3 text-center rounded-md font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'var(--nav-fg)', color: 'var(--nav-bg)' }}
                onClick={() => setOpen(false)}
                data-analytics="nav_cta_mobile"
              >
                무료 진단
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
