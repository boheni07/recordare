import Link from "next/link";
import { AppHeader, AppFooter } from "@/components/AppHeader";

export default function LoginPage() {
  return (
    <>
      <AppHeader />
      <main className="container-page py-16">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-primary-dark text-center">로그인</h1>
          <p className="mt-2 text-center text-sm text-ink-mid">Recordare 계정으로 들어가세요</p>

          <div className="card mt-8 p-8 space-y-4">
            <button className="w-full rounded-lg bg-yellow-400 px-4 py-3 font-bold text-ink hover:opacity-90 flex items-center justify-center gap-2">
              <span>💬</span> 카카오로 시작
            </button>
            <button className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-white hover:bg-primary-dark flex items-center justify-center gap-2">
              <span>📱</span> PASS 본인인증
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-ink-mid">또는 이메일</span></div>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-ink-mid">이메일</span>
              <input type="email" defaultValue="boheni07@example.com" className="mt-1 w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink-mid">비밀번호</span>
              <input type="password" defaultValue="••••••••" className="mt-1 w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </label>

            <Link href="/role-select" className="btn-primary w-full">로그인 →</Link>

            <div className="text-center text-xs text-ink-mid">
              계정이 없으세요?{" "}
              <Link href="/signup/step-1" className="text-accent font-semibold">7-Step 마법사로 시작</Link>
            </div>
          </div>

          <div className="mt-8 card p-5 bg-secondary border-accent">
            <div className="text-xs font-bold text-accent mb-2">💡 프로토타입 안내</div>
            <p className="text-xs text-ink-mid">
              어떤 정보로도 로그인 버튼을 누르면 다중 역할 선택 화면으로 이동합니다.
            </p>
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
