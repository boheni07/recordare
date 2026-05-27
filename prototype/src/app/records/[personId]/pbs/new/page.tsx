import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { CHILDREN, PBS_RECORDS } from "@/lib/mock-data";

// FR-84~86 | B.8.2 PBS 도전행동 기록 — ABC 분석 3단계 입력
// 접근 권한: SW(활동지원사)·SE(특수교사)·MP(의료진)·VC(직업재활사)·CG(보호자)
export default async function PbsNewPage({ params }: { params: Promise<{ personId: string }> }) {
  const { personId } = await params;
  const person = CHILDREN.find((c) => c.id === personId) ?? CHILDREN.find((c) => c.id === "c-001")!;
  const totalRecords = PBS_RECORDS.filter((r) => r.personId === person.id).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="📋 도전행동 기록 (PBS)"
        subtitle={`${person.name} · ABC 분석 3단계 입력 · FR-84 · B.8`}
        actions={
          <Link href={`/records/${person.id}/pbs/analysis`} className="btn-secondary text-xs">
            📊 패턴 분석 ({totalRecords}건)
          </Link>
        }
      />

      {/* 면책 배너 */}
      <div className="rounded-xl bg-amber-50 border border-amber-300 p-3 text-xs text-amber-800">
        ⚠️ 이 기록은 <strong>보호자 관찰 의견</strong>입니다. 전문가 진단이 아니며 AI 분석도 참고용에 한합니다. (FR-68)
      </div>

      {/* AI 자동 컨텍스트 */}
      <section className="card p-4 bg-secondary">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-primary-dark">🤖 AI 자동 수집 (백그라운드)</span>
          <span className="badge bg-life-school/15 text-green-900 text-xs">오늘 기준</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: "날씨", value: "☀️ 맑음" },
            { label: "전날 수면", value: "😐 6시간" },
            { label: "오늘 식사", value: "✅ 정상" },
            { label: "복약 여부", value: "✅ 아침 복용" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-white border border-border p-2 text-center">
              <div className="text-ink-mid">{item.label}</div>
              <div className="font-bold mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-ink-mid">수면·식사·복약 정보를 자동 참조해 패턴 분석 정확도를 높입니다</div>
      </section>

      {/* A — 선행사건 */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-life-transition text-white font-bold flex items-center justify-center text-lg">A</div>
          <div>
            <div className="font-bold text-primary-dark">어떤 상황이었나요? (선행사건)</div>
            <div className="text-xs text-ink-mid">도전행동이 시작되기 직전 상황</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-ink-mid mb-2">감각 자극</div>
            <div className="flex flex-wrap gap-2">
              {["🔊 소음", "💡 강한 빛", "👐 불쾌한 촉각", "👃 강한 냄새"].map((t) => (
                <button key={t} className="rounded-lg border-2 border-border px-3 py-2 text-sm hover:border-primary">{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-mid mb-2">환경 변화</div>
            <div className="flex flex-wrap gap-2">
              {["🔄 일정 변경", "👤 낯선 사람", "📍 장소 변경", "🍽️ 식사 문제"].map((t) => (
                <button key={t} className="rounded-lg border-2 border-border px-3 py-2 text-sm hover:border-primary">{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-mid mb-2">요구 관련</div>
            <div className="flex flex-wrap gap-2">
              {["❌ 요구 거절", "📚 어려운 과제", "⏰ 대기 상황", "😤 기대 불일치"].map((t) => (
                <button key={t} className="rounded-lg border-2 border-border px-3 py-2 text-sm hover:border-primary">{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-mid">자세히 (선택 — 비심판적 언어로 기술하세요)</label>
            <textarea
              rows={2}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              placeholder="예: 점심 후 산책 코스가 갑자기 바뀌었고 처음 보는 분이 함께 계셨어요"
            />
          </div>
        </div>
      </section>

      {/* B — 도전행동 */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-lg">B</div>
          <div>
            <div className="font-bold text-primary-dark">어떤 행동을 했나요? (도전행동)</div>
            <div className="text-xs text-ink-mid">비심판적 표현을 권장합니다 — 예: "자해"→"머리를 부딪혔어요"</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-ink-mid mb-2">행동 유형 (복수 선택)</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "머리 부딪힘", alt: "(자해)" },
                { label: "타인 건드림", alt: "(타해)" },
                { label: "물건 던짐", alt: "(기물)" },
                { label: "큰 소리 냄", alt: "(소리지르기)" },
                { label: "바닥 누움", alt: "(자리이탈)" },
                { label: "옷 벗음", alt: "" },
              ].map((b) => (
                <button key={b.label} className="rounded-lg border-2 border-border px-3 py-2 text-sm text-left hover:border-red-400">
                  <span>{b.label}</span>
                  {b.alt && <span className="text-xs text-ink-mid ml-1">{b.alt}</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink-mid block mb-2">강도 (1 낮음 ~ 5 높음)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`h-10 w-10 rounded-full border-2 font-bold text-sm ${n === 3 ? "border-red-400 bg-red-50 text-red-700" : "border-border"}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-mid block mb-2">지속 시간</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={5} min={1} max={120} className="w-20 rounded-lg border border-border px-3 py-2 text-sm" />
                <span className="text-sm text-ink-mid">분</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C — 결과/대응 */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-life-school text-white font-bold flex items-center justify-center text-lg">C</div>
          <div>
            <div className="font-bold text-primary-dark">어떻게 대응했나요? (결과)</div>
            <div className="text-xs text-ink-mid">실제로 사용한 중재 방법을 기록해 주세요</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-ink-mid mb-2">사용한 대응 방법</div>
            <div className="flex flex-wrap gap-2">
              {["🚪 안정실 이동", "🗣️ AAC 판 제공", "🤝 신체 보조", "🍬 간식 제공", "🎵 음악 틀기", "📸 좋아하는 사진"].map((r) => (
                <button key={r} className="rounded-lg border-2 border-border px-3 py-2 text-sm hover:border-life-school">{r}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-mid">진정까지 소요 시간 (분)</label>
            <div className="flex items-center gap-2 mt-1">
              <input type="number" defaultValue={8} min={0} max={120} className="w-20 rounded-lg border border-border px-3 py-2 text-sm" />
              <span className="text-sm text-ink-mid">분 후 진정</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-mid">관찰 의견 (선택)</label>
            <textarea
              rows={2}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              placeholder="예: AAC 판을 보여주니 빠르게 진정되었어요. 강아지 사진이 특히 효과적이었습니다."
            />
          </div>
        </div>
      </section>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/worker" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">임시저장</button>
          <button className="btn-primary">저장 — PBS 기록 추가</button>
        </div>
      </div>

      {totalRecords >= 9 && (
        <div className="rounded-xl bg-life-school/10 border border-life-school/30 p-3 text-sm text-center">
          📊 기록이 {totalRecords}건 누적되었습니다.{" "}
          <Link href={`/records/${person.id}/pbs/analysis`} className="font-bold text-life-school underline">
            AI 패턴 분석 보기 →
          </Link>
        </div>
      )}
    </div>
  );
}
