import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { DAILY_SLOTS } from "@/lib/mock-data";

export default function ChecklistPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="✅ 체크리스트 일지"
        subtitle="박지훈 · 2026-05-25 · 시설 일과표 기반 · 평균 5초 (FR-69b · v2.4 신규)"
        actions={
          <div className="flex gap-2">
            <Link href="/parent/journal/quick" className="btn-secondary text-xs">⚡ 빠른 선택</Link>
            <Link href="/parent/journal/photo" className="btn-secondary text-xs">📷 사진+태그</Link>
          </div>
        }
      />

      {/* 안내 */}
      <div className="rounded-xl bg-life-transition/10 border-2 border-life-transition p-4 text-sm">
        💡 <strong>응급·일과 자동 기록</strong>에 적합. 시설 일과표 기반 자동 슬롯. 일주일 패턴 학습으로 다음 주 자동 생성.
      </div>

      {/* 일과 슬롯 */}
      <section className="space-y-4">
        {DAILY_SLOTS.map((slot, si) => (
          <article key={slot.time} className="card p-5">
            <header className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-bold text-life-transition">📅 {slot.time}</div>
                <div className="text-lg font-bold text-primary-dark">{slot.title}</div>
              </div>
              <span className="badge bg-secondary text-ink-mid">{slot.items.length}항목</span>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {slot.items.map((item, ii) => {
                const checked = (si === 0 && [0, 1, 2, 5].includes(ii)) || (si === 1 && ii === 0);
                return (
                  <label key={item} className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer ${checked ? "border-primary bg-primary/5" : "border-border"}`}>
                    <input type="checkbox" defaultChecked={checked} className="rounded" />
                    <span className="text-sm">{item}</span>
                  </label>
                );
              })}
            </div>
            {si === 1 && (
              <div className="mt-3 text-xs text-accent">→ 식사 체크 시 빠른 선택(⚡) 자동 연동</div>
            )}
          </article>
        ))}
      </section>

      {/* 요약 */}
      <section className="card p-5 bg-secondary">
        <h2 className="font-bold text-primary-dark text-sm">오늘 요약 (자동 집계)</h2>
        <div className="mt-3 grid grid-cols-4 gap-3 text-center">
          {[
            { v: "5", l: "체크 완료", c: "#5CB85C" },
            { v: "3", l: "미체크", c: "#F2A93B" },
            { v: "1", l: "메모 첨부", c: "#3B82F6" },
            { v: "5초", l: "평균 입력 시간", c: "#E07A5F" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-xs text-ink-mid">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 액션 */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Link href="/worker" className="btn-secondary">← 대시보드</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">+ 짧은 메모</button>
          <button className="btn-accent">✅ 체크리스트 저장</button>
        </div>
      </div>

      <div className="rounded-lg bg-life-school/5 border border-life-school p-3 text-xs text-green-900">
        🤖 <strong>패턴 학습</strong>: 일주일간 체크 패턴을 학습하여 다음 주 자동 슬롯을 추천합니다. 미체크 항목은 보호자에게 다이제스트로 안내됩니다.
      </div>
    </div>
  );
}
