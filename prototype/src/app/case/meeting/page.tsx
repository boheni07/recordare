import Link from "next/link";
import { PageHeader } from "@/components/Card";

export default function MeetingMaterialPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="케이스 회의 자료 자동 생성"
        subtitle="4영역 자동 추출 → AI 요약 3페이지 PDF → 만료 링크 (FR-53)"
      />

      {/* Step progress */}
      <div className="flex items-center gap-2 text-xs">
        {["케이스 선택", "기간 + 4영역", "AI 자동 추출", "U4 검토 (메모만)", "안전 공유"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${i === 2 ? "bg-accent text-white" : i < 2 ? "bg-primary text-white" : "bg-white border-2 border-border text-ink-mid"}`}>{i + 1}</div>
            <span className="ml-1 font-semibold text-ink-mid">{s}</span>
            {i < 4 && <span className="mx-2 text-border">›</span>}
          </div>
        ))}
      </div>

      {/* Settings */}
      <section className="card p-6 grid md:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-xs font-semibold text-ink-mid">대상 케이스</span>
          <select className="mt-1 w-full rounded-lg border border-border px-4 py-2.5"><option>박지훈 (20)</option><option>이민호 (15)</option></select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink-mid">기간</span>
          <select className="mt-1 w-full rounded-lg border border-border px-4 py-2.5"><option>최근 3개월</option><option>최근 1개월</option><option>분기</option></select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink-mid">출력 형식</span>
          <select className="mt-1 w-full rounded-lg border border-border px-4 py-2.5"><option>PDF (3페이지)</option><option>한글</option><option>인쇄용 A4</option></select>
        </label>
      </section>

      {/* AI 추출 4영역 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-primary-dark">AI 자동 추출 결과 (사실 인용 — 편집 불가)</div>
          <span className="badge bg-life-school/15 text-green-900">⏱ 추출 완료 · 47초 소요</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "교육", color: "#5CB85C", events: ["특수학교 자립생활 수업 출석률 92%", "빨래 개기·식사 준비 수행 완료", "AAC 픽토그램 30개 사용 능숙"] },
            { title: "의료", color: "#3B82F6", events: ["항경련제 정기 복용 (1정/일)", "2024-08 발작 1회 (회복 양호)", "정기 검진 분기 1회 시행"] },
            { title: "돌봄", color: "#E07A5F", events: ["활동지원사 이수진 (식사·행동·정서·학습)", "주 6일 그룹홈 거주 + 주말 가정", "일지 작성 평균 1일 3.5건"] },
            { title: "자립", color: "#7C3AED", events: ["18세 이양 가이드 시작 (D-180 알림)", "AAC 동의 행사 5회 (모두 본인 결정)", "변호사 무료 상담 예약 완료"] },
          ].map((sec) => (
            <article key={sec.title} className="card overflow-hidden">
              <div className="px-4 py-2 text-white font-bold text-sm" style={{ backgroundColor: sec.color }}>📋 {sec.title} 영역</div>
              <ul className="p-4 space-y-2 text-sm">
                {sec.events.map((e) => <li key={e}>• {e}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Worker memo - editable */}
      <section className="card p-6 border-l-4 border-accent">
        <h2 className="font-bold text-primary-dark">사회복지사 소견·메모 (편집 가능 영역)</h2>
        <p className="text-xs text-ink-mid mt-1">사실 인용은 변경할 수 없으나, 본인의 해석·소견은 자유롭게 작성하세요.</p>
        <textarea
          rows={4}
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-sm"
          defaultValue="박지훈 케이스는 18세 이양 가이드를 D-180일부터 시작했으며, 본인의 의사 표현이 명확합니다. 다음 회의에서 변호사 상담 결과를 공유하고, 후견 vs 자율 결정을 가족과 협의할 예정입니다."
        />
      </section>

      {/* Privacy & sharing */}
      <section className="card p-5 bg-secondary">
        <h2 className="font-bold text-primary-dark">🔒 안전 공유</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg bg-white border border-border p-3">
            <div className="font-bold">만료 링크</div>
            <div className="text-ink-mid mt-1">7일 후 자동 만료</div>
          </div>
          <div className="rounded-lg bg-white border border-border p-3">
            <div className="font-bold">비밀번호 보호</div>
            <div className="text-ink-mid mt-1">참석자 이메일로 별도 안내</div>
          </div>
          <div className="rounded-lg bg-white border border-border p-3">
            <div className="font-bold">감사 로그</div>
            <div className="text-ink-mid mt-1">5년 보존 (FR-47)</div>
          </div>
        </div>
        <label className="mt-3 flex items-center gap-2 text-xs">
          <input type="checkbox" className="rounded" defaultChecked />
          보호자에게 발행 24h 전 검토 요청 (옵션)
        </label>
      </section>

      <div className="flex justify-between">
        <Link href="/case" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <button className="btn-secondary">초안 저장</button>
          <button className="btn-primary">📄 PDF 발행 + 공유 →</button>
        </div>
      </div>
    </div>
  );
}
