// app/page.tsx
'use client'

import React, { useState } from "react"
import HeroSection from "./components/HeroSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone, MessageCircle, Clock, CheckCircle, Users,
  TrendingUp, FileText, Gavel, DollarSign, ChevronDown,
} from "lucide-react"

interface AccordionItemProps {
  question: string; answer: string; isOpen: boolean; onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-border rounded-lg bg-card">
    <button className="w-full p-6 text-left flex justify-between items-center hover:bg-accent transition-colors" onClick={onClick}>
      <span className="font-semibold text-foreground text-lg">{question}</span>
      <ChevronDown className={`w-5 h-5 text-yellow-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (<div className="px-6 pb-6"><p className="text-muted-foreground pt-2">{answer}</p></div>)}
  </div>
)

export default function MoneyHeroLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-yellow-400 text-foreground p-4 z-40 shadow-lg md:hidden">
        <div className="flex gap-2">
          <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> 무료&nbsp;진단
          </Button>
          <Button variant="outline" className="flex-1 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-sm">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> 전화
          </Button>
          <Button variant="outline" className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent text-xs sm:text-sm">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> 카톡
          </Button>
        </div>
      </div>

      {/* 히어로 */}
      <HeroSection onFormSubmit={() => {}} />

      {/* 문제 인식 */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">이런 고민, 혼자 해결하려 하지 마세요</h2>
            <p className="text-muted-foreground text-lg sm:text-xl">시간이 지날수록 회수는 더 어려워집니다</p>
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

      {/* 3단계 프로세스 */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">간단한 3단계로 채권을 회수합니다</h2>
            <p className="text-muted-foreground text-lg sm:text-xl">복잡한 법적 절차, 머니히어로가 대신 처리해드립니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "사전진단 (당일)", desc: "채권관계·증거확인, 보전필요성 판단", icon: FileText, color: "yellow" },
              { step: "02", title: "법적조치 (1~2주)", desc: "내용증명/지급명령/가압류·본안소송", icon: Gavel, color: "accent" },
              { step: "03", title: "집행 및 회수", desc: "재산조회·강제집행·합의금 수령", icon: DollarSign, color: "yellow" },
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 rounded-full ${item.color === 'yellow' ? 'bg-yellow-400' : 'bg-accent'} flex items-center justify-center mx-auto mb-6`}>
                    <item.icon className={`w-10 h-10 ${item.color === 'yellow' ? 'text-black' : 'text-accent-foreground'}`} />
                  </div>
                  <div className={`text-3xl font-black ${item.color === 'yellow' ? 'text-yellow-400' : 'text-foreground'} mb-3`}>{item.step}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">실제 회수 성과</h2>
            <p className="text-muted-foreground text-lg sm:text-xl">머니히어로가 직접 수행으로 이뤄낸 결과들입니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { title: "거래대금 3,200만원", desc: "6주 내 회수 (지급명령→합의)", amount: "3,200만원", period: "6주" },
              { title: "월세 8개월 체납", desc: "보전 후 합의 종결", amount: "480만원", period: "4주" },
              { title: "용역비 미지급", desc: "가압류 후 즉시 합의", amount: "1,800만원", period: "3주" },
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

      {/* 요금 */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">투명한 요금 체계</h2>
            <p className="text-muted-foreground text-lg sm:text-xl">결과 중심의 합리적 수임료</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "스타트", price: "₩0 + 성공보수", desc: "초기자문/내용증명, 회수 시 성공보수 X%", features: ["무료 초기 상담", "내용증명 발송", "성공 시에만 보수", "기본 법률 자문"], popular: false },
              { name: "스탠다드", price: "정액 + 보수↓", desc: "지급명령·소송대리 포함", features: ["모든 스타트 서비스", "지급명령 신청", "소송 대리", "성공보수 할인", "진행상황 알림"], popular: true },
              { name: "집행패키지", price: "견적형", desc: "가압류·강제집행 중심", features: ["모든 스탠다드 서비스", "가압류 신청", "강제집행 절차", "재산조사", "맞춤형 전략"], popular: false },
            ].map((plan, index) => (
              <Card key={index} className={`relative bg-card border-border ${plan.popular ? "border-2 border-yellow-400 shadow-2xl scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
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
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 font-bold ${plan.popular ? "bg-yellow-400 hover:bg-yellow-500 text-black" : "bg-foreground hover:bg-foreground/90 text-background"}`}>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">자주 묻는 질문</h2>
            <p className="text-muted-foreground text-lg sm:text-xl">궁금한 점을 미리 확인해보세요</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "내용증명만으로 효과 있나요?", a: "내용증명은 법적 최고의 첫 단계로, 상당수 사건이 이 단계에서 해결됩니다." },
              { q: "가압류는 언제 가능한가요?", a: "채권의 존재가 소명되고, 재산 은닉·처분 우려가 있을 때 가능합니다." },
              { q: "성공보수는 언제 발생하나요?", a: "실제 회수된 시점에만 발생합니다." },
            ].map((faq, index) => (
              <AccordionItem key={index} question={faq.q} answer={faq.a} isOpen={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} />
            ))}
          </div>
        </div>
      </section>

      {/* 마지막 CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">더 늦기 전에 지금 시작하세요</h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-medium">무료 진단으로 회수 가능성을 확인해보세요</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 font-bold">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 5분 무료 진단
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-6 sm:px-8 py-3 sm:py-4 bg-transparent font-bold">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 카톡 상담
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
