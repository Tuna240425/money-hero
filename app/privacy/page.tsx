"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, FileText, Mail, Phone, Calendar, AlertTriangle, CheckCircle2, Users, Database, Settings, Download } from 'lucide-react'
import Footer from "@/app/components/Footer"

const privacySections = [
  {
    id: "overview",
    title: "개인정보 처리방침 개요",
    icon: Shield,
    content: `머니히어로 법무법인(이하 "회사")은 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

본 개인정보 처리방침은 회사가 제공하는 채권추심 서비스 및 법률상담 서비스 이용과 관련하여 수집·이용되는 개인정보의 항목, 수집·이용 목적, 보유·이용기간, 제3자 제공 현황 등에 대해 알려드립니다.`
  },
  {
    id: "collection",
    title: "개인정보의 수집·이용",
    icon: Database,
    content: `**가. 수집하는 개인정보 항목**

• 필수정보: 성명, 연락처(휴대폰번호), 이메일주소
• 선택정보: 주소, 직업, 사건 관련 정보
• 자동수집정보: 접속 IP주소, 쿠키, 접속로그, 기기정보

**나. 개인정보 수집·이용 목적**

• 법률상담 및 채권추심 서비스 제공
• 의뢰인 신원확인 및 본인의사 확인
• 서비스 이용에 따른 요금 정산 및 대금 결제
• 법정의무 이행 (변호사법, 개인정보보호법 등)
• 서비스 개선 및 신규 서비스 개발
• 민원처리 및 고객상담

**다. 개인정보 수집 방법**

• 홈페이지 온라인 상담신청 양식
• 전화상담 및 방문상담 시 직접 수집
• 서면 위임계약서 작성 시 수집
• 법정대리인을 통한 수집`
  },
  {
    id: "retention",
    title: "개인정보의 보유·이용기간",
    icon: Calendar,
    content: `**가. 원칙적 보유기간**

• 서비스 제공 완료 후 5년 (변호사법 제27조)
• 단, 다음의 경우 해당 기간까지 보유

**나. 법령에 따른 보유**

• 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)
• 대금결제 및 재화공급에 관한 기록: 5년 (전자상거래법)
• 소비자 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)
• 웹사이트 방문기록: 3개월 (통신비밀보호법)

**다. 보유기간 연장 사유**

• 법정소송 진행 중인 경우: 소송 종료시까지
• 채권추심이 완료되지 않은 경우: 추심 완료시까지
• 정산이 완료되지 않은 경우: 정산 완료시까지
• 기타 법령에서 정한 보존의무가 있는 경우: 해당 기간`
  },
  {
    id: "thirdparty",
    title: "개인정보의 제3자 제공",
    icon: Users,
    content: `**가. 제3자 제공 원칙**

회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.

**나. 제3자 제공이 허용되는 경우**

• 이용자가 사전에 동의한 경우
• 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
• 채권추심 업무 수행을 위해 필요한 최소한의 정보를 협력업체에 제공하는 경우

**다. 업무위탁**

• 위탁업체: IT시스템 운영업체, 문서발송업체 등
• 위탁업무: 시스템 유지보수, 우편물 발송 등
• 관리방안: 위탁계약서에 개인정보 보호 관련 사항 명시 및 관리·감독

**라. 국외 이전**

현재 개인정보의 국외 이전은 하지 않습니다. 향후 국외 이전이 필요한 경우 사전에 고지하고 동의를 받겠습니다.`
  },
  {
    id: "rights",
    title: "정보주체의 권리·의무",
    icon: CheckCircle2,
    content: `**가. 정보주체의 권리**

• 개인정보 처리 현황에 대한 통지 요구
• 개인정보 열람 요구
• 개인정보 정정·삭제 요구
• 개인정보 처리정지 요구
• 손해배상 청구

**나. 권리 행사 방법**

• 행사대상: 정보주체 본인 또는 법정대리인
• 행사방법: 서면, 전화, 이메일, 방문 등
• 처리기간: 요구를 받은 날로부터 10일 이내
• 연락처: privacy@moneyhero.co.kr / 02-XXXX-XXXX

**다. 권리 행사 제한 사유**

• 법령에서 열람을 제한한 경우
• 다른 사람의 생명·신체를 해할 우려가 있는 경우
• 다른 사람의 개인정보 또는 재산상의 이익을 현저히 침해할 우려가 있는 경우

**라. 법정대리인의 권리**

만 14세 미만 아동의 경우, 법정대리인이 그 권리를 행사할 수 있습니다.`
  },
  {
    id: "security",
    title: "개인정보의 안전성 확보조치",
    icon: Lock,
    content: `**가. 기술적 보호조치**

• 개인정보를 암호화하여 저장 및 전송
• 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해 방지
• 침입차단시스템을 이용하여 외부로부터의 무단 접근 통제
• 접속기록의 보관 및 위변조 방지 조치

**나. 관리적 보호조치**

• 개인정보 취급 직원의 최소화 및 담당자 지정
• 정기적인 직원 교육 실시
• 개인정보 처리시스템 접근권한의 관리
• 개인정보 취급자의 책임과 의무 규정

**다. 물리적 보호조치**

• 전산실, 자료보관실 등의 접근통제
• 개인정보가 포함된 서류, 보조저장매체 등의 잠금장치 보관

**라. 개인정보 파기**

• 파기절차: 개인정보 보호책임자의 승인을 얻어 파기
• 파기방법: 전자적 파일은 복구 불가능한 방법으로 삭제, 종이 문서는 분쇄 또는 소각
• 파기시기: 보유기간 만료 즉시 또는 처리목적 달성 후 지체 없이`
  },
  {
    id: "contact",
    title: "개인정보보호 책임자",
    icon: Settings,
    content: `**가. 개인정보보호 책임자**

• 성명: 김철수 변호사
• 직책: 개인정보보호 책임자
• 연락처: 02-XXXX-XXXX
• 이메일: privacy@moneyhero.co.kr

**나. 개인정보보호 담당자**

• 성명: 박영희
• 직책: 개인정보보호 담당자
• 연락처: 02-XXXX-XXXX
• 이메일: privacy@moneyhero.co.kr

**다. 권익침해 구제방법**

개인정보 침해신고센터, 개인정보 분쟁조정위원회, 정보보호 마크 인증위원회, 대검찰청 사이버범죄수사단 등에 신고하거나 상담하실 수 있습니다.

• 개인정보 침해신고센터: privacy.go.kr / 국번없이 182
• 개인정보 분쟁조정위원회: kopico.go.kr / 1833-6972
• 대검찰청 사이버범죄수사단: spo.go.kr / 1301
• 경찰청 사이버안전국: cyberbureau.police.go.kr / 182`
  },
  {
    id: "changes",
    title: "개인정보 처리방침의 변경",
    icon: AlertTriangle,
    content: `**가. 변경 고지**

이 개인정보 처리방침은 시행일자부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

**나. 현재 버전 정보**

• 시행일자: 2024년 1월 1일
• 최종 수정일: 2024년 1월 1일
• 버전: v1.0

**다. 이전 버전 확인**

개정된 개인정보 처리방침의 이전 버전은 회사에 별도 요청하시면 제공해드립니다.

**라. 중요 변경사항**

개인정보의 수집·이용 목적, 제3자 제공 대상 등 중요한 변경이 있을 경우에는 최소 30일 전에 고지하고, 필요시 재동의를 받겠습니다.`
  }
]

