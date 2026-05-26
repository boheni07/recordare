import Link from "next/link";
import { PageHeader, StatCard, CategoryChip, LifeBadge } from "@/components/Card";
import { CHILDREN, JOURNAL_ENTRIES, PERMISSIONS, NOTIFICATIONS, PRIMARY_CHILD, LIFE_STAGES } from "@/lib/mock-data";

export default function ParentDashboard() {
  const child = PRIMARY_CHILD;
  const recent = JOURNAL_ENTRIES.slice(0, 3);
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="보호자 대시보드"
        subtitle={`안녕하세요 박순영님 · 등록된 자녀 ${CHILDREN.length}명 · 오늘 ${child.name}님 일지 ${recent.length}건`}
        actions={
          <Link href="/parent/timeline" className="btn-primary text-sm">전체 타임라인 →</Link>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="등록 자녀" value={`${CHILDREN.length}명`} sub="5종 생애주기 시범" />
        <StatCard label="이번 주 만료 알림" value="1건" sub="최주임 D-7" color="#F2A93B" />
        <StatCard label="작성된 일지 (전체)" value="247건" sub="이번 달 32건" />
        <StatCard label="안 읽은 알림" value={`${unread}건`} color="#E07A5F" />
      </div>

      {/* Multi-child Grid */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-primary-dark">등록된 자녀 ({CHILDREN.length}명) — 생애주기 5단계</h2>
          <Link href="/parent/children/new" className="text-xs text-accent font-bold">+ 자녀 추가</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CHILDREN.map((c) => {
            const stage = LIFE_STAGES[c.stage];
            const isPrimary = c.id === child.id;
            return (
              <Link
                key={c.id}
                href="/parent/timeline"
                className={`card p-4 hover:-translate-y-1 transition border-t-4 ${isPrimary ? "ring-2 ring-accent" : ""}`}
                style={{ borderTopColor: stage.color }}
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: `${stage.color}25` }}>
                    {emoji(c.stage)}
                  </div>
                  {isPrimary && <span className="badge bg-accent text-white text-[10px]">대표</span>}
                </div>
                <div className="mt-3 font-bold text-primary-dark">{c.name}</div>
                <div className="text-xs text-ink-mid">{c.age}세 · {stage.label}</div>
                <div className="mt-2 text-[11px] text-ink-mid line-clamp-2">{c.disability}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {c.aac && <span className="badge bg-life-adult/15 text-purple-900 text-[10px]">AAC</span>}
                  {c.guardianshipType !== "none" && <span className="badge bg-life-senior/15 text-gray-800 text-[10px]">후견</span>}
                  {c.transitionPhase !== "not_started" && c.transitionPhase !== "completed" && <span className="badge bg-alert/20 text-orange-900 text-[10px]">이양 중</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Primary Child Detail Card */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-ink-mid">📌 대표 자녀 — 박지훈 (18세 이양 가이드 진행 중)</div>
          <span className="badge bg-accent/15 text-accent">이양 단계: {child.transitionPhase}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-life-transition to-life-adult flex items-center justify-center text-3xl">👦</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary-dark">{child.name}</div>
              <LifeBadge stage={child.stage} />
              {child.aac && <span className="badge bg-life-adult/15 text-purple-900">AAC · 픽토그램 {child.aacPictograms}개</span>}
            </div>
            <div className="text-sm text-ink-mid mt-1">
              {child.disability} ({child.disabilityCategory}) · 생년월일 {child.birth} · 소속 {child.facility}
            </div>
            <div className="text-xs text-ink-mid mt-1">
              권한 모델: {child.permissionModel === "co" ? "보호자 + 당사자 공동" : child.permissionModel}
              {" · "}복용약 {child.medical?.medications.length ?? 0}개 · 알레르기 {child.medical?.allergies.length ?? 0}건 · 위험 트리거 {child.risk?.triggers.length ?? 0}건
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/parent/timeline" className="btn-secondary text-xs">📅 타임라인 보기</Link>
              <Link href="/parent/handover/new" className="btn-secondary text-xs">📝 인계서 만들기</Link>
              <Link href="/parent/export" className="btn-secondary text-xs">📤 데이터 내보내기</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent journals */}
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-primary-dark">최근 일지 (3건)</h2>
            <Link href="/parent/timeline" className="text-xs text-accent font-bold">전체 보기 →</Link>
          </div>
          <div className="mt-4 space-y-3">
            {recent.map((j) => (
              <div key={j.id} className="flex gap-3 p-3 rounded-lg border border-border hover:border-primary transition">
                <div className="w-1 rounded-full" style={{ backgroundColor: `var(--life-${j.stage})` }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryChip category={j.category} />
                    <span className="text-xs text-ink-mid">{j.author}</span>
                    <span className="text-xs text-ink-mid ml-auto">{j.createdAt.split(" ")[1]}</span>
                  </div>
                  <p className="text-sm">{j.text}</p>
                  {j.photos > 0 && <div className="text-xs text-ink-mid mt-1">📷 사진 {j.photos}장</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Permissions */}
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-primary-dark">활성 권한 ({PERMISSIONS.length}명)</h2>
            <Link href="/parent/permissions/grant" className="text-xs text-accent font-bold">+ 새 권한 위임</Link>
          </div>
          <div className="mt-4 space-y-3">
            {PERMISSIONS.map((p) => (
              <div key={p.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{p.grantee}</div>
                    <div className="text-xs text-ink-mid">{p.role} · {p.scopesLabel}</div>
                  </div>
                  {p.status === "expiring" ? (
                    <span className="badge bg-alert text-white">D-{p.daysLeft}</span>
                  ) : (
                    <span className="badge bg-life-school/15 text-green-900">D-{p.daysLeft}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function emoji(stage: string) {
  const map: Record<string, string> = {
    infant: "👶", school: "🧒", transition: "👦", adult: "🧑", senior: "👵",
  };
  return map[stage] || "👤";
}
