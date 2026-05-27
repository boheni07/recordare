import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { CHILDREN, PCP_PROFILE } from "@/lib/mock-data";

// FR-87 | B.9 PCP 당사자 선호 프로필 — 쉬운말 + AAC 픽토그램 입력
// 접근 권한: SR(당사자) 1차 작성, CG(보호자) 검토
export default async function PcpPage({ params }: { params: Promise<{ personId: string }> }) {
  const { personId } = await params;
  const person = CHILDREN.find((c) => c.id === personId) ?? CHILDREN.find((c) => c.id === "c-001")!;

  const likeOptions = [
    { emoji: "🎵", label: "음악" },
    { emoji: "🎨", label: "그림" },
    { emoji: "🍳", label: "요리" },
    { emoji: "🏃", label: "산책" },
    { emoji: "🐶", label: "동물" },
    { emoji: "📺", label: "TV" },
    { emoji: "🧩", label: "퍼즐" },
    { emoji: "💃", label: "춤" },
  ];

  const hardOptions = [
    { emoji: "🔊", label: "시끄러운 곳" },
    { emoji: "🔄", label: "갑자기 바뀌는 것" },
    { emoji: "👥", label: "모르는 사람" },
    { emoji: "🌧️", label: "비 오는 날" },
    { emoji: "🏥", label: "병원" },
    { emoji: "😤", label: "기다리기" },
  ];

  const commModes = [
    { value: "voice", label: "말로" },
    { value: "photo-first", label: "그림 카드로" },
    { value: "text-first", label: "글로" },
    { value: "gesture", label: "몸짓으로" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="🌱 나의 이야기"
        subtitle={`${person.name}님이 직접 작성하는 선호 프로필 · FR-87 · B.9`}
        actions={
          <div className="flex items-center gap-2">
            <span className="badge bg-life-adult/15 text-purple-800 text-xs">당사자 모드 (큰 글씨)</span>
          </div>
        }
      />

      {/* 쉬운말 안내 */}
      <div className="rounded-xl bg-life-adult/10 border-2 border-life-adult/30 p-4 text-sm">
        <div className="font-bold text-purple-800 text-base">👋 {person.name}님, 직접 작성해요!</div>
        <div className="mt-1 text-purple-700">내가 좋아하는 것, 힘든 것, 하고 싶은 것을 기록해요.<br />그림 카드를 눌러서 고르거나 글로 써도 돼요.</div>
      </div>

      {/* 좋아하는 것 */}
      <section className="card p-5">
        <h2 className="text-xl font-bold text-primary-dark mb-4">💛 내가 좋아하는 것</h2>
        <div className="grid grid-cols-4 gap-3">
          {likeOptions.map((opt) => {
            const selected = PCP_PROFILE.likes.includes(opt.label);
            return (
              <button
                key={opt.label}
                className={`rounded-xl border-2 p-3 text-center transition ${
                  selected ? "border-yellow-400 bg-yellow-50" : "border-border hover:border-yellow-300"
                }`}
              >
                <div className="text-3xl">{opt.emoji}</div>
                <div className={`text-xs font-bold mt-1 ${selected ? "text-yellow-700" : ""}`}>{opt.label}</div>
                {selected && <div className="text-[10px] text-yellow-600">✓ 선택됨</div>}
              </button>
            );
          })}
        </div>
        <button className="mt-3 btn-secondary text-xs w-full">+ 직접 쓰기</button>
      </section>

      {/* 힘든 상황 */}
      <section className="card p-5">
        <h2 className="text-xl font-bold text-primary-dark mb-4">😣 내가 힘든 상황</h2>
        <div className="grid grid-cols-3 gap-3">
          {hardOptions.map((opt) => {
            const selected = PCP_PROFILE.hardSituations.some((s) => s.includes(opt.label.slice(0, 4)));
            return (
              <button
                key={opt.label}
                className={`rounded-xl border-2 p-3 text-center transition ${
                  selected ? "border-red-300 bg-red-50" : "border-border hover:border-red-200"
                }`}
              >
                <div className="text-3xl">{opt.emoji}</div>
                <div className={`text-xs font-bold mt-1 ${selected ? "text-red-700" : ""}`}>{opt.label}</div>
                {selected && <div className="text-[10px] text-red-600">✓ 선택됨</div>}
              </button>
            );
          })}
        </div>
        <button className="mt-3 btn-secondary text-xs w-full">+ 직접 쓰기</button>
      </section>

      {/* 꿈 / 목표 */}
      <section className="card p-5">
        <h2 className="text-xl font-bold text-primary-dark mb-4">🌟 내가 하고 싶은 것 (꿈)</h2>
        <textarea
          rows={3}
          className="w-full rounded-xl border-2 border-border px-4 py-3 text-base"
          defaultValue={PCP_PROFILE.dream}
          placeholder="하고 싶은 것을 써보세요"
        />
        <div className="mt-2 text-xs text-ink-mid">💡 OS 키보드 마이크 버튼으로 말하면서 입력할 수 있어요</div>
      </section>

      {/* 이야기 방법 */}
      <section className="card p-5">
        <h2 className="text-xl font-bold text-primary-dark mb-4">🙋 나는 이렇게 이야기해요</h2>
        <div className="grid grid-cols-2 gap-3">
          {commModes.map((mode) => {
            const selected = mode.value === person.responsePattern || mode.value === "photo-first";
            return (
              <button
                key={mode.value}
                className={`rounded-xl border-2 py-4 text-base font-bold transition ${
                  selected ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary"
                }`}
              >
                {mode.label}
                {selected && <div className="text-xs text-primary mt-1">● 현재 방법</div>}
              </button>
            );
          })}
        </div>
      </section>

      {/* 배우고 싶은 것 */}
      <section className="card p-5">
        <h2 className="text-xl font-bold text-primary-dark mb-4">🎯 지금 가장 배우고 싶은 것</h2>
        <div className="space-y-3">
          {PCP_PROFILE.learningGoals.slice(0, 3).map((goal, idx) => (
            <div key={goal} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                {idx + 1}
              </div>
              <div className="flex-1 rounded-xl border border-border px-4 py-2 text-base">
                {goal}
              </div>
            </div>
          ))}
          <button className="btn-secondary text-xs w-full">+ 더 추가하기</button>
        </div>
      </section>

      {/* 매칭 연동 안내 */}
      <div className="rounded-xl bg-life-school/10 border border-life-school/30 p-4 text-sm">
        💡 이 정보로 <strong>나에게 맞는 자조모임·프로그램</strong>을 추천해드려요 (B.7 자조모임 연동)
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/self" className="btn-secondary">← 당사자 홈</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">임시저장</button>
          <button className="btn-primary">저장 + 보호자에게 보내기</button>
        </div>
      </div>
    </div>
  );
}
