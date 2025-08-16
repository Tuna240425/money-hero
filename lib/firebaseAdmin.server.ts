// lib/firebaseAdmin.server.ts
// 서버 전용: 클라이언트에서 import 금지
import admin from 'firebase-admin'

if (!admin.apps.length) {
  // 환경변수 체크
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Firebase 환경변수가 설정되지 않았습니다. Firebase 기능이 비활성화됩니다.')
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        } as admin.ServiceAccount),
      })
      console.log('Firebase Admin 초기화 성공')
    } catch (error) {
      console.error('Firebase Admin 초기화 실패:', error)
    }
  }
}

// ✅ 서브패스('firebase-admin/firestore') 대신 최상위에서 firestore 사용
export const db = admin.apps.length > 0 ? admin.firestore() : null

// 새로운 견적 요청 타입 정의
export interface QuoteRequest {
  // 기본 정보
  name: string
  email: string
  phone: string
  role: '채권자' | '채무자'
  counterparty: '개인' | '법인/사업자'
  amount: string
  summary?: string
  
  // 새로운 서비스 관련 필드
  requestedService?: 'start' | 'standard' | 'package' // 선택적으로 변경
  selectedServicePrice?: number // 선택적으로 변경
  quoteNumber?: string // 선택적으로 변경
  
  // 메타 정보
  meta?: {
    ip: string
    ua: string
  }
  createdAt?: admin.firestore.Timestamp | Date
  status?: 'new' | 'contacted' | 'converted' | 'completed'
}

// 기존 상담 요청 타입 (기존 코드와의 호환성 유지)
export interface ConsultationRequest {
  name: string
  phone: string
  message?: string
  meta?: {
    ip: string
    ua: string
  }
  createdAt?: admin.firestore.Timestamp | Date
  status?: 'new' | 'contacted' | 'completed'
}