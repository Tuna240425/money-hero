'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
<<<<<<< HEAD
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'
=======
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
>>>>>>> 847db43c76723a5ffe81c6a66d3b712d4060a6bb

export default function FreeDiagnosisModal({ 
  open, 
  setOpen, 
  selectedService = null,
  onServiceReset 
}: { 
  open: boolean; 
  setOpen: (v: boolean) => void; 
  selectedService?: 'start' | 'standard' | 'package' | null;
  onServiceReset?: () => void;
}) {
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
  const [selectedRole, setSelectedRole] = useState('채권자')
  const [amountText, setAmountText] = useState('')

  // 모달이 닫힐 때 선택된 서비스 리셋
  useEffect(() => {
    if (!open && onServiceReset) {
      onServiceReset()
    }
  }, [open, onServiceReset])

  // 숫자를 간결한 한글로 변환하는 함수
  const numberToKorean = (num: number): string => {
    if (num === 0) return '0원'
    
    const eok = Math.floor(num / 100000000) // 억
    const man = Math.floor((num % 100000000) / 10000) // 만
    const won = num % 10000 // 원
    
    let result = ''
    
    if (eok > 0) {
      result += eok.toLocaleString() + '억'
      if (man > 0) result += ' '
    }
    
    if (man > 0) {
      result += man.toLocaleString() + '만'
      if (won > 0) result += ' '
    }
    
    if (won > 0 || result === '') {
      result += won.toLocaleString()
    }
    
    return result + '원'
  }

  // 서비스별 제목과 설명
  const getServiceInfo = () => {
    switch (selectedService) {
      case 'start':
        return {
          title: '스타트 서비스 상담 신청',
          description: '22만원부터 시작하는 기본 채권추심 서비스'
        }
      case 'standard':
        return {
          title: '스탠다드 서비스 상담 신청',
          description: '55만원부터 시작하는 지급명령 포함 서비스'
        }
      case 'package':
        return {
          title: '집행패키지 서비스 상담 신청',
          description: '고액 채권을 위한 맞춤형 프리미엄 서비스'
        }
      default:
        return {
          title: '상담 신청',
          description: '전문 변호사와 함께하는 체계적인 채권 회수'
        }
    }
  }

  const serviceInfo = getServiceInfo()
=======
>>>>>>> 847db43c76723a5ffe81c6a66d3b712d4060a6bb

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{serviceInfo.title}</DialogTitle>
          {selectedService && (
            <p className="text-sm text-muted-foreground">{serviceInfo.description}</p>
          )}
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
              amount: String(fd.get('amount') || ''),
              summary: String(fd.get('summary') || ''),
              company: String(fd.get('company') || ''), // 허니팟
              requestedService: selectedService, // 선택된 서비스 타입 전송
            }

            try {
              const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })
              const json = await res.json()
<<<<<<< HEAD
              
              if (json?.debtorService) {
                alert('채무자 서비스는 현재 준비 중입니다.\n담당자가 빠른 시일 내 연락드리겠습니다.');
                form.reset()
                setOpen(false)
              } else if (json?.ok) {
                // 서비스별 맞춤 메시지
                let message = '접수되었습니다! 맞춤 견적서를 이메일로 발송했습니다.'
                if (selectedService === 'package') {
                  message = '집행패키지 상담이 접수되었습니다! 전문 변호사가 24시간 내 연락드리겠습니다.'
                } else if (selectedService) {
                  message = `${selectedService === 'start' ? '스타트' : '스탠다드'} 서비스 견적서를 이메일로 발송했습니다!`
                }
                
                alert(message)
=======
              if (json?.ok) {
                alert('접수되었습니다! 맞춤 견적서를 이메일로 발송했습니다.')
>>>>>>> 847db43c76723a5ffe81c6a66d3b712d4060a6bb
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

          {/* 선택된 서비스 표시 */}
          {selectedService && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    선택하신 서비스: {selectedService === 'start' ? '스타트' : selectedService === 'standard' ? '스탠다드' : '집행패키지'}
                  </h4>
                  <p className="text-xs text-yellow-700 mt-1">
                    {selectedService === 'start' && '22만원부터 - 내용증명 중심'}
                    {selectedService === 'standard' && '55만원부터 - 지급명령 포함'}
                    {selectedService === 'package' && '개별 견적 - 가압류·강제집행 중심'}
                  </p>
                </div>
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  {selectedService === 'start' ? '🌟 간편' : selectedService === 'standard' ? '💯 추천' : '🚀 프리미엄'}
                </Badge>
              </div>
            </div>
          )}

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
<<<<<<< HEAD
                <select 
                  name="role" 
                  defaultValue="채권자" 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="채권자">채권자</option>
                  <option value="채무자">채무자 (준비중)</option>
                </select>
=======
                <Select name="role" defaultValue="채권자">
                  <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="채권자">채권자</SelectItem>
                    <SelectItem value="채무자">채무자</SelectItem>
                  </SelectContent>
                </Select>
>>>>>>> 847db43c76723a5ffe81c6a66d3b712d4060a6bb
              </div>
              <div className="grid gap-2">
                <Label>상대방 유형</Label>
                <select 
                  name="counterparty" 
                  defaultValue="개인"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="개인">개인</option>
                  <option value="법인/사업자">법인/사업자</option>
                </select>
              </div>
            </div>



            <div className="grid gap-2">
              <Label htmlFor="amount">채권 금액</Label>
              <div className="relative">
                <Input 
                  id="amount" 
                  name="amount" 
                  type="text" 
                  placeholder="1,000,000" 
                  required 
                  className="pr-10"
                  onChange={(e) => {
                    // 숫자가 아닌 문자 제거 (콤마 제외)
                    let value = e.target.value.replace(/[^\d]/g, '')
                    // 숫자에 콤마 추가
                    if (value) {
                      const numValue = parseInt(value)
                      value = numValue.toLocaleString('ko-KR')
                      setAmountText(numberToKorean(numValue))
                    } else {
                      setAmountText('')
                    }
                    e.target.value = value
                  }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                  원
                </div>
              </div>
              {amountText && (
                <p className="text-sm text-gray-600 mt-1 px-1">
                  {amountText}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="summary">사건 개요</Label>
              <Textarea id="summary" name="summary" rows={5} placeholder="상담 받고 싶은 내용을 적어주세요." />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold" disabled={loading}>
<<<<<<< HEAD
              {loading ? '전송 중...' : (selectedRole === '채무자' ? '문의 접수하기' : 
                selectedService === 'package' ? '전문 상담 신청하기' : '접수하기')}
=======
              {loading ? '전송 중...' : '접수하기'}
>>>>>>> 847db43c76723a5ffe81c6a66d3b712d4060a6bb
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