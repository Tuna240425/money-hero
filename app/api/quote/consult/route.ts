import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { db } from '@/lib/firebaseAdmin.server'
import { calculateQuote, generateQuoteHTML, type QuoteForm } from '@/lib/quote.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = QuoteForm & { company?: string } // 허니팟

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const ua = req.headers.get('user-agent') || 'unknown'
    const body = (await req.json()) as Partial<Body>

    // 허니팟(스팸) 처리
    if (body.company && body.company.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    // 필수값 검증
    const required: (keyof QuoteForm)[] = ['name','email','phone','role','counterparty','amount']
    for (const k of required) {
      if (!body[k]) return NextResponse.json({ ok:false, error:`MISSING_${k.toUpperCase()}` }, { status: 400 })
    }

    const form = body as QuoteForm
    const { consultingFee, successFee } = calculateQuote(form.amount, form.counterparty, form.role)
    const { quoteNumber, html } = generateQuoteHTML(form)

    // 1) Firestore 저장
    const docRef = await db.collection('consultations').add({
      ...form,
      quote: { consultingFee, successFee, quoteNumber },
      meta: { ip, ua },
      createdAt: new Date(),
      status: 'new',
    })

    // 2) 이메일 발송 설정
    const port = Number(process.env.SMTP_PORT || 465)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 3) 사용자에게 견적서 발송(HTML 본문)
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: form.email,
      subject: `머니히어로 맞춤 견적서 - ${form.name}님 (${quoteNumber})`,
      html,
    })

    // 4) 관리자 알림
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: `[머니히어로] 새 견적 요청 - ${form.name} (${quoteNumber})`,
      text:
`이름: ${form.name}
연락처: ${form.phone}
이메일: ${form.email}
역할: ${form.role}
상대방: ${form.counterparty}
금액: ${form.amount}
DocID: ${docRef.id}
IP: ${ip}
UA: ${ua}`,
    })

    return NextResponse.json({ ok: true, id: docRef.id, quoteNumber })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok:false, error:'SERVER_ERROR' }, { status: 500 })
  }
}
