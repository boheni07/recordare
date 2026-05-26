import { AppHeader } from "@/components/AppHeader";
import { RoleSidebar, ModeBanner } from "@/components/RoleSidebar";

export default function FacilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader role="🏢 시설장 · 정원장 (푸른그룹홈)" />
      <ModeBanner kind="info">
        🛡️ ISMS-P 인증 환경 · 마지막 외부 감사: 2026-03-15 (분기 1회 자동 갱신)
      </ModeBanner>
      <div className="flex text-a-sm">
        <RoleSidebar role="facility" />
        <main className="flex-1 min-h-[calc(100vh-4rem-2.5rem)] container-page py-8">{children}</main>
      </div>
    </>
  );
}
