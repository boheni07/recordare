import { StepProgress, StepNav } from "@/components/StepProgress";

export default function Step1() {
  return (
    <>
      <StepProgress current={1} />
      <h1 className="text-2xl font-bold text-primary-dark">환영합니다 · 본인인증</h1>
      <p className="mt-2 text-sm text-ink-mid">PASS 또는 카카오로 안전하게 인증합니다 (FR-25)</p>

      <div className="card p-6 mt-6 space-y-4">
        <button className="w-full rounded-lg bg-primary px-4 py-4 font-bold text-white">📱 PASS 본인인증으로 진행</button>
        <button className="w-full rounded-lg bg-yellow-400 px-4 py-4 font-bold text-ink">💬 카카오 인증으로 진행</button>
        <div className="text-xs text-ink-mid pt-4 border-t border-border">
          본인인증으로 받는 정보: <b>이름 · 생년월일 · 휴대폰번호 · 본인확인 토큰</b>.<br/>
          이 외의 정보는 별도 동의 후 수집됩니다 (FR-15).
        </div>
      </div>

      <StepNav next="/signup/step-2" nextLabel="인증 완료 (Mock)" />
    </>
  );
}
