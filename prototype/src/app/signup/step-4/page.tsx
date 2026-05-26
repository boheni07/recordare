import { StepProgress, StepNav } from "@/components/StepProgress";

export default function Step4() {
  return (
    <>
      <StepProgress current={4} />
      <h1 className="text-2xl font-bold text-primary-dark">기존 기록 마이그레이션 (선택)</h1>
      <p className="mt-2 text-sm text-ink-mid">
        카톡 · 갤러리 · 종이 노트의 기존 기록을 백그라운드로 자동 분류합니다 (FR-26)
      </p>

      <div className="card p-6 mt-6 grid md:grid-cols-2 gap-4">
        {[
          { icon: "💬", title: "카톡 사진 zip", desc: "1만 장까지 · 14일", recommended: true },
          { icon: "📱", title: "휴대폰 갤러리", desc: "5천 장까지 · 7일", recommended: false },
          { icon: "📓", title: "종이 노트 사진", desc: "OCR 100장 · 3일", recommended: false },
          { icon: "📊", title: "엑셀 / 한글", desc: "행 단위 즉시", recommended: false },
        ].map((m) => (
          <div key={m.title} className={`rounded-lg p-4 border-2 ${m.recommended ? "border-accent bg-accent/5" : "border-border"}`}>
            <div className="text-3xl mb-2">{m.icon}</div>
            <div className="font-bold text-primary-dark">{m.title}</div>
            <div className="text-xs text-ink-mid mt-1">{m.desc}</div>
            <button className="mt-3 text-xs font-bold text-accent">선택 →</button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-yellow-50 border border-alert px-4 py-3 text-xs">
        ⚠️ AI 분류 정확도 70% 보장 · 결과는 검수 화면에서 카드 스와이프로 정정 가능 (FR-28)
      </div>

      <StepNav prev="/signup/step-3" next="/signup/step-5" nextLabel="건너뛰기 / 다음" />
    </>
  );
}
