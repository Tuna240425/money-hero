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
import { Zap, Shield, Gavel, Handshake, Mail } from 'lucide-react'

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

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 인트로 */}
      <section className="container mx-auto px-4 pt-10 md:pt-14 pb-6">
        <div className="max-w-3xl">
          <Badge className="bg-yellow-400 text-black font-bold mb-3">비대면 채권추심 진행 과정</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            서류 준비부터 회수까지,<br className="hidden sm:block" /> 한 번의 의뢰로 끝냅니다.
          </h1>
          <p className="mt-3 text-muted-foreground">
            사건 접수 → 진단 → 법적 조치 → 집행/회수까지 단계별로 투명하게 안내드립니다.
          </p>
        </div>
      </section>

      {/* 카드형 절차 요약 */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* A */}
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/20">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg">가. 사전 상담 및 진단 (당일)</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>전화·카톡·온라인 폼으로 사건 접수</li>
                <li>채권금액, 상대방 정보, 증거자료 간단 확인</li>
                <li>보전조치(가압류) 필요성·가능 여부 안내</li>
                <li>추심 가능성 및 예상 소요기간 무료 진단</li>
              </ul>
            </CardContent>
          </Card>

          {/* B */}
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/20">
                  <Shield className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg">나. 계약 및 착수 (1~3일)</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>변호사 위임계약 체결 (비대면 전자서명 가능)</li>
                <li>사건 유형·난이도별 착수금 확정 및 견적서 발송</li>
                <li>자료 정리 및 법적 절차 준비</li>
                <li>공정한 채권추심법 준수한 추심 계획 수립</li>
              </ul>
            </CardContent>
          </Card>

          {/* C */}
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/20">
                  <Gavel className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg">다. 법적 조치 진행 (1~6주)</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>내용증명 발송 → 지급명령 신청</li>
                <li>필요 시 가압류/가처분 등 보전처분 신청</li>
                <li>본안소송(필요 시) 진행</li>
                <li>진행 상황 카톡/문자로 실시간 안내</li>
              </ul>
            </CardContent>
          </Card>

          {/* D */}
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/20">
                  <Handshake className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg">라. 집행 및 회수 (완료 시)</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>재산조회, 강제집행, 압류 절차 진행</li>
                <li>합의금 수령 및 정산, 종결 보고서 발송</li>
                <li>미회수 시 채무자 재산상황 정기 모니터링 제공</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 견적/문의 폼 (그대로) */}
      <section id="quote" className="container mx-auto px-4 pb-24">
        <Card className="max-w-3xl mx-auto border-yellow-400 rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl md:text-2xl">비대면 견적 요청</CardTitle>
              <Badge className="bg-yellow-400 text-black font-bold">
                <Mail className="w-4 h-4 mr-1" /> 자동 견적서 발송
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {ok && <p className="mb-4 text-sm rounded-md bg-green-500/10 border border-green-500/40 p-3 text-green-600">{ok}</p>}
            {err && <p className="mb-4 text-sm rounded-md bg-red-500/10 border border-red-500/40 p-3 text-red-600">{err}</p>}

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>의뢰자 유형</Label>
                  <Select value={form.role} onValueChange={(v) => onChange('role')(v)}>
                    <SelectTrigger><SelectValue placeholder="채권자 / 채무자" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="채권자">채권자</SelectItem>
                      <SelectItem value="채무자">채무자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>상대방 유형</Label>
                  <Select value={form.counterparty} onValueChange={(v) => onChange('counterparty')(v)}>
                    <SelectTrigger><SelectValue placeholder="개인 / 법인·사업자" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="개인">개인</SelectItem>
                      <SelectItem value="법인/사업자">법인/사업자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>이름</Label>
                  <Input value={form.name} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('name')(e.target.value)} required />
                </div>
                <div>
                  <Label>연락처</Label>
                  <Input type="tel" value={form.phone} onChange={(e) => onChange('phone')(e.target.value)} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>이메일 (견적서 수신)</Label>
                  <Input type="email" value={form.email} onChange={(e) => onChange('email')(e.target.value)} required />
                </div>
                <div>
                  <Label>채권 금액 구간</Label>
                  <Select value={form.amount} onValueChange={(v) => onChange('amount')(v)}>
                    <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
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

              <div>
                <Label>사건 개요 (핵심만 간단히)</Label>
                <Textarea rows={5} placeholder="예) 거래대금 미지급, 약정일 2024-03-10, 일부 입금 후 잔액 미지급…" value={form.summary} onChange={(e) => onChange('summary')(e.target.value)} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox checked={form.agree} onCheckedChange={(v: boolean) => onChange('agree')(v)} required />
                <Label className="text-sm">개인정보 수집·이용에 동의합니다.</Label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={submitting} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                  {submitting ? '전송 중…' : '견적서 요청하기'}
                </Button>
                <Button type="button" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  상단으로
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
