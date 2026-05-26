import Link from "next/link";
import { PageHeader, CategoryChip } from "@/components/Card";

export default function PhotoJournalPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="사진 일지 작성" subtitle="최대 5장 + AI 자동 캡션 + 카테고리 선택 (FR-06)" />

      {/* Camera area */}
      <section className="card p-6">
        <div className="aspect-video rounded-xl bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center gap-3">
          <div className="text-6xl">📷</div>
          <div className="font-bold text-primary-dark">사진 촬영 또는 갤러리에서 선택</div>
          <div className="flex gap-2">
            <button className="btn-primary text-sm">📸 카메라</button>
            <button className="btn-secondary text-sm">🖼 갤러리</button>
          </div>
        </div>
      </section>

      {/* Selected (preview) */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">선택된 사진 (2/5)</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="relative aspect-square rounded-lg bg-secondary border border-border flex items-center justify-center">
              <span className="text-4xl">📷</span>
              <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs">✕</button>
            </div>
          ))}
          {[3, 4, 5].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center text-2xl text-ink-mid">+</div>
          ))}
        </div>
      </section>

      {/* AI Caption */}
      <section className="card p-6 bg-gradient-to-br from-life-school/5 to-transparent">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-primary-dark">🤖 AI 자동 캡션 (선택)</h2>
          <span className="badge bg-life-school/15 text-green-900">GPT Vision 분석</span>
        </div>
        <textarea
          rows={3}
          defaultValue="박지훈님이 산책 중 강아지를 보고 기뻐하는 모습. 손뼉을 치며 5분간 따라가셨습니다."
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-base"
        />
        <div className="text-xs text-ink-mid mt-1">AI 캡션은 항상 사용자 검토 후 저장됩니다 (자동 확정 금지)</div>
      </section>

      {/* Category */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">카테고리 (5종 픽토그램)</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
          {["meal", "med", "behavior", "emotion", "study"].map((c) => (
            <button key={c} className={`rounded-lg border-2 py-4 text-center ${c === "behavior" ? "border-primary bg-primary/5" : "border-border"}`}>
              <CategoryChip category={c as any} />
            </button>
          ))}
        </div>
      </section>

      {/* Voice memo */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">🎤 음성 메모 (선택, 30초)</h2>
        <button className="mt-3 btn-secondary">+ 음성 메모 추가</button>
      </section>

      <div className="flex justify-between">
        <Link href="/worker" className="btn-secondary">← 취소</Link>
        <button className="btn-primary">저장 + 타임라인 등록 →</button>
      </div>
    </div>
  );
}
