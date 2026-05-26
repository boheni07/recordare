import Link from "next/link";
import { PageHeader, StatCard } from "@/components/Card";
import { SCREENING_TOOLS, SCREENING_RECORDS, CHILDREN } from "@/lib/mock-data";

export default function ScreeningListPage() {
  const completed = SCREENING_RECORDS.filter((r) => r.status === "completed").length;
  const needsReview = SCREENING_RECORDS.filter((r) => r.status === "review_needed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="자가진단 도구"
        subtitle="보호자 관찰 의견의 정기 기록 · AI 추이 분석 · 의료 진단 아님"
        actions={<Link href="/parent/screening/trend" className="btn-primary text-sm">📈 AI 추이 분석 →</Link>}
      />

      {/* 의료법 안전 면책 배너 (FR-68 의무) */}
      <div className="rounded-xl bg-yellow-50 border-2 border-alert p-5">
        <div className="flex items-start gap-3">
          <div className="text-3xl">⚠️</div>
          <div>
            <div className="font-bold text-orange-900">의료적 진단이 아닙니다 (FR-68)</div>
            <p className="text-sm text-orange-900 mt-1">
              본 도구는 <strong>보호자가 자녀를 관찰한 의견</strong>을 기록·추적하는 용도입니다.
              정식 발달 진단은 소아청소년과·발달재활 전문의 상담이 필요합니다.
              본 결과를 의료적 진단서로 사용할 수 없습니다.
            </p>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="누적 검사" value={`${SCREENING_RECORDS.length}건`} sub="박지훈 3건 · 박서연 1건" />
        <StatCard label="추적 관찰 필요" value={`${needsReview}건`} sub="박서연 (30개월령)" color="#F2A93B" />
        <StatCard label="가능한 도구" value={`${SCREENING_TOOLS.length}종`} sub="한국 표준" color="#3B82F6" />
        <StatCard label="다음 검사 권장" value="박지훈" sub="6개월 후" color="#5CB85C" />
      </div>

      {/* 검사 도구 카드 */}
      <section>
        <h2 className="font-bold text-primary-dark mb-3">사용 가능한 자가진단 도구 (6종)</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCREENING_TOOLS.map((t) => {
            const colorMap: Record<string, string> = {
              "발달 선별": "#FFC857", "자폐 선별": "#E07A5F", "자기결정": "#7C3AED",
              "자립생활": "#5CB85C", "적응행동": "#3B82F6",
            };
            const color = colorMap[t.domain] || "#2D6A4F";
            return (
              <Link key={t.key} href={`/parent/screening/${t.key}`} className="card p-4 hover:-translate-y-1 transition border-t-4" style={{ borderTopColor: color }}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold" style={{ color }}>{t.domain}</div>
                  <span className="badge bg-secondary text-ink-mid text-[10px]">{t.itemCount}문항 · {t.estimatedMinutes}분</span>
                </div>
                <div className="mt-2 text-lg font-bold text-primary-dark">{t.shortName}</div>
                <div className="text-xs text-ink-mid line-clamp-2 mt-1">{t.fullName}</div>
                <div className="mt-3 pt-3 border-t border-border text-xs">
                  <div className="text-ink-mid"><strong>대상:</strong> {t.ageRange}</div>
                  <div className="text-ink-mid"><strong>주기:</strong> {t.frequency}</div>
                  <div className="text-ink-mid mt-1 text-[10px]">{t.officialSource}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 최근 검사 이력 */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">최근 검사 이력 ({SCREENING_RECORDS.length}건)</h2>
          <Link href="/parent/screening/trend" className="text-xs text-accent font-bold">추이 분석 →</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs">
            <tr className="text-left">
              <th className="p-2">자녀</th>
              <th className="p-2">도구</th>
              <th className="p-2">실시일</th>
              <th className="p-2">응답자</th>
              <th className="p-2 text-right">점수</th>
              <th className="p-2">상태</th>
              <th className="p-2">액션</th>
            </tr>
          </thead>
          <tbody>
            {SCREENING_RECORDS.map((r) => {
              const child = CHILDREN.find((c) => c.id === r.personId);
              const tool = SCREENING_TOOLS.find((t) => t.key === r.toolKey);
              const pct = Math.round((r.totalScore / r.maxScore) * 100);
              return (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="p-2 font-semibold">{child?.name}</td>
                  <td className="p-2 text-xs">{tool?.shortName}</td>
                  <td className="p-2 text-xs text-ink-mid">{r.takenAt}</td>
                  <td className="p-2 text-xs">{r.takenBy}</td>
                  <td className="p-2 text-right">
                    <strong>{r.totalScore}</strong>
                    <span className="text-ink-mid text-xs">/{r.maxScore}</span>
                    <span className="ml-2 text-xs text-ink-mid">({pct}%)</span>
                  </td>
                  <td className="p-2">
                    {r.status === "completed" ? (
                      <span className="badge bg-life-school/15 text-green-900 text-[10px]">완료</span>
                    ) : r.status === "review_needed" ? (
                      <span className="badge bg-alert/20 text-orange-900 text-[10px]">관찰 필요</span>
                    ) : (
                      <span className="badge bg-secondary text-[10px]">{r.status}</span>
                    )}
                  </td>
                  <td className="p-2">
                    <button className="text-xs text-accent font-bold">🔍 상세</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
