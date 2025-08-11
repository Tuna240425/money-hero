"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Calculator, Shield, AlertTriangle, CreditCard, RefreshCw, FileText, Award } from 'lucide-react'
import Footer from "@/app/components/Footer"

type Difficulty = 'A' | 'B' | 'C'

type Band = {
  id: string
  label: string
  min: number
  max: number | null
  retainerText: string
  success: Record<Difficulty, [number, number]>
}

// 금액대 기준표 (내부 로직용)
const BANDS: Band[] = [
  { id: 'b1', label: '~500만원',      min: 0,         max: 5_000_000,   retainerText: '220,000원~ (VAT 별도)',           success: { A:[10,12],   B:[12,14],   C:[14,16]   } },
  { id: 'b2', label: '500만~1천만',    min: 5_000_001, max: 10_000_000,  retainerText: '275,000원~ (VAT 별도)',           success: { A:[9.5,11.5],B:[11,13],    C:[12,14]   } },
  { id: 'b3', label: '1천만~3천만',    min: 10_000_001,max: 30_000_000,  retainerText: '330,000원~ (VAT 별도)',           success: { A:[8.5,10.5],B:[10,12],    C:[11,13]   } },
  { id: 'b4', label: '3천만~5천만',    min: 30_000_001,max: 50_000_000,  retainerText: '440,000원~ (VAT 별도)',           success: { A:[7.5,9.5], B:[9,11],     C:[10,12]   } },
  { id: 'b5', label: '5천만 이상',      min: 50_000_001,max: null,        retainerText: '채권금액의 0.3~0.5% (VAT 별도)',  success: { A:[6.5,8.5], B:[8,10],     C:[9,11.5]  } },
]

const features = [
  { icon: Shield,       title: "성공 기반 수수료", description: "회수하지 못하면 성공보수가 발생하지 않습니다" },
  { icon: CheckCircle2, title: "투명한 비용 구조", description: "금액대·난이도 기준으로 사전 안내합니다" },
  { icon: RefreshCw,    title: "유연한 해지 정책", description: "진행 단계별로 합리적인 환불 규정을 적용합니다" },
]

// 숫자 → 콤마 문자열
const fmt = (n: number) => n.toLocaleString()
// 입력값에서 숫자만 추출
const onlyDigits = (s: string) => s.replace(/[^\d]/g, '')

