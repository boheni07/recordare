import { StepProgress, StepNav } from "@/components/StepProgress";

export default function Step5() {
  return (
    <>
      <StepProgress current={5} />
      <h1 className="text-2xl font-bold text-primary-dark">권한 모델 선택</h1>
      <p className="mt-2 text-sm text-ink-mid">자녀의 만 나이를 기반으로 추천된 권한 모델 (FR-02)</p>

      <div className="card p-6 mt-6 space-y-3">
        {[
          { id: "guardian", title: "보호자 전권", sub: "만 18세 미만 자동", rec: false },
          { id: "co", title: "보호자 + 당사자 공동", sub: "만 18세 이상 추천 (현재 자녀 20세)", rec: true },
          { id: "ward", title: "후견 모드", sub: "후견 결정문 보유 시", rec: false },
        ].map((o) => (
          <div
            key={o.id}
            className={`rounded-lg border-2 px-4 py-4 cursor-pointer ${
              o.rec ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-primary-dark">{o.title}</div>
                <div className="text-xs text-ink-mid mt-0.5">{o.sub}</div>
              </div>
              {o.rec && <span className="badge bg-accent text-white">추천</span>}
            </div>
          </div>
        ))}
      </div>

      <StepNav prev="/signup/step-4" next="/signup/step-6" />
    </>
  );
}
