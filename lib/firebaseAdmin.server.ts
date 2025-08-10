// 서버 전용: 클라이언트에서 import 금지
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    } as admin.ServiceAccount),
  })
}

// ✅ 서브패스('firebase-admin/firestore') 대신 최상위에서 firestore 사용
export const db = admin.firestore()
