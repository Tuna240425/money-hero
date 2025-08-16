"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Calculator, Shield, AlertTriangle, CreditCard, RefreshCw, DollarSign, FileText, Award, Clock } from 'lucide-react'
import Footer from "@/app/components/Footer"

const pricingData = [
  {
    id: "under500",
    category: "500만원 이하",
    icon: Calculator,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    details: {
      착수금: "220,000원~ (VAT 별도)",
      성공보수:
        "채권금액의 6~15% (회수금액 기준)\n사건 난이도·증거 확보 수준에 따라 차등 적용\n무자력 등 회수 불가 시 발생하지 않음",
      추가비용:
        "집행비용(법원 인지·송달료, 집행관 수수료): 실비 정산\n담보제공 필요 시 공탁비: 회수 후 환급\n모든 추가 비용은 사전 안내 후 동의 하에 진행",
      중도해지:
        "내용증명 발송 전: 착수금의 50% 환불\n지급명령 신청 전: 착수금의 30% 환불\n소송 진행 중: 진행 단계에 따라 차등 환불\n해지 사유가 변호사 측에 있는 경우: 잔여 업무 비율에 따라 환불",
    },
  },
  {
    id: "under5000",
    category: "5천만원 이하",
    icon: Award,
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    details: {
      착수금: "330,000원~ (VAT 별도)",
      성공보수:
        "채권금액의 6~15% (회수금액 기준)\n사건 난이도·증거 확보 수준에 따라 차등 적용\n무자력 등 회수 불가 시 발생하지 않음",
      추가비용:
        "집행비용(법원 인지·송달료, 집행관 수수료): 실비 정산\n담보제공 필요 시 공탁비: 회수 후 환급\n모든 추가 비용은 사전 안내 후 동의 하에 진행",
      중도해지:
        "내용증명 발송 전: 착수금의 50% 환불\n지급명령 신청 전: 착수금의 30% 환불\n소송 진행 중: 진행 단계에 따라 차등 환불\n해지 사유가 변호사 측에 있는 경우: 잔여 업무 비율에 따라 환불",
    },
  },
  {
    id: "over1b",
    category: "1억 이상",
    icon: DollarSign,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    details: {
      착수금: "개별 견적 (채권금액의 0.3~0.5% 기준)",
      성공보수:
        "채권금액의 6~15% (회수금액 기준)\n사건 난이도·증거 확보 수준에 따라 차등 적용\n무자력 등 회수 불가 시 발생하지 않음",
      추가비용:
        "집행비용(법원 인지·송달료, 집행관 수수료): 실비 정산\n담보제공 필요 시 공탁비: 회수 후 환급\n모든 추가 비용은 사전 안내 후 동의 하에 진행",
      중도해지:
        "내용증명 발송 전: 착수금의 50% 환불\n지급명령 신청 전: 착수금의 30% 환불\n소송 진행 중: 진행 단계에 따라 차등 환불\n해지 사유가 변호사 측에 있는 경우: 잔여 업무 비율에 따라 환불",
    },
  },
]

const features = [
  {
    icon: Shield,
    title: "성공 기반 수수료",
    description: "회수하지 못하면 성공보수가 발생하지 않습니다"
  },
  {
    icon: CheckCircle2,
    title: "투명한 비용 구조",
    description: "모든 비용을 사전에 투명하게 안내합니다"
  },
  {
    icon: RefreshCw,
    title: "유연한 해지 정책",
    description: "진행 단계별로 합리적인 환불 규정을 적용합니다"
  }
]

export default function PricingPage() {
  const [selected, setSelected] = useState(pricingData[0].id)
  const activeData = pricingData.find((item) => item.id === selected)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 헤로 섹션 */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/pricing-hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold mb-6 px-4 py-2 text-sm shadow-lg">
              <CreditCard className="w-4 h-4 mr-2" />
              투명한 요금 체계
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              합리적이고 <span className="text-yellow-400">투명한 요금</span>으로<br />
              전문 서비스를 제공합니다
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              채권 금액 구간별 명확한 수수료 체계와 
              <span className="font-semibold text-white"> 성공 기반 보수 시스템</span>을 확인해보세요.
            </p>
          </div>
        </div>
      </section>


      {/* 특징 섹션  
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-6">
                  <feature.icon className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* 메인 요금 섹션 */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              채권 금액별 <span className="text-yellow-500">요금 안내</span>
            </h2>
            <p className="text-lg text-slate-600">
              채권 금액 구간을 선택하시면 상세한 요금 정보를 확인하실 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 왼쪽: 카테고리 선택 */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">채권 금액 구간</h3>
              {pricingData.map((item) => {
                const IconComponent = item.icon
                return (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selected === item.id 
                        ? `${item.borderColor} border-2 ${item.bgColor} shadow-lg` 
                        : "border border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    onClick={() => setSelected(item.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                          selected === item.id ? "bg-white" : "bg-slate-100"
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            selected === item.id ? "text-slate-800" : "text-slate-600"
                          }`} />
                        </div>
                        <div>
                          <h4 className={`font-bold ${
                            selected === item.id ? "text-slate-900" : "text-slate-700"
                          }`}>
                            {item.category}
                          </h4>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* 오른쪽: 상세 정보 */}
            <div className="lg:col-span-3">
              {activeData && (
                <Card className="shadow-xl border-0 bg-white overflow-hidden">
                  <CardHeader className={`bg-gradient-to-r ${activeData.color} text-white p-8`}>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
                        <activeData.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">{activeData.category}</CardTitle>
                        <p className="text-white/90 mt-1">상세 요금 안내</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid gap-8">
                      {/* 착수금 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">가. 착수금 (VAT 별도)</h3>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-lg">
                            {activeData.details.착수금}
                          </p>
                        </div>
                      </div>

                      {/* 성공보수 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                            <Award className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">나. 성공보수 (회수 시 지급)</h3>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-lg">
                            {activeData.details.성공보수}
                          </p>
                        </div>
                      </div>

                      {/* 추가비용 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                            <FileText className="w-5 h-5 text-orange-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">다. 추가 비용</h3>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-lg">
                            {activeData.details.추가비용}
                          </p>
                        </div>
                      </div>

                      {/* 중도해지 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                            <RefreshCw className="w-5 h-5 text-purple-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">라. 중도 해지 시 수임료 처리</h3>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-lg">
                            {activeData.details.중도해지}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA 버튼 */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold h-12 rounded-xl">
                          <Calculator className="w-5 h-5 mr-2" />
                          맞춤 견적 받기
                        </Button>
                        <Button variant="outline" className="flex-1 h-12 rounded-xl border-2 border-slate-200 hover:border-yellow-400">
                          <Clock className="w-5 h-5 mr-2" />
                          상담 신청
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* 하단 주의사항  
          <Card className="mt-12 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">주요 안내사항</h4>
                  <div className="text-amber-700 text-sm space-y-1">
                    <p>• 모든 금액은 부가가치세(VAT) 별도입니다.</p>
                    <p>• 구체적인 비용은 상담 후 사건 특성에 따라 변동될 수 있습니다.</p>
                    <p>• 성공보수는 실제 회수된 금액을 기준으로 산정됩니다.</p>
                    <p>• 모든 추가 비용은 사전 안내 후 동의하에 진행됩니다.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>*/}
        </div>
      </section>

      <Footer />
    </main>
  )
}