import Link from "next/link";
import { StepProgress } from "@/components/StepProgress";

export default function Step7() {
  return (
    <>
      <StepProgress current={7} />
      <h1 className="text-2xl font-bold text-primary-dark">🎉 축하합니다 · First Value 도달</h1>
      <p className="mt-2 text-sm text-ink-mid">
        가입을 마쳤습니다. 미리 분류된 사진 10장과 인계서 샘플 PDF를 확인해보세요.
      </p>

      <div className="card mt-6 p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-border">
            <div className="text-xs font-bold text-accent">미리 분류된 사진 (10장)</div>
            <div className="mt-3 grid grid-cols-5 gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-square rounded bg-secondary border border-border flex items-center justify-center text-xs text-ink-mid">📷</div>
              ))}
            </div>
            <div className="mt-3 text-xs text-ink-mid">자동 시기 분류 · 카테고리 태깅 완료</div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-accent">
            <div className="text-xs font-bold text-accent">3분 마스터 인계서 샘플 PDF</div>
            <div className="mt-3 space-y-1 text-xs">
              {["의료 섹션", "식사 섹션", "AAC 사용", "위험행동"].map((s) => (
                <div key={s} className="rounded bg-secondary px-2 py-1.5 font-semibold text-primary-dark">📄 {s}</div>
              ))}
            </div>
            <button className="mt-3 btn-primary w-full text-xs py-2">📥 PDF 다운로드 (FR-43)</button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          { v: "1h", l: "First Value 도달" },
          { v: "10장", l: "사진 자동 분류" },
          { v: "1건", l: "인계서 샘플 PDF" },
        ].map((s) => (
          <div key={s.l} className="card p-3">
            <div className="text-xl font-bold text-primary">{s.v}</div>
            <div className="text-xs text-ink-mid">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
        <Link href="/signup/step-6" className="btn-secondary">← 이전</Link>
        <Link href="/parent" className="btn-accent">Recordare 시작하기 →</Link>
      </div>
    </>
  );
}
