import { AppHeader, AppFooter } from "@/components/AppHeader";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-xs text-ink-mid mb-1">7-Step 보호자 온보딩 마법사</div>
          <div className="text-lg font-bold text-primary-dark mb-6">First Value 약속 — 1시간 안에 첫 인계서 PDF 받기 (FR-29)</div>
          {children}
        </div>
      </main>
      <AppFooter />
    </>
  );
}
