import { PageHeader } from "@/components/Card";
import { NOTIFICATIONS } from "@/lib/mock-data";

export default function NotificationsPage() {
  const unread = NOTIFICATIONS.filter((n) => !n.read);

  return (
    <div className="space-y-6">
      <PageHeader title="알림 센터" subtitle={`안 읽은 알림 ${unread.length}건 · 다채널 + 다이제스트 (FR-35~39)`} />

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap text-xs">
        {["전체", "긴급 (만료·이상접근)", "높음", "중간", "낮음 (다이제스트)"].map((f, i) => (
          <button key={f} className={`rounded-full px-3 py-1.5 font-semibold ${i === 0 ? "bg-primary text-white" : "bg-white border border-border hover:border-primary"}`}>
            {f}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        {NOTIFICATIONS.map((n) => {
          const colors: Record<string, string> = { "긴급": "#DC2626", "높음": "#E07A5F", "중간": "#F2A93B", "낮음": "#6B7280" };
          const color = colors[n.level] || "#6B7280";
          return (
            <article key={n.id} className={`card flex overflow-hidden ${!n.read ? "ring-2 ring-accent/40" : ""}`}>
              <div className="w-1.5" style={{ backgroundColor: color }} />
              <div className="flex-1 p-4 flex items-start gap-3">
                <div className="text-2xl">{icon(n.type)}</div>
                <div className="flex-1">
                  <header className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="badge" style={{ backgroundColor: color, color: "white" }}>{n.level}</span>
                      <strong>{n.title}</strong>
                      {!n.read && <span className="badge bg-accent text-white">NEW</span>}
                    </div>
                    <span className="text-xs text-ink-mid">{n.time}</span>
                  </header>
                  <p className="mt-1 text-sm text-ink">{n.body}</p>
                  {n.type === "permission" && (
                    <div className="mt-3 flex gap-2">
                      <button className="btn-primary text-xs py-1.5">지금 갱신 →</button>
                      <button className="btn-secondary text-xs py-1.5">권한 종료</button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Settings hint */}
      <section className="card p-5 bg-secondary">
        <h2 className="font-bold text-primary-dark">⚙️ 알림 설정</h2>
        <p className="text-xs text-ink-mid mt-1">유형별·채널별·시간대 토글 (FR-38). ‘중요 알림은 항상 ON’ 강제 (Risk #5)</p>
        <div className="mt-3 grid md:grid-cols-4 gap-2 text-xs">
          {[
            { l: "권한 만료", on: true, locked: true },
            { l: "신규 일지", on: true, locked: false },
            { l: "당사자 동의", on: true, locked: true },
            { l: "마이그레이션", on: true, locked: false },
          ].map((s) => (
            <div key={s.l} className="flex items-center justify-between rounded-lg bg-white border border-border px-3 py-2">
              <span>{s.l} {s.locked && "🔒"}</span>
              <span className={`badge ${s.on ? "bg-primary text-white" : "bg-border"}`}>{s.on ? "ON" : "OFF"}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function icon(type: string) {
  const map: Record<string, string> = { permission: "🔑", migration: "📸", consent: "✋", digest: "📰" };
  return map[type] || "🔔";
}
