import { AppHeader } from "@/components/AppHeader";
import { RoleSidebar, ModeBanner } from "@/components/RoleSidebar";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader role="💼 활동지원사 · 이수진" />
      {/* 오프라인 시뮬레이션 배너 - 항상 노출 (FR-32) */}
      <ModeBanner kind="info">
        📡 네트워크 상태: 온라인 · 로컬 큐 0건 ·
        <a href="/worker/offline" className="underline ml-1">오프라인 큐 보기</a>
      </ModeBanner>
      <div className="flex text-a-lg">
        <RoleSidebar role="worker" />
        <main className="flex-1 min-h-[calc(100vh-4rem-2.5rem)] container-page py-8">{children}</main>
      </div>
    </>
  );
}
