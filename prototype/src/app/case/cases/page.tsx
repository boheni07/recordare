import Link from "next/link";
import { PageHeader, LifeBadge } from "@/components/Card";
import { CASES_LIST } from "@/lib/mock-data";

export default function CasesListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="케이스 리스트"
        subtitle={`담당 케이스 ${CASES_LIST.length}건 (시범 모드) · 권한 범위 외 N건 자동 비공개`}
        actions={<button className="btn-primary text-sm">+ 새 케이스 할당</button>}
      />

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap text-xs">
        {["전체 (32)", "활성 (28)", "검토 중 (3)", "보류 (1)", "권한 만료 임박 (2)", "신규 (3)"].map((f, i) => (
          <button key={f} className={`rounded-full px-3 py-1.5 font-semibold ${i === 0 ? "bg-primary text-white" : "bg-white border border-border hover:border-primary"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Search & sort */}
      <section className="card p-4 flex items-center gap-3">
        <input className="flex-1 rounded-lg border border-border px-4 py-2 text-sm" placeholder="🔍 이름·등급·기관으로 검색" />
        <select className="rounded-lg border border-border px-3 py-2 text-sm"><option>최근 업데이트 순</option><option>우선순위 순</option><option>이름 순</option></select>
      </section>

      {/* Table */}
      <section className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border">
            <tr className="text-left text-xs font-bold text-ink-mid">
              <th className="p-3">이용자</th>
              <th className="p-3">생애주기</th>
              <th className="p-3">우선순위</th>
              <th className="p-3">권한 범위</th>
              <th className="p-3">마지막 변동</th>
              <th className="p-3">상태</th>
              <th className="p-3">액션</th>
            </tr>
          </thead>
          <tbody>
            {CASES_LIST.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                <td className="p-3">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-ink-mid">{c.id}</div>
                </td>
                <td className="p-3"><LifeBadge stage={c.stage} /></td>
                <td className="p-3">
                  {c.priority === "high" ? (
                    <span className="badge bg-alert text-white">🔥 우선</span>
                  ) : (
                    <span className="badge bg-secondary text-ink-mid">일반</span>
                  )}
                </td>
                <td className="p-3 text-xs">{c.scope}</td>
                <td className="p-3 text-xs text-ink-mid">{c.lastUpdate}</td>
                <td className="p-3">
                  <span className={`badge ${c.status === "active" ? "bg-life-school/15 text-green-900" : "bg-life-transition/15 text-blue-900"}`}>
                    {c.status === "active" ? "활성" : "검토 중"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <Link href="/case/meeting" className="text-xs text-accent font-bold">📊 자료</Link>
                    <button className="text-xs text-ink-mid">🔍</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Privacy note */}
      <div className="rounded-lg bg-life-transition/10 border border-life-transition p-4 text-sm">
        🔒 <strong>권한 마스킹:</strong> 본 리스트에 보이지 않는 케이스는 권한 범위 외이거나 보호자가 사전 검토 옵션을 켜둔 상태입니다.
        ‘권한 외 데이터 12건 비공개’ 사실은 항상 표시됩니다 (정보 은닉 vs 투명성 균형).
      </div>
    </div>
  );
}
