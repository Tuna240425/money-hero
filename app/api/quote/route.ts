// app/api/quote/route.ts
'use server'

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 간단한 서버측 검증
    const required = ['name','email','phone','role','counterparty','amount']
    for (const k of required) {
      if (!body?.[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 })
    }

    // SMTP 트랜스포터
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toOps = process.env.OPS_EMAIL || 'ops@example.com'
    const fromAddr = process.env.FROM_EMAIL || 'noreply@moneyhero.co.kr'

    // 1) 내부 알림 메일 (담당자 수신)
    await transporter.sendMail({
      from: fromAddr,
      to: toOps,
      subject: `📝 [견적요청] ${body.role} / ${body.name} / ${body.amount}`,
      text: `
        의뢰자: ${body.name}
        이메일: ${body.email}
        연락처: ${body.phone}
        의뢰자 유형: ${body.role}
        상대방 유형: ${body.counterparty}
        채권 금액: ${body.amount}

        사건 개요:
        ${body.summary || '(미입력)'}
      `.trim(),
    })

    // 2) 고객 회신 메일 (견적 안내 템플릿)
    await transporter.sendMail({
      from: fromAddr,
      to: body.email,
      subject: '머니히어로 견적요청 접수 안내',
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,'Noto Sans KR',sans-serif;line-height:1.6">
          <h2>견적요청이 접수되었습니다.</h2>
          <p>안녕하세요, <strong>${body.name}</strong>님.<br/>
          요청하신 사건에 대해 당일 내(영업시간 기준) 1차 진단 및 예상 절차/비용을 회신드리겠습니다.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p><strong>요약</strong></p>
          <ul>
            <li>의뢰자 유형: ${body.role}</li>
            <li>상대방 유형: ${body.counterparty}</li>
            <li>채권 금액: ${body.amount}</li>
            <li>연락처: ${body.phone}</li>
          </ul>
          <p style="color:#666">* 보다 정확한 견적은 증빙 확인 후 확정됩니다.</p>
          <p>감사합니다.<br/>머니히어로 드림</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
