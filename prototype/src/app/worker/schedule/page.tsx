import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { SCHEDULE_TODAY } from "@/lib/mock-data";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="오늘 일정" subtitle="2026-05-25 (월) · 담당 이용자 3명" />

      {/* Day overview */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="card p-3"><div className="text-xs text-ink-mid">총 근무 시간</div><div className="text-xl font-bold text-primary">8시간</div></div>
        <div className="card p-3"><div className="text-xs text-ink-mid">이동 횟수</div><div className="text-xl font-bold text-primary">2회</div></div>
        <div className="card p-3"><div className="text-xs text-ink-mid">작성할 일지 (예상)</div><div className="text-xl font-bold text-accent">9건</div></div>
      </div>

      {/* Timeline */}
      <section className="space-y-3">
        {SCHEDULE_TODAY.map((s, i) => (
          <article key={s.user} className="card flex gap-4 p-5">
            <div className="text-center min-w-[100px]">
              <div className="text-sm font-bold text-life-school">{s.time.split(" - ")[0]}</div>
              <div className="text-xs text-ink-mid">~ {s.time.split(" - ")[1]}</div>
              <div className="mt-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-life-school text-white text-xs font-bold">{i + 1}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <strong className="text-lg">{s.user}</strong>
                <span className="badge bg-life-school/15 text-green-900">권한 4종</span>
              </div>
              <div className="text-sm text-ink-mid mt-1">{s.place}</div>
              <div className="mt-2 text-sm">{s.task}</div>
              <div className="mt-3 flex gap-2">
                <Link href="/worker/journal/voice" className="btn-primary text-xs py-2">🎤 음성 일지</Link>
                <Link href="/worker/journal/photo" className="btn-secondary text-xs py-2">📷 사진 일지</Link>
                <Link href="/worker/handover/received" className="btn-secondary text-xs py-2">📥 인계서</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
