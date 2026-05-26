import Link from "next/link";
import { PageHeader, StatCard } from "@/components/Card";
import { FACILITY_RESIDENTS, BULK_PERMISSIONS_EXPIRING } from "@/lib/mock-data";

export default function FacilityDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="시설장 대시보드"
        subtitle="안녕하세요 정원장님 · 푸른그룹홈 · 2026-05-25 (월) 09:00"
        actions={<Link href="/facility/billing/b2g" className="btn-primary text-sm">💰 B2G 청구 →</Link>}
      />

      {/* 3-KPI 카드 (FR-21) */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-6 bg-gradient-to-br from-life-school/10 to-life-school/5 border-l-4 border-life-school">
          <div className="text-xs font-bold text-life-school">이용자</div>
          <div className="mt-2 text-5xl font-extrabold text-life-school">12</div>
          <div className="mt-1 text-xs text-ink-mid">정원 12명 · 만석</div>
          <div className="mt-3 text-xs text-ink-mid">신규 입소 1건 · 퇴소 0건 (이번 달)</div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-life-transition/10 to-life-transition/5 border-l-4 border-life-transition">
          <div className="text-xs font-bold text-life-transition">활동지원사</div>
          <div className="mt-2 text-5xl font-extrabold text-life-transition">5</div>
          <div className="mt-1 text-xs text-ink-mid">정원 5명 · 모두 활성</div>
          <div className="mt-3 text-xs text-ink-mid">자격증 유효 5/5 · 이번 분기 갱신 1건</div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-alert/15 to-alert/5 border-l-4 border-alert">
          <div className="text-xs font-bold text-alert">이번 주 만료</div>
          <div className="mt-2 text-5xl font-extrabold text-alert">3</div>
          <div className="mt-1 text-xs text-ink-mid">권한 만료 임박 건수</div>
          <Link href="/facility/permissions/bulk" className="mt-3 inline-block text-xs font-bold text-alert hover:underline">일괄 갱신 →</Link>
        </div>
      </div>

      {/* Quick actions */}
      <section className="grid md:grid-cols-4 gap-3">
        {[
          { icon: "🔑", title: "권한 일괄 갱신", desc: "3명 영향 미리보기", href: "/facility/permissions/bulk", color: "#5CB85C" },
          { icon: "📂", title: "분기 인계서 정산", desc: "12명 일괄 승인", href: "/facility/handover/quarterly", color: "#3B82F6" },
          { icon: "💰", title: "B2G 바우처 청구", desc: "분기 자동 생성", href: "/facility/billing/b2g", color: "#E07A5F" },
          { icon: "📊", title: "감사 로그", desc: "5년 보존 CSV", href: "#", color: "#7C3AED" },
        ].map((a) => (
          <Link key={a.title} href={a.href} className="card p-4 hover:-translate-y-1 transition border-t-4" style={{ borderTopColor: a.color }}>
            <div className="text-2xl">{a.icon}</div>
            <div className="mt-2 font-bold text-primary-dark text-sm">{a.title}</div>
            <div className="text-xs text-ink-mid">{a.desc}</div>
          </Link>
        ))}
      </section>

      {/* Expiring permissions */}
      <section className="card p-6 border-l-4 border-alert">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-alert">⚠️ 이번 주 만료 (3건)</h2>
          <Link href="/facility/permissions/bulk" className="btn-secondary text-xs">일괄 갱신 →</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs text-ink-mid">
            <tr className="text-left">
              <th className="p-2">활동지원사</th>
              <th className="p-2">담당 이용자 수</th>
              <th className="p-2">만료일</th>
              <th className="p-2">잔여</th>
            </tr>
          </thead>
          <tbody>
            {BULK_PERMISSIONS_EXPIRING.map((p) => (
              <tr key={p.worker} className="border-t border-border">
                <td className="p-2 font-semibold">{p.worker}</td>
                <td className="p-2">{p.residents}명</td>
                <td className="p-2 text-xs text-ink-mid">{p.currentEnd}</td>
                <td className="p-2 font-bold text-alert">D-{p.daysLeft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Residents */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">이용자 현황 (12명 중 3명 표시)</h2>
          <button className="text-xs text-accent font-bold">전체 보기 →</button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {FACILITY_RESIDENTS.map((r) => (
            <div key={r.name} className="rounded-lg border border-border p-3">
              <div className="font-bold">{r.name}</div>
              <div className="text-xs text-ink-mid mt-1">{r.room} · 입소 {r.entered}</div>
              <div className="text-xs text-ink-mid">담당: {r.primary}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
