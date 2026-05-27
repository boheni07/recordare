import Link from "next/link";
import { PageHeader, CategoryChip } from "@/components/Card";
import { CATEGORIES, QUICK_OPTIONS } from "@/lib/mock-data";

// FR-69 v2.4: STT 자체 통합 폐기 → OS 키보드 음성 + 텍스트 입력 모드
export default function TextVoiceJournalPage() {
  const selectedCat = "behavior" as const;

  return (
    <div className="space-y-6">
      <PageHeader
        title="⌨️ 텍스트 · OS 음성 일지"
        subtitle="박지훈 · 행동/정서 중심 상세 기록 (FR-69d · v2.4)"
        actions={
          <div className="flex gap-2">
            <Link href="/parent/journal/quick" className="btn-secondary text-xs">⚡ 빠른선택</Link>
            <Link href="/parent/journal/checklist" className="btn-secondary text-xs">✅ 체크리스트</Link>
          </div>
        }
      />

      {/* 입력 방식 안내 배너 */}
      <div className="rounded-xl bg-amber-50 border-2 border-amber-300 p-4 text-sm">
        <div className="font-bold text-amber-800">💡 이 화면은 어떤 경우에 쓰나요?</div>
        <ul className="mt-1 list-disc list-inside text-amber-700 space-y-0.5">
          <li>빠른 선택(⚡) 옵션에 없는 상황을 자세히 기록할 때</li>
          <li>PBS 도전행동 전후 상황을 텍스트로 남길 때</li>
          <li>OS 키보드 마이크 버튼으로 받아쓰기 가능 (자체 STT 없음)</li>
        </ul>
      </div>

      {/* 카테고리 선택 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">카테고리 선택</h2>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {(Object.entries(CATEGORIES) as any).map(([k, c]: any) => (
            <button
              key={k}
              className={`rounded-lg border-2 py-3 ${k === selectedCat ? "border-primary bg-primary/5" : "border-border"}`}
            >
              <div className="text-2xl text-center">{c.emoji}</div>
              <div className="text-xs font-bold text-center mt-1">{c.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 자주 쓰는 표현 (선택) */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-primary-dark text-sm">자주 쓰는 표현 (행동)</h2>
          <span className="badge bg-life-school/15 text-green-900 text-xs">탭하면 본문에 추가</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_OPTIONS.behavior.map((opt) => (
            <button key={opt} className="rounded-full px-3 py-1.5 text-sm border border-border hover:border-primary bg-secondary">
              {opt}
            </button>
          ))}
          {["차분해짐", "자리 이탈 1회", "시선 회피", "반복 행동 관찰"].map((opt) => (
            <button key={opt} className="rounded-full px-3 py-1.5 text-sm border border-dashed border-border hover:border-primary bg-secondary text-ink-mid">
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* 텍스트 입력 (OS 키보드 음성 지원) */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-primary-dark text-sm">상세 기록</h2>
          <span className="text-xs text-ink-mid">OS 마이크 버튼으로 받아쓰기 가능</span>
        </div>
        <textarea
          rows={5}
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-base"
          placeholder="오늘 어떤 상황이었나요? 자세히 기록해 두시면 AI 패턴 분석에 활용됩니다.

(Android / iOS 키보드 우하단 마이크 버튼으로 음성 입력 가능)"
        />
        <div className="mt-2 flex items-start gap-2 text-xs text-ink-mid">
          <span>⚠️</span>
          <span>자체 STT 통합 없음 (v2.4 C24) — 휴대폰 OS 키보드 음성 기능 사용 권장. 도전행동 상세 기록은 <Link href="/records/c-001/pbs/new" className="text-accent underline">PBS 전용 화면</Link>을 이용하세요.</span>
        </div>
      </section>

      {/* 시간/장소 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">발생 시간 · 장소 (선택)</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-ink-mid">시간</label>
            <input type="time" defaultValue="14:30" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-ink-mid">장소</label>
            <select className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm">
              <option>푸른그룹홈 — 거실</option>
              <option>푸른그룹홈 — 식당</option>
              <option>야외 산책 중</option>
              <option>복지관 프로그램실</option>
              <option>기타</option>
            </select>
          </div>
        </div>
      </section>

      {/* 사진 첨부 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">사진 첨부 (선택, 최대 3장)</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="aspect-square rounded-lg bg-secondary border border-border flex items-center justify-center text-2xl">📷</div>
          <div className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center text-2xl">+</div>
          <div className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center text-2xl">+</div>
        </div>
      </section>

      {/* PBS 연결 안내 */}
      <div className="rounded-xl border border-life-transition/30 bg-life-transition/5 p-4 text-sm">
        <div className="font-bold text-blue-800">📋 도전행동이 있었나요?</div>
        <div className="mt-1 text-blue-700">ABC 분석 입력 화면으로 이동하면 선행사건·행동·대응을 구조화해 기록하고 AI 패턴 분석을 받을 수 있어요.</div>
        <div className="mt-2">
          <Link href="/records/c-001/pbs/new" className="btn-secondary text-xs">🧠 PBS 도전행동 기록 →</Link>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/worker" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">임시저장</button>
          <button className="btn-primary">저장 + 보호자 동기화 →</button>
        </div>
      </div>
    </div>
  );
}
