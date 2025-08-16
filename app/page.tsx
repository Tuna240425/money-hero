// app/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import HeroSection from "./components/HeroSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone, MessageCircle, Clock, CheckCircle, Users,
  TrendingUp, FileText, Gavel, DollarSign, ChevronDown,
} from "lucide-react"
import Footer from "./components/Footer"
import FreeDiagnosisModal from "./components/FreeDiagnosisModal"

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-border rounded-lg bg-card">
    <button 
      className="w-full p-6 text-left flex justify-between items-center hover:bg-accent transition-colors" 
      onClick={onClick}
    >
      <span className="font-semibold text-foreground text-lg">{question}</span>
      <ChevronDown className={`w-5 h-5 text-yellow-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-6 pb-6">
        <p className="text-muted-foreground pt-2">{answer}</p>
      </div>
    )}
  </div>
)

export default function MoneyHeroLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openConsult, setOpenConsult] = useState(false)
  const [selectedService, setSelectedService] = useState<'start' | 'standard' | 'package' | null>(null)

  // URL 해시 처리 (#pricing-section으로 직접 접근 시)
  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#pricing-section') {
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing-section')
        if (pricingSection) {
          pricingSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 500) // 페이지 로드 후 스크롤
    }
  }, [])

  // 연락처 기능들
  const handlePhoneCall = () => {
    window.open('tel:02-1234-5678', '_self')
  }

  const handleKakaoTalk = () => {
    // 카카오톡 채널 연결 (실제 채널 ID로 변경 필요)
    window.open('https://pf.kakao.com/_your_channel_id/chat', '_blank')
  }

  const handleFreeDiagnosis = () => {
    setOpenConsult(true)
  }

  const handleConsultation = (serviceType?: 'start' | 'standard' | 'package') => {
    // 상담 신청 처리
    if (serviceType) {
      setSelectedService(serviceType)
    }
    setOpenConsult(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-yellow-400 text-foreground p-4 z-40 shadow-lg md:hidden">
        <div className="flex gap-2">
          <Button 
            onClick={handleFreeDiagnosis}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs sm:text-sm"
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            무료 진단
          </Button>
          <Button 
            onClick={handlePhoneCall}
            variant="outline" 
            className="flex-1 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-sm"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            전화
          </Button>
          <Button 
            onClick={handleKakaoTalk}
            variant="outline" 
            className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent text-xs sm:text-sm"
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            카톡
          </Button>
        </div>
      </div>

      {/* 히어로 */}
      <HeroSection onFormSubmit={() => handleConsultation()} />

      {/* 문제 인식 섹션 */}
      <section id="next-section" className="py-24 md:py-32 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950/30 dark:to-orange-900/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-6 py-2 rounded-full text-sm font-bold mb-6">
              ⚠️ 시급한 문제
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              이런 고민,<br />
              <span className="text-yellow-600">혼자 해결하려 하지 마세요</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">시간이 지날수록 회수는 더 어려워집니다</p>
          </div>

          <div className="space-y-16 md:space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl">
                        <Users className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">소상공인/프리랜서</h3>
                        <p className="text-lg text-muted-foreground mb-2">거래대금, 용역비 미지급</p>
                        <p className="text-yellow-700 dark:text-yellow-400 font-medium italic">"일을 다 해놨는데 돈을 안 줘요"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-black">
                  01
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
              <div className="flex-1">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl">
                        <FileText className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">임대인</h3>
                        <p className="text-lg text-muted-foreground mb-2">월세, 보증금 체납</p>
                        <p className="text-yellow-700 dark:text-yellow-400 font-medium italic">"세입자가 몇 달째 월세를 안 내요"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-black">
                  02
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl">
                        <TrendingUp className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">B2B 거래</h3>
                        <p className="text-lg text-muted-foreground mb-2">매출채권, 외상대금 체불</p>
                        <p className="text-yellow-700 dark:text-yellow-400 font-medium italic">"거래처에서 대금 지급을 계속 미뤄요"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-black">
                  03
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
              <div className="flex-1">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl">
                        <DollarSign className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">개인 금전대차</h3>
                        <p className="text-lg text-muted-foreground mb-2">대여금, 투자금 미회수</p>
                        <p className="text-yellow-700 dark:text-yellow-400 font-medium italic">"돈을 빌려줬는데 연락도 안 받아요"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-black">
                  04
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3단계 프로세스 */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-yellow-50 to-amber-100 dark:from-yellow-950/20 dark:to-amber-950/30 relative">
        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-6 py-2 rounded-full text-sm font-bold mb-6">
              🚀 프로세스
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              간단한 <span className="text-yellow-600">3단계</span>로<br />
              채권을 회수합니다
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">복잡한 법적 절차, 머니히어로가 대신 처리해드립니다</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-20 left-1/2 w-px h-96 bg-gradient-to-b from-yellow-300 to-amber-400 transform -translate-x-1/2 z-0"></div>
            
            <div className="space-y-16 md:space-y-24">
              <div className="relative">
                <div className="flex justify-center mb-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-4 md:z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-xl">01</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="p-4 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30">
                            <FileText className="w-8 h-8 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">사전진단</h3>
                            <p className="text-lg font-medium mb-4 text-yellow-600">(당일 완료)</p>
                            <p className="text-lg text-muted-foreground mb-6">채권관계·증거확인, 보전필요성 판단</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <span className="text-foreground font-medium">채권 유효성 검토</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <span className="text-foreground font-medium">증거자료 분석</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <span className="text-foreground font-medium">법적 조치 방향 설정</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-center mb-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-4 md:z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-xl">02</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="flex-1">
                    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30">
                            <Gavel className="w-8 h-8 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">법적조치</h3>
                            <p className="text-lg font-medium mb-4 text-amber-600">(1~2주 소요)</p>
                            <p className="text-lg text-muted-foreground mb-6">내용증명/지급명령/가압류·본안소송</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <span className="text-foreground font-medium">내용증명 발송</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <span className="text-foreground font-medium">지급명령 신청</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <span className="text-foreground font-medium">가압류 진행</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-center mb-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-4 md:z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-xl">03</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-800 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="p-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30">
                            <DollarSign className="w-8 h-8 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">집행 및 회수</h3>
                            <p className="text-lg font-medium mb-4 text-orange-600">(결과 확인)</p>
                            <p className="text-lg text-muted-foreground mb-6">재산조회·강제집행·합의금 수령</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                <span className="text-foreground font-medium">재산 추적 조사</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                <span className="text-foreground font-medium">강제집행 절차</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                <span className="text-foreground font-medium">최종 합의 체결</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 요금 섹션 */}
      <section id="pricing-section" className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-6 py-2 rounded-full text-sm font-bold mb-6">
              💰 투명한 요금
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              <span className="text-yellow-600">투명한</span> 요금 체계
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">결과 중심의 합리적 수임료</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:items-stretch">
            <Card className="relative bg-card border-border flex flex-col h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">스타트</CardTitle>
                <div className="text-3xl font-black text-yellow-400">22만원 부터~ </div>
                <CardDescription className="text-muted-foreground text-lg">초기자문/내용증명</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 flex-1">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">무료 초기 상담</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">내용증명 발송</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">기본 법률 자문</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">회수 시 성공보수 발생</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleConsultation('start')}
                  className="w-full mt-6 font-bold bg-foreground hover:bg-foreground/90 text-background"
                >
                  상담 신청
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-card border-2 border-yellow-400 shadow-2xl scale-105 flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-yellow-400 text-black px-6 py-2 font-bold text-lg">추천</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">스탠다드</CardTitle>
                <div className="text-3xl font-black text-yellow-400">55만원 부터~ </div>
                <CardDescription className="text-muted-foreground text-lg">지급명령 포함</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 flex-1">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">모든 스타트 서비스</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">지급명령 신청</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">진행상황 알림</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">회수 시 성공보수 발생</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleConsultation('standard')}
                  className="w-full mt-6 font-bold bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  상담 신청
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-card border-border flex flex-col h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">집행패키지</CardTitle>
                <div className="text-3xl font-black text-yellow-400">견적형</div>
                <CardDescription className="text-muted-foreground text-lg">가압류·강제집행 중심</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 flex-1">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">모든 스탠다드 서비스</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">가압류 신청</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">강제집행 절차</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">재산조사</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">맞춤형 전략</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-foreground">회수 시 성공보수 발생</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleConsultation('package')}
                  className="w-full mt-6 font-bold bg-foreground hover:bg-foreground/90 text-background"
                >
                  상담 신청
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground text-lg">* 실제 금액·비율은 상담 후 확정됩니다</p>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-24 md:py-32 bg-accent/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-6 py-2 rounded-full text-sm font-bold mb-6">
              ❓ FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              자주 묻는 <span className="text-yellow-600">질문</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">궁금한 점을 미리 확인해보세요</p>
          </div>

          <div className="space-y-4">
            <AccordionItem 
              question="내용증명만으로 효과 있나요?" 
              answer="내용증명은 법적 최고의 첫 단계로, 상당수 사건이 이 단계에서 해결됩니다." 
              isOpen={openFaq === 0} 
              onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} 
            />
            <AccordionItem 
              question="가압류는 언제 가능한가요?" 
              answer="채권의 존재가 소명되고, 재산 은닉·처분 우려가 있을 때 가능합니다." 
              isOpen={openFaq === 1} 
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} 
            />
            <AccordionItem 
              question="성공보수는 언제 발생하나요?" 
              answer="승소 또는 실제 회수된 시점에만 발생합니다." 
              isOpen={openFaq === 2} 
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} 
            />
          </div>
        </div>
      </section>

      {/* 마지막 CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-2xl animate-pulse">
              <Clock className="w-6 h-6" />
              <span>시간이 지날수록 회수가 어려워집니다!</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg">
              더 늦기 전에<br />
              <span className="text-white drop-shadow-2xl">지금 시작하세요</span>
            </h2>
            
            <p className="text-xl sm:text-2xl md:text-3xl mb-12 font-bold drop-shadow-md">
              무료 진단으로 회수 가능성을 확인해보세요
            </p>
          </div>
          </div>
      </section>

      <FreeDiagnosisModal 
        open={openConsult} 
        setOpen={setOpenConsult}
        selectedService={selectedService}
        onServiceReset={() => setSelectedService(null)}
      />
      {/* 푸터 */}
      <Footer />
    </div>
  )
}