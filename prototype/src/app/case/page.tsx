import Link from "next/link";
import { PageHeader, StatCard, LifeBadge } from "@/components/Card";
import { CASES_LIST } from "@/lib/mock-data";

export default function CaseDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="사회복지사 대시보드"
        subtitle="안녕하세요 최주임님 · 담당 케이스 32건 · 변동 5건"
        actions={<Link href="/case/meeting" className="btn-primary text-sm">📊 회의 자료 자동 생성 →</Link>}
      />

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="담당 케이스" value="32건" sub="신규 3 · 검토 5" />
        <StatCard label="이번 분기 회의 자료" value="11건" sub="작성 평균 3분 18초" color="#3B82F6" />
        <StatCard label="권한 만료 임박" value="2건" sub="D-7 / D-12" color="#F2A93B" />
        <StatCard label="보호자 이의 제기" value="0건" sub="목표 < 2% (현재 0%)" color="#5CB85C" />
      </div>

      {/* 4영역 미니 차트 */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">4영역 분포 (담당 32건 평균)</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "교육", value: 28, color: "#5CB85C" },
            { label: "의료", value: 22, color: "#3B82F6" },
            { label: "돌봄", value: 35, color: "#E07A5F" },
            { label: "자립", value: 15, color: "#7C3AED" },
          ].map((d) => (
            <div key={d.label} className="text-center">
              <div className="relative h-32 flex items-end justify-center">
                <div className="w-12 rounded-t-lg" style={{ backgroundColor: d.color, height: `${d.value * 2}px` }} />
              </div>
              <div className="mt-2 text-xs font-bold" style={{ color: d.color }}>{d.label}</div>
              <div className="text-xs text-ink-mid">{d.value}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 변동 케이스 */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">최근 변동 케이스 (3건)</h2>
          <Link href="/case/cases" className="text-xs text-accent font-bold">전체 케이스 →</Link>
        </div>
        <div className="space-y-3">
          {CASES_LIST.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <strong>{c.name}</strong>
                  <LifeBadge stage={c.stage} />
                  {c.priority === "high" && <span className="badge bg-alert text-white">우선</span>}
                </div>
                <div className="text-xs text-ink-mid mt-1">권한 범위: {c.scope} · 마지막 업데이트 {c.lastUpdate}</div>
              </div>
              <div className="flex gap-2">
                <Link href="/case/meeting" className="btn-secondary text-xs">📊 회의 자료</Link>
                <Link href="/case/cases" className="btn-secondary text-xs">🔍 상세</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 이직 안전 모드 */}
      <section className="card p-5 bg-secondary border-l-4 border-life-transition">
        <h2 className="font-bold text-primary-dark">📦 이직 안전 모드</h2>
        <p className="text-xs text-ink-mid mt-1">
          이직 시 본인이 작성한 메모만 회수합니다. AI 추출된 사실 인용은 케이스에 잔존 (진실성 보존).
        </p>
        <button className="mt-3 btn-secondary text-xs">이직 모드 시작</button>
      </section>
    </div>
  );
}
