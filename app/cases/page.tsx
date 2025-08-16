"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, TrendingUp, Clock, DollarSign, Users, Building2, User, Gavel, Shield, Award, ArrowRight, Calendar, Target } from 'lucide-react'
import Footer from "@/app/components/Footer"
import Link from "next/link"

const caseCategories = [
  { id: "all", label: "전체", icon: Target },
  { id: "individual", label: "개인 채권", icon: User },
  { id: "corporate", label: "기업 채권", icon: Building2 },
  { id: "large", label: "고액 사건", icon: DollarSign }
]

const successCases = [
  {
    id: 1,
    category: "individual",
    title: "임금체불 사건 완전 회수",
    amount: "2,800만원",
    period: "3주",
    successRate: "100%",
    client: "개인 (IT업계 직장인)",
    summary: "퇴사 후 3개월간 미지급된 임금 및 퇴직금 전액 회수",
    challenge: "회사 측의 자금난을 이유로 한 지급 거부, 대표이사의 연락 두절",
    solution: "신속한 가압류 신청으로 회사 계좌 동결, 내용증명 및 지급명령을 통한 법적 압박",
    result: "협상을 통해 3주 만에 전액 회수 성공, 지연이자까지 추가 확보",
    timeline: [
      { step: "사건 접수", date: "1일차", description: "초기 상담 및 증거자료 검토" },
      { step: "가압류 신청", date: "3일차", description: "회사 계좌 및 부동산 가압류" },
      { step: "내용증명 발송", date: "5일차", description: "법적 근거를 바탕한 지급 요구" },
      { step: "협상 타결", date: "21일차", description: "전액 지급 합의 및 입금 완료" }
    ]
  },
  {
    id: 2,
    category: "corporate",
    title: "거래대금 회수 및 손해배상",
    amount: "1억 2,000만원",
    period: "6주",
    successRate: "95%",
    client: "중소기업 (제조업)",
    summary: "납품 후 대금 미지급 및 계약 위반으로 인한 손해배상까지 회수",
    challenge: "상대방 기업의 경영난, 다수 채권자와의 경합, 복잡한 계약 관계",
    solution: "우선변제권 확보를 위한 담보권 설정, 전략적 소송 진행",
    result: "원금 1억원 회수 + 지연손해금 2,000만원 추가 확보",
    timeline: [
      { step: "사건 분석", date: "1주차", description: "계약서 검토 및 법적 쟁점 파악" },
      { step: "담보 설정", date: "2주차", description: "채권 확보를 위한 담보권 설정" },
      { step: "소송 제기", date: "3주차", description: "본안소송 및 가처분 신청" },
      { step: "화해 성립", date: "6주차", description: "법원 중재로 합의 및 분할 상환" }
    ]
  },
  {
    id: 3,
    category: "large",
    title: "부동산 임대료 및 보증금 회수",
    amount: "3억 5,000만원",
    period: "8주",
    successRate: "100%",
    client: "개인 (부동산 임대업)",
    summary: "상가 임차인의 임대료 체납 및 원상복구 의무 불이행 손해 회수",
    challenge: "임차인의 야간 도주, 복잡한 권리관계, 제3자 점유 상황",
    solution: "부동산 명도소송과 손해배상청구 병행, 임차인 재산 추적",
    result: "보증금 2억 + 연체 임대료 1억 + 원상복구비 5,000만원 전액 회수",
    timeline: [
      { step: "긴급 조치", date: "1주차", description: "부동산 가압류 및 점유 확보" },
      { step: "재산 조사", date: "3주차", description: "임차인 명의 재산 전수 조사" },
      { step: "명도 소송", date: "4주차", description: "부동산 명도 및 손해배상 소송" },
      { step: "강제 집행", date: "8주차", description: "재산 압류 및 경매를 통한 회수" }
    ]
  },
  {
    id: 4,
    category: "individual",
    title: "개인간 금전대여 회수",
    amount: "5,500만원",
    period: "4주",
    successRate: "100%",
    client: "개인",
    summary: "지인에게 빌려준 사업자금 전액 회수 및 이자까지 확보",
    challenge: "차용증 없는 구두 약정, 채무자의 부인, 증거 부족",
    solution: "통화 내역, 송금 기록 등 정황 증거 수집, 지급명령 신청",
    result: "원금 5,000만원 + 지연이자 500만원 전액 회수",
    timeline: [
      { step: "증거 수집", date: "1주차", description: "송금 내역 및 통화 기록 확보" },
      { step: "지급명령", date: "2주차", description: "법원에 지급명령 신청" },
      { step: "재산 조회", date: "3주차", description: "채무자 재산 현황 파악" },
      { step: "임의 변제", date: "4주차", description: "협상을 통한 자진 상환" }
    ]
  },
  {
    id: 5,
    category: "corporate",
    title: "하도급 대금 회수",
    amount: "8,700만원",
    period: "5주",
    successRate: "100%",
    client: "중소기업 (건설업)",
    summary: "원도급업체의 부도로 인한 하도급 대금 회수",
    challenge: "원도급업체 부도, 다수 하도급업체와의 경합, 공사 중단 상황",
    solution: "하도급법 위반 신고, 직불제 신청, 선순위 채권 확보",
    result: "하도급 대금 전액 회수 및 지연이자까지 확보",
    timeline: [
      { step: "하도급법 신고", date: "1주차", description: "공정거래위원회 신고" },
      { step: "직불제 신청", date: "2주차", description: "발주처 직접 지급 신청" },
      { step: "채권 확보", date: "3주차", description: "선순위 채권 지위 확보" },
      { step: "대금 회수", date: "5주차", description: "발주처로부터 직접 수령" }
    ]
  },
  {
    id: 6,
    category: "large",
    title: "투자금 사기 피해 회수",
    amount: "7억 2,000만원",
    period: "12주",
    successRate: "85%",
    client: "개인 (투자자)",
    summary: "가상화폐 투자 사기 피해 회수 및 형사고발 병행",
    challenge: "복잡한 금융 구조, 해외 도피 시도, 자금 은닉",
    solution: "긴급 가압류, 형사고발 병행, 국제 공조 요청",
    result: "투자원금 6억 1,200만원 회수 (85% 회수율)",
    timeline: [
      { step: "긴급 조치", date: "1주차", description: "전 재산 가압류 신청" },
      { step: "형사 고발", date: "2주차", description: "사기죄 고발 및 수사 협조" },
      { step: "재산 추적", date: "6주차", description: "은닉 재산 발견 및 압류" },
      { step: "부분 회수", date: "12주차", description: "단계별 회수 완료" }
    ]
  }
]

