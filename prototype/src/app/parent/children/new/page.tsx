import Link from "next/link";
import { PageHeader } from "@/components/Card";

export default function NewChildPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="자녀 / 이용자 등록" subtitle="기본 정보 입력 → 나이 기반 권한 모델 자동 추천 (FR-25)" />

      <section className="card p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold text-ink-mid">이름 *</span>
            <input className="mt-1 w-full rounded-lg border border-border px-4 py-3" placeholder="예: 박지훈" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-mid">생년월일 *</span>
            <input type="date" className="mt-1 w-full rounded-lg border border-border px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-mid">장애 등급</span>
            <select className="mt-1 w-full rounded-lg border border-border px-4 py-3">
              <option>발달장애 1급</option><option>발달장애 2급</option><option>발달장애 3급</option><option>경계성</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-mid">AAC 사용 여부</span>
            <select className="mt-1 w-full rounded-lg border border-border px-4 py-3">
              <option>사용 (픽토그램 + 음성)</option><option>일부 사용</option><option>사용 안 함</option>
            </select>
          </label>
        </div>

        <div className="rounded-lg bg-secondary p-4">
          <div className="text-sm font-semibold text-primary-dark">📸 프로필 사진 (선택)</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-20 w-20 rounded-full bg-white border-2 border-dashed border-border flex items-center justify-center text-2xl">+</div>
            <button className="btn-secondary text-xs">사진 업로드</button>
          </div>
        </div>

        <div className="rounded-lg border-2 border-life-transition bg-life-transition/5 p-4">
          <div className="text-sm font-bold text-blue-900">권한 모델 자동 추천</div>
          <p className="mt-1 text-xs text-ink-mid">자녀 생년월일 입력 후 만 나이 기반 권한 모델이 자동 제안됩니다.</p>
          <div className="mt-2 text-xs">
            예: 만 18세 미만 → 보호자 전권 / 만 18세 이상 → 보호자 + 당사자 공동 / 후견 결정문 보유 → 후견 모드
          </div>
        </div>

        <div className="rounded-lg border border-accent bg-accent/5 p-4">
          <div className="text-sm font-bold text-accent">👁️ 당사자 본인 동의 (만 15세 이상)</div>
          <p className="mt-1 text-xs">
            자녀가 만 15세 이상이면 등록 완료 후 AAC 동의 카드가 자녀에게 자동 전송됩니다 (FR-18, FR-19).
          </p>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <Link href="/parent" className="btn-secondary">← 취소</Link>
        <button className="btn-primary">자녀 등록 완료 →</button>
      </div>
    </div>
  );
}
