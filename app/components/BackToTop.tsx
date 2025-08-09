'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    // 모바일 숨김, 데스크톱에서만 표시
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="hidden md:flex fixed bottom-6 right-6 h-12 w-12 items-center justify-center rounded-full shadow-lg border transition
                 bg-white text-gray-900 hover:bg-gray-50"
      aria-label="맨 위로 이동"
      style={{
        // 다크/라이트 모두 보기 좋게 (원하면 CSS 변수로 바꿔도 됩니다)
        borderColor: 'rgba(0,0,0,.08)',
      }}
    >
      ↑
    </button>
  )
}
