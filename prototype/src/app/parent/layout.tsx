import { AppHeader } from "@/components/AppHeader";
import { RoleSidebar, ModeBanner } from "@/components/RoleSidebar";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader role="👨‍👩‍👧 보호자 · 박순영" />
      <ModeBanner kind="alert">
        ⚠️ 권한 만료 D-7: 최주임 (사회복지사) — 7일 후 종료 ·
        <a href="/parent/permissions/grant" className="underline ml-1">지금 갱신</a>
      </ModeBanner>
      <div className="flex">
        <RoleSidebar role="parent" />
        <main className="flex-1 min-h-[calc(100vh-4rem-2.5rem)] container-page py-8">{children}</main>
      </div>
    </>
  );
}
