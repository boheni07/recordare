import Link from "next/link";
import { AppHeader, AppFooter } from "@/components/AppHeader";
import { ROLES, LIFE_STAGES } from "@/lib/mock-data";

export default function RoleSelectPage() {
  const coreRoles = ["parent", "worker", "self", "case", "facility", "general-teacher"] as const;
  const m7Roles = ["mp", "vc", "lg"] as const;

  return (
    <>
      <AppHeader />
      <main className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-primary-dark text-center">어떤 역할로 들어가시겠어요?</h1>
          <p className="mt-2 text-center text-sm text-ink-mid">
            다중 역할 보유 시 언제든 우상단 메뉴에서 전환할 수 있습니다.
          </p>

          {/* Core 6 roles */}
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {coreRoles.map((k) => {
              const r = ROLES[k];
              const stage = LIFE_STAGES[r.lifeColor];
              return (
                <Link
                  key={k}
                  href={r.path}
                  className="card p-6 hover:-translate-y-1 transition border-l-4 flex items-start gap-4"
                  style={{ borderLeftColor: stage.color }}
                >
                  <div className="text-4xl">{icon(k)}</div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-primary-dark">{r.label}</div>
                    <div className="text-xs text-ink-mid mt-1">{subtitle(k)}</div>
                    <div className="mt-3 text-xs font-semibold" style={{ color: stage.color }}>{r.path} →</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* M7+ roles */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold text-ink-mid px-2 py-1 rounded-full bg-secondary border border-border">
                M7+ 추가 이해관계자 (로드맵)
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {m7Roles.map((k) => {
                const r = ROLES[k];
                const stage = LIFE_STAGES[r.lifeColor];
                return (
                  <Link
                    key={k}
                    href={r.path}
                    className="card p-5 hover:-translate-y-1 transition border-l-4 flex items-start gap-3 opacity-80 hover:opacity-100"
                    style={{ borderLeftColor: stage.color }}
                  >
                    <div className="text-3xl">{icon(k)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-base font-bold text-primary-dark">{r.label}</div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">M7+</span>
                      </div>
                      <div className="text-xs text-ink-mid mt-1">{subtitle(k)}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="mt-3 text-center text-xs text-ink-mid">
              M7+ 역할은 MVP 이후 단계적 출시 예정 — 현재 화면은 프로토타입 탐색용입니다
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/" className="text-sm text-ink-mid hover:text-primary">← 첫 화면으로</Link>
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}

function icon(role: string) {
  const map: Record<string, string> = {
    parent: "👨‍👩‍👧",
    worker: "💼",
    self: "✋",
    case: "📋",
    facility: "🏢",
    "general-teacher": "🏫",
    mp: "🩺",
    vc: "🔧",
    lg: "⚖️",
  };
  return map[role] || "👤";
}

function subtitle(role: string) {
  const map: Record<string, string> = {
    parent: "자녀의 평생 기록을 관리하고 권한을 위임합니다",
    worker: "빠른 선택 일지·인계서 수령으로 케어에 집중합니다",
    self: "AAC 픽토그램으로 직접 동의하고 일기를 봅니다",
    case: "케이스 4영역을 자동 요약해 회의 자료를 만듭니다",
    facility: "이용자·직원·만료 3-KPI로 시설을 운영합니다",
    "general-teacher": "통합학급 학생 짧은 메모를 특수교사와 공유합니다",
    mp: "의료·치료 기록과 PBS 패턴 분석에 접근합니다 (B22·FR-84)",
    vc: "직업재활 훈련 기록과 자립 목표를 관리합니다 (B23·FR-87)",
    lg: "SNT 신탁·후견 보고·거주지 전환 계획을 총괄합니다 (B24·FR-88~90)",
  };
  return map[role] || "";
}
