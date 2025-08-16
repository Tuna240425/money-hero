// app/api/quote/route.ts
'use server'

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { db } from '@/lib/firebaseAdmin.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type QuoteRequest = {
  name: string
  email: string
  phone: string
  role: '채권자' | '채무자'
  counterparty: '개인' | '법인/사업자'
  amount: string
  summary?: string
  requestedService?: 'start' | 'standard' | 'package' // 요청한 서비스 타입
}

// 서비스별 고정 가격 정의
const SERVICE_PRICING = {
  start: {
    name: "스타트",
    price: 22,
    description: "기본 상담 + 내용증명",
    successFee: "회수금액의 10% 내외",
    features: [
      "✅ 초기 상담 및 사건 분석",
      "✅ 내용증명 발송",
      "✅ 기본 법률 자문",
      "✅ 성공 시에만 보수 지급"
    ],
    marketingMessage: "💡 더 확실한 회수를 원하신다면 스탠다드 서비스를 추천드립니다!"
  },
  standard: {
    name: "스탠다드",
    price: 55,
    description: "지급명령 + 소송대리 포함",
    successFee: "회수금액의 10% 내외",
    features: [
      "✅ 모든 스타트 서비스",
      "✅ 지급명령 신청",
      "✅ 본안소송 대리",
      "✅ 진행상황 실시간 알림",
      "✅ 성공보수 우대 적용"
    ],
    marketingMessage: "🌟 가장 인기 있는 서비스! 대부분의 고객이 선택하는 최적화된 패키지입니다."
  },
  package: {
    name: "집행패키지",
    price: 0, // 상담 후 견적
    description: "가압류 + 강제집행 중심",
    successFee: "회수금액의 10% 내외",
    features: [
      "✅ 모든 스탠다드 서비스",
      "✅ 가압류/가처분 신청",
      "✅ 강제집행 절차",
      "✅ 재산조사 및 추적",
      "✅ 맞춤형 회수 전략"
    ],
    marketingMessage: "🚀 고액 채권이나 복잡한 사건에 최적화된 프리미엄 서비스입니다."
  }
}

