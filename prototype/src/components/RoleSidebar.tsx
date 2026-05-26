import Link from "next/link";

type NavItem = { label: string; href: string; icon?: string };
type Section = { title: string; items: NavItem[] };

const NAV: Record<string, Section[]> = {
  parent: [
    { title: "홈", items: [
      { label: "대시보드", href: "/parent", icon: "🏠" },
      { label: "통합 타임라인", href: "/parent/timeline", icon: "📅" },
    ]},
    { title: "기록 관리", items: [
      { label: "자녀 등록", href: "/parent/children/new", icon: "👶" },
      { label: "사진 마이그레이션", href: "/parent/migration", icon: "📸" },
    ]},
    { title: "권한 관리", items: [
      { label: "권한 위임", href: "/parent/permissions/grant", icon: "🔑" },
      { label: "권한 회수 (긴급)", href: "/parent/permissions/revoke", icon: "🚫" },
    ]},
    { title: "자가진단 (FR-62~68)", items: [
      { label: "자가진단 도구", href: "/parent/screening", icon: "📋" },
      { label: "K-DST 영유아 검사", href: "/parent/screening/k-dst", icon: "👶" },
      { label: "AI 추이 분석", href: "/parent/screening/trend", icon: "📈" },
    ]},
    { title: "인계서", items: [
      { label: "새 인계서 작성", href: "/parent/handover/new", icon: "📝" },
      { label: "인계서 리스트", href: "/parent/handover/list", icon: "📂" },
    ]},
    { title: "기타", items: [
      { label: "알림 센터", href: "/parent/notifications", icon: "🔔" },
      { label: "데이터 내보내기", href: "/parent/export", icon: "📤" },
    ]},
  ],
  worker: [
    { title: "홈", items: [
      { label: "대시보드", href: "/worker", icon: "🏠" },
      { label: "오늘 일정", href: "/worker/schedule", icon: "📅" },
    ]},
    { title: "일지 작성", items: [
      { label: "음성 일지 (30초)", href: "/worker/journal/voice", icon: "🎤" },
      { label: "사진 일지", href: "/worker/journal/photo", icon: "📷" },
    ]},
    { title: "인계 · 운영", items: [
      { label: "3분 마스터 인계 수령", href: "/worker/handover/received", icon: "📥" },
      { label: "오프라인 큐", href: "/worker/offline", icon: "📡" },
      { label: "계약 정보", href: "/worker/contract", icon: "📄" },
    ]},
  ],
  self: [
    { title: "메뉴", items: [
      { label: "오늘 일기", href: "/self/diary", icon: "📖" },
      { label: "동의 카드", href: "/self/consent", icon: "✋" },
      { label: "좋아하는 활동", href: "/self/activities", icon: "🌈" },
    ]},
  ],
  case: [
    { title: "케이스 관리", items: [
      { label: "대시보드", href: "/case", icon: "🏠" },
      { label: "케이스 리스트", href: "/case/cases", icon: "📋" },
      { label: "회의 자료 자동 생성", href: "/case/meeting", icon: "📊" },
    ]},
  ],
  facility: [
    { title: "운영", items: [
      { label: "3-KPI 대시보드", href: "/facility", icon: "📊" },
      { label: "권한 일괄 갱신", href: "/facility/permissions/bulk", icon: "🔑" },
      { label: "분기 인계서 일괄 승인", href: "/facility/handover/quarterly", icon: "📂" },
      { label: "B2G 바우처 청구", href: "/facility/billing/b2g", icon: "💰" },
    ]},
  ],
};

export function RoleSidebar({ role }: { role: keyof typeof NAV }) {
  const sections = NAV[role] ?? [];
  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-border min-h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-5 space-y-6 overflow-y-auto">
        {sections.map((sec) => (
          <div key={sec.title}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-ink-mid mb-2">{sec.title}</div>
            <nav className="flex flex-col gap-1">
              {sec.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-primary/5 hover:text-primary transition"
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function ModeBanner({ kind, children }: { kind: "alert" | "info"; children: React.ReactNode }) {
  const bg = kind === "alert" ? "bg-alert text-white" : "bg-life-transition/15 text-blue-900";
  return <div className={`${bg} py-2 px-4 text-sm font-semibold flex items-center gap-2`}>{children}</div>;
}
