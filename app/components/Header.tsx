'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstFocusableElementRef = useRef<HTMLAnchorElement>(null)
  const lastFocusableElementRef = useRef<HTMLButtonElement>(null)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 모바일 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // ESC 키로 모바일 메뉴 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isMobileMenuOpen])

  // 포커스 트랩
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          const focusableElements = mobileMenuRef.current?.querySelectorAll(
            'a, button'
          ) as NodeListOf<HTMLElement>
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (event.shiftKey) {
              if (document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
              }
            } else {
              if (document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
              }
            }
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [isMobileMenuOpen])

  // 모바일 메뉴 열릴 때 첫 번째 요소에 포커스
  useEffect(() => {
    if (isMobileMenuOpen && firstFocusableElementRef.current) {
      firstFocusableElementRef.current.focus()
    }
  }, [isMobileMenuOpen])

  // body 스크롤 제어
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const isActiveRoute = (href: string): boolean => {
    return pathname === href
  }

  const handleMobileMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = (): void => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b border-gray-200 transition-shadow duration-200 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded-sm"
                data-analytics="nav_logo"
              >
                법률사무소 ○○○
              </Link>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded-sm ${
                    isActiveRoute(item.href)
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  data-analytics={item.analytics}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* CTA 버튼 */}
              <Link
                href="/quote"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                data-analytics="nav_cta"
              >
                즉시 상담/견적
              </Link>
            </nav>

            {/* 모바일 햄버거 메뉴 버튼 */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              onClick={handleMobileMenuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="메뉴 열기"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* 모바일 메뉴 드로어 */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="모바일 네비게이션"
      >
        <div className="flex flex-col h-full">
          {/* 모바일 메뉴 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-900">메뉴</span>
            <button
              ref={lastFocusableElementRef}
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              onClick={handleMobileMenuClose}
              aria-label="메뉴 닫기"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* 모바일 메뉴 항목들 */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstFocusableElementRef : undefined}
                href={item.href}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${
                  isActiveRoute(item.href)
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={handleMobileMenuClose}
                data-analytics={item.analytics}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 모바일 CTA 버튼 */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/quote"
              className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              onClick={handleMobileMenuClose}
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