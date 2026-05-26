import { PageHeader, CategoryChip } from "@/components/Card";

export default function OfflinePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="오프라인 큐" subtitle="네트워크 단절 시 로컬 저장 → 복귀 시 자동 동기화 (FR-30~34)" />

      {/* Status panel */}
      <div className="rounded-xl bg-life-transition/5 border-2 border-life-transition p-5">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-ink-mid">현재 상태</div>
            <div className="text-2xl font-bold text-life-transition mt-1">🌐 온라인</div>
          </div>
          <div>
            <div className="text-xs text-ink-mid">로컬 큐 사용량</div>
            <div className="text-2xl font-bold text-primary mt-1">12 MB / 500 MB</div>
            <div className="h-1.5 mt-2 rounded-full bg-white">
              <div className="h-full rounded-full bg-primary" style={{ width: "2.4%" }} />
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-mid">대기 중</div>
            <div className="text-2xl font-bold text-accent mt-1">0건</div>
          </div>
        </div>
      </div>

      {/* Simulator */}
      <section className="card p-5 bg-secondary">
        <h2 className="font-bold text-primary-dark">🧪 시뮬레이터 (프로토타입)</h2>
        <p className="text-xs text-ink-mid mt-1">실제 네트워크 변화 없이 오프라인 모드 UI를 미리 볼 수 있습니다.</p>
        <div className="mt-3 flex gap-2">
          <button className="btn-secondary text-xs">📡 오프라인 진입</button>
          <button className="btn-primary text-xs">🔄 동기화 강제</button>
          <button className="btn-secondary text-xs">⚠️ 충돌 발생</button>
        </div>
      </section>

      {/* History */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-3">최근 동기화 이력</h2>
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs">
            <tr>
              <th className="p-2 text-left">시각</th>
              <th className="p-2 text-left">이벤트</th>
              <th className="p-2 text-left">건수</th>
              <th className="p-2 text-left">결과</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: "2026-05-25 18:05", event: "산간 캠프 자동 동기화", count: "5건", result: "성공 (충돌 1건 병합)" },
              { time: "2026-05-25 14:15", event: "오프라인 일지 저장", count: "+1건", result: "로컬 큐 (AES-256)" },
              { time: "2026-05-25 11:00", event: "오프라인 일지 저장", count: "+1건", result: "로컬 큐 (AES-256)" },
              { time: "2026-05-25 10:00", event: "🚫 네트워크 단절 감지", count: "—", result: "오프라인 모드 ON" },
              { time: "2026-05-24 17:30", event: "정기 동기화", count: "3건", result: "성공" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="p-2 text-ink-mid text-xs">{row.time}</td>
                <td className="p-2">{row.event}</td>
                <td className="p-2">{row.count}</td>
                <td className="p-2 text-xs">
                  {row.result.includes("성공") ? (
                    <span className="text-life-school font-bold">{row.result}</span>
                  ) : (
                    <span className="text-life-transition">{row.result}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Conflict UI - example */}
      <section className="card p-5 border-l-4 border-alert">
        <h2 className="font-bold text-alert">⚠️ 충돌 병합 UI 예시 (2026-05-25 14:30)</h2>
        <p className="text-xs text-ink-mid mt-1">동일 시간대(12:30)에 활동지원사 + 보호자가 각각 일지 작성 → 사용자가 선택</p>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          {[
            { who: "이수진 (오프라인)", text: "오늘 점심으로 김치찌개 한 그릇 깨끗하게 비웠어요.", chosen: true },
            { who: "박순영 (보호자)", text: "지훈이 점심 메뉴 김치찌개 잘 먹었다고 해요.", chosen: false },
          ].map((o) => (
            <div key={o.who} className={`rounded-lg border-2 p-3 cursor-pointer ${o.chosen ? "border-primary bg-primary/5" : "border-border"}`}>
              <div className="flex items-center justify-between">
                <strong className="text-sm">{o.who}</strong>
                {o.chosen && <span className="badge bg-primary text-white">선택</span>}
              </div>
              <div className="text-sm mt-2">{o.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
