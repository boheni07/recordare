const ACTIVITIES = [
  { name: "음식 만들기", emoji: "🍳", color: "#FFC857" },
  { name: "친구랑 놀기", emoji: "🧒", color: "#5CB85C" },
  { name: "산책하기", emoji: "🌳", color: "#3B82F6" },
  { name: "음악 듣기", emoji: "🎵", color: "#7C3AED" },
  { name: "사진 찍기", emoji: "📷", color: "#E07A5F" },
  { name: "그림 그리기", emoji: "🎨", color: "#F2A93B" },
  { name: "강아지 보기", emoji: "🐶", color: "#5CB85C" },
  { name: "춤추기", emoji: "💃", color: "#E07A5F" },
];

export default function SelfActivitiesPage() {
  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-life-adult">내가 좋아하는 것 골라보기</h1>
        <p className="mt-3 text-lg text-ink-mid">좋아하는 그림을 눌러주세요</p>
      </header>

      {/* Big picture cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ACTIVITIES.map((a, i) => {
          const selected = i === 2 || i === 6;
          return (
            <button
              key={a.name}
              className={`rounded-3xl p-6 text-center shadow-lg transition hover:scale-105 ${selected ? "ring-4 ring-accent" : ""}`}
              style={{ backgroundColor: `${a.color}25` }}
            >
              <div className="text-7xl mb-4">{a.emoji}</div>
              <div className="text-xl font-bold" style={{ color: a.color }}>{a.name}</div>
              {selected && (
                <div className="mt-3 inline-block rounded-full bg-accent text-white text-sm font-bold px-3 py-1">
                  ✓ 좋아해요
                </div>
              )}
            </button>
          );
        })}
      </section>

      {/* Result */}
      <section className="rounded-3xl bg-life-adult/10 p-8 text-center">
        <p className="text-xl">
          민지님은 <strong className="text-life-transition">산책하기</strong>와{" "}
          <strong className="text-life-school">강아지 보기</strong>를 좋아하시는군요!
        </p>
        <p className="mt-3 text-base text-ink-mid">선생님과 엄마에게 알려드릴게요</p>
      </section>

      <div className="text-center">
        <button className="rounded-2xl bg-life-adult text-white font-bold text-2xl px-12 py-5 shadow-xl">
          ✓ 다 골랐어요
        </button>
      </div>
    </div>
  );
}
