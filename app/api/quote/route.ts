// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import PDFDocument from 'pdfkit'

// PDFKit으로 견적서 PDF 생성
async function generatePDFWithKit(formData: any, quote: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // 헤더
    doc.fontSize(24)
       .fillColor('#f59e0b')
       .text('💰 머니히어로', 50, 50);
    
    doc.fontSize(18)
       .fillColor('#000')
       .text('채권추심 견적서', 50, 80);

    doc.fontSize(12)
       .fillColor('#666')
       .text('전문 변호사와 함께하는 체계적인 채권 회수', 50, 110);

    doc.fontSize(10)
       .fillColor('#f59e0b')
       .text(`견적서 #${quote.quoteNumber}`, 50, 130);

    // 의뢰인 정보
    let yPosition = 170;
    doc.fontSize(14)
       .fillColor('#000')
       .text('📋 의뢰인 정보', 50, yPosition);

    yPosition += 30;
    const infoItems = [
      ['성함', formData.name],
      ['구분', formData.role],
      ['상대방', formData.counterparty],
      ['채권금액', formData.amount],
      ['연락처', formData.phone]
    ];

    infoItems.forEach(([label, value]) => {
      doc.fontSize(11)
         .fillColor('#333')
         .text(`${label}:`, 50, yPosition)
         .text(value, 120, yPosition);
      yPosition += 20;
    });

    // 견적 내역
    yPosition += 20;
    doc.fontSize(14)
       .fillColor('#000')
       .text('💰 견적 내역', 50, yPosition);

    yPosition += 30;
    doc.fontSize(12)
       .fillColor('#f59e0b')
       .text(`착수금 (상담 + 1차 법적조치): ${quote.consultingFee}만원`, 50, yPosition);

    yPosition += 20;
    doc.fontSize(12)
       .fillColor('#f59e0b')
       .text(`성공수수료: ${quote.successFee}`, 50, yPosition);

    yPosition += 20;
    doc.fontSize(9)
       .fillColor('#666')
       .text('* 정확한 견적은 사건 검토 후 최종 확정됩니다.', 50, yPosition);

    // 포함 서비스
    yPosition += 40;
    doc.fontSize(14)
       .fillColor('#000')
       .text('🎯 포함 서비스', 50, yPosition);

    yPosition += 25;
    const services = [
      '무료 사전 상담: 채권 회수 가능성 분석',
      '1차 법적 조치: 내용증명 + 지급명령 신청',
      '보전 조치: 필요시 가압류/가처분 신청',
      '강제 집행: 재산조회 및 압류 절차',
      '실시간 안내: 진행상황 카톡/문자 알림',
      '사후 관리: 미회수시 정기 모니터링'
    ];

    services.forEach(service => {
      doc.fontSize(10)
         .fillColor('#333')
         .text(`• ${service}`, 60, yPosition);
      yPosition += 18;
    });

    // 사건 개요 (있는 경우)
    if (formData.summary) {
      yPosition += 20;
      doc.fontSize(14)
         .fillColor('#000')
         .text('📝 사건 개요', 50, yPosition);

      yPosition += 25;
      doc.fontSize(10)
         .fillColor('#333')
         .text(formData.summary, 50, yPosition, { width: 500 });
      yPosition += 60;
    }

    // 연락처
    yPosition += 30;
    doc.fontSize(14)
       .fillColor('#000')
       .text('📞 연락처', 50, yPosition);

    yPosition += 25;
    const contacts = [
      '대표번호: 02-1234-5678',
      '이메일: contact@moneyhero.co.kr',
      '카카오톡: @머니히어로',
      '영업시간: 평일 09:00-18:00'
    ];

    contacts.forEach(contact => {
      doc.fontSize(10)
         .fillColor('#333')
         .text(contact, 50, yPosition);
      yPosition += 18;
    });

    // 푸터
    yPosition += 40;
    doc.fontSize(9)
       .fillColor('#666')
       .text('© 2025 머니히어로. 모든 권리 보유. | 사업자등록번호: 123-45-67890', 50, yPosition);

    yPosition += 15;
    doc.fontSize(9)
       .fillColor('#666')
       .text(`발급일: ${new Date().toLocaleDateString('ko-KR')}`, 50, yPosition);

    doc.end();
  });
}

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
    console.log('1. API 호출 시작');
    
    const body = await req.json();
    console.log('2. Body 파싱 성공');

    // 스팸 방지 (허니팟)
    if (body.company) {
      console.log('3. 스팸 감지');
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // 간단한 서버측 검증
    const required = ['name','email','phone','role','counterparty','amount'];
    for (const k of required) {
      if (!body?.[k]) {
        console.log(`4. 필수 필드 누락: ${k}`);
        return NextResponse.json({ error: `${k} is required` }, { status: 400 });
      }
    }
    console.log('5. 필수 필드 검증 통과');

    // 견적 계산
    const quote = calculateQuote(body.amount, body.counterparty, body.role);
    console.log('6. 견적 계산 완료');

    // PDFKit으로 PDF 생성
    console.log('7. PDF 생성 시작');
    const pdfBuffer = await generatePDFWithKit(body, quote);
    console.log('8. PDF 생성 완료, 크기:', pdfBuffer.length, 'bytes');

    // SMTP 설정
    console.log('9. SMTP 설정 시작');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toOps = process.env.MAIL_TO || 'ops@example.com';
    const fromAddr = process.env.MAIL_FROM || 'noreply@moneyhero.co.kr';

    console.log('10. 관리자 메일 발송 시작');
    // 1) 내부 알림 메일 (담당자 수신)
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
    console.log('11. 관리자 메일 발송 성공');

    console.log('12. 고객 메일 발송 시작');
    // 2) 고객 회신 메일 (PDF 첨부)
    await transporter.sendMail({
      from: fromAddr,
      to: body.email,
      subject: `[머니히어로] ${body.name}님 채권추심 견적서 📋`,
      html: `
        <div style="font-family: system-ui; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0;">💰 머니히어로</h1>
            <p style="margin: 10px 0 0 0;">채권추심 견적서가 도착했습니다</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2>안녕하세요, ${body.name}님!</h2>
            <p>요청하신 채권추심 건에 대한 <strong>견적서를 PDF로 첨부</strong>해 드립니다.</p>
            
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
      attachments: [
        {
          filename: `견적서_${body.name}_${quote.quoteNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });
    console.log('13. 고객 메일 발송 성공');

    console.log('14. API 처리 완료');
    return NextResponse.json({ 
      ok: true, 
      quoteNumber: quote.quoteNumber,
      message: '견적서가 PDF로 발송되었습니다.' 
    });

  } catch (e: any) {
    console.error('에러 발생:', e);
    return NextResponse.json({ 
      error: '서버 오류가 발생했습니다.', 
      details: e.message
    }, { status: 500 });
  }
}