import { PageHeader } from "@/components/Card";

export default function ExportPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="데이터 내보내기" subtitle="4종 형식 + 비밀번호 옵션 + 감사 로그 5년 (FR-43~47)" />

      {/* Format cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: "📄", name: "인계서 PDF", time: "즉시", desc: "신규 기관 전달용 · A4 · 비밀번호 옵션", color: "#3B82F6", fr: "FR-43" },
          { icon: "📊", name: "엑셀 리포트", time: "5분", desc: "분기 활동 · 카테고리 필터 + 익명화", color: "#5CB85C", fr: "FR-44" },
          { icon: "💼", name: "ZIP 전체 백업", time: "1시간", desc: "사진·음성·텍스트 통합 + 7일 다운로드 링크", color: "#7C3AED", fr: "FR-45" },
          { icon: "🔓", name: "JSON 이동권", time: "30분", desc: "개인정보 이동권 표준 (GDPR Art.20 호환)", color: "#E07A5F", fr: "FR-46" },
        ].map((f) => (
          <div key={f.name} className="card p-5 border-t-4" style={{ borderTopColor: f.color }}>
            <div className="text-3xl">{f.icon}</div>
            <div className="mt-2 font-bold text-primary-dark">{f.name}</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: f.color }}>처리 {f.time}</div>
            <p className="text-xs text-ink-mid mt-2">{f.desc}</p>
            <div className="text-[10px] text-ink-mid mt-2">{f.fr}</div>
            <button className="mt-3 btn-secondary w-full text-xs py-2">내보내기 →</button>
          </div>
        ))}
      </section>

      {/* Options panel */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark">옵션 매트릭스</h2>
        <table className="mt-4 w-full text-sm">
          <thead className="bg-secondary text-xs">
            <tr>
              <th className="p-2 text-left">옵션</th>
              <th className="p-2">PDF</th><th className="p-2">엑셀</th><th className="p-2">ZIP</th><th className="p-2">JSON</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {[
              ["기간 선택", "O", "O", "O", "O"],
              ["카테고리 필터", "O", "O", "X", "X"],
              ["사진 포함", "썸네일", "X", "원본", "Base64"],
              ["음성 포함", "X", "X", "O", "O"],
              ["익명화", "X", "O", "X", "X"],
              ["비밀번호 보호", "O", "X", "O", "X"],
            ].map((r) => (
              <tr key={r[0]} className="border-b border-border last:border-0">
                <td className="p-2 font-bold">{r[0]}</td>
                <td className="p-2 text-center">{r[1]}</td>
                <td className="p-2 text-center">{r[2]}</td>
                <td className="p-2 text-center">{r[3]}</td>
                <td className="p-2 text-center">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Audit info */}
      <div className="rounded-lg bg-life-transition/10 border border-life-transition p-4 text-sm">
        🔒 모든 내보내기 행동은 5년간 감사 로그에 보존됩니다 (FR-47). 보호자에게 알림 자동 발송.
      </div>
    </div>
  );
}
