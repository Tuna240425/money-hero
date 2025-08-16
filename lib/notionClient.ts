// lib/notionClient.ts
import { Client } from '@notionhq/client'

// 노션 클라이언트 초기화
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || ''

// 노션에 고객 데이터 저장하는 함수
export async function saveToNotion(data: {
  name: string
  email: string
  phone: string
  role: '채권자' | '채무자'
  counterparty: '개인' | '법인/사업자'
  amount: string
  summary?: string
  requestedService?: 'start' | 'standard' | 'package' | null
  quoteNumber: string
  selectedServicePrice?: number
}) {
  if (!NOTION_DATABASE_ID) {
    console.warn('NOTION_DATABASE_ID가 설정되지 않았습니다.')
    return null
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        // 제목 (이름 + 견적번호)
        '제목': {
          title: [
            {
              text: {
                content: `${data.name} (${data.quoteNumber})`
              }
            }
          ]
        },
        
        // 견적번호
        '견적번호': {
          rich_text: [
            {
              text: {
                content: data.quoteNumber
              }
            }
          ]
        },
        
        // 이름
        '이름': {
          rich_text: [
            {
              text: {
                content: data.name
              }
            }
          ]
        },
        
        // 이메일
        '이메일': {
          email: data.email
        },
        
        // 연락처
        '연락처': {
          phone_number: data.phone
        },
        
        // 의뢰자 유형
        '의뢰자유형': {
          select: {
            name: data.role
          }
        },
        
        // 상대방 유형
        '상대방유형': {
          select: {
            name: data.counterparty
          }
        },
        
        // 채권 금액
        '채권금액': {
          rich_text: [
            {
              text: {
                content: data.amount
              }
            }
          ]
        },
        
        // 요청 서비스
        '요청서비스': {
          select: {
            name: data.requestedService || '기본'
          }
        },
        
        // 서비스 가격
        '서비스가격': {
          number: data.selectedServicePrice || 0
        },
        
        // 사건 개요
        '사건개요': {
          rich_text: [
            {
              text: {
                content: data.summary || ''
              }
            }
          ]
        },
        
        // 상태
        '상태': {
          select: {
            name: '신규접수'
          }
        },
        
        // 접수일시
        '접수일시': {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    })
    
    console.log('노션에 데이터 저장 성공:', response.id)
    return response
  } catch (error) {
    console.error('노션 저장 실패:', error)
    throw error
  }
}