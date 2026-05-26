import Link from "next/link";
import { PageHeader, StatCard } from "@/components/Card";
import { SCREENING_RECORDS, CHILDREN, SCREENING_TOOLS } from "@/lib/mock-data";

export default function TrendAnalysisPage() {
  // 박지훈 자기결정능력 자가체크 3회를 분석
  const records = SCREENING_RECORDS.filter((r) => r.personId === "c-001" && r.toolKey === "self-determination");
  const child = CHILDREN.find((c) => c.id === "c-001")!;
  const tool = SCREENING_TOOLS.find((t) => t.key === "self-determination")!;
  const sorted = [...records].sort((a, b) => a.takenAt.localeCompare(b.takenAt));
  const first = sorted[0];
  const latest = sorted[sorted.length - 1];
  const totalDelta = latest.totalScore - first.totalScore;

  // 도메인 시계열 (4개 도메인 × 3시점)
  const domainNames = first.domains.map((d) => d.name);
  const series = domainNames.map((name) => ({
    name,
    points: sorted.map((r) => {
      const d = r.domains.find((x) => x.name === name)!;
      return { score: d.score, max: d.max };
    }),
    delta: (sorted[sorted.length - 1].domains.find((d) => d.name === name)?.score ?? 0) -
           (sorted[0].domains.find((d) => d.name === name)?.score ?? 0),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI 추이 분석"
        subtitle={`${child.name} · ${tool.shortName} (${sorted.length}회 시계열) · FR-67`}
        actions={<Link href="/parent/screening" className="btn-secondary text-sm">← 목록</Link>}
      />

      {/* 의료법 안전 배너 */}
      <div className="rounded-lg bg-yellow-50 border border-alert p-4 text-sm">
        ⚠️ <strong>의료 진단 아님:</strong> 본 분석은 보호자 자가진단 결과의 시계열 추이입니다.
        AI 인사이트는 참고용이며, 정식 발달 평가는 발달재활 전문가 상담이 필요합니다.
      </div>

      {/* KPI 요약 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="검사 횟수" value={`${sorted.length}회`} sub={`${first.takenAt} ~ ${latest.takenAt}`} />
        <StatCard label="총점 변화" value={`+${totalDelta}점`} sub={`${first.totalScore} → ${latest.totalScore}/${latest.maxScore}`} color="#5CB85C" />
        <StatCard label="전 영역" value="상승 ↑" sub="4/4 도메인 개선" color="#5CB85C" />
        <StatCard label="다음 권장 검사" value="2026-06" sub="학기별 (반기)" color="#3B82F6" />
      </div>

      {/* 도메인별 시계열 차트 (CSS 막대 차트) */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">📊 도메인별 점수 추이 ({sorted.length}회)</h2>
        <div className="space-y-5">
          {series.map((s) => {
            const colors = ["#7C3AED", "#5CB85C", "#3B82F6", "#E07A5F"];
            const ci = domainNames.indexOf(s.name);
            const color = colors[ci % colors.length];
            return (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-sm">{s.name}</strong>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-ink-mid">변화</span>
                    <span className="font-bold" style={{ color }}>
                      {s.delta >= 0 ? "+" : ""}{s.delta}점
                    </span>
                    <span className="text-lg">{s.delta > 0 ? "↑" : s.delta < 0 ? "↓" : "→"}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {s.points.map((p, i) => {
                    const pct = (p.score / p.max) * 100;
                    return (
                      <div key={i} className="rounded-lg bg-secondary p-3">
                        <div className="text-[10px] text-ink-mid">{sorted[i].takenAt.slice(2, 7)}</div>
                        <div className="mt-2 h-2 rounded-full bg-white overflow-hidden">
                          <div className="h-full rounded-full" style={{ backgroundColor: color, width: `${pct}%` }} />
                        </div>
                        <div className="mt-1 flex items-baseline justify-between">
                          <span className="text-sm font-bold" style={{ color }}>{p.score}</span>
                          <span className="text-[10px] text-ink-mid">/ {p.max}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI 인사이트 */}
      <section className="card p-6 bg-gradient-to-br from-life-transition/5 to-primary/5 border-l-4 border-life-transition">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🤖</span>
          <h2 className="font-bold text-primary-dark text-lg">AI 추이 분석 인사이트</h2>
          <span className="badge bg-life-transition text-white">LLM 생성</span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            박지훈님의 <strong>자기결정능력 자가체크</strong>는 2024년 12월 첫 검사 이후 1년간{" "}
            <strong className="text-life-school">총 +18점 상승 (58 → 76)</strong>하였습니다.
            특히 <strong className="text-life-adult">자율성 영역</strong>이 +6점으로 가장 큰 폭의 개선을 보였습니다.
          </p>
          <p>
            이 변화는 <strong>2025년 6월 AAC 동의 카드 5회 활용</strong> 이후 두드러집니다.
            본인이 직접 의사를 표현하는 빈도가 늘면서 자기조절·자기인식 영역도 동반 상승하였습니다.
          </p>
          <div className="rounded-lg bg-white p-4 border border-life-transition">
            <div className="text-xs font-bold text-life-transition mb-1">📝 보호자 권장 사항</div>
            <ul className="text-sm space-y-1">
              <li>•  18세 이양 가이드 D-90 단계 진행 — 의료 항목 부분 이양에 적합한 자기결정 수준</li>
              <li>•  의료 결정 시뮬레이션 도입 검토 (FR-49 모의 동의 시뮬레이션 연계)</li>
              <li>•  다음 검사: 2026년 6월 (학기별 권장)</li>
            </ul>
          </div>
          <div className="rounded-lg bg-yellow-50 border border-alert p-3 text-xs">
            ⚠️ 본 인사이트는 보호자 응답 기반 자가진단 결과입니다.
            <strong> 정식 자기결정능력 평가는 발달재활서비스 전문가 상담이 권장됩니다.</strong>
          </div>
        </div>
      </section>

      {/* 비교 — 다른 자녀 추이 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark text-sm mb-3">다른 자녀 추이 (간단 비교)</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <strong>박서연 (3세)</strong>
              <span className="ml-2 text-xs text-ink-mid">K-DST 30개월령 · 1회</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge bg-alert/20 text-orange-900">관찰 필요</span>
              <Link href="#" className="text-xs text-accent font-bold">전문가 상담 안내 →</Link>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-border p-3 text-xs text-ink-mid text-center">
            추이 분석은 최소 3회 이상 데이터 누적 시 활성화됩니다 (FR-67 안전 정책)
          </div>
        </div>
      </section>

      {/* 액션 */}
      <div className="flex justify-between">
        <Link href="/parent/screening" className="btn-secondary">← 자가진단 목록</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">📥 추이 분석 PDF</button>
          <Link href="/parent/handover/new" className="btn-primary">📝 인계서에 첨부 →</Link>
        </div>
      </div>
    </div>
  );
}
