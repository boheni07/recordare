import { PageHeader, CategoryChip } from "@/components/Card";

export default function MigrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="사진 마이그레이션" subtitle="카톡·갤러리·종이 노트의 기존 기록을 AI가 자동 분류합니다 (FR-26)" />

      {/* In-progress banner */}
      <div className="rounded-xl bg-gradient-to-r from-life-transition/10 to-life-school/10 border border-life-transition p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-blue-900">📡 진행 중: 카톡 zip · 1만 장 분류</div>
            <div className="text-xs text-ink-mid mt-1">예상 완료: 14일 후 · 6일 경과</div>
          </div>
          <div className="text-2xl font-bold text-life-transition">43%</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white overflow-hidden">
          <div className="h-full bg-life-transition" style={{ width: "43%" }} />
        </div>
        <div className="mt-2 text-xs text-ink-mid">
          현재 분류: 4,321 / 10,000 장 · 분류 정확도 추정 72% · 보호자 검수 대기 200장
        </div>
      </div>

      {/* Channel cards */}
      <section className="card p-6">
        <h2 className="font-bold text-primary-dark mb-4">채널 선택 + 업로드</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: "💬", name: "카톡 사진 zip 백업", limit: "1만 장 / 14일", status: "active" },
            { icon: "📱", name: "휴대폰 갤러리", limit: "5천 장 / 7일", status: "available" },
            { icon: "📓", name: "종이 노트 OCR (Clova)", limit: "100장 / 3일", status: "available" },
            { icon: "📊", name: "엑셀 / 한글", limit: "행 단위 즉시", status: "available" },
          ].map((c) => (
            <div key={c.name} className={`rounded-lg border-2 p-4 ${c.status === "active" ? "border-life-transition bg-life-transition/5" : "border-border"}`}>
              <div className="text-3xl">{c.icon}</div>
              <div className="font-bold text-primary-dark mt-2">{c.name}</div>
              <div className="text-xs text-ink-mid">{c.limit}</div>
              <button className="mt-3 text-xs font-bold text-accent">
                {c.status === "active" ? "✓ 진행 중" : "선택 →"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Review preview */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">검수 대기 (200장 · 카드 스와이프) — FR-28</h2>
          <button className="btn-primary text-xs">전체 검수 시작 →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { c: "meal" as const, year: "2008" },
            { c: "behavior" as const, year: "2010" },
            { c: "study" as const, year: "2012" },
            { c: "emotion" as const, year: "2015" },
          ].map((p, i) => (
            <div key={i} className="rounded-lg border border-border overflow-hidden">
              <div className="aspect-square bg-secondary flex items-center justify-center text-4xl">📷</div>
              <div className="p-2 text-xs">
                <CategoryChip category={p.c} />
                <div className="mt-1 text-ink-mid">{p.year}년 추정</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Risk note */}
      <div className="rounded-lg bg-alert/10 border border-alert p-4 text-sm">
        <strong>⚠️ Risk #4 대응:</strong> AI 분류 정확도 70% 보장.
        결과는 카드 스와이프로 즉시 정정 가능하며 분류 오류로 인한 이탈을 방지합니다.
      </div>
    </div>
  );
}
