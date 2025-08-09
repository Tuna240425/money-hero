import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '채권회수 머니히어로 | 빼앗긴 돈, 빠르게 되찾아드립니다',
  description: '변호사 직접 수행하는 채권회수 전문 서비스. 당일 가압류 진단, 회수율 85%. 5분 무료 진단으로 회수 가능성을 확인하세요.',
  keywords: '채권회수, 가압류, 강제집행, 내용증명, 지급명령, 변호사, 법무법인, 미수금회수',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyHero - 채권회수 전문',
    description: '빼앗긴 돈, 빠르게 되찾아드립니다. 변호사 직접 수행, 당일 가압류 진단',
  },
  icons: {
    icon: '/public/favicon.ico',
    shortcut: '/public/favicon.ico',
    apple: '/public/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Pretendard 폰트 로딩 최적화 */
            @font-face {
              font-family: 'Pretendard';
              font-weight: 400;
              font-display: swap;
              src: local('Pretendard Regular'), url('/fonts/Pretendard-Regular.ttf') format('truetype');
            }
            
            @font-face {
              font-family: 'Pretendard';
              font-weight: 600;
              font-display: swap;
              src: local('Pretendard SemiBold'), url('/fonts/Pretendard-SemiBold.ttf') format('truetype');
            }
            
            @font-face {
              font-family: 'Pretendard';
              font-weight: 700;
              font-display: swap;
              src: local('Pretendard Bold'), url('/fonts/Pretendard-Bold.ttf') format('truetype');
            }
            
            @font-face {
              font-family: 'Pretendard';
              font-weight: 900;
              font-display: swap;
              src: local('Pretendard Black'), url('/fonts/Pretendard-Black.ttf') format('truetype');
            }
            
            html {
              font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
              word-break: keep-all;
              overflow-wrap: break-word;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            body {
              font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
              word-break: keep-all;
              overflow-wrap: break-word;
            }
          `
        }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}