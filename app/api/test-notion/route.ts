// app/api/test-notion/route.ts (임시 인라인 버전)
import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET() {
  try {
    console.log('노션 연결 테스트 시작...')
    
    // 환경변수 확인
    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json({
        success: false,
        error: 'NOTION_TOKEN이 설정되지 않았습니다.',
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }
    
    if (!process.env.NOTION_DATABASE_ID) {
      return NextResponse.json({
        success: false,
        error: 'NOTION_DATABASE_ID가 설정되지 않았습니다.',
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }
    
    // 노션 클라이언트 생성
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    })
    
    // 데이터베이스 조회 테스트
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID
    })
    
    console.log('노션 연결 성공:', {
      databaseId: process.env.NOTION_DATABASE_ID,
      properties: Object.keys(database.properties)
    })
    
    return NextResponse.json({
      success: true,
      message: '노션 연결 성공!',
      databaseId: process.env.NOTION_DATABASE_ID,
      properties: Object.keys(database.properties),
      timestamp: new Date().toISOString()
    })
    
  } catch (error: unknown) {
    console.error('노션 테스트 API 오류:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : typeof error === 'string' 
      ? error 
      : '알 수 없는 오류가 발생했습니다.'
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}