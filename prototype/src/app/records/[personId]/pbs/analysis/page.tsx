import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { CHILDREN, PBS_RECORDS } from "@/lib/mock-data";

// FR-85 | B.8.3 PBS AI 패턴 분석 (10건+ 누적 후 활성화)
export default async function PbsAnalysisPage({ params }: { params: Promise<{ personId: string }> }) {
  const { personId } = await params;
  const person = CHILDREN.find((c) => c.id === personId) ?? CHILDREN.find((c) => c.id === "c-001")!;
  const records = PBS_RECORDS.filter((r) => r.personId === person.id);
  const isActive = records.length >= 10;

  // Mock: 3건으로도 분석 화면 시뮬레이션
  const weeklyData = [2, 1, 3, 0, 2, 3, 5]; // 7주 빈도

  return (
    <div className="space-y-6">
      <PageHeader
        title="📊 도전행동 패턴 분석"
        subtitle={`${person.name} · 최근 3개월 (2026.02 ~ 2026.05) · FR-85`}
        actions={
          <Link href={`/records/${person.id}/pbs/new`} className="btn-primary text-xs">
            + 새 기록 추가
          </Link>
        }
      />

      {/* 면책 배너 */}
      <div className="rounded-xl bg-amber-50 border border-amber-300 p-3 text-xs text-amber-800">
        ⚠️ 본 분석은 <strong>AI 추론</strong>이며 전문가 진단이 아닙니다. 참고 자료로만 활용하고 중요 결정은 전문가와 상의하세요. (FR-68)
      </div>

      {/* 활성화 조건 */}
      {!isActive && (
        <div className="rounded-xl bg-life-transition/10 border border-life-transition/30 p-4 text-sm">
          <div className="font-bold text-blue-800">🔒 패턴 분석은 10건 이상 기록 후 활성화됩니다</div>
          <div className="mt-1 text-blue-700">현재 {records.length}건 기록됨. {10 - records.length}건 더 추가하면 AI 분석이 시작됩니다.</div>
          <div className="mt-2">
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(records.length / 10) * 100}%` }} />
            </div>
          </div>
          <div className="mt-3 text-xs text-ink-mid">아래 분석은 10건 이후 실제 데이터 기반으로 대체됩니다 (현재 샘플 표시)</div>
        </div>
      )}

      {/* 주간 빈도 그래프 */}
      <section className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">주간 발생 빈도</h2>
          <div className="text-sm">
            <span className="text-red-600 font-bold">이번 주 5건</span>
            <span className="text-ink-mid"> / 지난 주 3건</span>
            <span className="ml-1 text-xs text-red-500">(+67%)</span>
          </div>
        </div>
        <div className="flex items-end gap-2 h-32">
          {weeklyData.map((count, i) => {
            const weekLabel = `${7 - i}주 전`;
            const isThisWeek = i === weeklyData.length - 1;
            const heightPct = count === 0 ? 4 : (count / Math.max(...weeklyData)) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-ink-mid">{count}</div>
                <div
                  className={`w-full rounded-t-md transition-all ${isThisWeek ? "bg-red-400" : "bg-life-transition/50"}`}
                  style={{ height: `${heightPct}%` }}
                />
                <div className="text-[10px] text-ink-mid">{isThisWeek ? "이번주" : `W${i + 1}`}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 주요 패턴 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark mb-4">🔍 주요 패턴 (AI 추론)</h2>
        <div className="space-y-3">
          <div className="rounded-xl bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-2">
              <span className="text-red-500 text-lg">⚠️</span>
              <div>
                <div className="font-bold text-red-800 text-sm">위험 패턴: 수면 부족 + 소음 환경</div>
                <div className="text-sm text-red-700 mt-1">수면 6시간 이하인 날 소음 환경에서 도전행동 발생 확률 <strong>82%</strong></div>
                <div className="text-xs text-red-600 mt-1">근거: 2026.05.24 기록 — 수면 5h + 소음 환경 → 자해 강도 2</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-start gap-2">
              <span className="text-amber-500 text-lg">⚠️</span>
              <div>
                <div className="font-bold text-amber-800 text-sm">주의 패턴: 일정 변경 + 낯선 사람</div>
                <div className="text-sm text-amber-700 mt-1">일정 변경과 낯선 사람이 동시 발생 시 강도 3+ 발생 확률 <strong>71%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 효과적인 대응 전략 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark mb-4">✅ 효과적인 대응 전략 비교</h2>
        <div className="space-y-3">
          {[
            { method: "AAC 판 제공", avgMin: 4, color: "bg-life-school" },
            { method: "안정실 이동", avgMin: 8, color: "bg-life-transition" },
            { method: "좋아하는 사진", avgMin: 6, color: "bg-life-transition/70" },
            { method: "신체 보조", avgMin: 12, color: "bg-secondary border border-border" },
          ].map((item) => (
            <div key={item.method} className="flex items-center gap-3">
              <div className="w-32 text-sm font-semibold">{item.method}</div>
              <div className="flex-1 bg-secondary rounded-full h-4 overflow-hidden">
                <div className={`h-4 rounded-full ${item.color}`} style={{ width: `${(1 - item.avgMin / 15) * 100}%` }} />
              </div>
              <div className="text-sm font-bold w-16 text-right">평균 {item.avgMin}분</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs font-semibold text-green-700">
          💡 AAC 판 제공이 평균 4분으로 가장 빠른 진정 효과 — 안정실 이동 대비 2배 효과적
        </div>
      </section>

      {/* 선행사건 빈도 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark mb-4">📌 선행사건 빈도 (상위 5)</h2>
        <div className="space-y-2">
          {[
            { trigger: "소음", count: 5, pct: 62 },
            { trigger: "일정 변경", count: 4, pct: 50 },
            { trigger: "낯선 사람", count: 3, pct: 38 },
            { trigger: "강한 빛", count: 2, pct: 25 },
            { trigger: "요구 거절", count: 1, pct: 13 },
          ].map((item) => (
            <div key={item.trigger} className="flex items-center gap-3">
              <div className="w-24 text-sm">{item.trigger}</div>
              <div className="flex-1 bg-secondary rounded-full h-3">
                <div className="bg-life-transition h-3 rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
              <div className="text-xs text-ink-mid w-12 text-right">{item.count}건 ({item.pct}%)</div>
            </div>
          ))}
        </div>
      </section>

      {/* 액션 */}
      <div className="flex gap-3 flex-wrap">
        <button className="btn-secondary">📄 PDF 저장</button>
        <button className="btn-secondary">📤 케어 매니저 공유</button>
        <button className="btn-secondary">👨‍⚕️ 전문가에게 보내기 (MP)</button>
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/worker" className="btn-secondary">← 대시보드</Link>
        <Link href={`/records/${person.id}/pbs/new`} className="btn-primary">+ 새 기록 추가</Link>
      </div>
    </div>
  );
}
