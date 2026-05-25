import { StepProgress, StepNav } from "@/components/StepProgress";

export default function Step3() {
  return (
    <>
      <StepProgress current={3} />
      <h1 className="text-2xl font-bold text-primary-dark">소속 기관 선택</h1>
      <p className="mt-2 text-sm text-ink-mid">자녀가 현재 소속된 기관을 선택하세요 (추후 변경 가능)</p>

      <div className="card p-6 mt-6 space-y-3">
        {[
          { name: "푸른그룹홈 (서울 강남)", type: "그룹홈", selected: true },
          { name: "○○특수학교", type: "특수학교", selected: false },
          { name: "△△복지관", type: "복지관", selected: false },
          { name: "기타 · 직접 입력", type: "—", selected: false },
        ].map((o) => (
          <div
            key={o.name}
            className={`rounded-lg border-2 px-4 py-3 cursor-pointer ${
              o.selected ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-primary-dark">{o.name}</div>
                <div className="text-xs text-ink-mid">{o.type}</div>
              </div>
              {o.selected && <span className="text-primary font-bold">✓</span>}
            </div>
          </div>
        ))}
        <div className="text-xs text-ink-mid pt-2">없으면 ‘건너뛰기’를 눌러도 됩니다.</div>
      </div>

      <StepNav prev="/signup/step-2" next="/signup/step-4" />
    </>
  );
}
