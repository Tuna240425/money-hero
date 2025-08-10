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
import { Phone, MessageCircle, ArrowRight, Shield, Zap, Star } from "lucide-react"

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
            <Label htmlFor="amount">채권금액</Label>
            <Select onValueChange={(value: string) => setFormData({ ...formData, amount: value })}>
              <SelectTrigger>
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
    <section className="relative min-h-[50vh] flex items-center justify-center bg-black px-4">
      <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Text */}
        <div className="text-white space-y-6 max-w-[480px] ml-auto">
          <Badge className="bg-yellow-400 text-black font-bold px-4 py-2 inline-flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            오늘 17시 이전 접수 시, 당일 회신
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight">
            빼앗긴&nbsp;돈,<br />
            <span className="text-yellow-400">빠르게</span><br />
            되찾아드립니다
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            법의 힘으로 당신의 권리를 지키는 <span className="text-yellow-400 font-bold">머니히어로</span>
          </p>
          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center"><Shield className="w-5 h-5 text-yellow-400 mr-2" />변호사 직접 수행</div>
            <div className="flex items-center"><Zap className="w-5 h-5 text-yellow-400 mr-2" />당일 가압류 진단</div>
            <div className="flex items-center"><Star className="w-5 h-5 text-yellow-400 mr-2" />회수율 85%</div>
          </div>
        </div>

        {/* Right: Video */}
        <div className="flex justify-center">
          <div className="rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg"
              style={{ width: "300px", height: "300px" }}>
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

    </section>

  )
}

export default HeroSection
