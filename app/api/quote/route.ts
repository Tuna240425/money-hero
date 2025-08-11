// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 노션 API 연동 함수
async function saveToNotion(formData: any, quoteData: any) {
  const notionToken = process.env.NOTION_TOKEN;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  if (!notionToken || !notionDatabaseId) {
    console.log('노션 환경변수 누락 - 노션 저장 건너뜀');
    return null;
  }

  try {
    console.log('노션 데이터베이스 저장 시작');
    
    // 추천 패키지 정보
    const recommendedPackage = quoteData.packages[1]; // 스탠다드 패키지
    
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: {
          database_id: notionDatabaseId
        },
        properties: {
          // 이름 (title 타입)
          "이름": {
            title: [
              {
                text: {
                  content: formData.name
                }
              }
            ]
          },
          // 연락처 (phone_number 타입)
          "연락처": {
            phone_number: formData.phone
          },
          // 이메일 (email 타입)
          "이메일": {
            email: formData.email
          },
          // 구분 (select 타입)
          "구분": {
            select: {
              name: formData.role
            }
          },
          // 상대방 (select 타입)
          "상대방": {
            select: {
              name: formData.counterparty
            }
          },
          // 채권금액 (select 타입)
          "채권금액": {
            select: {
              name: formData.amount
            }
          },
          // 견적번호 (rich_text 타입)
          "견적번호": {
            rich_text: [
              {
                text: {
                  content: quoteData.quoteNumber
                }
              }
            ]
          },
          // 추천패키지 (rich_text 타입)
          "추천패키지": {
            rich_text: [
              {
                text: {
                  content: `${recommendedPackage.name} - ${recommendedPackage.feeDisplay}`
                }
              }
            ]
          },
          // 상태 (select 타입)
          "상태": {
            select: {
              name: "신규접수"
            }
          },
          // 접수일시 (date 타입)
          "접수일시": {
            date: {
              start: new Date().toISOString()
            }
          },
          // 사건개요 (rich_text 타입)
          "사건개요": {
            rich_text: [
              {
                text: {
                  content: formData.summary || "상담 시 확인 예정"
                }
              }
            ]
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('노션 API 오류:', response.status, errorText);
      throw new Error(`노션 API 오류: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('노션 저장 성공:', result.id);
    return result;

  } catch (error) {
    console.error('노션 저장 실패:', error);
    throw error;
  }
}

// 매트릭스 견적 계산 함수 (기존과 동일)
function calculateMatrixQuote(amount: string, counterparty: string, role: string) {
  // 기본 착수금 (스탠다드 기준)
  const basePrice: Record<string, number> = {
    "~500만원": 22,           // 22만원
    "500만~1천만": 28,        // 28만원
    "1천만~3천만": 33,        // 33만원
    "3천만~5천만": 44,        // 44만원
    "5천만~1억": 55,          // 55만원
    "1억원 이상": 0           // 개별 견적
  };
  
  // 기본 성공보수율 (스탠다드 기준)
  const baseSuccessRates: Record<string, { creditor: string, debtor: string, creditorRange: [number, number], debtorRange: [number, number] }> = {
    "~500만원": {
      creditor: "회수금액의 10~18%",
      debtor: "협상된 감액의 8~15%",
      creditorRange: [10, 18],
      debtorRange: [8, 15]
    },
    "500만~1천만": {
      creditor: "회수금액의 10~18%",
      debtor: "협상된 감액의 8~15%",
      creditorRange: [10, 18],
      debtorRange: [8, 15]
    },
    "1천만~3천만": {
      creditor: "회수금액의 8~15%",
      debtor: "협상된 감액의 6~12%",
      creditorRange: [8, 15],
      debtorRange: [6, 12]
    },
    "3천만~5천만": {
      creditor: "회수금액의 8~15%",
      debtor: "협상된 감액의 6~12%",
      creditorRange: [8, 15],
      debtorRange: [6, 12]
    },
    "5천만~1억": {
      creditor: "회수금액의 7~12%",
      debtor: "협상된 감액의 5~10%",
      creditorRange: [7, 12],
      debtorRange: [5, 10]
    },
    "1억원 이상": {
      creditor: "회수금액의 6~10%",
      debtor: "협상된 감액의 4~8%",
      creditorRange: [6, 10],
      debtorRange: [4, 8]
    }
  };

  // 법인 할증률
  const multiplier = counterparty === '법인/사업자' ? 1.2 : 1.0;
  
  // 견적서 번호 생성
  const now = new Date();
  const quoteNumber = `MH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  // 3가지 패키지별 견적 계산
  const packages = [];
  
  // 기본 데이터
  const baseFee = basePrice[amount] || 33;
  const baseRates = baseSuccessRates[amount] || baseSuccessRates["1천만~3천만"];
  const isIndividualQuote = amount === "1억원 이상";
  
  // 1. 스타트 패키지
  const startFee = 0; // 무료
  const startCreditorRange = [
    Math.min(baseRates.creditorRange[0] + 3, 25), // +3% (최대 25%)
    Math.min(baseRates.creditorRange[1] + 3, 28)  // +3% (최대 28%)
  ];
  const startDebtorRange = [
    Math.min(baseRates.debtorRange[0] + 3, 20),   // +3% (최대 20%)
    Math.min(baseRates.debtorRange[1] + 3, 23)    // +3% (최대 23%)
  ];
  
  packages.push({
    name: "스타트",
    description: "기본 상담 + 내용증명",
    fee: startFee,
    feeDisplay: "₩0",
    successFee: role === '채권자' 
      ? `회수금액의 ${startCreditorRange[0]}~${startCreditorRange[1]}%`
      : `협상된 감액의 ${startDebtorRange[0]}~${startDebtorRange[1]}%`,
    features: [
      "무료 초기 상담",
      "내용증명 발송",
      "기본 법률 자문",
      "성공 시에만 보수"
    ]
  });
  
  // 2. 스탠다드 패키지 (기준)
  const standardFee = isIndividualQuote ? 0 : Math.round(baseFee * multiplier);
  const standardFeeDisplay = isIndividualQuote ? "개별 견적" : `${standardFee}만원`;
  
  packages.push({
    name: "스탠다드",
    description: "지급명령 + 소송대리 포함",
    fee: standardFee,
    feeDisplay: standardFeeDisplay,
    successFee: role === '채권자' ? baseRates.creditor : baseRates.debtor,
    features: [
      "모든 스타트 서비스",
      "지급명령 신청",
      "소송 대리",
      "성공보수 할인",
      "진행상황 알림"
    ]
  });
  
  // 3. 집행패키지
  const executionFee = isIndividualQuote ? 0 : Math.round(baseFee * 1.5 * multiplier);
  const executionFeeDisplay = isIndividualQuote ? "개별 견적" : `${executionFee}만원`;
  const executionCreditorRange = [
    Math.max(baseRates.creditorRange[0] - 3, 3), // -3% (최소 3%)
    Math.max(baseRates.creditorRange[1] - 3, 8)  // -3% (최소 8%)
  ];
  const executionDebtorRange = [
    Math.max(baseRates.debtorRange[0] - 3, 2),   // -3% (최소 2%)
    Math.max(baseRates.debtorRange[1] - 3, 5)    // -3% (최소 5%)
  ];
  
  packages.push({
    name: "집행패키지",
    description: "가압류 + 강제집행 중심",
    fee: executionFee,
    feeDisplay: executionFeeDisplay,
    successFee: role === '채권자' 
      ? `회수금액의 ${executionCreditorRange[0]}~${executionCreditorRange[1]}%`
      : `협상된 감액의 ${executionDebtorRange[0]}~${executionDebtorRange[1]}%`,
    features: [
      "모든 스탠다드 서비스",
      "가압류 신청",
      "강제집행 절차",
      "재산조사",
      "맞춤형 전략"
    ]
  });
  
  return {
    quoteNumber,
    amount,
    counterparty,
    role,
    packages,
    isIndividualQuote
  };
}

// 매트릭스 견적서 HTML 이메일 생성 (기존과 동일)
function createMatrixQuoteEmailHTML(formData: any, quoteData: any): string {
  const { packages, amount, isIndividualQuote, quoteNumber } = quoteData;
  
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
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
        .amount-info {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
        }
        .package {
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            margin-bottom: 20px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .package.recommended {
            border-color: #fbbf24;
            transform: scale(1.02);
        }
        .package-header {
            padding: 20px;
            background: #f9fafb;
        }
        .package-header.recommended {
            background: #fef3c7;
            position: relative;
        }
        .recommended-badge {
            position: absolute;
            top: -1px;
            right: 20px;
            background: #fbbf24;
            color: black;
            padding: 4px 12px;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
            font-weight: bold;
        }
        .package-name {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 5px 0;
        }
        .package-desc {
            color: #666;
            margin: 0;
        }
        .package-pricing {
            padding: 20px;
            background: white;
        }
        .fee {
            font-size: 28px;
            font-weight: bold;
            color: #f59e0b;
            margin-bottom: 10px;
        }
        .success-fee {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
        }
        .features {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .features li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .features li:last-child {
            border-bottom: none;
        }
        .features li:before {
            content: "✓";
            color: #10b981;
            font-weight: bold;
            margin-right: 10px;
        }
        .contact-info {
            background: #1f2937;
            color: white;
            padding: 25px;
            text-align: center;
        }
        .individual-quote {
            background: #dbeafe;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💰 머니히어로</div>
            <h1 style="margin: 0 0 10px 0; font-size: 24px;">채권추심 견적서</h1>
            <p style="margin: 10px 0 0 0;">전문 변호사와 함께하는 체계적인 채권 회수</p>
            <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 10px;">
                견적서 #${quoteNumber}
            </div>
        </div>
        
        <div class="content">
            <div class="amount-info">
                <h2 style="margin: 0 0 10px 0; color: #92400e;">💡 ${amount} 채권 견적</h2>
                <p style="margin: 0; color: #92400e;">
                    <strong>${formData.name}님 (${formData.role})</strong><br>
                    상대방: ${formData.counterparty} | 연락처: ${formData.phone}
                </p>
            </div>

            ${isIndividualQuote ? `
            <div class="individual-quote">
                <h3 style="margin: 0 0 10px 0; color: #0369a1;">📞 개별 견적 안내</h3>
                <p style="margin: 0;">1억원 이상 고액 채권은 사건의 복잡성을 고려하여<br>
                <strong>개별 상담 후 맞춤 견적</strong>을 제공해드립니다.</p>
            </div>
            ` : ''}

            ${packages.map((pkg: any, index: number) => `
            <div class="package ${index === 1 ? 'recommended' : ''}">
                <div class="package-header ${index === 1 ? 'recommended' : ''}">
                    ${index === 1 ? '<div class="recommended-badge">⭐ 추천</div>' : ''}
                    <div class="package-name">${pkg.name}</div>
                    <div class="package-desc">${pkg.description}</div>
                </div>
                <div class="package-pricing">
                    <div class="fee">착수금: ${pkg.feeDisplay}</div>
                    <div class="success-fee">성공보수: ${pkg.successFee}</div>
                    <ul class="features">
                        ${pkg.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            `).join('')}

            ${formData.summary ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937;">📝 사건 개요</h3>
                <p style="margin: 0; color: #4b5563;">${formData.summary.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #0369a1;">📞 다음 단계</h3>
                <p style="margin: 5px 0;">✅ 담당 변호사가 <strong>24시간 내</strong> 연락드립니다</p>
                <p style="margin: 5px 0;">✅ 상세 상담 및 증빙자료 검토</p>
                <p style="margin: 5px 0;">✅ 최종 견적 확정 및 계약 진행</p>
            </div>
        </div>
        
        <div class="contact-info">
            <h3 style="margin: 0 0 15px 0; color: #fbbf24;">📞 연락처</h3>
            <p style="margin: 5px 0; font-size: 18px;"><strong>02-3477-9650</strong></p>
            <p style="margin: 5px 0;">평일 09:00-18:00 | 카카오톡 @머니히어로</p>
            <p style="margin: 15px 0 5px 0; font-size: 12px; opacity: 0.8;">
                © 2025 머니히어로 | 임앤리 법률사무소. 모든 권리 보유.<br>
                사업자등록번호: 654-39-00409 | 발급일: ${new Date().toLocaleDateString('ko-KR')}
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    console.log('=== 매트릭스 견적 API 시작 ===');
    
    // 1. 요청 본문 파싱
    let body;
    try {
      body = await req.json();
      console.log('Body 파싱 성공:', body);
    } catch (parseError) {
      console.error('JSON 파싱 오류:', parseError);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // 2. 스팸 방지 체크
    if (body.company) {
      console.log('스팸 감지, 차단됨');
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // 3. 필수 필드 검증
    const required = ['name', 'email', 'phone', 'role', 'counterparty', 'amount'];
    const missing = required.filter(k => !body?.[k]);
    if (missing.length > 0) {
      console.log('필수 필드 누락:', missing);
      return NextResponse.json({ 
        error: `필수 필드가 누락되었습니다: ${missing.join(', ')}` 
      }, { status: 400 });
    }
    console.log('필수 필드 검증 통과');

    // 4. 매트릭스 견적 계산
    const quoteData = calculateMatrixQuote(body.amount, body.counterparty, body.role);
    console.log('매트릭스 견적 계산 완료:', {
      quoteNumber: quoteData.quoteNumber,
      amount: quoteData.amount,
      packagesCount: quoteData.packages.length
    });

    // 5. 노션 데이터베이스 저장 시도
    let notionResult = null;
    try {
      notionResult = await saveToNotion(body, quoteData);
      if (notionResult) {
        console.log('노션 저장 성공:', notionResult.id);
      }
    } catch (notionError) {
      console.error('노션 저장 실패 (계속 진행):', notionError);
      // 노션 저장 실패해도 이메일은 계속 진행
    }

    // 6. 환경변수 확인
    const envCheck = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      MAIL_TO: !!process.env.MAIL_TO,
      MAIL_FROM: !!process.env.MAIL_FROM,
      NOTION_TOKEN: !!process.env.NOTION_TOKEN,
      NOTION_DATABASE_ID: !!process.env.NOTION_DATABASE_ID
    };
    console.log('환경변수 상태:', envCheck);

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP 환경변수 누락');
      return NextResponse.json({ 
        error: 'SMTP 설정이 누락되었습니다.',
        envCheck 
      }, { status: 500 });
    }

    // 7. SMTP 설정
    console.log('SMTP 설정 시작');
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      console.log('SMTP 트랜스포터 생성 완료');
    } catch (smtpError) {
      console.error('SMTP 설정 오류:', smtpError);
      return NextResponse.json({ 
        error: 'SMTP 설정 오류',
        details: smtpError instanceof Error ? smtpError.message : String(smtpError)
      }, { status: 500 });
    }

    // 8. SMTP 연결 테스트
    console.log('SMTP 연결 테스트 시작');
    try {
      await transporter.verify();
      console.log('SMTP 연결 성공');
    } catch (verifyError) {
      console.error('SMTP 연결 실패:', verifyError);
      return NextResponse.json({ 
        error: 'SMTP 연결 실패',
        details: verifyError instanceof Error ? verifyError.message : String(verifyError)
      }, { status: 500 });
    }

    const toOps = process.env.MAIL_TO || 'ops@example.com';
    const fromAddr = process.env.MAIL_FROM || 'noreply@moneyhero.co.kr';

    // 9. 관리자 메일 발송 (간단 버전)
    console.log('관리자 메일 발송 시작');
    try {
      const recommendedPackage = quoteData.packages[1]; // 스탠다드 패키지
      
      await transporter.sendMail({
        from: fromAddr,
        to: toOps,
        subject: `🚨 [견적요청] ${body.role} | ${body.name} | ${body.amount} | 추천: ${recommendedPackage.feeDisplay}`,
        html: `
          <div style="font-family: system-ui; line-height: 1.6; max-width: 600px;">
            <h2 style="color: #dc2626;">🚨 새로운 매트릭스 견적 요청</h2>
            
            ${notionResult ? `
            <div style="background: #d1fae5; padding: 10px; border-radius: 6px; margin-bottom: 15px;">
              ✅ <strong>노션 저장 완료:</strong> <a href="https://notion.so/${notionResult.id.replace(/-/g, '')}" target="_blank">노션에서 보기</a>
            </div>
            ` : `
            <div style="background: #fef3c7; padding: 10px; border-radius: 6px; margin-bottom: 15px;">
              ⚠️ <strong>노션 저장 실패:</strong> 수동으로 노션에 등록 필요
            </div>
            `}
            
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
                <td style="padding: 10px; border: 1px solid #d1d5db; color: #dc2626; font-weight: bold;">${body.amount}</td>
              </tr>
              <tr style="background: #fef3c7;">
                <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">추천 패키지</td>
                <td style="padding: 10px; border: 1px solid #d1d5db; color: #92400e; font-weight: bold;">
                  ${recommendedPackage.name} - 착수금: ${recommendedPackage.feeDisplay}
                </td>
              </tr>
            </table>

            <h3>💰 3가지 패키지 견적:</h3>
            <ul>
              ${quoteData.packages.map((pkg: any) => `
                <li><strong>${pkg.name}</strong>: 착수금 ${pkg.feeDisplay}, 성공보수 ${pkg.successFee}</li>
              `).join('')}
            </ul>

            ${body.summary ? `
            <h3>📝 사건 개요:</h3>
            <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #6b7280; border-radius: 4px;">
              ${body.summary.replace(/\n/g, '<br>')}
            </div>
            ` : ''}
            
            <p style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
              💡 <strong>할 일:</strong> 24시간 내 ${body.phone}로 연락하여 상세 상담 진행<br>
              📋 <strong>견적번호:</strong> ${quoteData.quoteNumber}
            </p>
          </div>
        `,
      });
      console.log('관리자 메일 발송 성공');
    } catch (adminMailError) {
      console.error('관리자 메일 발송 실패:', adminMailError);
      return NextResponse.json({ 
        error: '관리자 메일 발송 실패',
        details: adminMailError instanceof Error ? adminMailError.message : String(adminMailError)
      }, { status: 500 });
    }

    // 10. 고객 매트릭스 견적 메일 발송
    console.log('고객 매트릭스 견적 메일 발송 시작');
    try {
      const matrixEmailHTML = createMatrixQuoteEmailHTML(body, quoteData);
      
      await transporter.sendMail({
        from: fromAddr,
        to: body.email,
        subject: `[머니히어로] ${body.name}님 맞춤 채권추심 견적서 📋 (3가지 패키지)`,
        html: matrixEmailHTML,
      });
      console.log('고객 매트릭스 견적 메일 발송 성공');
    } catch (customerMailError) {
      console.error('고객 메일 발송 실패:', customerMailError);
      // 고객 메일은 실패해도 일단 성공 응답 (관리자 메일은 이미 성공)
      console.log('고객 메일 실패했지만 관리자 메일은 성공, 계속 진행');
    }

    console.log('=== 매트릭스 견적 API 완료 ===');
    return NextResponse.json({ 
      ok: true, 
      quoteNumber: quoteData.quoteNumber,
      packages: quoteData.packages.length,
      notion: notionResult ? { saved: true, id: notionResult.id } : { saved: false },
      message: '3가지 패키지 견적이 발송되었습니다.' + (notionResult ? ' (노션 저장 완료)' : ' (노션 저장 실패)')
    });

  } catch (error) {
    console.error('=== 예상치 못한 오류 ===');
    console.error('Error:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('========================');
    
    return NextResponse.json({ 
      error: '서버 오류가 발생했습니다.',
      message: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error
    }, { status: 500 });
  }
}