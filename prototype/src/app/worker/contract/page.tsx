import { PageHeader, StatCard } from "@/components/Card";

export default function ContractPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="계약 정보" subtitle="권한 만료·데이터 회수·책임 범위를 명확히" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="활성 계약" value="3건" sub="박지훈·이민호·김다은" />
        <StatCard label="평균 잔여" value="D-145" sub="가장 짧은 D-36" color="#F2A93B" />
        <StatCard label="자격증" value="유효" sub="AS-2023-12345 / ~2028" />
        <StatCard label="이번 분기 일지" value="380건" sub="평균 4.5건/일" />
      </div>

      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">권한 보유 현황</h2>
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs">
            <tr>
              <th className="p-2 text-left">이용자</th>
              <th className="p-2 text-left">발급자 (보호자/시설장)</th>
              <th className="p-2 text-left">범위</th>
              <th className="p-2 text-left">기간</th>
              <th className="p-2 text-left">잔여</th>
            </tr>
          </thead>
          <tbody>
            {[
              { user: "박지훈 (20)", grantor: "박순영 (보호자)", scope: "식사·행동·정서·학습", period: "2026-05-01 ~ 2026-08-31", days: "D-99" },
              { user: "이민호 (15)", grantor: "○○복지관 시설장", scope: "전 영역", period: "2026-03-01 ~ 2026-06-30", days: "D-36" },
              { user: "김다은 (17)", grantor: "김부모 (보호자)", scope: "식사·학습", period: "2026-04-15 ~ 2026-10-15", days: "D-143" },
            ].map((p) => (
              <tr key={p.user} className="border-b border-border last:border-0">
                <td className="p-2 font-semibold">{p.user}</td>
                <td className="p-2 text-ink-mid">{p.grantor}</td>
                <td className="p-2 text-xs">{p.scope}</td>
                <td className="p-2 text-xs">{p.period}</td>
                <td className="p-2 font-bold">{p.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card p-6 bg-secondary">
        <h2 className="font-bold text-primary-dark">📜 계약 종료 시 안심 안내</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>✓ 계약 종료 D-7부터 본인·시설장에게 자동 알림</li>
          <li>✓ D-0 도래 시 권한 자동 회수 — 데이터 접근 즉시 차단</li>
          <li>✓ 단말 캐시는 24시간 안에 자동 삭제됩니다 (앱 백그라운드 작업)</li>
          <li>✓ 본인이 작성한 일지의 ‘익명 통계’는 잔존 (개인정보 분리)</li>
          <li>✓ 후임 활동지원사가 결정되면 본인 작성분이 익명화 후 자동 인계됩니다</li>
        </ul>
      </section>
    </div>
  );
}
