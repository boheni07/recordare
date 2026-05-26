import Link from "next/link";
import { PageHeader, CategoryChip } from "@/components/Card";
import { CATEGORIES, INTEGRATED_STUDENTS } from "@/lib/mock-data";

const CONTEXT_TAGS = [
  { tag: "또래 영향 긍정", positive: true },
  { tag: "또래 영향 부정", positive: false },
  { tag: "수업 참여 적극", positive: true },
  { tag: "자리 이탈", positive: false },
  { tag: "친구 도움 받음", positive: true },
  { tag: "갈등 발생", positive: false },
];

export default function TeacherMemoPage() {
  const student = INTEGRATED_STUDENTS[0];
  return (
    <div className="space-y-6">
      <PageHeader
        title="✏️ 짧은 메모"
        subtitle={`${student.name} (통합학급 4학년 3반) · 평균 30초 작성 (FR-73 · v2.4 신규)`}
        actions={<Link href="/general-teacher" className="btn-secondary text-sm">← 대시보드</Link>}
      />

      {/* 권한 안내 */}
      <div className="rounded-xl bg-life-school/10 border-2 border-life-school p-4 text-sm">
        🔒 <strong>권한 안내</strong>: 본 메모는 김민호님과 보호자·특수교사 한교사에게만 공유됩니다. 일반 학생 정보 보호.
      </div>

      {/* 카테고리 (빠른 선택과 동일 패턴) */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">카테고리 선택</h2>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {(Object.entries(CATEGORIES) as any).map(([k, c]: any) => (
            <button key={k} className={`rounded-lg border-2 py-3 ${k === "behavior" ? "border-primary bg-primary/5" : "border-border opacity-50"}`}>
              <div className="text-2xl text-center">{c.emoji}</div>
              <div className="text-xs font-bold text-center mt-1">{c.label}</div>
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-ink-mid">⚠️ 의료 카테고리는 일반교사가 선택할 수 없습니다 (의료 권한 별도)</div>
      </section>

      {/* 학급 컨텍스트 (일반 학생 식별 정보 X) */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">학급 컨텍스트 (선택 · 일반 학생 식별 정보 0건)</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {CONTEXT_TAGS.map((c, i) => (
            <label key={c.tag} className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer ${i === 0 || i === 2 ? "border-primary bg-primary/5" : "border-border"}`}>
              <input type="checkbox" defaultChecked={i === 0 || i === 2} className="rounded" />
              <span className="text-sm">{c.positive ? "👍" : "⚠️"} {c.tag}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 메모 (1줄) */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm">메모 (1줄, 30초 작성 목표)</h2>
        <textarea
          rows={2}
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-sm"
          defaultValue="오늘 친구와 점심 함께 함"
        />
        <div className="mt-2 text-xs text-ink-mid">💡 OS 키보드 음성 입력 사용 가능 (Android·iOS 기본 제공)</div>
      </section>

      {/* 공유 옵션 */}
      <section className="card p-5 bg-secondary">
        <h2 className="font-bold text-primary-dark text-sm">공유 옵션</h2>
        <div className="mt-3 space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            특수교사 한교사 공유 (IEP·회의자료 반영)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            보호자 공유 (일주일 다이제스트)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            저장만 (내부, 공유 안 함)
          </label>
        </div>
      </section>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Link href="/general-teacher" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">저장만</button>
          <button className="btn-accent">📤 저장 + 공유</button>
        </div>
      </div>
    </div>
  );
}