// 견적서 번호 생성
function generateQuoteNumber(): string {
  const now = new Date()
  return `MH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
}

// 요청된 서비스 타입 감지
function detectRequestedService(amount: string, summary: string): 'start' | 'standard' | 'package' {
  const lowerSummary = summary.toLowerCase()
  
  // 패키지 서비스 키워드
  if (lowerSummary.includes('가압류') || lowerSummary.includes('강제집행') || lowerSummary.includes('재산조사')) {
    return 'package'
  }
  
  // 스탠다드 서비스 키워드
  if (lowerSummary.includes('소송') || lowerSummary.includes('지급명령')) {
    return 'standard'
  }
  
  // 채권 금액 기반 추정 (참고용)
  if (amount.includes('5천만') || amount.includes('1억')) {
    return 'package'
  } else if (amount.includes('1천만') || amount.includes('3천만')) {
    return 'standard'
  }
  
  return 'start' // 기본값
}

// 서비스별 맞춤 견적서 HTML 생성
function createServiceQuoteHTML(formData: QuoteRequest, quoteNumber: string): string {
  const requestedService = formData.requestedService || detectRequestedService(formData.amount, formData.summary || '')
  const mainService = SERVICE_PRICING[requestedService]
  
  // 업셀링을 위한 다른 서비스들
  const otherServices = Object.entries(SERVICE_PRICING).filter(([key]) => key !== requestedService)
  
  const isPackageRequest = requestedService === 'package'
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { 
            font-family: 'Malgun Gothic', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            background: #f8f9fa;
            padding: 20px;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .header { 
            background: linear-gradient(135deg, #fbbf24, #f59e0b); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .logo { 
            font-size: 28px; 
            font-weight: 900; 
            margin-bottom: 10px; 
        }
        .content {
            padding: 30px;
        }
        .customer-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .main-service {
            border: 3px solid #fbbf24;
            border-radius: 15px;
            margin-bottom: 30px;
            overflow: hidden;
            position: relative;
        }
        .main-service::before {
            content: "🌟 선택하신 서비스";
            position: absolute;
            top: -1px;
            left: 20px;
            background: #fbbf24;
            color: black;
            padding: 8px 16px;
            border-radius: 0 0 10px 10px;
            font-size: 14px;
            font-weight: bold;
        }
        .service-header {
            background: #fef3c7;
            padding: 30px 20px 20px 20px;
            text-align: center;
        }
        .service-name {
            font-size: 28px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 10px;
        }
        .service-price {
            font-size: 32px;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 10px;
        }
        .service-body {
            padding: 25px;
            background: white;
        }
        .features {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 0;
        }
        .features li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .features li:last-child {
            border-bottom: none;
        }
        .marketing-box {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #3b82f6;
            margin: 20px 0;
        }
        .upsell-section {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
        }
        .other-service {
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            margin-bottom: 15px;
            overflow: hidden;
        }
        .other-service-header {
            background: #f9fafb;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .other-service-price {
            font-size: 18px;
            font-weight: bold;
            color: #059669;
        }
        .package-notice {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            padding: 25px;
            border-radius: 12px;
            border-left: 5px solid #f59e0b;
            margin: 20px 0;
            text-align: center;
        }
        .contact-info {
            background: #1f2937;
            color: white;
            padding: 30px;
            text-align: center;
            margin-top: 30px;
        }
        .next-steps {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💰 머니히어로</div>
            <h1 style="margin: 0 0 10px 0; font-size: 24px;">채권추심 서비스 견적서</h1>
            <p style="margin: 10px 0 0 0;">전문 변호사와 함께하는 체계적인 채권 회수</p>
            <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 10px;">
                견적서 #${quoteNumber}
            </div>
        </div>
        
        <div class="content">
            <div class="customer-info">
                <h3 style="margin: 0 0 15px 0; color: #1f2937;">📋 의뢰인 정보</h3>
                <p style="margin: 5px 0;"><strong>성함:</strong> ${formData.name}</p>
                <p style="margin: 5px 0;"><strong>구분:</strong> ${formData.role}</p>
                <p style="margin: 5px 0;"><strong>상대방:</strong> ${formData.counterparty}</p>
                <p style="margin: 5px 0;"><strong>채권금액:</strong> ${formData.amount}</p>
                <p style="margin: 5px 0;"><strong>연락처:</strong> ${formData.phone}</p>
            </div>

            ${isPackageRequest ? `
            <div class="package-notice">
                <h3 style="margin: 0 0 15px 0; color: #92400e;">🚀 집행패키지 문의 주셔서 감사합니다!</h3>
                <p style="margin: 0; font-size: 16px; color: #78350f;">
                    고액 채권 및 복잡한 사건은 <strong>개별 상담 후 맞춤 견적</strong>을 제공해드립니다.<br>
                    담당 변호사가 24시간 내 연락드려 상세한 전략과 정확한 비용을 안내해드리겠습니다.
                </p>
            </div>
            ` : `
            <div class="main-service">
                <div class="service-header">
                    <div class="service-name">${mainService.name} 서비스</div>
                    <div class="service-price">${mainService.price}만원</div>
                    <div style="color: #6b7280; font-size: 14px;">${mainService.description}</div>
                </div>
                <div class="service-body">
                    <ul class="features">
                        ${mainService.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <strong style="color: #059669;">성공보수: ${mainService.successFee}</strong>
                    </div>
                </div>
            </div>

            <div class="marketing-box">
                <h4 style="margin: 0 0 10px 0; color: #1e40af;">💡 ${mainService.name} 서비스 선택 시</h4>
                <p style="margin: 0; color: #1e3a8a;">${mainService.marketingMessage}</p>
            </div>
            `}

            ${!isPackageRequest ? `
            <div class="upsell-section">
                <h3 style="margin: 0 0 20px 0; color: #1f2937;">🔄 다른 서비스 옵션</h3>
                ${otherServices.map(([key, service]) => `
                <div class="other-service">
                    <div class="other-service-header">
                        <div>
                            <strong>${service.name}</strong> - ${service.description}
                        </div>
                        <div class="other-service-price">
                            ${service.price === 0 ? '상담 후 견적' : `${service.price}만원`}
                        </div>
                    </div>
                </div>
                `).join('')}
                <p style="margin: 15px 0 0 0; font-size: 14px; color: #6b7280; text-align: center;">
                    💬 상담 시 서비스 변경 가능합니다
                </p>
            </div>
            ` : ''}

            ${formData.summary ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937;">📝 사건 개요</h3>
                <p style="margin: 0; color: #4b5563;">${formData.summary.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            <div class="next-steps">
                <h3 style="margin: 0 0 15px 0; color: #0369a1;">📞 다음 단계</h3>
                <p style="margin: 5px 0;">✅ 담당 변호사가 <strong>24시간 내</strong> 연락드립니다</p>
                <p style="margin: 5px 0;">✅ 상세 상담 및 증빙자료 검토</p>
                <p style="margin: 5px 0;">✅ 최종 견적 확정 및 서비스 진행</p>
                ${!isPackageRequest ? '<p style="margin: 5px 0;">✅ 상담 시 서비스 업그레이드 가능</p>' : ''}
            </div>
        </div>
        
        <div class="contact-info">
            <h3 style="margin: 0 0 15px 0; color: #fbbf24;">📞 연락처</h3>
            <p style="margin: 5px 0; font-size: 18px;"><strong>02-1234-5678</strong></p>
            <p style="margin: 5px 0;">평일 09:00-18:00 | 카카오톡 @머니히어로</p>
            <p style="margin: 15px 0 5px 0; font-size: 12px; opacity: 0.8;">
                © 2025 머니히어로. 모든 권리 보유.<br>
                사업자등록번호: 123-45-67890 | 발급일: ${new Date().toLocaleDateString('ko-KR')}
            </p>
        </div>
    </div>
</body>
</html>
  `
}

export async function POST(req: NextRequest) {
  try {
    console.log('=== 서비스별 견적 API 시작 ===')
    
    const body = await req.json() as QuoteRequest
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const ua = req.headers.get('user-agent') || 'unknown'

    // 스팸 방지
    if ((body as any).company) {
      console.log('스팸 감지, 차단됨')
      return NextResponse.json({ ok: true })
    }

    // 필수 필드 검증
    const required = ['name', 'email', 'phone', 'role', 'counterparty', 'amount']
    const missing = required.filter(k => !body?.[k as keyof QuoteRequest])
    if (missing.length > 0) {
      return NextResponse.json({ 
        error: `필수 필드가 누락되었습니다: ${missing.join(', ')}` 
      }, { status: 400 })
    }

    const quoteNumber = generateQuoteNumber()
    const requestedService = body.requestedService || detectRequestedService(body.amount, body.summary || '')
    const selectedService = SERVICE_PRICING[requestedService]

    // 1. Firebase에 데이터 저장
    try {
      const docRef = await db.collection('quote-requests').add({
        ...body,
        requestedService,
        quoteNumber,
        selectedServicePrice: selectedService.price,
        meta: { ip, ua },
        createdAt: new Date(),
        status: 'new',
      })
      console.log('Firebase 저장 성공:', docRef.id)
    } catch (firebaseError) {
      console.error('Firebase 저장 실패:', firebaseError)
      // Firebase 실패해도 계속 진행
    }

    // 2. SMTP 설정
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toOps = process.env.MAIL_TO || 'ops@example.com'
    const fromAddr = process.env.MAIL_FROM || 'noreply@moneyhero.co.kr'

    // 3. 관리자 알림 메일
    await transporter.sendMail({
      from: fromAddr,
      to: toOps,
      subject: `🚨 [${selectedService.name} 견적] ${body.role} | ${body.name} | ${body.amount} | ${selectedService.price === 0 ? '상담견적' : selectedService.price + '만원'}`,
      html: `
        <div style="font-family: system-ui; line-height: 1.6;">
          <h2 style="color: #dc2626;">🚨 새로운 ${selectedService.name} 서비스 견적 요청</h2>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #92400e;">선택 서비스</h3>
            <p style="margin: 0; font-size: 18px;"><strong>${selectedService.name}</strong> - ${selectedService.price === 0 ? '상담 후 견적' : selectedService.price + '만원'}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">이름</td>
              <td style="padding: 10px; border: 1px solid #d1d5db;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">연락처</td>
              <td style="padding: 10px; border: 1px solid #d1d5db;">${body.phone}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">이메일</td>
              <td style="padding: 10px; border: 1px solid #d1d5db;">${body.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">구분</td>
              <td style="padding: 10px; border: 1px solid #d1d5db;">${body.role}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">상대방</td>
              <td style="padding: 10px; border: 1px solid #d1d5db;">${body.counterparty}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">채권금액</td>
              <td style="padding: 10px; border: 1px solid #d1d5db;">${body.amount}</td>
            </tr>
          </table>

          ${body.summary ? `
          <h3>📝 사건 개요:</h3>
          <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #6b7280; border-radius: 4px;">
            ${body.summary.replace(/\n/g, '<br>')}
          </div>
          ` : ''}
          
          <p style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
            💡 <strong>할 일:</strong> 24시간 내 ${body.phone}로 연락하여 ${selectedService.name} 서비스 상담 진행<br>
            📋 <strong>견적번호:</strong> ${quoteNumber}
          </p>
        </div>
      `,
    })

    // 4. 고객용 견적서 메일
    const isPackageRequest = requestedService === 'package'
    const emailHTML = createServiceQuoteHTML(body, quoteNumber)
    
    await transporter.sendMail({
      from: fromAddr,
      to: body.email,
      subject: isPackageRequest 
        ? `[머니히어로] ${body.name}님 집행패키지 상담 예약 완료 📞`
        : `[머니히어로] ${body.name}님 ${selectedService.name} 서비스 견적서 📋`,
      html: emailHTML,
    })

    console.log('=== 서비스별 견적 API 완료 ===')
    return NextResponse.json({ 
      ok: true, 
      quoteNumber,
      service: selectedService.name,
      price: selectedService.price,
      message: isPackageRequest 
        ? '집행패키지 상담이 예약되었습니다. 담당자가 연락드리겠습니다.'
        : `${selectedService.name} 서비스 견적서가 발송되었습니다.`
    })

  } catch (error) {
    console.error('견적 API 오류:', error)
    return NextResponse.json({ 
      error: '서버 오류가 발생했습니다.',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}