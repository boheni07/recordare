import { StepProgress, StepNav } from "@/components/StepProgress";

export default function Step2() {
  return (
    <>
      <StepProgress current={2} />
      <h1 className="text-2xl font-bold text-primary-dark">자녀 등록</h1>
      <p className="mt-2 text-sm text-ink-mid">자녀의 기본 정보를 입력하세요 (다자녀는 추가 가능)</p>

      <div className="card p-6 mt-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="자녀 이름" value="박지훈" />
          <Field label="생년월일" value="2006-03-12" />
          <Field label="장애 등급" value="발달장애 2급" />
          <Field label="AAC 사용 여부" value="사용 (픽토그램+음성)" />
        </div>
        <div className="pt-4 border-t border-border">
          <button className="text-sm text-accent font-semibold">+ 또 다른 자녀 등록</button>
        </div>
      </div>

      <StepNav prev="/signup/step-1" next="/signup/step-3" />
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-mid">{label}</span>
      <input defaultValue={value} className="mt-1 w-full rounded-lg border border-border px-4 py-3" />
    </label>
  );
}
