import Link from "next/link";
import { PageHeader } from "@/components/Card";

export default function NewHandoverPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="3분 마스터 인계서" subtitle="신규 기관 전달용 PDF + 시스템 동시 전달 (FR-09, FR-43)" />

      {/* Top KPI */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: "3분", l: "예상 작성 시간" },
          { v: "2주 → 3분", l: "기관 적응 단축" },
          { v: "4섹션", l: "의료 · 식사 · AAC · 위험" },
        ].map((s) => (
          <div key={s.l} className="card p-3 text-center">
            <div className="text-xl font-bold text-primary">{s.v}</div>
            <div className="text-[11px] text-ink-mid">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <section className="card p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold text-ink-mid">대상 자녀</span>
            <select className="mt-1 w-full rounded-lg border border-border px-4 py-3"><option>박지훈 (20세)</option></select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-mid">인계 사유</span>
            <select className="mt-1 w-full rounded-lg border border-border px-4 py-3">
              <option>기관 이동</option><option>방학 단기</option><option>전학</option><option>이직</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-xs font-semibold text-ink-mid">수신자 (신규 기관 또는 활동지원사)</span>
            <input className="mt-1 w-full rounded-lg border border-border px-4 py-3" placeholder="예: ○○복지관" defaultValue="○○복지관 · 정담당" />
          </label>
        </div>
      </section>

      {/* Auto-generated 4 sections */}
      <section>
        <div className="font-bold text-primary-dark mb-3">AI 자동 생성 4섹션 (미리보기)</div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "의료", color: "#3B82F6", items: ["복용약: 항경련제 1정/일", "알레르기: 견과류", "응급 이력: 2024-08 발작 1회"] },
            { title: "식사", color: "#FFC857", items: ["선호: 김치찌개, 떡볶이", "금기: 견과류, 향신료", "패턴: 1일 4식 (간식 포함)"] },
            { title: "AAC 사용", color: "#5CB85C", items: ["주 사용 픽토그램: 30개", "선호 음성: 여성 음성", "응답 패턴: 사진 우선"] },
            { title: "위험행동", color: "#E07A5F", items: ["트리거: 큰 소리, 군중", "진정: 좋아하는 강아지 사진", "응급: 어머니 (010-XXXX)"] },
          ].map((sec) => (
            <div key={sec.title} className="card overflow-hidden">
              <div className="px-4 py-2 text-white text-sm font-bold" style={{ backgroundColor: sec.color }}>📋 {sec.title} 섹션</div>
              <ul className="p-4 space-y-1 text-sm">
                {sec.items.map((it) => <li key={it}>• {it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Final */}
      <section className="card p-6 bg-gradient-to-br from-accent/5 to-primary/5">
        <h2 className="font-bold text-primary-dark">출력 옵션</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-3">
          {[
            { v: "📄 PDF (A4)", sub: "즉시 다운로드 · 비밀번호 옵션" },
            { v: "📨 시스템 동시 전달", sub: "수신자가 Recordare 사용 중 → 푸시 알림" },
            { v: "🔗 만료 링크 (7일)", sub: "외부 기관에 비밀번호 안내" },
          ].map((o) => (
            <div key={o.v} className="rounded-lg bg-white border border-border p-3">
              <div className="font-bold text-sm">{o.v}</div>
              <div className="text-xs text-ink-mid mt-1">{o.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-between">
        <Link href="/parent" className="btn-secondary">← 취소</Link>
        <div className="flex gap-2">
          <Link href="/parent/handover/list" className="btn-secondary">초안 저장</Link>
          <button className="btn-primary">📥 PDF 출력 + 전송 →</button>
        </div>
      </div>
    </div>
  );
}
