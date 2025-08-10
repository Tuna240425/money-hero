// 서버 전용. 클라이언트에서 import하지 마세요.

export type QuoteForm = {
  name: string
  email: string
  phone: string
  role: '채권자' | '채무자'
  counterparty: '개인' | '법인/사업자'
  amount: '~500만원' | '500만~1천만' | '1천만~3천만' | '3천만~5천만' | '5천만 이상'
  summary?: string
}

export function calculateQuote(amount: QuoteForm['amount'], counterparty: QuoteForm['counterparty'], role: QuoteForm['role']) {
  const basePrice: Record<QuoteForm['amount'], number> = {
    '~500만원': 50,
    '500만~1천만': 80,
    '1천만~3천만': 120,
    '3천만~5천만': 200,
    '5천만 이상': 300,
  }
  const multiplier = counterparty === '법인/사업자' ? 1.3 : 1.0
  const consultingFee = Math.round((basePrice[amount] || 100) * multiplier)
  const successFee = role === '채권자' ? '회수금액의 15-25%' : '협상된 감액의 10-20%'
  return { consultingFee, successFee }
}

export function generateQuoteNumber() {
  const d = new Date()
  return `MH-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`
}

export function generateQuoteHTML(form: QuoteForm) {
  const quote = calculateQuote(form.amount, form.counterparty, form.role)
  const quoteNumber = generateQuoteNumber()
  const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const summaryHtml = form.summary ? esc(form.summary).replace(/\n/g,'<br>') : ''

  return {
    quoteNumber,
    html: `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>머니히어로 채권추심 견적서</title>
<style>
  body{font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif;line-height:1.6;color:#333;margin:0;padding:20px;background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)}
  .container{max-width:700px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.1)}
  .header{background:linear-gradient(135deg,#fbbf24 0%,#f59e0b 50%,#d97706 100%);color:#fff;padding:50px 40px;text-align:center;position:relative}
  .quote-number{position:absolute;top:20px;right:30px;background:rgba(255,255,255,.2);padding:8px 16px;border-radius:20px;font-size:14px;font-weight:bold}
  .logo{font-size:32px;font-weight:900;margin-bottom:10px}
  .header h1{margin:0 0 15px 0;font-size:28px;font-weight:bold}
  .content{padding:40px}
  .section{margin-bottom:40px}
  .section h2{color:#1f2937;font-size:22px;margin:0 0 20px 0;padding:15px 0 15px 20px;background:linear-gradient(90deg,#fbbf24,transparent);border-radius:10px}
  .info-table{width:100%;border-collapse:collapse;margin:20px 0;background:#f8f9fa;border-radius:12px;overflow:hidden}
  .info-table th,.info-table td{padding:16px 20px;text-align:left;border-bottom:1px solid #e9ecef}
  .info-table th{background:linear-gradient(135deg,#f1f3f4,#e2e8f0);font-weight:600;color:#374151;width:35%}
  .quote-table{width:100%;border-collapse:collapse;margin:25px 0;border-radius:12px;overflow:hidden;box-shadow:0 8px 16px rgba(251,191,36,.2)}
  .quote-table th{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;padding:20px;font-weight:bold;text-align:center}
  .quote-table td{padding:25px 20px;text-align:center;background:#fffbeb;font-size:20px;font-weight:700;color:#92400e}
  .price-highlight{font-size:24px;color:#dc2626}
  .highlight-box{background:linear-gradient(135deg,#fef3c7,#fde68a);padding:30px;border-radius:15px;margin:30px 0;border-left:6px solid #f59e0b}
  .contact-info{background:linear-gradient(135deg,#1f2937,#111827);color:#fff;padding:40px;text-align:center}
  .contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin:20px 0}
  .contact-item{background:rgba(255,255,255,.1);padding:15px;border-radius:10px}
</style></head>
<body><div class="container">
  <div class="header">
    <div class="quote-number">견적서 #${quoteNumber}</div>
    <div class="logo">💰 머니히어로</div>
    <h1>채권추심 견적서</h1>
    <p>전문 변호사와 함께하는 체계적인 채권 회수</p>
  </div>
  <div class="content">
    <div class="section">
      <h2>📋 의뢰인 정보</h2>
      <table class="info-table">
        <tr><th>성함</th><td><strong>${esc(form.name)}</strong></td></tr>
        <tr><th>구분</th><td>${form.role}</td></tr>
        <tr><th>상대방</th><td>${form.counterparty}</td></tr>
        <tr><th>채권금액</th><td><span style="color:#dc2626;font-weight:bold;">${form.amount}</span></td></tr>
        <tr><th>연락처</th><td>${esc(form.phone)}</td></tr>
        <tr><th>이메일</th><td>${esc(form.email)}</td></tr>
      </table>
    </div>
    <div class="section">
      <h2>💰 견적 내역</h2>
      <table class="quote-table">
        <tr><th>착수금 (상담 + 1차 법적조치)</th><th>성공수수료</th></tr>
        <tr><td><span class="price-highlight">${quote.consultingFee}만원</span></td><td><span class="price-highlight">${quote.successFee}</span></td></tr>
      </table>
    </div>
    <div class="highlight-box">
      <h3 style="margin:0 0 20px 0;color:#92400e;">🎯 포함 서비스</h3>
      <ul style="margin:0;padding-left:25px;">
        <li style="margin-bottom:12px;color:#78350f;"><strong>무료 사전 상담:</strong> 회수 가능성·기간 분석</li>
        <li style="margin-bottom:12px;color:#78350f;"><strong>1차 법적 조치:</strong> 내용증명 + 지급명령 신청</li>
        <li style="margin-bottom:12px;color:#78350f;"><strong>보전 조치:</strong> 필요시 가압류/가처분</li>
        <li style="margin-bottom:12px;color:#78350f;"><strong>강제 집행:</strong> 재산조회 및 압류</li>
        <li style="margin-bottom:12px;color:#78350f;"><strong>실시간 안내:</strong> 진행상황 알림</li>
      </ul>
    </div>
    ${summaryHtml ? `<div class="section"><h2>📝 사건 개요</h2><div style="background:#f8f9fa;padding:20px;border-radius:12px;border-left:4px solid #6b7280;">${summaryHtml}</div></div>` : ''}
  </div>
  <div class="contact-info">
    <h3>📞 연락처 및 상담</h3>
    <div class="contact-grid">
      <div class="contact-item"><div>대표번호</div><div style="font-weight:bold;color:#fbbf24;">02-1234-5678</div></div>
      <div class="contact-item"><div>이메일</div><div style="font-weight:bold;color:#fbbf24;">contact@moneyhero.co.kr</div></div>
      <div class="contact-item"><div>영업시간</div><div style="font-weight:bold;color:#fbbf24;">평일 09:00-18:00</div></div>
    </div>
    <p style="margin:25px 0 10px 0;font-size:14px;opacity:.8;">© 2025 머니히어로. 모든 권리 보유.</p>
  </div>
</div></body></html>`
  }
}
