import { AppHeader } from "@/components/AppHeader";
import { ModeBanner } from "@/components/RoleSidebar";

export default function GeneralTeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader role="👨‍🏫 일반교사 · 윤교사 (통합학급)" />
      <ModeBanner kind="info">
        🔒 통합학급 권한 모드 — 담당 통합 학생만 표시 · 일반 학생 정보 마스킹 (FR-72)
      </ModeBanner>
      <main className="container-page py-8 text-a-md">{children}</main>
    </>
  );
}