export default function PricingPage() {
  // 계산기 상태 (문자열로 관리해 콤마 표시)
  const [amountStr, setAmountStr] = useState<string>('3,000,000')
  const amount = useMemo(() => Number(onlyDigits(amountStr) || '0'), [amountStr])

  const [difficulty, setDifficulty] = useState<Difficulty>('B')
  const [optGarnish, setOptGarnish] = useState(false)
  const [optAsset, setOptAsset]     = useState(false)
  const [optSuit, setOptSuit]       = useState(false)

  // 증감 단위 (10만 원)
  const STEP = 100_000

  // 금액 직접 입력
  const onAmountChange = (v: string) => {
    const digits = onlyDigits(v)
    if (!digits) { setAmountStr(''); return }
    setAmountStr(fmt(Number(digits)))
  }

  // 금액 증감 (± 버튼)
  const adjustAmount = (delta: number) => {
    const cur = Number(onlyDigits(amountStr || '0')) || 0
    const next = Math.max(0, cur + delta)
    setAmountStr(fmt(next))
  }

  const currentBand = useMemo(() => {
    return BANDS.find(b => (amount >= b.min) && (b.max === null || amount <= b.max)) ?? BANDS[BANDS.length - 1]
  }, [amount])

  const successRange = currentBand.success[difficulty]
  const successMid = (successRange[0] + successRange[1]) / 2

  const retainerDisplay = useMemo(() => {
    if (currentBand.id !== 'b5') return currentBand.retainerText
    const low = Math.round(amount * 0.003)
    const high = Math.round(amount * 0.005)
    return `${currentBand.retainerText} (예상: ${fmt(low)}~${fmt(high)}원)`
  }, [currentBand, amount])

  const successFeeDisplay = useMemo(() => {
    const low = Math.round(amount * (successRange[0] / 100))
    const high = Math.round(amount * (successRange[1] / 100))
    const mid = Math.round(amount * (successMid / 100))
    return {
      text: `${successRange[0]}% ~ ${successRange[1]}%`,
      calc: `약 ${fmt(low)} ~ ${fmt(high)}원 (중간값 기준 약 ${fmt(mid)}원)`,
    }
  }, [amount, successRange, successMid])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero */}
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
              합리적인 요금 안내
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              금액대별·난이도 기준으로<br />
              <span className="text-yellow-400">투명하게 안내</span>드립니다
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              채권 금액과 사건 난이도(증거·자력)에 따라 착수금·성공보수를 명확히 안내합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 특징 */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-6">
                  <f.icon className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 간이 계산기 */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 계산기 */}
          <Card className="lg:col-span-1 border-2 border-yellow-400">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-yellow-600" />
                <CardTitle>간이 계산기</CardTitle>
              </div>
              <p className="text-slate-600 mt-1 text-sm">예상 비용을 빠르게 확인하세요</p>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {/* 채권 금액 입력 (± 버튼 포함) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">채권 금액 (원)</label>
                <div className="flex items-stretch rounded-xl border-2 border-slate-200 focus-within:border-yellow-400 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => adjustAmount(-STEP)}
                    aria-label="금액 10만원 감소"
                    className="px-4 text-lg font-bold bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                  >
                    –
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={amountStr}
                    onChange={(e) => onAmountChange(e.target.value)}
                    className="flex-1 h-12 px-4 text-center outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustAmount(+STEP)}
                    aria-label="금액 10만원 증가"
                    className="px-4 text-lg font-bold bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  금액을 직접 입력하거나 양옆의 ± 버튼으로 조절하세요 (단위: {STEP.toLocaleString()}원)
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  현재 구간: <span className="font-semibold text-slate-700">{currentBand.label}</span>
                </p>
              </div>

              {/* 난이도 선택 */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">난이도 (증거·자력)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['A','B','C'] as Difficulty[]).map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`h-10 rounded-lg border text-sm font-semibold ${
                        difficulty === d ? 'border-yellow-500 bg-yellow-50 text-slate-900' : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">A: 유리 / B: 보통 / C: 불리</p>
              </div>

              {/* 옵션 선택 (금액 안내는 별도) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">옵션</label>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={optGarnish} onChange={e=>setOptGarnish(e.target.checked)} /> 가압류 신청 대행
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={optAsset} onChange={e=>setOptAsset(e.target.checked)} /> 재산조회 대행
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={optSuit} onChange={e=>setOptSuit(e.target.checked)} /> 본안소송 대행
                  </label>
                </div>
                <p className="text-xs text-slate-500 mt-2">* 옵션 수임료 및 실비는 별도 안내 후 진행됩니다.</p>
              </div>
            </CardContent>
          </Card>

          {/* 오른쪽: 결과/CTA */}
          <Card className="lg:col-span-2 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
              <CardTitle className="text-2xl">예상 비용 결과</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* 착수금 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">가. 착수금 (VAT 별도)</h3>
                  <p className="text-slate-700">{retainerDisplay}</p>
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
                  <h3 className="text-lg font-bold text-slate-900 mb-1">나. 성공보수 (회수 시 지급)</h3>
                  <p className="text-slate-700">
                    {successFeeDisplay.text} — <span className="font-semibold">{successFeeDisplay.calc}</span>
                  </p>
                </div>
              </div>

              {/* 옵션 선택 요약(금액 없이) */}
              {(optGarnish || optAsset || optSuit) && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">다. 옵션(대행비) 및 실비</h3>
                    <ul className="text-slate-700 space-y-1">
                      {optGarnish && <li>• 가압류 신청 대행 — 비용 및 실비: 별도 안내</li>}
                      {optAsset && <li>• 재산조회 대행 — 비용 및 실비: 별도 안내</li>}
                      {optSuit &&   <li>• 본안소송 대행 — 비용 및 실비: 별도 안내</li>}
                    </ul>
                    <p className="text-sm text-slate-500 mt-2">* 모든 비용은 사전 안내·확정 후 진행됩니다.</p>
                  </div>
                </div>
              )}

              {/* CTA: 단일 버튼 */}
              <div className="pt-4 border-t border-slate-200">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold h-12 rounded-xl"
                >
                  <Link href="/process#quote">
                    맞춤 견적 받고 무료 상담 신청하기
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 하단 주의사항 */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">주요 안내사항</h4>
                  <div className="text-amber-700 text-sm space-y-1">
                    <p>• 모든 금액은 부가가치세(VAT) 별도입니다.</p>
                    <p>• 구체적인 비용은 상담 후 사건 특성(증거 수준·자력·연체기간 등)에 따라 변동될 수 있습니다.</p>
                    <p>• 성공보수는 실제 회수된 금액을 기준으로 산정됩니다.</p>
                    <p>• 옵션(가압류·재산조회·본안소송) 수임료와 실비는 사전 안내 후 동의 하에 진행됩니다.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
