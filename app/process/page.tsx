'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Zap, Shield, Gavel, Handshake, Mail, Clock, CheckCircle2, ArrowDown, Users, FileText, Scale } from 'lucide-react'
import Footer from '../components/Footer'

type FormData = {
  role: '채권자' | '채무자' | ''
  name: string
  email: string
  phone: string
  amount: string
  counterparty: '개인' | '법인/사업자' | ''
  summary: string
  agree: boolean
}

export default function ProcessPage() {
  const [submitting, setSubmitting] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    role: '', name: '', email: '', phone: '', amount: '',
    counterparty: '', summary: '', agree: false,
  })
  const onChange = (k: keyof FormData) => (v: string | boolean) => setForm(s => ({ ...s, [k]: v }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); setOk(null); setErr(null)
    if (!form.agree) { setErr('개인정보 수집·이용에 동의해 주세요.'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error(await res.text())
      setOk('접수되었습니다. 담당자가 확인 후 연락드리고, 이메일로 견적서를 발송합니다.')
      setForm({ role:'', name:'', email:'', phone:'', amount:'', counterparty:'', summary:'', agree:false })
    } catch (e:any) { setErr(e?.message || '제출 중 오류가 발생했습니다.') } finally { setSubmitting(false) }
  }

  const processSteps = [
    {
      step: "1",
      title: "사전 상담 및 진단",
      subtitle: "당일 완료",
      icon: Zap,
      color: "from-yellow-600 via-yellow-700 to-yellow-800",
      bgColor: "bg-yellow-500/10", 
      items: [
        "전화·카톡·온라인 폼으로 사건 접수",
        "채권금액, 상대방 정보, 증거자료 간단 확인", 
        "보전조치(가압류) 필요성·가능 여부 안내",
        "추심 가능성 및 예상 소요기간 무료 진단"
      ]
    },
    {
      step: "2", 
      title: "계약 및 착수",
      subtitle: "1~3일 소요",
      icon: Shield,
      color: "from-yellow-400 via-yellow-500 to-yellow-600", 
      bgColor: "bg-yellow-500/10",
      items: [
        "변호사 위임계약 체결 (비대면 전자서명 가능)",
        "사건 유형·난이도별 착수금 확정 및 견적서 발송",
        "자료 정리 및 법적 절차 준비",
        "공정한 채권추심법 준수한 추심 계획 수립"
      ]
    },
    {
      step: "3",
      title: "법적 조치 진행", 
      subtitle: "1~6주 소요",
      icon: Gavel,
      color: "from-yellow-600 via-yellow-700 to-yellow-800",
      bgColor: "bg-yellow-500/10", 
      items: [
        "내용증명 발송 → 지급명령 신청",
        "필요 시 가압류/가처분 등 보전처분 신청",
        "본안소송(필요 시) 진행",
        "진행 상황 카톡/문자로 실시간 안내"
      ]
    },
    {
      step: "4",
      title: "집행 및 회수",
      subtitle: "완료 시까지", 
      icon: Handshake,
      color: "from-yellow-400 via-yellow-500 to-yellow-600", 
      bgColor: "bg-yellow-500/10",
      items: [
        "재산조회, 강제집행, 압류 절차 진행", 
        "합의금 수령 및 정산, 종결 보고서 발송",
        "미회수 시 채무자 재산상황 정기 모니터링 제공"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-foreground">
      {/* 헤로 섹션 */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/process-hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 배경 오버레이 패턴 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold mb-6 px-4 py-2 text-sm shadow-lg">
              <Clock className="w-4 h-4 mr-2" />
              비대면 채권추심 진행 과정
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              서류 준비부터 회수까지,<br />
              <span className="text-yellow-400">한 번의 의뢰로 끝</span>냅니다
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              사건 접수부터 집행/회수까지 단계별로 투명하게 안내하는 
              <span className="font-semibold text-white"> 체계적인 채권 회수 시스템</span>입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 통계 섹션 
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-6">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">1,500+</h3>
              <p className="text-slate-600 font-medium">성공 사례</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">85%</h3>
              <p className="text-slate-600 font-medium">회수 성공률</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6">
                <Clock className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">평균 6주</h3>
              <p className="text-slate-600 font-medium">처리 기간</p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* 프로세스 단계 */}
      <section className="container mx-auto px-4 pt-16 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              투명한 <span className="text-yellow-500">4단계 프로세스</span>
            </h2>
            <p className="text-lg text-slate-600">각 단계별 세부 절차를 명확히 안내합니다</p>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* 왼쪽 - 단계 정보 */}
                      <div className={`lg:w-1/3 p-10 bg-gradient-to-br ${step.color} text-white relative`}>
                        <div className="absolute top-6 right-6 opacity-20">
                          <step.icon size={80} />
                        </div>
                        <div className="relative z-10">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-6">
                            <span className="text-xl font-bold">{step.step}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-white/90 font-medium text-lg">{step.subtitle}</p>
                        </div>
                      </div>
                      
                      {/* 오른쪽 - 세부 내용 */}
                      <div className="lg:w-2/3 p-10">
                        <ul className="space-y-6">
                          {step.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-4">
                              <div className={`w-2 h-2 rounded-full ${step.bgColor} mt-3 flex-shrink-0`}></div>
                              <span className="text-slate-700 leading-relaxed text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 화살표 (마지막 단계 제외) */}
                {index < processSteps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-md">
                      <ArrowDown className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이미지 섹션 */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/20 mb-6">
                <Scale className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                전문 변호사와 함께하는 체계적인 채권 회수
              </h3>
              <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
                법적 근거를 바탕으로 한 정확한 절차와 투명한 진행 과정으로 
                최적의 결과를 보장합니다.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  <FileText className="w-4 h-4 mr-1" />
                  실시간 진행상황 안내
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  <Shield className="w-4 h-4 mr-1" />
                  법률 전문가 직접 처리
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  성공 기반 수수료 체계
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 견적/문의 폼 */}
      <section id="quote" className="container mx-auto px-4 pb-24">
        <Card className="max-w-4xl mx-auto border-2 border-yellow-400 rounded-3xl shadow-xl bg-white">
          <CardHeader className="pb-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-t-3xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900">
                비대면 견적 요청
              </CardTitle>
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-2 w-fit">
                <Mail className="w-4 h-4 mr-2" /> 
                자동 견적서 발송
              </Badge>
            </div>
            <p className="text-slate-600 mt-2">
              간단한 정보 입력으로 맞춤형 견적서를 받아보세요
            </p>
          </CardHeader>
          <CardContent className="pt-8">
            {ok && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800">{ok}</p>
                </div>
              </div>
            )}
            {err && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-red-800">{err}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">의뢰자 유형</Label>
                  <Select value={form.role} onValueChange={(v) => onChange('role')(v)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-400">
                      <SelectValue placeholder="채권자 / 채무자" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="채권자">채권자</SelectItem>
                      <SelectItem value="채무자">채무자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">상대방 유형</Label>
                  <Select value={form.counterparty} onValueChange={(v) => onChange('counterparty')(v)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-400">
                      <SelectValue placeholder="개인 / 법인·사업자" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="개인">개인</SelectItem>
                      <SelectItem value="법인/사업자">법인/사업자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">이름</Label>
                  <Input 
                    value={form.name} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('name')(e.target.value)} 
                    required 
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">연락처</Label>
                  <Input 
                    type="tel" 
                    value={form.phone} 
                    onChange={(e) => onChange('phone')(e.target.value)} 
                    required 
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">이메일 (견적서 수신)</Label>
                  <Input 
                    type="email" 
                    value={form.email} 
                    onChange={(e) => onChange('email')(e.target.value)} 
                    required 
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">채권 금액 구간</Label>
                  <Select value={form.amount} onValueChange={(v) => onChange('amount')(v)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-400">
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="~500만원">~500만원</SelectItem>
                      <SelectItem value="500만~1천만">500만원~1천만원</SelectItem>
                      <SelectItem value="1천만~3천만">1천만원~3천만원</SelectItem>
                      <SelectItem value="3천만~5천만">3천만원~5천만원</SelectItem>
                      <SelectItem value="5천만 이상">5천만원 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">사건 개요 (핵심만 간단히)</Label>
                <Textarea 
                  rows={5} 
                  placeholder="예) 거래대금 미지급, 약정일 2024-03-10, 일부 입금 후 잔액 미지급…" 
                  value={form.summary} 
                  onChange={(e) => onChange('summary')(e.target.value)} 
                  className="rounded-xl border-2 border-slate-200 focus:border-yellow-400"
                />
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50">
                <Checkbox 
                  checked={form.agree} 
                  onCheckedChange={(v: boolean) => onChange('agree')(v)} 
                  required 
                  className="border-2 border-slate-300"
                />
                <Label className="text-sm text-slate-700">개인정보 수집·이용에 동의합니다.</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {submitting ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      전송 중…
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      견적서 요청하기
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="h-14 px-8 rounded-xl border-2 border-slate-200 hover:border-yellow-400 font-semibold"
                >
                  상단으로
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  )
}