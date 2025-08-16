"use client"

import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, ArrowRight, Shield, Zap, Star, ChevronDown, CheckCircle2 } from "lucide-react"

interface FormData {
  name: string
  phone: string
  amount: string
  counterpartyType: string
  reason: string
  privacyConsent: boolean
  marketingConsent: boolean
}

interface HeroSectionProps {
  onFormSubmit?: (data: FormData) => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    amount: "",
    counterpartyType: "",
    reason: "",
    privacyConsent: false,
    marketingConsent: false,
  })

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.playbackRate = 0.85 // 슬로우 재생

    const handleTimeUpdate = () => {
      if (v.currentTime >= 2.5) {
        v.currentTime = 0 // 처음으로 되돌림
        v.play()
      }
    }

    v.addEventListener("timeupdate", handleTimeUpdate)
    return () => v.removeEventListener("timeupdate", handleTimeUpdate)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onFormSubmit ? onFormSubmit(formData) : alert("상담 신청이 완료되었습니다. 곧 연락드리겠습니다.")
  }

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#next-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const ContactForm: React.FC = () => (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-yellow-400 bg-card">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-t-lg">
        <CardTitle className="text-center font-bold text-lg sm:text-xl">
          <span className="inline-block">5분&nbsp;무료&nbsp;진단&nbsp;신청</span>
        </CardTitle>
        <CardDescription className="text-center text-gray-800 font-medium text-sm sm:text-base">
          <span className="inline-block">투명한&nbsp;고정가격으로&nbsp;안내해드립니다</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* 가격 미리보기 */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-3 text-center">💰 투명한 고정가격</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">스타트:</span>
              <span className="font-semibold text-slate-900">22만원</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">스탠다드:</span>
              <span className="font-semibold text-slate-900">55만원</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">집행패키지:</span>
              <span className="font-semibold text-slate-900">상담 후 견적</span>
            </div>
            <div className="pt-2 border-t border-yellow-200">
              <p className="text-xs text-yellow-700">
                + 성공보수: 회수금액의 10% 내외<br/>
                <span className="font-semibold">채권 금액과 관계없이 동일한 가격!</span>
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">연락처 *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">채권금액 (참고용)</Label>
            <Select onValueChange={(value: string) => setFormData({ ...formData, amount: value })}>
              <SelectTrigger>
                <SelectValue placeholder="금액 구간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="~500만원">~500만원</SelectItem>
                <SelectItem value="500만~1천만">500만원 ~ 1천만원</SelectItem>
                <SelectItem value="1천만~3천만">1천만원 ~ 3천만원</SelectItem>
                <SelectItem value="3천만~5천만">3천만원 ~ 5천만원</SelectItem>
                <SelectItem value="5천만~1억">5천만원 ~ 1억원</SelectItem>
                <SelectItem value="1억원 이상">1억원 이상</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500 mt-1">💡 금액과 관계없이 서비스별 동일한 가격입니다</p>
          </div>
          <div>
            <Label htmlFor="counterpartyType">상대방 유형</Label>
            <Select onValueChange={(value: string) => setFormData({ ...formData, counterpartyType: value })}>
              <SelectTrigger>
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
            <Label htmlFor="reason">간단한 사유</Label>
            <Textarea
              id="reason"
              placeholder="예: 거래대금 미지급, 월세 체납, 대여금 미상환 등"
              value={formData.reason}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacyConsent}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, privacyConsent: checked })}
                required
              />
              <Label htmlFor="privacy" className="text-sm">개인정보 수집·이용 동의 (필수)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={formData.marketingConsent}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, marketingConsent: checked })}
              />
              <Label htmlFor="marketing" className="text-sm">마케팅 정보 수신 동의 (선택)</Label>
            </div>
          </div>
          <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
            무료&nbsp;진단&nbsp;신청하기
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 lg:gap-8 items-center flex-1 max-w-7xl">
        
        {/* Left: Text */}
        <div className="text-white space-y-3 sm:space-y-4 md:space-y-6 max-w-[480px] mx-auto md:ml-auto md:mr-0">
          <Badge className="bg-yellow-400 text-black hover:bg-black hover:text-white font-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 inline-flex items-center text-sm sm:text-base lg:text-lg shadow-lg border-2 border-yellow-500 transition-colors duration-300">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm lg:text-base">채권금액 관계없이 투명한 고정가격</span>
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
            빼앗긴&nbsp;돈,<br />
            <span className="text-yellow-400">명확한&nbsp;가격으로!</span><br />
            <span className="text-yellow-400">합법적으로!</span><br />
            되찾아드립니다
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
            복잡한 금액별 계산 없이 <span className="text-yellow-400 font-bold">투명한 고정가격</span>으로 안심하세요
          </p>
          
          {/* 간단한 가격 미리보기 */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">💰 투명한 가격표</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">스타트:</span>
                <span className="text-white font-semibold">22만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">스탠다드:</span>
                <span className="text-yellow-400 font-semibold">55만원 ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">집행패키지:</span>
                <span className="text-white font-semibold">상담견적</span>
              </div>
              <div className="pt-2 border-t border-white/20">
                <p className="text-xs text-white/70">+ 성공보수 10% 내외</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg text-white/90">
            <div className="flex items-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 mr-2 flex-shrink-0" />
              <span>변호사 직접 수행</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 mr-2 flex-shrink-0" />
              <span>고정가격 시스템</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 mr-2 flex-shrink-0" />
              <span>당일 진단</span>
            </div>
          </div>
        </div>

        {/* Right: Video */}
        <div className="flex justify-center order-first md:order-last">
          <div className="rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <video
              ref={videoRef}
              src="/video.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          onClick={handleScrollDown}
          variant="ghost"
          size="lg"
          className="text-white hover:text-yellow-400 hover:bg-white/10 rounded-full p-3 sm:p-4 transition-all duration-300"
        >
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
        </Button>
      </div>

    </section>
  )
}

export default HeroSection