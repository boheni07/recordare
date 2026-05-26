import Link from "next/link";
import { PageHeader, StatCard } from "@/components/Card";

const B2G_ITEMS = [
  { id: "b2g-001", resident: "박지훈", handover: "qh-001", amount: "1,850,000", status: "준비" },
  { id: "b2g-002", resident: "윤서연", handover: "qh-003", amount: "2,100,000", status: "대기 (보호자 동의)" },
  { id: "b2g-003", resident: "이지원", handover: "qh-004", amount: "1,650,000", status: "준비" },
  { id: "b2g-004", resident: "강하늘", handover: "qh-006", amount: "2,400,000", status: "준비" },
  { id: "b2g-005", resident: "박재현", handover: "qh-007", amount: "1,950,000", status: "준비" },
];

export default function B2GBillingPage() {
  const total = 9_950_000;
  const ready = B2G_ITEMS.filter((b) => b.status === "준비").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="B2G 사회서비스 바우처 분기 청구"
        subtitle="2026 Q2 · 자동 식별된 5건 + 인계서 첨부 (FR-56 · v2.1 신규)"
      />

      {/* Risk #8 Banner */}
      <div className="rounded-xl bg-red-50 border-2 border-red-300 p-5">
        <div className="flex items-start gap-3">
          <div className="text-3xl">⚠️</div>
          <div className="flex-1">
            <div className="font-bold text-red-900">시설장 검토 필수 — Risk #8 대응</div>
            <p className="text-sm text-red-800 mt-1">
              B2G 청구는 자동 발행되지 않습니다. 시설장이 각 항목을 직접 검토한 후 발행하세요.
              잘못된 청구는 보건복지부 환수 통보로 이어질 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="분기" value="2026 Q2" sub="4~6월" />
        <StatCard label="대상 이용자" value={`${B2G_ITEMS.length}명`} sub="자동 식별" />
        <StatCard label="발행 준비" value={`${ready}건`} sub={`대기 ${B2G_ITEMS.length - ready}건`} color="#5CB85C" />
        <StatCard label="총 청구액" value={`${(total / 100_000_000).toFixed(2)}억`} sub={`${total.toLocaleString()}원`} color="#E07A5F" />
      </div>

      {/* Items */}
      <section className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border text-xs font-bold text-ink-mid">
            <tr className="text-left">
              <th className="p-3">청구 ID</th>
              <th className="p-3">이용자</th>
              <th className="p-3">연결 인계서</th>
              <th className="p-3 text-right">청구 금액</th>
              <th className="p-3">상태</th>
              <th className="p-3">액션</th>
            </tr>
          </thead>
          <tbody>
            {B2G_ITEMS.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0">
                <td className="p-3 font-mono text-xs">{b.id}</td>
                <td className="p-3 font-semibold">{b.resident}</td>
                <td className="p-3 font-mono text-xs text-ink-mid">{b.handover}</td>
                <td className="p-3 text-right font-bold">{b.amount}원</td>
                <td className="p-3">
                  {b.status === "준비" ? (
                    <span className="badge bg-life-school/15 text-green-900">{b.status}</span>
                  ) : (
                    <span className="badge bg-alert/20 text-orange-900">{b.status}</span>
                  )}
                </td>
                <td className="p-3">
                  <button className="text-xs text-accent font-bold">🔍 검토</button>
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-primary bg-primary/5">
              <td colSpan={3} className="p-3 font-bold text-right">합계</td>
              <td className="p-3 text-right font-bold text-primary">{total.toLocaleString()}원</td>
              <td colSpan={2} />
            </tr>
          </tbody>
        </table>
      </section>

      {/* Documents */}
      <section className="grid md:grid-cols-3 gap-3">
        {[
          { icon: "📑", title: "청구서 PDF", desc: "사회보장정보시스템 양식", action: "발행 후 다운로드" },
          { icon: "📎", title: "인계서 첨부 ZIP", desc: "5건 인계서 PDF 묶음", action: "발행 후 다운로드" },
          { icon: "📊", title: "감사 리포트", desc: "5년 보존 (FR-47)", action: "자동 생성" },
        ].map((d) => (
          <div key={d.title} className="card p-4">
            <div className="text-3xl">{d.icon}</div>
            <div className="font-bold text-primary-dark mt-2">{d.title}</div>
            <div className="text-xs text-ink-mid mt-1">{d.desc}</div>
            <div className="text-[11px] text-accent mt-2 font-bold">{d.action}</div>
          </div>
        ))}
      </section>

      {/* Compliance note */}
      <section className="card p-5 bg-secondary border-l-4 border-life-transition">
        <h2 className="font-bold text-primary-dark">📜 컴플라이언스</h2>
        <ul className="mt-3 space-y-1 text-xs">
          <li>✓ 사회보장정보시스템(행복e음) 연동은 <strong>v1.1 이연</strong> — MVP에서는 PDF 수동 제출 지원</li>
          <li>✓ 전자세금계산서 자동 발행 (FR-57 · 국세청 e-Tax 형식)</li>
          <li>✓ 부가가치세법 면세 구분 자동 (의료 데이터 분리 처리)</li>
          <li>✓ 청구 PDF 발행 행동 5년 감사 로그 보존</li>
        </ul>
      </section>

      <div className="flex justify-between">
        <Link href="/facility" className="btn-secondary">← 대시보드</Link>
        <button className="btn-accent">💰 5건 일괄 검토 + 청구서 발행 →</button>
      </div>
    </div>
  );
}
