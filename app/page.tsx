"use client"

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  ArrowRight,
  FileText,
  Gavel,
  DollarSign,
  Shield,
  Zap,
  Star,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react"

interface FormData {
  name: string;
  phone: string;
  amount: string;
  counterpartyType: string;
  reason: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface RabbitHeroLogoProps {
  className?: string;
}

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function MoneyHeroLanding() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    amount: "",
    counterpartyType: "",
    reason: "",
    privacyConsent: false,
    marketingConsent: false,
  })

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(true)

  // 다크모드 상태 관리
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage?.getItem('theme')
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark')
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(prefersDark)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark')
        window.localStorage?.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        window.localStorage?.setItem('theme', 'light')
      }
    }
  }, [darkMode])

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("상담 신청이 완료되었습니다. 곧 연락드리겠습니다.")
  }

  // Rabbit Hero Logo Component
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

  // Header Component
  const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
    return (
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <RabbitHeroLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-2xl font-bold text-foreground">
                Money<span className="text-yellow-400">Hero</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* 다크모드 토글 버튼 */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="border-border hover:bg-accent p-2"
                aria-label="테마 전환"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground" />
                )}
              </Button>
              
              <div className="hidden md:flex gap-3">
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent text-sm lg:text-base">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span className="inline-block">카톡&nbsp;상담</span>
                </Button>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm lg:text-base">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="inline-block">무료&nbsp;진단</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  // Footer Component
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
                <p>대표변호사: 김변호사</p>
                <p>사업자등록번호: 123-45-67890</p>
                <p>변호사 등록번호: 12345</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-yellow-400">연락처</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>전화: 02-1234-5678</p>
                <p>이메일: info@moneyhero.co.kr</p>
                <p>주소: 서울시 강남구 테헤란로 123</p>
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

  // Custom Accordion Component
  const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => (
    <div className="border border-border rounded-lg bg-card">
      <button
        className="w-full p-6 text-left flex justify-between items-center hover:bg-accent transition-colors"
        onClick={onClick}
      >
        <span className="font-semibold text-foreground text-lg">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-yellow-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-muted-foreground pt-2">{answer}</p>
        </div>
      )}
    </div>
  )

  const ContactForm: React.FC = () => (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-yellow-400 bg-card">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-t-lg">
        <CardTitle className="text-center font-bold text-lg sm:text-xl">
          <span className="inline-block">5분&nbsp;무료&nbsp;진단&nbsp;신청</span>
        </CardTitle>
        <CardDescription className="text-center text-gray-800 font-medium text-sm sm:text-base">
          <span className="inline-block">머니히어로가&nbsp;직접&nbsp;상담해드립니다</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">이름 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background border-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground">연락처 *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-background border-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="amount" className="text-foreground">채권금액</Label>
            <Select onValueChange={(value: string) => setFormData({ ...formData, amount: value })}>
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="금액 구간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-500">500만원 미만</SelectItem>
                <SelectItem value="500-1000">500만원 ~ 1천만원</SelectItem>
                <SelectItem value="1000-3000">1천만원 ~ 3천만원</SelectItem>
                <SelectItem value="3000-5000">3천만원 ~ 5천만원</SelectItem>
                <SelectItem value="over-5000">5천만원 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="counterpartyType" className="text-foreground">상대방 유형</Label>
            <Select onValueChange={(value: string) => setFormData({ ...formData, counterpartyType: value })}>
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">개인</SelectItem>
                <SelectItem value="corporation">법인/사업자</SelectItem>
                <SelectItem value="unknown">잘 모르겠음</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason" className="text-foreground">간단한 사유</Label>
            <Textarea
              id="reason"
              placeholder="예: 거래대금 미지급, 월세 체납, 대여금 미상환 등"
              value={formData.reason}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="bg-background border-border text-foreground placeholder-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacyConsent}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, privacyConsent: checked })}
                required
                className="border-border"
              />
              <Label htmlFor="privacy" className="text-sm text-foreground">
                개인정보 수집·이용 동의 (필수)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={formData.marketingConsent}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, marketingConsent: checked })}
                className="border-border"
              />
              <Label htmlFor="marketing" className="text-sm text-foreground">
                마케팅 정보 수신 동의 (선택)
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-sm sm:text-base">
            <span className="inline-block">무료&nbsp;진단&nbsp;신청하기</span>
          </Button>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent text-xs sm:text-sm">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="inline-block">카톡&nbsp;상담</span>
            </Button>
            <Button variant="outline" className="flex-1 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-sm">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="inline-block">전화&nbsp;상담</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header 컴포넌트 불러오기 */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Fixed Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-yellow-400 text-foreground p-4 z-50 shadow-lg md:hidden">
        <div className="flex gap-2">
          <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="inline-block">무료&nbsp;진단</span>
          </Button>
          <Button variant="outline" className="flex-1 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-sm">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="inline-block">전화</span>
          </Button>
          <Button variant="outline" className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent text-xs sm:text-sm">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="inline-block">카톡</span>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-accent/20 to-background py-16 md:py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-2 h-16 bg-yellow-400 transform rotate-12"></div>
          <div className="absolute top-40 right-20 w-2 h-12 bg-yellow-400 transform -rotate-12"></div>
          <div className="absolute bottom-40 left-20 w-2 h-20 bg-yellow-400 transform rotate-45"></div>
          <div className="absolute bottom-20 right-10 w-2 h-14 bg-yellow-400 transform -rotate-45"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-400 text-black hover:bg-yellow-400 font-bold px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  오늘 17시 이전 접수 시, 당일 회신
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight">
                  <span className="inline-block">빼앗긴&nbsp;돈,</span>
                  <br />
                  <span className="text-yellow-400 inline-block">빠르게</span>
                  <br />
                  <span className="inline-block">되찾아드립니다</span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                <span className="inline-block">법의&nbsp;힘으로&nbsp;당신의&nbsp;권리를&nbsp;지키는</span> <span className="text-yellow-400 font-bold inline-block">머니히어로</span>
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base md:text-lg text-muted-foreground">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 sm:mr-3" />
                  <span className="inline-block">변호사&nbsp;직접&nbsp;수행</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 sm:mr-3" />
                  <span className="inline-block">당일&nbsp;가압류&nbsp;진단</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 sm:mr-3" />
                  <span className="inline-block">회수율&nbsp;85%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl">
                  <span className="inline-block">5분&nbsp;무료&nbsp;진단&nbsp;받기</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl bg-transparent"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  <span className="inline-block">카톡으로&nbsp;문의</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Recognition */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="inline-block">이런&nbsp;고민,&nbsp;혼자&nbsp;해결하려&nbsp;하지&nbsp;마세요</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              <span className="inline-block">시간이&nbsp;지날수록&nbsp;회수는&nbsp;더&nbsp;어려워집니다</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "소상공인/프리랜서", desc: "거래대금, 용역비 미지급" },
              { icon: FileText, title: "임대인", desc: "월세, 보증금 체납" },
              { icon: TrendingUp, title: "B2B 거래", desc: "매출채권, 외상대금 체불" },
              { icon: DollarSign, title: "개인 금전대차", desc: "대여금, 투자금 미회수" },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 bg-card border-border hover:border-yellow-400">
                <CardContent className="p-6">
                  <item.icon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="inline-block">간단한&nbsp;3단계로&nbsp;채권을&nbsp;회수합니다</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              <span className="inline-block">복잡한&nbsp;법적&nbsp;절차,&nbsp;머니히어로가&nbsp;대신&nbsp;처리해드립니다</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "사전진단 (당일)",
                desc: "채권관계·증거확인, 보전필요성 판단",
                icon: FileText,
                color: "yellow",
              },
              {
                step: "02",
                title: "법적조치 (1~2주)",
                desc: "내용증명/지급명령/가압류·본안소송",
                icon: Gavel,
                color: "accent",
              },
              {
                step: "03",
                title: "집행 및 회수",
                desc: "재산조회·강제집행·합의금 수령",
                icon: DollarSign,
                color: "yellow",
              },
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 rounded-full ${item.color === "yellow" ? "bg-yellow-400" : "bg-accent"} flex items-center justify-center mx-auto mb-6`}
                  >
                    <item.icon className={`w-10 h-10 ${item.color === "yellow" ? "text-black" : "text-accent-foreground"}`} />
                  </div>
                  <div
                    className={`text-3xl font-black ${item.color === "yellow" ? "text-yellow-400" : "text-foreground"} mb-3`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="inline-block">실제&nbsp;회수&nbsp;성과</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              <span className="inline-block">머니히어로가&nbsp;직접&nbsp;수행으로&nbsp;이뤄낸&nbsp;결과들입니다</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "거래대금 3,200만원",
                desc: "6주 내 회수 (지급명령→합의)",
                amount: "3,200만원",
                period: "6주",
              },
              {
                title: "월세 8개월 체납",
                desc: "보전 후 합의 종결",
                amount: "480만원",
                period: "4주",
              },
              {
                title: "용역비 미지급",
                desc: "가압류 후 즉시 합의",
                amount: "1,800만원",
                period: "3주",
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 bg-card border-yellow-400">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-yellow-400 text-black font-bold">성공사례</Badge>
                    <div className="text-right">
                      <div className="text-3xl font-black text-yellow-400">{item.amount}</div>
                      <div className="text-muted-foreground font-medium">{item.period} 소요</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-xl">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "평균 8주", label: "착수~회수 기간" },
              { number: "78%", label: "상담→수임 전환율" },
              { number: "4.8/5.0", label: "고객 만족도" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-5xl font-black text-yellow-400 mb-3">{stat.number}</div>
                <div className="text-muted-foreground text-xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="inline-block">투명한&nbsp;요금&nbsp;체계</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              <span className="inline-block">결과&nbsp;중심의&nbsp;합리적&nbsp;수임료</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "스타트",
                price: "₩0 + 성공보수",
                desc: "초기자문/내용증명, 회수 시 성공보수 X%",
                features: ["무료 초기 상담", "내용증명 발송", "성공 시에만 보수", "기본 법률 자문"],
                popular: false,
              },
              {
                name: "스탠다드",
                price: "정액 + 보수↓",
                desc: "지급명령·소송대리 포함",
                features: ["모든 스타트 서비스", "지급명령 신청", "소송 대리", "성공보수 할인", "진행상황 알림"],
                popular: true,
              },
              {
                name: "집행패키지",
                price: "견적형",
                desc: "가압류·강제집행 중심",
                features: ["모든 스탠다드 서비스", "가압류 신청", "강제집행 절차", "재산조사", "맞춤형 전략"],
                popular: false,
              },
            ].map((plan, index) => (
              <Card key={index} className={`relative bg-card border-border ${plan.popular ? "border-2 border-yellow-400 shadow-2xl scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-400 text-black px-6 py-2 font-bold text-lg">추천</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <div className="text-3xl font-black text-yellow-400">{plan.price}</div>
                  <CardDescription className="text-muted-foreground text-lg">{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 font-bold ${plan.popular ? "bg-yellow-400 hover:bg-yellow-500 text-black" : "bg-foreground hover:bg-foreground/90 text-background"}`}
                  >
                    상담 신청
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-lg">* 실제 금액·비율은 상담 후 확정됩니다</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="inline-block">자주&nbsp;묻는&nbsp;질문</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              <span className="inline-block">궁금한&nbsp;점을&nbsp;미리&nbsp;확인해보세요</span>
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "내용증명만으로 효과 있나요?",
                a: "내용증명은 법적 최고의 첫 단계로, 상당수 사건이 이 단계에서 해결됩니다. 상대방에게 법적 압박을 가하며, 후속 절차의 근거가 됩니다.",
              },
              {
                q: "가압류는 언제 가능한가요?",
                a: "채권의 존재가 소명되고, 상대방이 재산을 은닉하거나 처분할 우려가 있을 때 가능합니다. 담보 제공이 필요하며, 당일 진단을 통해 가능 여부를 판단해드립니다.",
              },
              {
                q: "상대가 재산을 숨기면 어떻게 하나요?",
                a: "법원의 재산조회 절차를 통해 은행계좌, 부동산, 급여 등을 파악할 수 있습니다. 또한 재산은닉 행위 자체가 법적 제재 대상이 됩니다.",
              },
              {
                q: "성공보수는 언제 발생하나요?",
                a: "실제 채권이 회수된 시점에 발생합니다. 합의든 강제집행이든 실제 금액을 받으신 후에만 성공보수를 정산합니다.",
              },
              {
                q: "비대면 진행 시 필요한 서류는?",
                a: "계약서, 거래내역서, 독촉 관련 자료 등 채권관계를 증명할 수 있는 서류가 필요합니다. 상담 시 상세한 체크리스트를 제공해드립니다.",
              },
              {
                q: "상대가 지방/무자력인 경우 전략은?",
                a: "관할법원에서의 절차 진행이 가능하며, 무자력의 경우에도 향후 재산 형성 시를 대비한 법적 조치를 취할 수 있습니다.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lawyer Profile */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="inline-block">변호사&nbsp;소개</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              <span className="inline-block">채권회수&nbsp;전문&nbsp;변호사가&nbsp;직접&nbsp;처리합니다</span>
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-card border-border">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-16 h-16 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">김변호사</h3>
                    <p className="text-muted-foreground text-lg">대표변호사</p>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-xl">주요 경력</h4>
                      <ul className="text-muted-foreground space-y-2 text-lg">
                        <li>• 변호사 등록번호: 12345</li>
                        <li>• 채권회수 전문 10년 경력</li>
                        <li>• 대한변호사협회 정회원</li>
                        <li>• 금융법무 전문가 과정 수료</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-xl">전문 분야</h4>
                      <div className="flex flex-wrap gap-3">
                        {["채권회수", "가압류", "강제집행", "내용증명", "지급명령", "금전소비대차"].map(
                          (tag, index) => (
                            <Badge key={index} variant="outline" className="border-yellow-400 text-yellow-400 px-3 py-1">
                              {tag}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="inline-block">더&nbsp;늦기&nbsp;전에&nbsp;지금&nbsp;시작하세요</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-medium">
            <span className="inline-block">무료&nbsp;진단으로&nbsp;회수&nbsp;가능성을&nbsp;확인해보세요</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 font-bold">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="inline-block">5분&nbsp;무료&nbsp;진단</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white px-6 sm:px-8 py-3 sm:py-4 bg-transparent font-bold"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="inline-block">카톡&nbsp;상담</span>
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Badge className="bg-black text-yellow-400 hover:bg-black font-bold px-3 sm:px-4 py-1 sm:py-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="inline-block text-sm sm:text-base">오늘&nbsp;17시&nbsp;이전&nbsp;접수&nbsp;시,&nbsp;당일&nbsp;회신&nbsp;보장</span>
            </Badge>
          </div>
        </div>
      </section>

      {/* Footer 컴포넌트 불러오기 */}
      <Footer />
    </div>
  )
}