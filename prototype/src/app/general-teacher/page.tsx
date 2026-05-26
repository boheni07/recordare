import Link from "next/link";
import { PageHeader, StatCard } from "@/components/Card";
import { INTEGRATED_STUDENTS, TEACHER_MEMOS } from "@/lib/mock-data";

export default function GeneralTeacherDashboard() {
  const student = INTEGRATED_STUDENTS[0];
  return (
    <div className="space-y-8">
      <PageHeader
        title="일반교사 대시보드"
        subtitle="윤교사 · 한빛초등학교 4학년 3반 (일반 25명 + 통합 1명) · v2.4 신규 U6 페르소나"
        actions={<Link href="/general-teacher/memo" className="btn-primary text-sm">+ 짧은 메모</Link>}
      />

      {/* KPI 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="통합 학생" value="1명" sub={`${student.name} (${student.age}세)`} color="#5CB85C" />
        <StatCard label="이번 주 메모" value="3건" sub="평균 작성 30초" color="#3B82F6" />
        <StatCard label="특수교사 마지막 회신" value="2일 전" sub="한교사" color="#7C3AED" />
      </div>

      {/* 담당 통합 학생 */}
      <section className="card p-6 border-l-4 border-life-school">
        <h2 className="font-bold text-primary-dark mb-3">담당 통합 학생</h2>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-life-school/15 flex items-center justify-center text-3xl">🧒</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <strong className="text-lg">{student.name}</strong>
              <span className="badge bg-life-school/15 text-green-900">10세 · 학령기</span>
              {student.aac && <span className="badge bg-life-adult/15 text-purple-900">AAC 부분 사용</span>}
            </div>
            <div className="text-sm text-ink-mid mt-1">{student.disability} · 통합학급 4학년 3반</div>
            <div className="mt-2 text-xs text-ink-mid">
              학급 분위기 영향: 긍정 60% / 부정 10% / 중립 30% (최근 4주)
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/general-teacher/memo" className="btn-primary text-xs">+ 짧은 메모</Link>
            <button className="btn-secondary text-xs">🔍 최근 메모</button>
          </div>
        </div>
      </section>

      {/* 최근 메모 */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">최근 짧은 메모 (3건)</h2>
        <div className="space-y-3">
          {TEACHER_MEMOS.map((m) => (
            <div key={m.id} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2 flex-wrap">
                  {m.context.map((c) => (
                    <span key={c} className="badge bg-life-school/15 text-green-900 text-[10px]">{c}</span>
                  ))}
                </div>
                <span className="text-xs text-ink-mid">{m.createdAt}</span>
              </div>
              <p className="text-sm">{m.text}</p>
              <div className="mt-2 text-xs text-ink-mid">→ 공유: {m.sharedWith.join(" · ")}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 권한 안내 */}
      <div className="rounded-lg bg-yellow-50 border border-alert p-4 text-sm">
        ⚠️ <strong>권한 안내 (FR-72)</strong>: 본인 담당 통합 학생 1명만 메모 가능. 일반 학생 25명의 정보는 시스템에 등록·접근 불가.
        메모는 본인 + 특수교사 + 보호자에게만 공유.
      </div>
    </div>
  );
}
