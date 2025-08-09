// app/components/ScrollNavigation.tsx
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ScrollNavigationProps {
  sections: string[]
}

const getHeaderHeight = () => {
  const header = document.querySelector('header') as HTMLElement | null
  return header?.offsetHeight ?? 0
}

const ScrollNavigation: React.FC<ScrollNavigationProps> = ({ sections }) => {
  const [current, setCurrent] = useState(0)
  const [hh, setHh] = useState(0)

  // 헤더 높이 초기화 & 리사이즈 대응
  useEffect(() => {
    const update = () => setHh(getHeaderHeight())
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const opts = useMemo(() => ({ behavior: 'smooth' as const }), [])

  const scrollToIndex = (index: number) => {
    const el = document.getElementById(sections[index])
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - (hh || getHeaderHeight())
    window.scrollTo({ top, ...opts })
  }

  const onNext = () => current < sections.length - 1 && scrollToIndex(current + 1)
  const onPrev = () => current > 0 && scrollToIndex(current - 1)

  // 키보드 네비
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); onNext() }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); onPrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, sections])

  // 현재 섹션 감지 (헤더 높이 보정)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const mid = window.scrollY + (window.innerHeight / 2)
        sections.forEach((id, i) => {
          const el = document.getElementById(id)
          if (!el) return
          const top = el.offsetTop - (hh || getHeaderHeight())
          const bottom = top + el.offsetHeight
          if (mid >= top && mid < bottom) setCurrent(i)
        })
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections, hh])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="p-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="이전 섹션"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <div className="flex flex-col space-y-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-yellow-400 scale-125' : 'bg-gray-400 hover:bg-gray-600'}`}
            aria-label={`섹션 ${i + 1}로 이동`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={current === sections.length - 1}
        className="p-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="다음 섹션"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ScrollNavigation
