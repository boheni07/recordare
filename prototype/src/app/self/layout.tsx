import Link from "next/link";

export default function SelfLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mode-self min-h-screen bg-cream">
      {/* 큰 헤더 — 당사자 전용 */}
      <header className="bg-life-adult text-white border-b-4 border-accent">
        <div className="container-page flex items-center justify-between h-20">
          <Link href="/self" className="flex items-center gap-3">
            <span className="text-3xl">✋</span>
            <div>
              <div className="text-2xl font-bold leading-tight">민지의 일기</div>
              <div className="text-sm opacity-80">Recordare · 레코다레</div>
            </div>
          </Link>
          {/* 큰 [되돌리기] [집] 항상 노출 */}
          <div className="flex items-center gap-2">
            <Link href="/self" className="rounded-full bg-white/15 hover:bg-white/25 h-14 w-14 flex items-center justify-center text-2xl" aria-label="처음으로">🏠</Link>
            <button className="rounded-full bg-white/15 hover:bg-white/25 h-14 w-14 flex items-center justify-center text-2xl" aria-label="되돌리기">↩</button>
            <button className="rounded-full bg-accent h-14 px-5 font-bold text-base flex items-center" aria-label="음성으로 듣기">🔊 듣기</button>
          </div>
        </div>
      </header>

      <main className="container-page py-8">{children}</main>

      {/* 하단 큰 홈 버튼 */}
      <div className="sticky bottom-0 bg-white border-t-2 border-life-adult py-4 mt-12">
        <div className="container-page flex justify-center gap-4">
          <Link href="/self" className="rounded-2xl bg-life-adult text-white font-bold text-xl px-8 py-4">🏠 집으로</Link>
          <button className="rounded-2xl border-4 border-life-adult text-life-adult font-bold text-xl px-8 py-4">↩ 되돌리기</button>
        </div>
      </div>
    </div>
  );
}
