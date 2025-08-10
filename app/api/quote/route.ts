// app/api/quote/route.ts
'use server'

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import puppeteer from 'puppeteer'

// 견적서 HTML 생성 함수
function createQuoteHTML(formData: any, quote: any): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <style>
        @page { 
            size: A4; 
            margin: 20mm; 
        }
        body { 
            font-family: 'Malgun Gothic', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            background: white;
        }
        .container { 
            max-width: 100%; 
            margin: 0 auto; 
            background: white; 
        }
        .header { 
            background: linear-gradient(135deg, #fbbf24, #f59e0b); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .logo { 
            font-size: 28px; 
            font-weight: 900; 
            margin-bottom: 10px; 
        }
        .header h1 { 
            margin: 0 0 10px 0; 
            font-size: 24px; 
        }
        .quote-number {
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            display: inline-block;
            margin-top: 10px;
        }
        .section { 
            margin-bottom: 30px; 
            page-break-inside: avoid;
        }
        .section h2 { 
            color: #1f2937; 
            font-size: 18px; 
            margin: 0 0 15px 0; 
            padding: 10px 15px; 
            background: linear-gradient(90deg, #fbbf24, transparent);
            border-radius: 8px;
        }
        .info-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 15px 0; 
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }
        .info-table th, .info-table td { 
            padding: 12px 15px; 
            text-align: left; 
            border-bottom: 1px solid #e5e7eb; 
        }
        .info-table th { 
            background: #f9fafb; 
            font-weight: 600; 
            color: #374151; 
            width: 30%; 
        }
        .quote-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            border: 2px solid #fbbf24;
            border-radius: 8px;
            overflow: hidden;
        }
        .quote-table th { 
            background: #fbbf24; 
            color: white; 
            padding: 15px; 
            font-weight: bold; 
            text-align: center; 
        }
        .quote-table td { 
            padding: 20px 15px; 
            text-align: center; 
            background: #fffbeb; 
            font-size: 18px; 
            font-weight: 700; 
            color: #92400e; 
        }
        .highlight-box { 
            background: #fef3c7; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #f59e0b; 
        }
        .highlight-box h3 { 
            margin: 0 0 15px 0; 
            color: #92400e; 
        }
        .contact-info { 
            background: #1f2937; 
            color: white; 
            padding: 25px; 
            border-radius: 8px; 
            margin-top: 30px;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 15px 0;
        }
        .contact-item { 
            background: rgba(255,255,255,0.1);
            padding: 10px;
            border-radius: 6px;
            font-size: 14px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💰 머니히어로</div>
            <h1>채권추심 견적서</h1>
            <p>전문 변호사와 함께하는 체계적인 채권 회수</p>
            <div class="quote-number">견적서 #${quote.quoteNumber || 'MH-2025-001'}</div>
        </div>
        
        <div class="section">
            <h2>📋 의뢰인 정보</h2>
            <table class="info-table">
                <tr><th>성함</th><td><strong>${formData.name}</strong></td></tr>
                <tr><th>구분</th><td>${formData.role}</td></tr>
                <tr><th>상대방</th><td>${formData.counterparty}</td></tr>
                <tr><th>채권금액</th><td><strong>${formData.amount}</strong></td></tr>
                <tr><th>연락처</th><td>${formData.phone}</td></tr>
            </table>
        </div>
        
        <div class="section">
            <h2>💰 견적 내역</h2>
            <table class="quote-table">
                <tr>
                    <th>착수금 (상담 + 1차 법적조치)</th>
                    <th>성공수수료</th>
                </tr>
                <tr>
                    <td><strong>${quote.consultingFee}만원</strong></td>
                    <td><strong>${quote.successFee}</strong></td>
                </tr>
            </table>
            <p style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 10px;">
                * 정확한 견적은 사건 검토 후 최종 확정됩니다.
            </p>
        </div>
        
        <div class="highlight-box">
            <h3>🎯 포함 서비스</h3>
            <ul style="margin: 0; padding-left: 20px;">
                <li><strong>무료 사전 상담:</strong> 채권 회수 가능성 분석</li>
                <li><strong>1차 법적 조치:</strong> 내용증명 + 지급명령 신청</li>
                <li><strong>보전 조치:</strong> 필요시 가압류/가처분 신청</li>
                <li><strong>강제 집행:</strong> 재산조회 및 압류 절차</li>
                <li><strong>실시간 안내:</strong> 진행상황 카톡/문자 알림</li>
                <li><strong>사후 관리:</strong> 미회수시 정기 모니터링</li>
            </ul>
        </div>
        
        ${formData.summary ? `
        <div class="section">
            <h2>📝 사건 개요</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #6b7280;">
                ${formData.summary.replace(/\n/g, '<br>')}
            </div>
        </div>
        ` : ''}
        
        <div class="contact-info">
            <h3 style="margin: 0 0 15px 0; color: #fbbf24;">📞 연락처</h3>
            <div class="contact-grid">
                <div class="contact-item">
                    <div>대표번호: <strong>02-1234-5678</strong></div>
                </div>
                <div class="contact-item">
                    <div>이메일: <strong>contact@moneyhero.co.kr</strong></div>
                </div>
                <div class="contact-item">
                    <div>카카오톡: <strong>@머니히어로</strong></div>
                </div>
                <div class="contact-item">
                    <div>영업시간: <strong>평일 09:00-18:00</strong></div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2025 머니히어로. 모든 권리 보유. | 사업자등록번호: 123-45-67890</p>
            <p>발급일: ${new Date().toLocaleDateString('ko-KR')}</p>
        </div>
    </div>
</body>
</html>
  `;
}

// PDF 생성 함수 (타입 수정)
async function generatePDF(htmlContent: string): Promise<Uint8Array> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    }
  });
  
  await browser.close();
  return pdfBuffer;
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
    const body = await req.json();

    // 간단한 서버측 검증
    const required = ['name','email','phone','role','counterparty','amount'];
    for (const k of required) {
      if (!body?.[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 });
    }

    // 견적 계산
    const quote = calculateQuote(body.amount, body.counterparty, body.role);

    // HTML 생성
    const htmlContent = createQuoteHTML(body, quote);
    
    // PDF 생성
    const pdfBuffer = await generatePDF(htmlContent);

    // SMTP 트랜스포터 (createTransport 오타 수정)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toOps = process.env.MAIL_TO || 'ops@example.com';
    const fromAddr = process.env.MAIL_FROM || 'noreply@moneyhero.co.kr';

    // 1) 내부 알림 메일 (담당자 수신) - 개선된 버전
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
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf'
        }
      ]
    });

    return NextResponse.json({ 
      ok: true, 
      quoteNumber: quote.quoteNumber,
      message: '견적서가 PDF로 발송되었습니다.' 
    });

  } catch (e: any) {
    console.error('PDF 생성/발송 실패:', e);
    return NextResponse.json({ error: 'PDF 생성에 실패했습니다.' }, { status: 500 });
  }
}