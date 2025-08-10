// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 견적 계산 함수
function calculateQuote(amount: string, counterparty: string, role: string) {
  const basePrice: Record<string, number> = {
    "~500만원": 50,
    "500만~1천만": 80,
    "1천만~3천만": 120,
    "3천만~5천만": 200,
    "5천만 이상": 300
  };
  
  const multiplier = counterparty === '법인/사업자' ? 1.3 : 1.0;
  const consultingFee = Math.round((basePrice[amount] || 100) * multiplier);
  const successFee = role === '채권자' ? '회수금액의 15-25%' : '협상된 감액의 10-20%';
  
  // 견적서 번호 생성
  const now = new Date();
  const quoteNumber = `MH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  return { consultingFee, successFee, quoteNumber };
}

export async function POST(req: NextRequest) {
  try {
    console.log('=== API 시작 ===');
    
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

    // 4. 견적 계산
    const quote = calculateQuote(body.amount, body.counterparty, body.role);
    console.log('견적 계산 완료:', quote);

    // 5. 환경변수 확인
    const envCheck = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      MAIL_TO: !!process.env.MAIL_TO,
      MAIL_FROM: !!process.env.MAIL_FROM
    };
    console.log('환경변수 상태:', envCheck);

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP 환경변수 누락');
      return NextResponse.json({ 
        error: 'SMTP 설정이 누락되었습니다.',
        envCheck 
      }, { status: 500 });
    }

    // 6. SMTP 설정
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

    // 7. SMTP 연결 테스트
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

    // 8. 관리자 메일 발송
    console.log('관리자 메일 발송 시작');
    try {
      await transporter.sendMail({
        from: fromAddr,
        to: toOps,
        subject: `🚨 [견적요청] ${body.role} | ${body.name} | ${body.amount} | ${quote.consultingFee}만원`,
        html: `
          <div style="font-family: system-ui; line-height: 1.6; max-width: 600px;">
            <h2 style="color: #dc2626;">🚨 새로운 견적 요청</h2>
            
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
                <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">예상 착수금</td>
                <td style="padding: 10px; border: 1px solid #d1d5db; color: #92400e; font-weight: bold;">${quote.consultingFee}만원</td>
              </tr>
            </table>

            ${body.summary ? `
            <h3>📝 사건 개요:</h3>
            <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #6b7280; border-radius: 4px;">
              ${body.summary.replace(/\n/g, '<br>')}
            </div>
            ` : ''}
            
            <p style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
              💡 <strong>할 일:</strong> 24시간 내 ${body.phone}로 연락하여 상세 상담 진행
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

    // 9. 고객 메일 발송
    console.log('고객 메일 발송 시작');
    try {
      await transporter.sendMail({
        from: fromAddr,
        to: body.email,
        subject: `[머니히어로] ${body.name}님 견적 요청 접수 완료`,
        html: `
          <div style="font-family: system-ui; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 30px; text-align: center; border-radius: 10px;">
              <h1 style="margin: 0;">💰 머니히어로</h1>
              <p style="margin: 10px 0 0 0;">견적 요청이 접수되었습니다</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2>안녕하세요, ${body.name}님!</h2>
              <p>채권추심 견적 요청을 접수했습니다.</p>
              
              <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #92400e;">💡 견적 요약</h3>
                <p style="margin: 5px 0;"><strong>착수금:</strong> ${quote.consultingFee}만원</p>
                <p style="margin: 5px 0;"><strong>성공수수료:</strong> ${quote.successFee}</p>
              </div>
              
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #0369a1;">📞 다음 단계</h3>
                <p style="margin: 5px 0;">✅ 담당 변호사가 <strong>24시간 내</strong> 연락드립니다</p>
                <p style="margin: 5px 0;">✅ 상세 상담 및 증빙자료 검토</p>
                <p style="margin: 5px 0;">✅ 최종 견적 확정 및 계약 진행</p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 18px; color: #1f2937;"><strong>연락처: 02-1234-5678</strong></p>
                <p style="color: #6b7280;">평일 09:00-18:00 | 카카오톡 @머니히어로</p>
              </div>
              
              <p>감사합니다.<br><strong>머니히어로 드림</strong></p>
            </div>
          </div>
        `,
      });
      console.log('고객 메일 발송 성공');
    } catch (customerMailError) {
      console.error('고객 메일 발송 실패:', customerMailError);
      // 고객 메일은 실패해도 일단 성공 응답 (관리자 메일은 이미 성공)
      console.log('고객 메일 실패했지만 관리자 메일은 성공, 계속 진행');
    }

    console.log('=== API 완료 ===');
    return NextResponse.json({ 
      ok: true, 
      quoteNumber: quote.quoteNumber,
      message: '견적 요청이 접수되었습니다.' 
    });

  } catch (error) {
    console.error('=== 예상치 못한 오류 ===');
    console.error('Error:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('=======================');
    
    return NextResponse.json({ 
      error: '서버 오류가 발생했습니다.',
      message: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error
    }, { status: 500 });
  }
}