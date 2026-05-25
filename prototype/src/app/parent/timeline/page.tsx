import Link from "next/link";
import { PageHeader, CategoryChip, LifeBadge } from "@/components/Card";
import { JOURNAL_ENTRIES, CHILDREN, LIFE_STAGES, CATEGORIES } from "@/lib/mock-data";

export default function TimelinePage() {
  const child = CHILDREN[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="통합 타임라인"
        subtitle={`${child.name} (${child.age}세) · 생애주기 5단계 색상 띠로 구분`}
        actions={
          <div className="flex gap-2">
            <Link href="/parent/export" className="btn-secondary text-xs">📤 내보내기</Link>
            <Link href="/parent/handover/new" className="btn-primary text-xs">📝 인계서</Link>
          </div>
        }
      />

      {/* Filters */}
      <section className="card p-4 flex flex-wrap items-center gap-3 text-sm">
        <div className="text-xs font-bold text-ink-mid">필터:</div>
        <select className="rounded-lg border border-border px-3 py-1.5 text-xs">
          <option>전체 기간</option>
          <option>최근 1주</option>
          <option>최근 1개월</option>
          <option>분기별</option>
        </select>
        <div className="flex gap-1 flex-wrap">
          {(Object.entries(CATEGORIES) as any).map(([k, c]: any) => (
            <button key={k} className="badge border border-border hover:border-primary">{c.emoji} {c.label}</button>
          ))}
        </div>
        <div className="ml-auto text-xs text-ink-mid">총 {JOURNAL_ENTRIES.length}건</div>
      </section>

      {/* Lifecycle legend */}
      <section className="card p-4 flex items-center gap-3 text-xs flex-wrap">
        <span className="font-bold text-ink-mid">생애주기:</span>
        {(Object.entries(LIFE_STAGES) as any).map(([k, s]: any) => (
          <span key={k} className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
            {s.age} {s.label}
          </span>
        ))}
      </section>

      {/* Timeline cards */}
      <section className="space-y-3">
        {JOURNAL_ENTRIES.map((j) => {
          const s = LIFE_STAGES[j.stage];
          return (
            <article key={j.id} className="card flex overflow-hidden">
              <div className="w-1.5" style={{ backgroundColor: s.color }} />
              <div className="flex-1 p-5">
                <header className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CategoryChip category={j.category} />
                    <LifeBadge stage={j.stage} />
                    {j.offline && <span className="badge bg-alert/20 text-orange-900">📡 오프라인 동기화</span>}
                  </div>
                  <div className="text-xs text-ink-mid">{j.createdAt}</div>
                </header>
                <p className="mt-3 text-sm leading-relaxed">{j.text}</p>
                {j.photos > 0 && (
                  <div className="mt-3 flex gap-2">
                    {Array.from({ length: j.photos }).map((_, i) => (
                      <div key={i} className="h-16 w-16 rounded-lg bg-secondary border border-border flex items-center justify-center">📷</div>
                    ))}
                  </div>
                )}
                <footer className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-ink-mid">
                  <span>작성자: {j.author}</span>
                  <div className="flex gap-3">
                    <button>💬 메모</button>
                    <button>📤 공유</button>
                    <button>🔍 상세</button>
                  </div>
                </footer>
              </div>
            </article>
          );
        })}
      </section>

      <div className="text-center pt-4">
        <button className="text-sm text-accent font-bold">더 보기 +</button>
      </div>
    </div>
  );
}
