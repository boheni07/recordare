import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { HANDOVERS } from "@/lib/mock-data";

export default function HandoverListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="인계서 리스트"
        subtitle={`발행 ${HANDOVERS.length}건 · 초안 1건 포함`}
        actions={<Link href="/parent/handover/new" className="btn-primary text-sm">+ 새 인계서</Link>}
      />

      <section className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border">
            <tr className="text-left text-xs font-bold text-ink-mid">
              <th className="p-3">자녀</th>
              <th className="p-3">수신자</th>
              <th className="p-3">유형</th>
              <th className="p-3">상태</th>
              <th className="p-3">작성일</th>
              <th className="p-3">액션</th>
            </tr>
          </thead>
          <tbody>
            {HANDOVERS.map((h) => (
              <tr key={h.id} className="border-b border-border last:border-0">
                <td className="p-3 font-semibold">{h.child}</td>
                <td className="p-3">{h.to}</td>
                <td className="p-3 text-ink-mid">{h.type}</td>
                <td className="p-3">
                  {h.status === "발행 완료" ? (
                    <span className="badge bg-life-school/15 text-green-900">{h.status}</span>
                  ) : (
                    <span className="badge bg-alert/20 text-orange-900">{h.status}</span>
                  )}
                </td>
                <td className="p-3 text-ink-mid">{h.createdAt}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="text-xs text-accent font-bold">📥 PDF</button>
                    <button className="text-xs text-ink-mid">🔍 상세</button>
                    {h.status === "초안" && <button className="text-xs text-primary font-bold">✏️ 편집</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="grid md:grid-cols-3 gap-3">
        {[
          { v: HANDOVERS.length, l: "총 인계서 (누계)" },
          { v: 1, l: "초안 (작업 중)" },
          { v: 0, l: "수신자 ‘재작성 요청’ (목표 < 20%)" },
        ].map((s) => (
          <div key={s.l} className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.v}</div>
            <div className="text-xs text-ink-mid">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
