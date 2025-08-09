"use client"

import React, { useState, FormEvent, ChangeEvent } from "react"
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    if (onFormSubmit) {
      onFormSubmit(formData)
    } else {
      alert("상담 신청이 완료되었습니다. 곧 연락드리겠습니다.")
    }
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
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* 배경 비디오 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video.mp4" // 👉 비디오 파일 경로
        autoPlay
        muted
        loop
        playsInline
      />
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 콘텐츠 */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <Badge className="bg-yellow-400 text-black hover:bg-yellow-400 font-bold px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                오늘 17시 이전 접수 시, 당일 회신
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="inline-block">빼앗긴&nbsp;돈,</span>
                <br />
                <span className="text-yellow-400 inline-block">빠르게</span>
                <br />
                <span className="inline-block">되찾아드립니다</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium text-white/90">
              <span className="inline-block">법의&nbsp;힘으로&nbsp;당신의&nbsp;권리를&nbsp;지키는</span>{" "}
              <span className="text-yellow-400 font-bold inline-block">머니히어로</span>
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base md:text-lg text-white/90">
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
                className="border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl bg-transparent"
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
  )
}

export default HeroSection
