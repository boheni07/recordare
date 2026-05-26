import Link from "next/link";
import { AppHeader, AppFooter } from "@/components/AppHeader";
import { ROLES } from "@/lib/mock-data";

export default function RoleSelectPage() {
  return (
    <>
      <AppHeader />
      <main className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-primary-dark text-center">어떤 역할로 들어가시겠어요?</h1>
          <p className="mt-2 text-center text-sm text-ink-mid">
            다중 역할 보유 시 언제든 우상단 메뉴에서 전환할 수 있습니다.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {(Object.entries(ROLES) as [keyof typeof ROLES, typeof ROLES[keyof typeof ROLES]][]).map(([k, r]) => (
              <Link
                key={k}
                href={r.path}
                className="card p-6 hover:-translate-y-1 transition border-l-4 flex items-start gap-4"
                style={{ borderLeftColor: getColor(r.lifeColor) }}
              >
                <div className="text-4xl">{icon(k)}</div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-primary-dark">{r.label}</div>
                  <div className="text-xs text-ink-mid mt-1">{subtitle(k)}</div>
                  <div className="mt-3 text-xs font-semibold" style={{ color: getColor(r.lifeColor) }}>{r.path} →</div>
                </div>
              </Link>
            ))}
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

function getColor(stage: string) {
  const map: Record<string, string> = {
    infant: "#FFC857", school: "#5CB85C", transition: "#3B82F6", adult: "#7C3AED", senior: "#6B7280",
  };
  return map[stage] || "#2D6A4F";
}

function icon(role: string) {
  const map: Record<string, string> = {
    parent: "👨‍👩‍👧", worker: "💼", self: "✋", case: "📋", facility: "🏢",
  };
  return map[role] || "👤";
}

function subtitle(role: string) {
  const map: Record<string, string> = {
    parent: "자녀의 평생 기록을 관리하고 권한을 위임합니다",
    worker: "음성 일지·인계서 수령으로 케어에 집중합니다",
    self: "AAC 픽토그램으로 직접 동의하고 일기를 봅니다",
    case: "케이스 4영역을 자동 요약해 회의 자료를 만듭니다",
    facility: "이용자·직원·만료 3-KPI로 시설을 운영합니다",
  };
  return map[role] || "";
}
