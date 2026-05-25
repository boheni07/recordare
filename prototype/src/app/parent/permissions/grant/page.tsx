import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { CATEGORIES } from "@/lib/mock-data";

export default function GrantPermissionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="권한 위임" subtitle="새 활동지원사·전문가에게 자녀 데이터 권한 부여 (FR-08, FR-22)" />

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-xs">
        {["대상자 검색", "범위 설정", "기간 설정", "자녀 동의 (AAC)", "활성화"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${i === 1 ? "bg-accent text-white" : i < 1 ? "bg-primary text-white" : "bg-white border-2 border-border text-ink-mid"}`}>{i + 1}</div>
            <span className="ml-1 font-semibold text-ink-mid">{s}</span>
            {i < 4 && <span className="mx-2 text-border">›</span>}
          </div>
        ))}
      </div>

      {/* Recipient */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">① 대상자</h2>
        <div className="mt-3 rounded-lg border border-primary bg-primary/5 p-3">
          <div className="font-bold">이수진 (활동지원 자격증 보유)</div>
          <div className="text-xs text-ink-mid mt-1">자격증 번호: AS-2023-12345 (진위 확인됨 ✓)</div>
        </div>
      </section>

      {/* Scope */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">② 권한 범위 (5카테고리 + 의료 별도)</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
          {(Object.entries(CATEGORIES) as any).map(([k, c]: any) => {
            const checked = ["meal", "behavior", "emotion", "study"].includes(k);
            return (
              <div key={k} className={`rounded-lg border-2 p-3 text-center ${checked ? "border-primary bg-primary/5" : "border-border bg-white"}`}>
                <div className="text-2xl">{c.emoji}</div>
                <div className="text-xs font-bold mt-1">{c.label}</div>
                <div className="text-[10px] mt-1">{checked ? "✓ 허용" : "거부"}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 rounded-lg bg-yellow-50 border border-alert p-3 text-xs">
          🔒 <strong>의료 별도 권한:</strong> 활동지원사에게 의료 권한 부여 시 별도 동의 필요 (현재 거부)
        </div>
      </section>

      {/* Duration */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">③ 기간 설정</h2>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["1개월", "3개월 (추천)", "6개월", "12개월"].map((p, i) => (
            <button key={p} className={`rounded-lg border-2 py-3 text-sm font-bold ${i === 1 ? "border-accent bg-accent/5 text-accent" : "border-border"}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-ink-mid">만료 D-30 / D-7 / D-1 자동 알림 예약 (FR-35)</div>
      </section>

      {/* AAC consent */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">④ 자녀 본인 동의 (만 15세 이상 의무)</h2>
        <div className="mt-3 rounded-lg border-2 border-life-adult p-4 bg-life-adult/5">
          <div className="text-sm">
            <strong className="text-life-adult">박지훈 (20세)</strong>님에게 AAC 동의 카드가 자동 전송됩니다.
          </div>
          <div className="mt-2 text-xs text-ink-mid">
            큰 사진 + 픽토그램 + 음성 안내 + 2단계 확인 (FR-17, FR-18). 동의 완료 시 5분 내 보호자에게 알림 (FR-19).
          </div>
        </div>
      </section>

      <div className="flex justify-between items-center">
        <Link href="/parent" className="btn-secondary">← 취소</Link>
        <button className="btn-primary">권한 위임 요청 →</button>
      </div>
    </div>
  );
}
