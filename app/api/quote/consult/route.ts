import { NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin.server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'            // Nodemailer는 Node 런타임에서
export const dynamic = 'force-dynamic'     // 캐시 없이 항상 실행

type Payload = {
  name: string
  phone: string
  message?: string
  company?: string // 허니팟
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const ua = req.headers.get('user-agent') || 'unknown'
    const body = (await req.json()) as Payload

    // 스팸 방지(허니팟): 값 있으면 정상 응답 후 무시
    if (body.company && body.company.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    if (!body.name || !body.phone) {
      return NextResponse.json({ ok: false, error: 'INVALID_INPUT' }, { status: 400 })
    }

    // 1) Firestore 저장
    const docRef = await db.collection('consultations').add({
      name: body.name,
      phone: body.phone,
      message: body.message ?? '',
      meta: { ip, ua },
      createdAt: new Date(),
      status: 'new',
    })

    // 2) 이메일 발송
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailFrom = process.env.MAIL_FROM || 'no-reply@example.com'
    const mailTo = process.env.MAIL_TO || 'nana@aoffice.co.kr'

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: `[머니히어로] 무료 진단 신청 - ${body.name}`,
      text: `이름: ${body.name}\n연락처: ${body.phone}\n\n내용:\n${body.message || ''}\n\nDocID: ${docRef.id}\nIP: ${ip}\nUA: ${ua}`,
    })

    return NextResponse.json({ ok: true, id: docRef.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}
