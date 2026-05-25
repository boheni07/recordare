import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { BULK_PERMISSIONS_EXPIRING } from "@/lib/mock-data";

export default function BulkPermissionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="활동지원사 권한 일괄 갱신"
        subtitle="이번 주 만료 3건 → 일괄 갱신 + 영향 미리보기 (FR-22 · Risk #6 대응)"
      />

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-xs">
        {["대상자 체크", "기간 선택", "영향 미리보기", "확정", "보호자 동기화"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${i === 2 ? "bg-accent text-white" : i < 2 ? "bg-primary text-white" : "bg-white border-2 border-border text-ink-mid"}`}>{i + 1}</div>
            <span className="ml-1 font-semibold text-ink-mid">{s}</span>
            {i < 4 && <span className="mx-2 text-border">›</span>}
          </div>
        ))}
      </div>

      {/* Table with checkbox */}
      <section className="card overflow-hidden">
        <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-3">
          <input type="checkbox" defaultChecked className="rounded" />
          <strong className="text-sm">3/3 선택됨</strong>
          <span className="text-xs text-ink-mid">→ 이용자 12명에게 영향</span>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs text-ink-mid">
            <tr className="text-left bg-secondary/30">
              <th className="p-3 w-12"></th>
              <th className="p-3">활동지원사</th>
              <th className="p-3">담당 이용자</th>
              <th className="p-3">현재 만료일</th>
              <th className="p-3">잔여 일수</th>
              <th className="p-3">자격증 상태</th>
            </tr>
          </thead>
          <tbody>
            {BULK_PERMISSIONS_EXPIRING.map((p, i) => (
              <tr key={p.worker} className="border-b border-border last:border-0">
                <td className="p-3"><input type="checkbox" defaultChecked className="rounded" /></td>
                <td className="p-3 font-semibold">{p.worker}</td>
                <td className="p-3">{p.residents}명</td>
                <td className="p-3 text-xs text-ink-mid">{p.currentEnd}</td>
                <td className="p-3 font-bold text-alert">D-{p.daysLeft}</td>
                <td className="p-3"><span className="badge bg-life-school/15 text-green-900">✓ 유효</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Period select */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">갱신 기간 선택</h2>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["1개월", "3개월", "6개월 (추천)", "12개월"].map((p, i) => (
            <button key={p} className={`rounded-lg border-2 py-3 text-sm font-bold ${i === 2 ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* IMPACT PREVIEW - Risk #6 대응 */}
      <section className="rounded-xl bg-yellow-50 border-2 border-alert p-6">
        <h2 className="font-bold text-alert text-lg">⚠️ 영향 미리보기 (필수 검토 — Risk #6)</h2>
        <p className="text-sm mt-1">일괄 갱신 전에 영향 범위를 명확히 확인하세요. 실수 방지를 위해 30일 내 1회 일괄 되돌리기 가능.</p>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-white border border-alert p-3">
            <div className="text-xs text-ink-mid">대상 활동지원사</div>
            <div className="text-3xl font-bold text-alert mt-1">3명</div>
            <div className="text-xs text-ink-mid mt-1">이수진 · 정민지 · 한도윤</div>
          </div>
          <div className="rounded-lg bg-white border border-alert p-3">
            <div className="text-xs text-ink-mid">영향 받는 이용자</div>
            <div className="text-3xl font-bold text-alert mt-1">12명</div>
            <div className="text-xs text-ink-mid mt-1">중복 담당 포함 (전체 시설 이용자)</div>
          </div>
          <div className="rounded-lg bg-white border border-alert p-3">
            <div className="text-xs text-ink-mid">신 만료일</div>
            <div className="text-2xl font-bold text-alert mt-1">2026-11-30</div>
            <div className="text-xs text-ink-mid mt-1">6개월 갱신 시</div>
          </div>
        </div>
      </section>

      {/* Notify */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">자동 알림</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>✓ 활동지원사 3명에게 ‘권한 갱신됨’ 알림 (즉시)</li>
          <li>✓ 이용자 12명의 보호자에게 ‘활동지원사 권한 갱신’ 알림 (디제스트)</li>
          <li>✓ ISMS-P 감사 로그 5년 보존 (FR-47)</li>
        </ul>
      </section>

      <div className="flex justify-between items-center">
        <Link href="/facility" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">초안 저장</button>
          <button className="btn-accent">✓ 일괄 갱신 확정 (12명 영향)</button>
        </div>
      </div>

      <div className="rounded-lg bg-life-transition/5 border border-life-transition p-3 text-xs">
        💡 갱신 확정 후 <strong>30일 내 1회</strong> 일괄 되돌리기가 가능합니다 (Risk #6 대응).
      </div>
    </div>
  );
}
