import Link from "next/link";
import { PageHeader, StatCard } from "@/components/Card";

const QUARTERLY = [
  { id: "qh-001", resident: "박지훈", to: "○○복지관", type: "기관 이동", parent: "✓ 동의", b2g: true },
  { id: "qh-002", resident: "최영진", to: "△△단기캠프", type: "단기", parent: "✓ 동의", b2g: false },
  { id: "qh-003", resident: "윤서연", to: "□□전환학교", type: "전학", parent: "⏳ 대기", b2g: true },
  { id: "qh-004", resident: "이지원", to: "○○복지관", type: "기관 이동", parent: "✓ 동의", b2g: true },
  { id: "qh-005", resident: "송민서", to: "△△단기캠프", type: "단기", parent: "✓ 동의", b2g: false },
  { id: "qh-006", resident: "강하늘", to: "그룹홈 이전", type: "이전", parent: "✓ 동의", b2g: true },
  { id: "qh-007", resident: "박재현", to: "○○복지관", type: "기관 이동", parent: "✓ 동의", b2g: true },
];

export default function QuarterlyHandoverPage() {
  const consented = QUARTERLY.filter((q) => q.parent === "✓ 동의").length;
  const b2g = QUARTERLY.filter((q) => q.b2g).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="분기 인계서 일괄 승인"
        subtitle="2026 Q2 · 12명 중 7명 발행 대상 · B2G 자동 식별"
        actions={<button className="btn-primary text-sm">📄 일괄 승인 + PDF 발행</button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="발행 대상" value={`${QUARTERLY.length}건`} sub="2026 Q2" />
        <StatCard label="보호자 동의 완료" value={`${consented}건`} sub={`${QUARTERLY.length - consented}건 대기`} color="#5CB85C" />
        <StatCard label="B2G 청구 대상" value={`${b2g}건`} sub="바우처 자동 식별" color="#E07A5F" />
        <StatCard label="예상 청구액" value="1.2억원" sub="이번 분기" color="#3B82F6" />
      </div>

      {/* Thumbnail grid preview */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark mb-3">발행 대상 미리보기 (썸네일 그리드)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {QUARTERLY.map((q) => (
            <div key={q.id} className={`rounded-lg border-2 p-3 ${q.parent === "✓ 동의" ? "border-life-school bg-life-school/5" : "border-alert bg-alert/5"}`}>
              <div className="aspect-square rounded bg-white border border-border flex items-center justify-center text-3xl">📄</div>
              <div className="mt-2 font-bold text-xs">{q.resident}</div>
              <div className="text-[10px] text-ink-mid">{q.to}</div>
              <div className="text-[10px] mt-1">{q.parent}</div>
              {q.b2g && <span className="mt-1 inline-block badge bg-accent text-white text-[10px]">B2G</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Detail table */}
      <section className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border text-xs font-bold text-ink-mid">
            <tr className="text-left">
              <th className="p-3">이용자</th>
              <th className="p-3">수신자</th>
              <th className="p-3">유형</th>
              <th className="p-3">보호자 동의</th>
              <th className="p-3">B2G 대상</th>
              <th className="p-3">액션</th>
            </tr>
          </thead>
          <tbody>
            {QUARTERLY.map((q) => (
              <tr key={q.id} className="border-b border-border last:border-0">
                <td className="p-3 font-semibold">{q.resident}</td>
                <td className="p-3">{q.to}</td>
                <td className="p-3 text-xs text-ink-mid">{q.type}</td>
                <td className="p-3">
                  {q.parent === "✓ 동의" ? (
                    <span className="badge bg-life-school/15 text-green-900">✓ 완료</span>
                  ) : (
                    <span className="badge bg-alert/20 text-orange-900">⏳ 대기</span>
                  )}
                </td>
                <td className="p-3">
                  {q.b2g ? <span className="badge bg-accent text-white">B2G ✓</span> : <span className="text-xs text-ink-mid">—</span>}
                </td>
                <td className="p-3">
                  <button className="text-xs text-accent font-bold">🔍 검토</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Action panel */}
      <section className="rounded-xl bg-life-transition/5 border-2 border-life-transition p-5">
        <h2 className="font-bold text-blue-900">📋 일괄 처리 액션</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-white border border-border p-3">
            <div className="font-bold text-sm">대기 1건 자동 요청</div>
            <div className="text-xs text-ink-mid mt-1">윤서연 보호자에게 동의 요청 푸시</div>
            <button className="mt-2 btn-secondary text-xs py-1.5">요청 보내기</button>
          </div>
          <div className="rounded-lg bg-white border border-border p-3">
            <div className="font-bold text-sm">동의 완료 6건 일괄 발행</div>
            <div className="text-xs text-ink-mid mt-1">PDF + 시스템 동시 전달</div>
            <button className="mt-2 btn-primary text-xs py-1.5">📄 PDF 일괄 발행</button>
          </div>
          <div className="rounded-lg bg-white border border-border p-3">
            <div className="font-bold text-sm">B2G 청구 리포트</div>
            <div className="text-xs text-ink-mid mt-1">5건 자동 식별 · 사회서비스 바우처</div>
            <Link href="/facility/billing/b2g" className="mt-2 btn-accent text-xs py-1.5">💰 청구로 →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
