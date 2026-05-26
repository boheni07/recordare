import Link from "next/link";

const DIARY = [
  {
    time: "점심",
    photo: "🍚",
    title: "김치찌개를 잘 먹었어요",
    body: "오늘 점심에 김치찌개를 한 그릇 다 먹었어요. 매운 거 잘 먹네요!",
    author: "이수진 선생님",
    color: "#E96B4A",
  },
  {
    time: "오후",
    photo: "🐶",
    title: "산책할 때 강아지를 봤어요",
    body: "산책하다가 강아지를 봤어요. 손뼉을 치며 따라갔어요. 5분 동안 같이 갔어요.",
    author: "이수진 선생님",
    color: "#3B82F6",
  },
  {
    time: "저녁",
    photo: "📘",
    title: "빨래 개기를 해냈어요!",
    body: "오늘 자립생활 수업에서 빨래 개기를 처음 혼자 해냈어요. 잘 했어요!",
    author: "엄마",
    color: "#5CB85C",
  },
];

export default function SelfDiaryPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-life-adult">오늘 일기</h1>
        <p className="mt-3 text-lg text-ink-mid">선생님과 엄마가 적어줬어요 · 3개</p>
      </header>

      <div className="space-y-6">
        {DIARY.map((d, i) => (
          <article key={i} className="rounded-3xl bg-white border-4 overflow-hidden" style={{ borderColor: d.color }}>
            <div className="grid md:grid-cols-[200px_1fr] gap-0">
              {/* 큰 사진 영역 */}
              <div className="aspect-square md:aspect-auto flex items-center justify-center text-9xl" style={{ backgroundColor: `${d.color}22` }}>
                {d.photo}
              </div>
              <div className="p-6">
                <div className="text-sm font-bold" style={{ color: d.color }}>{d.time}</div>
                <h2 className="mt-2 text-2xl font-bold text-ink">{d.title}</h2>
                <p className="mt-3 text-lg leading-relaxed">{d.body}</p>
                <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-base text-ink-mid">— {d.author}</div>
                  <button className="rounded-full bg-life-school text-white font-bold text-base px-6 py-3">✓ 확인했어요</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 음성 안내 */}
      <div className="rounded-3xl bg-life-adult/10 p-6 text-center">
        <button className="rounded-full bg-life-adult text-white font-bold text-xl px-10 py-5">
          🔊 처음부터 다시 읽어주기
        </button>
      </div>
    </div>
  );
}
