import Link from "next/link";

export type Mode = "normal" | "easy" | "self";

export function AppHeader({ role, mode = "normal" }: { role?: string; mode?: Mode }) {
  return (
    <header className="sticky top-0 z-50 bg-primary-dark text-white border-b-2 border-accent">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white font-bold">R</span>
          <div className="leading-tight">
            <div className="font-bold text-lg">Recordare</div>
            <div className="text-[10px] text-secondary/80">레코다레</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-accent">서비스 소개</Link>
          <Link href="#" className="hover:text-accent">도입사례</Link>
          <Link href="#" className="hover:text-accent">가격</Link>
          {role && <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold">{role}</span>}
        </nav>

        <div className="flex items-center gap-2">
          {/* 모드 토글 */}
          <div className="hidden lg:flex items-center rounded-full bg-white/10 p-1 text-xs">
            <button className={`rounded-full px-3 py-1 ${mode === "normal" ? "bg-white text-primary-dark" : ""}`}>일반</button>
            <button className={`rounded-full px-3 py-1 ${mode === "easy" ? "bg-white text-primary-dark" : ""}`}>쉬운말</button>
            <button className={`rounded-full px-3 py-1 ${mode === "self" ? "bg-white text-primary-dark" : ""}`}>당사자</button>
          </div>
          {role ? (
            <>
              <button className="rounded-full p-2 hover:bg-white/10" aria-label="알림">🔔</button>
              <button className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold">↩ 되돌리기</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm hover:text-accent">로그인</Link>
              <Link href="/signup/step-1" className="rounded-lg bg-accent px-4 py-2 text-sm font-bold">시작하기</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary">
      <div className="container-page py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-bold text-primary-dark">Recordare · 레코다레</div>
          <div className="text-ink-mid mt-1 text-xs">당신의 삶, 단 하나의 기억으로</div>
        </div>
        <div>
          <div className="font-semibold mb-2 text-primary-dark">서비스</div>
          <ul className="space-y-1 text-ink-mid text-xs">
            <li>통합 타임라인</li><li>AI 음성 일지</li><li>3분 인계서</li><li>AAC 동의</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-primary-dark">법적 고지</div>
          <ul className="space-y-1 text-ink-mid text-xs">
            <li>이용약관</li><li>개인정보처리방침</li><li>접근성 선언 (KWCAG 2.2 AA)</li><li>환불 정책</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-primary-dark">연락</div>
          <ul className="space-y-1 text-ink-mid text-xs">
            <li>support@recordare.kr</li><li>1588-XXXX</li><li>(주)Recordare</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-ink-mid">© 2026 Recordare</div>
    </footer>
  );
}
