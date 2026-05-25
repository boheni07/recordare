import { StepProgress, StepNav } from "@/components/StepProgress";

export default function Step6() {
  const channels = [
    { key: "push", label: "푸시 알림", on: true, locked: false, note: "권장" },
    { key: "email", label: "이메일", on: true, locked: false, note: "" },
    { key: "sms", label: "SMS", on: true, locked: false, note: "긴급용" },
    { key: "kakao", label: "카카오 알림톡", on: false, locked: false, note: "" },
  ];

  return (
    <>
      <StepProgress current={6} />
      <h1 className="text-2xl font-bold text-primary-dark">알림 채널 설정</h1>
      <p className="mt-2 text-sm text-ink-mid">
        ⚠️ ‘중요 알림’(권한 만료·이상 접근)은 항상 ON입니다 (FR-38, Risk #5)
      </p>

      <div className="card p-6 mt-6 space-y-3">
        {channels.map((c) => (
          <div key={c.key} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <div>
              <div className="font-semibold">{c.label}</div>
              {c.note && <div className="text-xs text-ink-mid">{c.note}</div>}
            </div>
            <div className={`h-6 w-11 rounded-full p-0.5 ${c.on ? "bg-primary" : "bg-border"}`}>
              <div className={`h-5 w-5 rounded-full bg-white transition ${c.on ? "translate-x-5" : ""}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-secondary border border-border px-4 py-3 text-xs">
        🌙 22:00 ~ 07:00 무음 시간 자동 적용 (긴급 알림 제외)
      </div>

      <StepNav prev="/signup/step-5" next="/signup/step-7" />
    </>
  );
}
