import Link from "next/link";
import { PageHeader, CategoryChip } from "@/components/Card";
import { CATEGORIES, QUICK_OPTIONS } from "@/lib/mock-data";

export default function QuickJournalPage() {
  const selectedCat = "meal" as const;
  return (
    <div className="space-y-6">
      <PageHeader
        title="⚡ 빠른 선택 일지"
        subtitle="박지훈 · 12:30 점심 · 평균 15초 (FR-69a · v2.4 신규)"
        actions={
          <div className="flex gap-2">
            <Link href="/parent/journal/checklist" className="btn-secondary text-xs">✅ 체크리스트</Link>
            <Link href="/parent/journal/photo" className="btn-secondary text-xs">📷 사진+태그</Link>
          </div>
        }
      />

      {/* 입력 모드 안내 */}
      <div className="rounded-xl bg-life-school/10 border-2 border-life-school p-4 text-sm">
        💡 <strong>시설 점심·교실·이용자 옆 등 시끄러운 환경에서 적합.</strong> 평균 15초 (3 탭). STT 사용 안 함.
      </div>

      {/* 카테고리 선택 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">카테고리 선택</h2>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {(Object.entries(CATEGORIES) as any).map(([k, c]: any) => (
            <button key={k} className={`rounded-lg border-2 py-4 ${k === selectedCat ? "border-primary bg-primary/5" : "border-border"}`}>
              <div className="text-3xl text-center">{c.emoji}</div>
              <div className="text-xs font-bold text-center mt-1">{c.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 자주 사용 옵션 */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-primary-dark text-sm">자주 사용 옵션 (식사)</h2>
          <span className="badge bg-life-school/15 text-green-900">⚡ 1탭 입력</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {QUICK_OPTIONS.meal.map((opt, i) => (
            <button key={opt} className={`rounded-lg border-2 py-5 text-base font-bold ${i === 0 ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary"}`}>
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* 메뉴 태그 (JM1 Quick Tags) */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">메뉴 태그 (선택)</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {["김치찌개 ✓", "밥", "국", "반찬", "디저트", "음료"].map((t, i) => (
            <button key={t} className={`rounded-full px-4 py-2 text-sm font-semibold ${i === 0 ? "bg-life-school text-white" : "bg-secondary border border-border hover:border-primary"}`}>{t}</button>
          ))}
        </div>
      </section>

      {/* 특이사항 (짧은 텍스트 - OS 키보드 음성 가능) */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">특이사항 (선택, OS 키보드 음성 입력 가능)</h2>
        <textarea
          rows={2}
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-sm"
          placeholder="짧은 메모를 입력하세요 (또는 키보드 마이크 버튼)"
        />
        <div className="mt-2 text-xs text-ink-mid">💡 자체 STT 통합 없음 — 휴대폰 키보드의 음성 입력 기능 사용 (Android·iOS 기본 제공)</div>
      </section>

      {/* 부가 옵션 */}
      <section className="card p-5 bg-secondary">
        <h2 className="font-bold text-primary-dark text-sm">부가 옵션</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-2">
          <button className="btn-secondary text-xs">📷 사진 첨부</button>
          <button className="btn-secondary text-xs">🎙 OS 음성 메모 (선택)</button>
          <button className="btn-secondary text-xs">✋ 이용자 확인 도장 (15세+)</button>
        </div>
      </section>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Link href="/worker" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <button className="btn-accent">⚡ 저장 (15초 안에 작성 완료)</button>
        </div>
      </div>
    </div>
  );
}
