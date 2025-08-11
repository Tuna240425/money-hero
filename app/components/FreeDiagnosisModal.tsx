'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'

export default function FreeDiagnosisModal({ open, setOpen }: { open: boolean, setOpen: (v:boolean)=>void }) {
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('채권자')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>5분 무료 진단 신청</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            const form = e.currentTarget as HTMLFormElement
            const fd = new FormData(form)
            const payload = {
              name: String(fd.get('name') || ''),
              email: String(fd.get('email') || ''),
              phone: String(fd.get('phone') || ''),
              role: (String(fd.get('role') || '채권자')) as '채권자' | '채무자',
              counterparty: (String(fd.get('counterparty') || '개인')) as '개인' | '법인/사업자',
              amount: (String(fd.get('amount') || '1천만~3천만')) as any,
              summary: String(fd.get('summary') || ''),
              company: String(fd.get('company') || ''), // 허니팟
            }

            // 채무자 선택 시 확인 대화상자
            if (payload.role === '채무자') {
              const confirmed = window.confirm(
                '채무자를 위한 서비스는 현재 준비 중입니다.\n' +
                '문의사항을 접수하시면 담당자가 개별적으로 연락드리겠습니다.\n' +
                '계속 진행하시겠습니까?'
              );
              if (!confirmed) {
                setLoading(false);
                return;
              }
            }

            try {
              const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })
              const json = await res.json()
              
              if (json?.debtorService) {
                alert('채무자 서비스는 현재 준비 중입니다.\n담당자가 빠른 시일 내 연락드리겠습니다.');
                form.reset()
                setOpen(false)
              } else if (json?.ok) {
                alert('접수되었습니다! 맞춤 견적서를 이메일로 발송했습니다.')
                form.reset()
                setOpen(false)
              } else {
                alert(`전송 실패: ${json?.error ?? '다시 시도해주세요.'}`)
              }
            } catch (err) {
              console.error(err)
              alert('네트워크 오류가 발생했습니다.')
            } finally {
              setLoading(false)
            }
          }}
        >
          {/* 허니팟(숨김) */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" name="name" placeholder="홍길동" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">연락처</Label>
              <Input id="phone" name="phone" type="tel" placeholder="010-1234-5678" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>의뢰자 유형</Label>
                <Select name="role" defaultValue="채권자" onValueChange={setSelectedRole}>
                  <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="채권자">채권자</SelectItem>
                    <SelectItem value="채무자">
                      <div className="flex items-center justify-between w-full">
                        <span>채무자</span>
                        <Badge variant="outline" className="ml-2 text-xs text-orange-600 border-orange-200">
                          준비중
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>상대방 유형</Label>
                <Select name="counterparty" defaultValue="개인">
                  <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="개인">개인</SelectItem>
                    <SelectItem value="법인/사업자">법인/사업자</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 채무자 선택 시 안내 메시지 */}
            {selectedRole === '채무자' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 mb-1">
                      채무자 서비스 준비중
                    </h4>
                    <p className="text-sm text-yellow-700">
                      현재 채무자를 위한 전문 서비스를 준비하고 있습니다. 
                      문의사항을 남겨주시면 담당자가 개별적으로 연락드리겠습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-2">
            <Label>채권 금액</Label>
            <Select name="amount" defaultValue="1천만~3천만">
                <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
                <SelectContent>
                <SelectItem value="~500만원">~500만원</SelectItem>
                <SelectItem value="500만~1천만">500만원~1천만원</SelectItem>
                <SelectItem value="1천만~3천만">1천만원~3천만원</SelectItem>
                <SelectItem value="3천만~5천만">3천만원~5천만원</SelectItem>
                <SelectItem value="5천만~1억">5천만원~1억원</SelectItem>
                <SelectItem value="1억원 이상">1억원 이상</SelectItem>
                </SelectContent>
            </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="summary">사건 개요</Label>
              <Textarea id="summary" name="summary" rows={5} placeholder="상담 받고 싶은 내용을 적어주세요." />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold" disabled={loading}>
              {loading ? '전송 중...' : (selectedRole === '채무자' ? '문의 접수하기' : '접수하기')}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              닫기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}