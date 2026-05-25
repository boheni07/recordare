import Link from "next/link";

export default function SelfConsentPage() {
  return (
    <div className="space-y-10">
      {/* Title */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-life-adult">물어볼 게 있어요</h1>
        <p className="mt-3 text-lg text-ink-mid">엄마가 보낸 카드예요</p>
      </header>

      {/* Question card with big photo */}
      <section className="rounded-3xl bg-white border-4 border-life-adult p-8 text-center">
        <div className="text-7xl mb-4">👩‍⚕️</div>
        <div className="text-3xl font-bold text-life-adult">이수진 선생님</div>
        <p className="mt-2 text-base text-ink-mid">활동지원사 선생님이에요</p>

        <div className="my-8 h-px bg-border" />

        <p className="text-2xl font-bold text-ink">
          이수진 선생님이<br />민지님 일기를 봐도 될까요?
        </p>
      </section>

      {/* Big Yes/No cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <button className="rounded-3xl bg-life-school text-white p-10 hover:scale-105 transition shadow-2xl">
          <div className="text-9xl">⭕</div>
          <div className="mt-4 text-4xl font-bold">좋아요</div>
        </button>

        <button className="rounded-3xl bg-accent text-white p-10 hover:scale-105 transition shadow-2xl">
          <div className="text-9xl">❌</div>
          <div className="mt-4 text-4xl font-bold">싫어요</div>
        </button>
      </section>

      {/* Double-confirm hint */}
      <div className="rounded-3xl bg-life-adult/5 border-2 border-dashed border-life-adult p-6 text-center">
        <p className="text-base text-ink">
          🔒 누르면 <strong>한 번 더 물어볼게요</strong> (FR-18 · 2단계 확인 의무)<br />
          틀려도 괜찮아요. 되돌릴 수 있어요.
        </p>
      </div>

      {/* Parent notify info */}
      <div className="rounded-3xl bg-life-infant/15 p-6 text-center">
        <p className="text-base">
          🔔 민지님이 정해주면, <strong>5분 안에</strong> 엄마에게 알려드릴게요 (FR-19)
        </p>
      </div>
    </div>
  );
}
