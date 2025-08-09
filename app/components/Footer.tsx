import React from 'react'

interface RabbitHeroLogoProps {
  className?: string;
}

const RabbitHeroLogo: React.FC<RabbitHeroLogoProps> = ({ className = "w-12 h-12" }) => (
  <div className={`${className} flex items-center justify-center`}>
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#FFD700" strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="30" x2="15" y2="30" opacity="0.6" />
        <line x1="8" y1="40" x2="18" y2="40" opacity="0.4" />
        <line x1="3" y1="50" x2="13" y2="50" opacity="0.6" />
        <line x1="6" y1="60" x2="16" y2="60" opacity="0.4" />
      </g>
      
      <ellipse cx="50" cy="65" rx="18" ry="25" stroke="#FFD700" strokeWidth="3" fill="none" />
      <circle cx="50" cy="40" r="15" stroke="#FFD700" strokeWidth="3" fill="none" />
      
      <ellipse cx="42" cy="25" rx="4" ry="12" stroke="#FFD700" strokeWidth="3" fill="none" transform="rotate(-15 42 25)" />
      <ellipse cx="58" cy="25" rx="4" ry="12" stroke="#FFD700" strokeWidth="3" fill="none" transform="rotate(15 58 25)" />
      
      <path d="M40 35 Q45 32 50 35 Q55 32 60 35 L58 42 Q50 45 42 42 Z" stroke="#FFD700" strokeWidth="2" fill="none" />
      
      <circle cx="45" cy="38" r="2" fill="#FFD700" />
      <circle cx="55" cy="38" r="2" fill="#FFD700" />
      
      <g stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round">
        <line x1="70" y1="55" x2="75" y2="50" />
        <rect x="73" y="47" width="6" height="3" rx="1" fill="#FFD700" />
        <line x1="68" y1="57" x2="72" y2="53" />
      </g>
      
      <path d="M35 55 Q30 60 32 75 Q40 80 45 75 L45 65" stroke="#FFD700" strokeWidth="2" fill="none" />
      
      <ellipse cx="44" cy="85" rx="3" ry="8" stroke="#FFD700" strokeWidth="2" fill="none" />
      <ellipse cx="56" cy="85" rx="3" ry="8" stroke="#FFD700" strokeWidth="2" fill="none" />
    </svg>
  </div>
)

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <RabbitHeroLogo className="w-8 h-8" />
              <span className="text-xl font-bold">Money<span className="text-yellow-400">Hero</span></span>
            </div>
            <p className="text-muted-foreground">
              변호사가 직접 처리하는
              <br />
              신뢰할 수 있는 채권회수 서비스
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-400">로펌 정보</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>대표변호사: 임성호, 이한나</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>변호사 등록번호: 12345</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-400">연락처</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>전화: 02-3477-9650</p>
              <p>이메일: info@moneyhero.co.kr</p>
              <p>주소: 서울특별시 송파구 법원로92, 806호(문정동, 파트너스1)</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-400">법적 고지</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>본 페이지는 변호사 광고입니다.</p>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 MoneyHero. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer