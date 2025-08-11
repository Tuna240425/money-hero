// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import BackToTop from './components/BackToTop'

export const metadata: Metadata = {
  // ⭐ 도메스틱 경로(/og.png)를 절대 URL로 바꿔주는 기준 URL
  metadataBase: new URL('https://moneyhero.co.kr'),

  title: '채권회수 머니히어로 | 빼앗긴 돈, 빠르게 되찾아드립니다',
  description:
    '변호사 직접 수행하는 채권회수 전문 서비스. 당일 가압류 진단, 회수율 85%. 5분 무료 진단으로 회수 가능성을 확인하세요.',
  keywords:
    '채권회수, 가압류, 강제집행, 내용증명, 지급명령, 변호사, 법무법인, 미수금회수',
  authors: [{ name: 'MoneyHero' }],
  creator: 'MoneyHero',
  publisher: 'MoneyHero',
  robots: 'index, follow',

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://moneyhero.co.kr',
    title: 'MoneyHero - 채권회수 전문',
    description: '빼앗긴 돈, 빠르게 되찾아드립니다. 변호사 직접 수행, 당일 가압류 진단',
    siteName: 'MoneyHero',
    // 👇 여기 추가
    images: [
      {
        url: '/favicon.png', // metadataBase 기준으로 절대 URL로 변환됨
        width: 1200,
        height: 630,
        alt: 'MoneyHero - 채권회수 전문',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MoneyHero - 채권회수 전문',
    description: '빼앗긴 돈, 빠르게 되찾아드립니다. 변호사 직접 수행, 당일 가압류 진단',
    // 👇 여기 추가
    images: ['/og.png'],
  },

  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/favicon.ico' },
  manifest: '/site.webmanifest',
}
