import Link from "next/link";
import { PageHeader, CategoryChip } from "@/components/Card";

export default function VoiceJournalPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="음성 일지 작성 (30초)" subtitle="STT → AI 5종 자동 분류 → 보호자 동기화 (FR-05)" />

      {/* Recording UI */}
      <section className="card p-10 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="text-center">
          <div className="text-xs text-ink-mid">대상: 박지훈 (20세) · 푸른그룹홈</div>
          <div className="mt-6 mx-auto h-44 w-44 rounded-full bg-accent shadow-2xl flex items-center justify-center text-7xl text-white animate-pulse">🎤</div>
          <div className="mt-6 text-3xl font-bold text-primary-dark font-mono">00:23 / 01:00</div>
          <div className="mt-2 text-xs text-ink-mid">길게 누르고 말씀하세요</div>

          {/* Wave */}
          <div className="mt-6 flex items-center justify-center gap-1 h-12">
            {Array.from({ length: 30 }).map((_, i) => {
              const h = 20 + Math.sin(i * 0.5) * 30;
              return <div key={i} className="w-1 rounded-full bg-life-school" style={{ height: `${h}%` }} />;
            })}
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-secondary">⏸ 일시 정지</button>
            <button className="btn-accent">✓ 녹음 완료</button>
          </div>
        </div>
      </section>

      {/* STT Result */}
      <section className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-primary-dark">STT 변환 결과 (수정 가능)</h2>
          <span className="badge bg-life-transition/15 text-blue-900">신뢰도 89%</span>
        </div>
        <textarea
          rows={4}
          defaultValue="오늘 점심으로 김치찌개 한 그릇 깨끗하게 비웠어요. 매운맛 잘 드시네요."
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-base"
        />
      </section>

      {/* AI Category */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">AI 자동 카테고리 (수정 가능)</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {["meal", "med", "behavior", "emotion", "study"].map((c) => (
            <button key={c} className={`rounded-lg border-2 px-4 py-3 ${c === "meal" ? "border-primary bg-primary/5" : "border-border"}`}>
              <CategoryChip category={c as any} />
              {c === "meal" && <div className="text-[10px] font-bold text-primary mt-1">✓ AI 추천</div>}
            </button>
          ))}
        </div>
      </section>

      {/* Photos */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">사진 첨부 (선택, 최대 3장)</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="aspect-square rounded-lg bg-secondary border border-border flex items-center justify-center">📷</div>
          <div className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center text-2xl">+</div>
          <div className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center text-2xl">+</div>
        </div>
      </section>

      <div className="flex justify-between">
        <Link href="/worker" className="btn-secondary">← 취소</Link>
        <button className="btn-primary">저장 + 보호자 동기화 →</button>
      </div>
    </div>
  );
}
