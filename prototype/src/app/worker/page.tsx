import Link from "next/link";
import { PageHeader, StatCard, CategoryChip } from "@/components/Card";
import { SCHEDULE_TODAY, JOURNAL_ENTRIES } from "@/lib/mock-data";

export default function WorkerDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="활동지원사 대시보드"
        subtitle="안녕하세요 이수진님 · 오늘 담당 이용자 3명 · 권한 받음 6건"
        actions={<Link href="/worker/journal/voice" className="btn-primary">🎤 음성 일지 작성 →</Link>}
      />

      {/* Quick action - Big voice button */}
      <section className="card p-8 bg-gradient-to-br from-life-school/10 to-primary/5">
        <div className="text-center">
          <div className="text-sm text-ink-mid mb-2">한 번 누르고 30초 말하면 자동 카테고리 분류됩니다 (FR-05)</div>
          <Link
            href="/worker/journal/voice"
            className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-accent text-white text-5xl shadow-2xl hover:scale-105 transition"
          >🎤</Link>
          <div className="mt-4 font-bold text-primary-dark">빠른 음성 일지</div>
          <div className="text-xs text-ink-mid">평균 작성 시간: 1분 47초 · 목표: 2분 이하 (SC-02)</div>
        </div>
      </section>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="오늘 일정" value="3명" sub="9시 / 14시 / 19시" />
        <StatCard label="이번 주 작성한 일지" value="38건" sub="평균 1분 47초/건" color="#5CB85C" />
        <StatCard label="내 권한 만료 임박" value="0건" sub="평균 D-180" />
        <StatCard label="새 인계 수령" value="1건" sub="박지훈 - 3분 마스터" color="#E07A5F" />
      </div>

      {/* Today schedule */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">📅 오늘 일정 (3명)</h2>
          <Link href="/worker/schedule" className="text-xs text-accent font-bold">전체 일정 →</Link>
        </div>
        <div className="space-y-3">
          {SCHEDULE_TODAY.map((s) => (
            <div key={s.user} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-primary transition">
              <div className="text-sm font-bold text-life-school min-w-[120px]">{s.time}</div>
              <div className="flex-1">
                <div className="font-bold">{s.user}</div>
                <div className="text-xs text-ink-mid">{s.place} · {s.task}</div>
              </div>
              <Link href="/worker/journal/voice" className="btn-secondary text-xs">일지 작성</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Recent journals - my entries */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">최근 작성한 일지</h2>
        <div className="space-y-3">
          {JOURNAL_ENTRIES.slice(0, 3).map((j) => (
            <div key={j.id} className="flex gap-3 p-3 rounded-lg border border-border">
              <CategoryChip category={j.category} />
              <div className="flex-1 text-sm">{j.text}</div>
              <div className="text-xs text-ink-mid">{j.createdAt.split(" ")[1]}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