{/* const quickInfo = [
  {
    icon: Mail,
    title: "문의 이메일",
    content: "privacy@moneyhero.co.kr",
    description: "개인정보 관련 문의사항"
  },
  {
    icon: Phone,
    title: "문의 전화",
    content: "02-XXXX-XXXX",
    description: "평일 09:00-18:00"
  },
  {
    icon: FileText,
    title: "처리방침 버전",
    content: "v1.0",
    description: "2024년 1월 1일 시행"
  },
  {
    icon: Calendar,
    title: "최종 수정일",
    content: "2024.01.01",
    description: "정기 검토 및 업데이트"
  }
] */}

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 헤로 섹션 */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/privacy-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold mb-6 px-4 py-2 text-sm shadow-lg">
              <Shield className="w-4 h-4 mr-2" />
              개인정보보호
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              <span className="text-yellow-400">안전하고 투명한</span><br />
              개인정보 처리방침
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              고객의 개인정보를 
              <span className="font-semibold text-white"> 안전하게 보호</span>하고 투명하게 관리합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 빠른 정보 섹션
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickInfo.map((info, index) => (
              <Card key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
                    <info.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{info.title}</h3>
                  <p className="text-lg font-semibold text-yellow-600 mb-1">{info.content}</p>
                  <p className="text-sm text-slate-500">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* 메인 컨텐츠 */}
      <section className="container mx-auto px-4 pt-20 pb-20">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 왼쪽: 목차 네비게이션 */}
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 sticky top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-slate-900">목차</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="space-y-2">
                    {privacySections.map((section) => {
                      const IconComponent = section.icon
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                            activeSection === section.id
                              ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                              : "hover:bg-slate-50 text-slate-700 border-2 border-transparent"
                          }`}
                        >
                          <IconComponent className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium leading-tight">{section.title}</span>
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* 오른쪽: 상세 내용 */}
            <div className="lg:col-span-3">
              {privacySections.map((section) => {
                if (activeSection !== section.id) return null
                const IconComponent = section.icon
                
                return (
                  <Card key={section.id} className="bg-white rounded-2xl shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-t-2xl p-8">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/20">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div 
                        className="prose prose-slate max-w-none"
                        style={{ 
                          whiteSpace: 'pre-line',
                          lineHeight: '1.7'
                        }}
                      >
                        {section.content.split('\n\n').map((paragraph, index) => {
                          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            // 굵은 제목 처리
                            return (
                              <h4 key={index} className="text-lg font-bold text-slate-900 mt-6 mb-3 first:mt-0">
                                {paragraph.replace(/\*\*/g, '')}
                              </h4>
                            )
                          } else if (paragraph.startsWith('•')) {
                            // 리스트 아이템 처리
                            return (
                              <div key={index} className="flex items-start gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                                <p className="text-slate-700">{paragraph.substring(1).trim()}</p>
                              </div>
                            )
                          } else {
                            // 일반 텍스트 처리
                            return (
                              <p key={index} className="text-slate-700 mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            )
                          }
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 하단 액션 버튼 
          <div className="mt-12">
            <Card className="bg-slate-100 border-slate-200 rounded-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    개인정보 처리방침 관련 문의
                  </h3>
                  <p className="text-slate-600 mb-6">
                    개인정보 처리와 관련하여 궁금한 사항이 있으시면 언제든 연락주세요.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-6 py-3 rounded-xl">
                      <Mail className="w-5 h-5 mr-2" />
                      이메일 문의
                    </Button>
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-yellow-400 px-6 py-3 rounded-xl">
                      <Phone className="w-5 h-5 mr-2" />
                      전화 문의
                    </Button>
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-yellow-400 px-6 py-3 rounded-xl">
                      <Download className="w-5 h-5 mr-2" />
                      PDF 다운로드
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>*/}
        </div>
      </section>

      <Footer />
    </main>
  )
}