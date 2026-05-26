import { AppHeader } from "@/components/AppHeader";
import { RoleSidebar, ModeBanner } from "@/components/RoleSidebar";

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader role="📋 사회복지사 · 최주임" />
      <ModeBanner kind="info">
        🔒 권한 마스킹 모드 활성 · 권한 범위 외 데이터는 자동 비공개 · ISMS-P 준수 환경
      </ModeBanner>
      <div className="flex text-a-sm">
        <RoleSidebar role="case" />
        <main className="flex-1 min-h-[calc(100vh-4rem-2.5rem)] container-page py-8">{children}</main>
      </div>
    </>
  );
}
