import Link from "next/link";
import { PageHeader } from "@/components/Card";

const KDST_DOMAINS = [
  { name: "대근육운동", color: "#FFC857", items: 8, sample: ["혼자 걸을 수 있나요?", "계단을 한 칸씩 오를 수 있나요?"] },
  { name: "소근육운동", color: "#5CB85C", items: 8, sample: ["블록을 4개 이상 쌓을 수 있나요?", "크레용으로 선을 그릴 수 있나요?"] },
  { name: "인지", color: "#3B82F6", items: 8, sample: ["사물의 이름을 말할 수 있나요?", "신체 부위 4가지를 가리킬 수 있나요?"] },
  { name: "언어", color: "#7C3AED", items: 8, sample: ["두 단어 문장을 말할 수 있나요?", "이름을 부르면 돌아보나요?"] },
  { name: "사회성", color: "#E07A5F", items: 8, sample: ["다른 아이의 행동을 따라하나요?", "낯선 사람을 경계하나요?"] },
  { name: "자조", color: "#6B7280", items: 8, sample: ["혼자 컵으로 물을 마실 수 있나요?", "옷을 혼자 벗으려 시도하나요?"] },
];

export default function KdstScreeningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="K-DST · 한국 영유아 발달선별검사"
        subtitle="박서연 (3세 · 30개월령 검사) · FR-62 · 보건복지부 표준"
        actions={<Link href="/parent/screening" className="btn-secondary text-sm">← 목록</Link>}
      />

      {/* 의료법 안전 배너 (필수) */}
      <div className="rounded-lg bg-yellow-50 border border-alert p-4 text-sm">
        ⚠️ <strong>의료 진단 아님:</strong> 본 검사는 보호자가 평소 자녀를 관찰한 의견을 기록하는 도구입니다.
        결과는 발달재활 전문의 상담의 참고 자료로 사용되며, 의료 진단서로 활용할 수 없습니다.
      </div>

      {/* 검사 정보 */}
      <section className="card p-5 bg-secondary">
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <div><div className="text-xs text-ink-mid">대상</div><div className="font-bold">박서연 (30개월)</div></div>
          <div><div className="text-xs text-ink-mid">총 문항</div><div className="font-bold">48문항 · 6영역</div></div>
          <div><div className="text-xs text-ink-mid">예상 시간</div><div className="font-bold">약 15분</div></div>
          <div><div className="text-xs text-ink-mid">응답자</div><div className="font-bold">보호자 (박순영)</div></div>
        </div>
      </section>

      {/* 진행률 */}
      <div className="card p-4">
        <div className="flex items-center justify-between text-sm">
          <strong className="text-primary-dark">검사 진행률</strong>
          <span className="text-accent font-bold">12 / 48 (25%)</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-primary" style={{ width: "25%" }} />
        </div>
      </div>

      {/* 6영역 카드 */}
      <section className="grid md:grid-cols-2 gap-4">
        {KDST_DOMAINS.map((d, i) => (
          <article key={d.name} className="card overflow-hidden">
            <div className="px-4 py-2 text-white font-bold text-sm flex items-center justify-between" style={{ backgroundColor: d.color }}>
              <span>📋 {d.name} ({d.items}문항)</span>
              <span className="badge bg-white/20 text-white text-[10px]">{i < 2 ? "완료" : i === 2 ? "진행 중" : "대기"}</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-ink-mid font-bold">예시 문항</div>
              <ul className="space-y-2 text-sm">
                {d.sample.map((q) => (
                  <li key={q} className="flex items-start gap-2 p-2 rounded border border-border">
                    <span className="text-ink-mid">Q.</span>
                    <span className="flex-1">{q}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-4 gap-1 text-xs">
                {["전혀 없음", "가끔", "보통", "잘 함"].map((opt, j) => (
                  <button key={opt} className={`rounded border-2 py-2 font-semibold ${j === 2 ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{opt}</button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 액션 */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Link href="/parent/screening" className="btn-secondary">← 나중에 이어서</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">초안 저장</button>
          <button className="btn-primary">제출 + AI 추이 분석 →</button>
        </div>
      </div>

      <div className="rounded-lg bg-life-transition/5 border border-life-transition p-4 text-xs">
        💡 제출하면 박서연님의 K-DST 시계열 데이터에 추가되어 AI 추이 분석에 반영됩니다 (FR-67).
        과거 검사 결과와 비교하여 영역별 변화를 자연어로 설명해드립니다.
      </div>
    </div>
  );
}