{/* const stats = [
  { icon: TrendingUp, label: "평균 회수율", value: "92%", color: "text-green-600" },
  { icon: Clock, label: "평균 처리기간", value: "6주", color: "text-blue-600" },
  { icon: DollarSign, label: "총 회수금액", value: "156억원", color: "text-purple-600" },
  { icon: Users, label: "성공 사례", value: "1,847건", color: "text-orange-600" }
]*/}

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCase, setSelectedCase] = useState<number | null>(null)

  const filteredCases = selectedCategory === "all" 
    ? successCases 
    : successCases.filter(case_ => case_.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 헤로 섹션 */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/cases-hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold mb-6 px-4 py-2 text-sm shadow-lg">
              <Award className="w-4 h-4 mr-2" />
              검증된 성공 사례
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              <span className="text-yellow-400">실제 성공 사례</span>로 확인하는<br />
              전문적인 채권 회수 역량
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              다양한 유형의 채권 회수 사건에서 
              <span className="font-semibold text-white"> 실제로 달성한 성과</span>를 확인해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 통계 섹션 
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</h3>
                  <p className="text-slate-600 font-medium text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>*/}

      {/* 카테고리 필터 */}
      <section className="container mx-auto px-4 pt-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
             {/*<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              <span className="text-yellow-500">사례별</span> 성공 스토리
            </h2>
            <p className="text-lg text-slate-600">
              카테고리를 선택하여 관련 성공사례를 확인하세요
            </p> */}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {caseCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-12 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg hover:from-yellow-500 hover:to-yellow-600"
                      : "border-2 border-slate-200 hover:border-yellow-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 성공사례 리스트 */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="bg-white rounded-3xl shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* 왼쪽: 기본 정보 */}
                    <div className="lg:w-1/3 p-8 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-black">
                      <div className="mb-6">
                        <Badge className="bg-black/20 text-black mb-4">
                          사례 #{case_.id}
                        </Badge>
                        <h3 className="text-xl font-bold mb-3">{case_.title}</h3>
                        <p className="text-black/80 font-medium">{case_.client}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5" />
                          <div>
                            <p className="text-sm font-medium">회수 금액</p>
                            <p className="text-lg font-bold">{case_.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5" />
                          <div>
                            <p className="text-sm font-medium">처리 기간</p>
                            <p className="text-lg font-bold">{case_.period}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5" />
                          <div>
                            <p className="text-sm font-medium">회수율</p>
                            <p className="text-lg font-bold">{case_.successRate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽: 상세 내용 */}
                    <div className="lg:w-2/3 p-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-yellow-600" />
                            사건 개요
                          </h4>
                          <p className="text-slate-700 leading-relaxed">{case_.summary}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-600" />
                            주요 어려움
                          </h4>
                          <p className="text-slate-700 leading-relaxed">{case_.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Gavel className="w-4 h-4 text-blue-600" />
                            해결 방안
                          </h4>
                          <p className="text-slate-700 leading-relaxed">{case_.solution}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            최종 결과
                          </h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{case_.result}</p>
                        </div>
                      </div>
                      
                      {/* 상세 보기 버튼 */}
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedCase(selectedCase === case_.id ? null : case_.id)}
                          className="w-full md:w-auto border-2 border-slate-200 hover:border-yellow-400 rounded-xl"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {selectedCase === case_.id ? '상세 일정 숨기기' : '상세 일정 보기'}
                          <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                            selectedCase === case_.id ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      </div>
                      
                      {/* 타임라인 (확장 시) */}
                      {selectedCase === case_.id && (
                        <div className="mt-6 p-6 bg-slate-50 rounded-xl">
                          <h4 className="font-bold text-slate-900 mb-4">진행 일정</h4>
                          <div className="space-y-4">
                            {case_.timeline.map((step, index) => (
                              <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                                    <span className="text-xs font-bold text-black">{index + 1}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-semibold text-slate-900">{step.step}</h5>
                                    <Badge variant="outline" className="text-xs">
                                      {step.date}
                                    </Badge>
                                  </div>
                                  <p className="text-slate-600 text-sm">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/20 mb-6">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                당신의 사건도 성공 사례가 될 수 있습니다
              </h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                지금까지의 성공 경험을 바탕으로 최적의 채권 회수 전략을 제안드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-xl"
                >
                  <Link href="/process#quote">
                    <Target className="w-5 h-5 mr-2" />
                    상담 신청
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white/20 text-black hover:text-white hover:bg-white/10 px-8 py-3 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  성공 가능성 진단
                </Button>


              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}