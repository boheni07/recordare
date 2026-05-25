import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { PERMISSIONS } from "@/lib/mock-data";

export default function RevokePermissionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="권한 회수 (긴급)" subtitle="신뢰가 깨졌을 때 1-Click으로 모든 접근 즉시 차단 (FR-09)" />

      {/* Danger callout */}
      <div className="rounded-xl bg-red-50 border-2 border-red-300 p-5">
        <div className="flex items-start gap-3">
          <div className="text-3xl">🚫</div>
          <div className="flex-1">
            <div className="font-bold text-red-900">긴급 회수는 비가역 작업입니다</div>
            <p className="text-sm text-red-800 mt-1">
              회수 후 24시간 안에 활동지원사 단말의 캐시가 자동 삭제됩니다.
              자녀에게는 쉬운말로 즉시 알림이 전송되며, 시설장에게도 통보됩니다 (감사 로그 5년 보존).
            </p>
          </div>
        </div>
      </div>

      {/* Active grants */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">현재 권한 보유자</h2>
        <div className="space-y-3">
          {PERMISSIONS.map((p) => (
            <div key={p.id} className="rounded-lg border border-border p-4 flex items-center justify-between">
              <div>
                <div className="font-bold">{p.grantee}</div>
                <div className="text-xs text-ink-mid mt-1">{p.role} · {p.scopesLabel}</div>
                <div className="text-xs text-ink-mid">{p.startsAt} ~ {p.endsAt}</div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                {p.status === "expiring" && <span className="badge bg-alert text-white">D-{p.daysLeft}</span>}
                <button className="rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-xs font-bold">
                  🚫 지금 차단
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reason form */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">사유 입력 (선택)</h2>
        <textarea
          rows={3}
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-sm"
          placeholder="예: 신뢰 손상 / 계약 해지 / 자녀 안전 우려 등"
        />
        <div className="mt-2 text-xs text-ink-mid">감사 로그에 기록되며 자녀·시설장에게 통보 시 사용됩니다.</div>
      </section>

      {/* Confirmation note */}
      <div className="rounded-lg bg-yellow-50 border border-alert p-4 text-sm">
        <strong>2단계 확인 (FR-18 / Risk #6):</strong> ‘지금 차단’ 클릭 시 ‘정말로 차단할까요?’ 모달이 한 번 더 표시됩니다.
      </div>

      <div className="flex justify-between">
        <Link href="/parent" className="btn-secondary">← 취소</Link>
      </div>
    </div>
  );
}
