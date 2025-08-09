"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ScrollNavigationProps {
  sections: string[]
}

const ScrollNavigation: React.FC<ScrollNavigationProps> = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState<number>(0)

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToNext = () => {
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1)
    }
  }

  const scrollToPrev = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1)
    }
  }

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        scrollToNext()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        scrollToPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection])

  // 현재 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4">
      {/* 이전 섹션 버튼 */}
      <button
        onClick={scrollToPrev}
        disabled={currentSection === 0}
        className="p-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="이전 섹션"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* 섹션 인디케이터 */}
      <div className="flex flex-col space-y-2">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSection === index
                ? 'bg-yellow-400 scale-125'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`섹션 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* 다음 섹션 버튼 */}
      <button
        onClick={scrollToNext}
        disabled={currentSection === sections.length - 1}
        className="p-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="다음 섹션"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ScrollNavigation