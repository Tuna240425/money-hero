"use client"

import { useState } from "react"
import Footer from "@/app/components/Footer"

const pricingData = [
  {
    id: "under500",
    category: "500만원 이하",
    details: {
      착수금: "220,000원~ (VAT 별도)",
      성공보수:
        "채권금액의 6~15% (회수금액 기준)\n사건 난이도·증거 확보 수준에 따라 차등 적용\n무자력 등 회수 불가 시 발생하지 않음",
      추가비용:
        "집행비용(법원 인지·송달료, 집행관 수수료): 실비 정산\n담보제공 필요 시 공탁비: 회수 후 환급\n모든 추가 비용은 사전 안내 후 동의 하에 진행",
      중도해지:
        "내용증명 발송 전: 착수금의 50% 환불\n지급명령 신청 전: 착수금의 30% 환불\n소송 진행 중: 진행 단계에 따라 차등 환불\n해지 사유가 변호사 측에 있는 경우: 잔여 업무 비율에 따라 환불",
    },
  },
  {
    id: "under5000",
    category: "5천만원 이하",
    details: {
      착수금: "330,000원~ (VAT 별도)",
      성공보수:
        "채권금액의 6~15% (회수금액 기준)\n사건 난이도·증거 확보 수준에 따라 차등 적용\n무자력 등 회수 불가 시 발생하지 않음",
      추가비용:
        "집행비용(법원 인지·송달료, 집행관 수수료): 실비 정산\n담보제공 필요 시 공탁비: 회수 후 환급\n모든 추가 비용은 사전 안내 후 동의 하에 진행",
      중도해지:
        "내용증명 발송 전: 착수금의 50% 환불\n지급명령 신청 전: 착수금의 30% 환불\n소송 진행 중: 진행 단계에 따라 차등 환불\n해지 사유가 변호사 측에 있는 경우: 잔여 업무 비율에 따라 환불",
    },
  },
  {
    id: "over1b",
    category: "1억 이상",
    details: {
      착수금: "개별 견적 (채권금액의 0.3~0.5% 기준)",
      성공보수:
        "채권금액의 6~15% (회수금액 기준)\n사건 난이도·증거 확보 수준에 따라 차등 적용\n무자력 등 회수 불가 시 발생하지 않음",
      추가비용:
        "집행비용(법원 인지·송달료, 집행관 수수료): 실비 정산\n담보제공 필요 시 공탁비: 회수 후 환급\n모든 추가 비용은 사전 안내 후 동의 하에 진행",
      중도해지:
        "내용증명 발송 전: 착수금의 50% 환불\n지급명령 신청 전: 착수금의 30% 환불\n소송 진행 중: 진행 단계에 따라 차등 환불\n해지 사유가 변호사 측에 있는 경우: 잔여 업무 비율에 따라 환불",
    },
  },
]

export default function PricingPage() {
  const [selected, setSelected] = useState(pricingData[0].id)
  const activeData = pricingData.find((item) => item.id === selected)

  return (
    <>

      <main className="pt-20 pb-16 bg-white dark:bg-neutral-900 min-h-screen">
        <section className="container mx-auto px-6 py-12">
          {/* 상단 설명 */}
          <h1 className="text-3xl font-bold mb-4">이용 요금 안내</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            채권 금액 구간별로 착수금, 성공보수, 추가 비용, 중도 해지 시 수임료 처리 기준을 확인하실 수 있습니다.
          </p>

          {/* 2열 레이아웃 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left: Category list */}
            <div className="md:col-span-1 space-y-2">
              {pricingData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium transition ${
                    selected === item.id
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>

            {/* Right: Details */}
            <div className="md:col-span-3 bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow">
              {activeData && (
                <div className="space-y-6 text-gray-800 dark:text-gray-200">
                  <div>
                    <h3 className="font-bold">가. 착수금 (VAT 별도)</h3>
                    <p className="whitespace-pre-line">{activeData.details.착수금}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">나. 성공보수 (회수 시 지급)</h3>
                    <p className="whitespace-pre-line">{activeData.details.성공보수}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">다. 추가 비용</h3>
                    <p className="whitespace-pre-line">{activeData.details.추가비용}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">라. 중도 해지 시 수임료 처리</h3>
                    <p className="whitespace-pre-line">{activeData.details.중도해지}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 하단 설명 */}
          <div className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
            ※ 모든 금액은 부가가치세(VAT) 별도입니다.
            <br />
            ※ 구체적인 비용은 상담 후 사건 특성에 따라 변동될 수 있습니다.
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
