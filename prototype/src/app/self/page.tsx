import Link from "next/link";

export default function SelfDashboard() {
  return (
    <div className="space-y-10">
      {/* 큰 환영 */}
      <section className="bg-life-adult/10 rounded-3xl p-10 text-center">
        <div className="text-6xl mb-4">👧</div>
        <h1 className="text-4xl font-bold text-life-adult">민지님, 안녕하세요!</h1>
        <p className="mt-4 text-xl text-ink">오늘은 2026년 5월 25일 · 월요일</p>
        <p className="mt-2 text-base text-ink-mid">🔊 자동으로 읽어드릴게요</p>
      </section>

      {/* 3개의 큰 메뉴 카드 */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link href="/self/diary" className="rounded-3xl bg-life-school text-white p-8 hover:scale-105 transition shadow-lg">
          <div className="text-6xl mb-4">📖</div>
          <div className="text-3xl font-bold">오늘 일기</div>
          <p className="mt-3 text-base opacity-90">이수진 선생님이<br />적어줬어요</p>
          <div className="mt-4 inline-block bg-white text-life-school rounded-full px-4 py-2 text-sm font-bold">3개 카드</div>
        </Link>

        <Link href="/self/consent" className="rounded-3xl bg-accent text-white p-8 hover:scale-105 transition shadow-lg">
          <div className="text-6xl mb-4">✋</div>
          <div className="text-3xl font-bold">물어보는 카드</div>
          <p className="mt-3 text-base opacity-90">엄마가 보낸<br />질문이 있어요</p>
          <div className="mt-4 inline-block bg-white text-accent rounded-full px-4 py-2 text-sm font-bold">1개 새 카드</div>
        </Link>

        <Link href="/self/activities" className="rounded-3xl bg-life-transition text-white p-8 hover:scale-105 transition shadow-lg">
          <div className="text-6xl mb-4">🌈</div>
          <div className="text-3xl font-bold">좋아하는 것</div>
          <p className="mt-3 text-base opacity-90">내가 좋아하는<br />활동 골라보기</p>
          <div className="mt-4 inline-block bg-white text-life-transition rounded-full px-4 py-2 text-sm font-bold">4개 그림</div>
        </Link>
      </section>

      {/* 오늘 본 사람 */}
      <section className="rounded-3xl bg-white p-8 border-2 border-life-adult/30">
        <h2 className="text-2xl font-bold text-life-adult mb-6">오늘 만난 사람</h2>
        <div className="flex gap-6 flex-wrap">
          {[
            { name: "엄마", emoji: "👩", color: "#FFC857" },
            { name: "이수진 선생님", emoji: "👩‍⚕️", color: "#5CB85C" },
            { name: "한선생님", emoji: "👨‍🏫", color: "#3B82F6" },
          ].map((p) => (
            <div key={p.name} className="text-center">
              <div className="h-24 w-24 rounded-full flex items-center justify-center text-5xl shadow-lg" style={{ backgroundColor: p.color }}>
                {p.emoji}
              </div>
              <div className="mt-3 font-bold text-lg">{p.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
